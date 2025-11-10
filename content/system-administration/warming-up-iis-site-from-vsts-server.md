---
title:  Warming up IIS Site from VSTS Server
date:   2020-09-01 13:00:00 -0600
---

## Background

I once had a challenge in a legacy enterprise environment where an ASP.NET solution was being deployed to a set of Content Delivery
servers. As you might be aware, when this is done the IIS site must be restarted and visited once to trigger
[Dynamic Compilation](https://docs.microsoft.com/en-us/previous-versions/aspnet/ms366723(v=vs.100)){:target='_blank'}. In this particular case though
each server required upwards of 10 minutes to complete the compilation and display. This long delay caused the load-balancer to
assume all nodes were down and resulted in a 404 error incorrectly. Fixing the underlying issue for the slow compilation
was not an option due to time constraints so a hack was needed. An additional challenge was that the VSTS server being leveraged for
CI/CD was greatly out of date. To "resolve" this issue for the short-term an additional task was added to the release pipeline to
poke each server after its code had been deployed. This task was synchronous to prevent subsequent releases until the current one
was completed. This effectively kept one of the CD servers active while the other was warming-up. While this is trivial in concept,
the implementation was not due to the limitations of the out-of-date VSTS server and the outdated
Content Delivery servers. If you end up in a similar situation where your hands are tied then this may help.

## The Happy Path

The primary challenge I encountered in implementing this solution was due to invalid certificates being used on each server.
The content delivery servers were only addressable by IP address but required SSL to connect. Additionally the VSTS server was greatly outdated.

Normally this task could be accomplished with a single line of powershell:

```powershell
Invoke-WebRequest -Uri https://127.0.0.1 -SkipCertificateCheck -ErrorAction Stop
```

Where `127.0.0.1` is replaced with the IP address of the target server.

But the `-SkipCertificateCheck` flag requires [Powershell 6+](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-webrequest?view=powershell-6){:target='_blank'}.
Therefore `GET` requests couldn't be performed against the target servers with this approach. If you have a self-hosted VSTS server that is more up-to-date, this is the suggested solution.

My problem though:

```powershell
The underlying connection was closed: Could not establish trust relationship for the SSL/TLS secure channel.
```

## Alternative 1

One alternative is to embed another language in powershell to emulate this functionality such as C# in order to gain access to its ability to toggle SSL trust.

1. [Solution 1](https://stackoverflow.com/questions/46855241/ignoring-self-signed-certificates-from-powershell-invoke-restmethod-doesnt-work){:target='_blank'}
2. [Solution 2](http://web.archive.org/web/20200224131842/http://huddledmasses.org:80/blog/validating-self-signed-certificates-properly-from-powershell/){:target='_blank'}

These solutions are quite a bit more complicated in comparison to the happy path above but may work for you. For me these solutions also failed to connect to the CD servers...

## Alternative 2

Another approach is to use the `XmlHttpRequest` object found in JScript to perform the `GET` request. There was no JScript task runner available in the version
of VSTS being used, so I tried to embed the code in powershell as described in the following [article](https://devcentral.f5.com/s/articles/powershell-abcs-j-is-for-javascript){:target='_blank'}.
In this approach one is restricted to JScript 5.8 which means ECMAScript version 3 practically but that is sufficient. The `XmlHttpRequest` object is a COM object in this version and
there are [many variants](https://blog.srpcs.com/picking-the-correct-xmlhttp-object/){:target='_blank'} to choose from. The appropriate one is the version that allows disabling SSL verification: `Msxml2.ServerXMLHTTP.6.0`.

Sadly, when executing this approach an error occurs. Turns out the COM object can only be used in an [x86 environment](https://social.msdn.microsoft.com/Forums/vstudio/en-US/9f483589-28cf-4ff0-b7bf-18529dc08d10/retrieving-com-class-error-when-using-microsoft-script-control-in-c){:target='_blank'}. The powershell that is executing this script in VSTS runs in x64 and could not be configured on the server.

## A Solution That Worked

While Powershell doesn't run as x86, a Batch file does. If the JScript is [embedded in Batch](https://stackoverflow.com/questions/2325420/embed-javascript-in-bat-files){:target='_blank'} then a functional solution is available:

```js
@set @junk=1 /*
@echo off
:: Execute the current file as a JScript file with arguments
cscript //nologo //E:jscript %0 %*
goto :eof
*/
// JScript below

var url = WScript.arguments(0), // access commandline arguments
    TIMEOUT = 1000 * 60 * 10, // 10 mins
    // Connection timeouts
    // <https://docs.microsoft.com/en-us/previous-versions/windows/desktop/ms760403(v=vs.85)?redirectedfrom=MSDN>
    lResolve = TIMEOUT,
    lConnect = TIMEOUT;
    lSend = TIMEOUT;
    lReceive = TIMEOUT;

// This version is required to support the setOption method
// <https://blog.srpcs.com/picking-the-correct-xmlhttp-object/>
var xhr = new ActiveXObject("Msxml2.ServerXMLHTTP.6.0");
// ignore certificate error: <https://docs.microsoft.com/en-us/previous-versions/windows/desktop/ms763811(v=vs.85)>
xhr.setOption(2, 13056);
WScript.echo("Warming up: " + url)
xhr.setTimeouts(lResolve, lConnect, lSend, lReceive);
// synchronous call (false) to force later tasks to wait
xhr.open("GET", url, false);
xhr.setRequestHeader('User-Agent','XMLHTTP/1.0');
xhr.send('');
WScript.echo(xhr.status)
WSH.echo(xhr.statusText);
```

To use this bat file in the release pipeline it had to be stored somewhere as there is no 'inline' option for batch tasks. VSTS provides a library feature which seemed appropriate:

::content-figure{src="/media-library/system-administration/warmup-1.png" alt="VSTS Library" caption="VSTS Library"}
::

With the bat file uploaded it can be accessed from the release pipelines with the "Download Secure File" task:

::content-figure{src="/media-library/system-administration/warmup-2.png" alt="VSTS Library" caption="VSTS Deployment"}
::

This file is downloaded into a temp directory and can now be executed:

::content-figure{src="/media-library/system-administration/warmup-3.png" alt="VSTS Library" caption="VSTS Deployment"}
::

The only argument to this task is the url to warmup.

Note: The file in the VSTS library can not be edited, it has to be deleted and a new one uploaded.
When you replace this file every "Download Secure File" task has to be updated to point to the new file that was uploaded, even if the name is the same.
