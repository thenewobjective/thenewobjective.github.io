---
layout: post
icon: file-text
title:  "Migrating from Namecheap to Azure"
date:   2019-07-18 12:00:00 -0600
category: System Administration
permalink: /system-administration/migrating-from-namecheap-to-azure
redirect_from:
    - /migrating-from-namecheap-to-azure/
commentThreadId: 14
---

I’ve spent a number of years hosting my websites on Namecheap. Their prices were very reasonable and the customer support was excellent. Over time though I’ve been doing increasingly ambitious projects on Azure, as well as working to divorce myself from all things Google. Early this year (2019) I finally decided to consolidate all of my web properties on the Microsoft stack. Spending hours with Customer support trying to identify mystery DNS servers, ever changing hosting servers, multiple cpanels, and a half dozen other minor nuisances finally became too much. “Just give me direct server access, I’ll do it myself”. Below you can see the steps I took to transfer some of my domains to Azure.

## Caveats

I followed these steps in February of 2019. There was no user interface available nor documentation on how to do it. A user interface is in the works and by the time you read this post it may already exist. Do look for it before trying to follow in my footsteps. This is a [Dark Art](https://en.wiktionary.org/wiki/black_art#English){:target="_blank"}.

Note that this will only work for a limited number of TLDs. According to [Microsoft documentation](https://docs.microsoft.com/en-us/azure/app-service/manage-custom-dns-buy-domain#buy-the-domain){:target="_blank"}:

<figure>
  <img src="/media-library/azure/azure-domain-transfer-tld-restriction.png" alt="Azure domain transfer TLD restriction">
</figure>

In this post I am only going to show the steps I used to transfer a domain without an associated mail server, database, or any other resource tied to it. This was a simple flat file website used as a placeholder for future work. If you have a more complicated site with dependencies then use this guide as a supplement for other guides. I offer no guarantee that these steps will work for you as the interfaces and APIs will change.

If you come across an issue not covered here, you should follow the normal support channels such as Stack Overflow, Microsoft Azure support, or Namecheap support as appropriate.

I also don’t see a reasonable way to avoid downtime with this method, but you might be able to keep it to a minimum depending on how you manage redirects, SSL certificate migrations, and DNS settings during the transfer.

## Prerequisites

- Azure Subscription
- Azure Resource Group

You would be wise to migrate your other resources to azure first before moving the domain to mitigate risk and down-time. Setup appropriate redirects, DNS settings, and so on first before migrating the domain.

The SSL guide for Azure is relatively straightforward. You can see this and others in the [References](#references) section below

## Transferring out of Namecheap

Step 1: Navigate to the Namecheap dashboard

<figure>
  <img src="/media-library/azure/namecheap-dashboard.png" alt="Namecheap Dashboard">
</figure>

Click the **“Manage”** button next to the domain you want to transfer

Step 2: Unlock Domain and obtain Auth Code

Under the “Transfer Out” section you’ll see a link to **“UNLOCK”** the domain. After unlocking, click the **“AUTH CODE”** button.

<figure>
  <img src="/media-library/azure/namecheap-transfer-out.png" alt="Namecheap Transfer Out">
</figure>

This will open a popup. Fill in the feedback.

<figure>
  <img src="/media-library/azure/namecheap-feedback.png" alt="Namecheap Feedback">
</figure>

You’ll then see a confirmation on where it emailed the code.

<figure>
  <img src="/media-library/azure/namecheap-authcode-email.png" alt="Namecheap Authcode Email">
</figure>

Check your inbox. You’ll see a confirmation email:

<figure>
  <img src="/media-library/azure/namecheap-authcode-inbox.png" alt="Namecheap Authcode Inbox">
</figure>

Remember this authcode.

## Transferring into Azure

Microsoft does not document how to do this. I suspected it was possible though because 2 years earlier (Aug 2017) I saw a [short video](https://channel9.msdn.com/Shows/Azure-Friday/App-Service-Domains){:target="_blank"} on Channel9 that said this was a planned feature. After browsing around the Azure portal for a couple hours there was nothing to be seen. There are a few posts around the internet about using a few varieties of powershell scripts, but they don’t seem to work (bitrot?). Azure has a REST API though that will do the trick. Go to the [Domains – Create Or Update](https://docs.microsoft.com/en-us/rest/api/appservice/domains/createorupdate){:target="_blank"} page, and click “Try It”

<figure>
  <img src="/media-library/azure/azure-rest-api-tryit.png" alt="Azure REST Try It">
</figure>

You may be prompted to sign-in to your Azure account. Fill in the mandatory fields. The “api-version” field already has a default value defined:

<figure>
  <img src="/media-library/azure/azure-rest-domain-transfer-info.png" alt="Azure REST domain transfer info">
</figure>

In the JSON object add your information, the auth code from the earlier email, and consent information.

<figure>
  <img src="/media-library/azure/azure-rest-domain-transfer-body.png" alt="Azure REST domain transfer body">
</figure>

Remember, this is JSON, so if your auth code has a character such as ‘\’ in it you’ll have to escape it: ‘\\’

You can generate a timestamp in your browser console or scratchpad for use in the **“agreedAt”** field

<figure>
  <img src="/media-library/azure/azure-rest-domain-transfer-date.png" alt="Azure REST domain transfer date">
</figure>

The “agreedBy” field is the Client IP address according to the docs. You can obtain this in a number of ways. Such as <https://duckduckgo.com/?q=what+is+my+ip&t=hk&ia=answer>

The “agreementKeys” were left as the default values. After a [little digging](https://docs.microsoft.com/en-us/rest/api/appservice/topleveldomains/listagreements#tldlegalagreement){:target="_blank"} they stand for the following. I can’t find a link for the proper DNTA one at the moment. It might be the [GoDaddy one](https://www.godaddy.com/legal/agreements/domain-name-transfer-agreement){:target="_blank"} as Azure has a partnership with them. Let me know if you know the proper link and I’ll update this page:

| Name | Definition                     |
|------|--------------------------------|
| DNPA | Domain Name Proxy Agreement    |
| DNTA | Domain Name Transfer Agreement |

Hit the run button and you should get a 202 message:

<figure>
  <img src="/media-library/azure/azure-rest-api-domain-transfer-run-ok.png" alt="Azure REST API Domain Transfer Run Ok">
</figure>

You might also get an error like I did:

<figure>
  <img src="/media-library/azure/azure-rest-api-domain-transfer-run-fail.png" alt="Azure REST API Domain Transfer Run Fail">
</figure>

```json
{
  "error": {
    "code": "MissingSubscriptionRegistration",
    "message": "The subscription is not registered to use namespace 'Microsoft.DomainRegistration'. See https://aka.ms/rps-not-found for how to register subscriptions.",
    "details": [
      {
        "code": "MissingSubscriptionRegistration",
        "target": "Microsoft.DomainRegistration",
        "message": "The subscription is not registered to use namespace 'Microsoft.DomainRegistration'. See https://aka.ms/rps-not-found for how to register subscriptions."
      }
    ]
  }
}
```

This is how I resolved that:

<figure>
  <img src="/media-library/azure/azure-resource-providers.png" alt="Azure Resource Providers">
</figure>

<figure>
  <img src="/media-library/azure/microsoft-domain-registration-1.png" alt="Microsoft Domain Registration">
</figure>

<figure>
  <img src="/media-library/azure/microsoft-domain-registration-2.png" alt="Microsoft Domain Registration">
</figure>

Then try to run the API command again:

<figure>
  <img src="/media-library/azure/azure-rest-api-domain-transfer-run-ok.png" alt="Azure REST API Domain Transfer Run Ok">
</figure>

Navigate to the Azure Resource Group and you should see a new entry

<figure>
  <img src="/media-library/azure/arg-new-domain.png" alt="Azure new domain">
</figure>

Open the resource and you’ll see a “Pending” message at the top:

<figure>
  <img src="/media-library/azure/arg-new-domain-details.png" alt="Azure new domain details">
</figure>

Now you play the waiting game. I only had to wait an hour or so, but I wouldn’t be surprised if this takes longer. Namecheap sent the following email:

<figure>
  <img src="/media-library/azure/namecheap-confirm.png" alt="Namecheap confirmation details">
</figure>

Now this email is **Bullshit**. I waited a week and nothing happened. You have to **click the link** to CANCEL the transfer. See the comment from Namecheap support:

<figure>
  <img src="/media-library/azure/namecheap-confirm-support.jpg" alt="Namecheap confirm support">
</figure>

<figure>
  <img src="/media-library/azure/namecheap-azure-domain-transfer-request.png" alt="Namecheap Azure Domain Transfer Request">
</figure>

After clicking Approve, go back to Azure and wait. This could take awhile. I only had to wait an hour or so, but according to the message it could take days…

<figure>
  <img src="/media-library/azure/azure-app-service-domain-registered.png" alt="Azure App Service Domain Registered">
</figure>

## Post-Transfer

After transferring the domain, the next steps are verification, especially your SSL certificate and DNS settings. You can see a guide on how to do this in the references section below along with other guides that may be useful.

## References

- <https://channel9.msdn.com/Shows/Azure-Friday/App-Service-Domains>
- <https://jrudlin.github.io/2018/10/27/domain-name-registration-transfer-to-azure-app-service-domains/>
- <https://www.lieben.nu/liebensraum/2017/07/transferring-a-domain-to-azure-dns-and-billing/>
- <https://docs.microsoft.com/en-us/rest/api/appservice/domains/createorupdate>
- <https://social.msdn.microsoft.com/Forums/sqlserver/en-US/271731d8-6cd2-443b-b861-ee4ee30e34e9/transfer-domain-registration-to-azure?forum=windowsazurewebsitespreview#61163e9a-a85e-4cdb-a470-1e922b5f279d>
- <http://www.deployazure.com/web-mobile/app-service/migrating-wordpress-blog-to-azure-app-service/>
- <https://www.onepagezen.com/transfer-domain-azure/>
- <https://docs.microsoft.com/en-us/Azure/app-service/app-service-web-tutorial-custom-ssl>
