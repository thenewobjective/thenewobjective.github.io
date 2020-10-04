---
layout: post
icon: file-text
title:  "The Unison Language"
date:   2020-09-01 12:00:00 -0600
category: Types and Programming Languages
permalink: /types-and-programming-languages/unison-lang
commentThreadId: -1
---

I was asked recently to share my thoughts on a new programming language called [Unison](https://www.unisonweb.org/){:target='_blank'}.

## References
- https://news.ycombinator.com/item?id=22009912
- https://www.unisonweb.org/
- https://news.ycombinator.com/item?id=20807997
- https://news.ycombinator.com/from?site=unisonweb.org
- https://duckduckgo.com/?q=unison+site%3Ahttp%3A%2F%2Flambda-the-ultimate.org&t=brave&ia=web

## Notes

"""
My initial impression is that there is nothing particularly interesting here and a couple things that I dislike.

Namespaces instead of modules? Disappointing. Do they have an IoC implementation yet? If not just give it time…

“Unison is a language in which programs are not text. That is, the source of truth for a program is not its textual representation as source code, but its structured representation as an abstract syntax tree.”

In which case why can’t I just program the AST directly? Answer: It would just be a LISP.

Sadly because the AST is hidden behind the syntax, you end up in semantic trouble. Everything is structurally typed (hashed) so collision occur which they admit:

https://www.unisonweb.org/docs/language-reference#unique-types


“A type declaration gives a name to a type, but Unison does not uniquely identify a type by its name. Rather, the hash of a type's definition identifies the type. The hash is based on the structure of the type definition, with all identifiers removed.”

“For example, it might be confusing that these two types are identical:”

type Suit = Hearts | Spades | Diamonds | Clubs

type Direction = North | South | East | West

In other words this is just broken. To work around this they introduce the “unique” keyword to do what you expect: 

unique type Suit = Hearts | Spades | Diamonds | Clubs

unique type Direction = North | South | East | West


So either I have to put “unique” labels everywhere to get what I expect (and lose the hashing benefits), Or I have to play the role of human compiler and look at all of the type definitions in my code to see what might be accidentally aliased. I’m not a fan

It’s also not clear to me the interaction of these definitions across different namespaces and libraries. 


Apparently it has subtyping as well:

https://www.unisonweb.org/docs/language-reference#type-annotations

This is a big can of worms in functional languages especially in the presence of generics, though in this case I assume subtyping means structural subtyping as everything is structural anyway. I very much suspect this language does not have sound semantics…

The Kind system I am also suspicious of:

https://www.unisonweb.org/docs/language-reference#kinds-of-types

They exist but are implicitly assigned and derived (by structure like everything else I assume). So can I not express higher kinded types?

I could go on but I’ll stop there. On to the main “feature” of the language: the Unison codebase manager

REPL driven development seems to be a step backwards in use friendliness since it seems to be the primary means of coding.

A scratch file does exist so another editor could be used, but changes still need a command line to commit.

So overall my opinion on a scale of 1-5?  I give it a 3.

Aside:

The original Smalltalk didn’t have a programming language. It was only the image file and the GUI for editing, the language came later. It also keeps track of all changes <https://wiki.squeak.org/squeak/1287>

Databases are also like this. You can do a lot without touching SQL at all though the designer, there is no concept of “compile” and it is always online and running. It can also transfer the running process to another machine without a restart or rebuild step.

I believe there are Lisp/Scheme implementations that do similar. Emacs?
"""

"""
Namespacing is a global naming registry. All code knows about it. Example:

namespace MyLib.Collections {
   public class List { …}
    …
}

And in another namespace I can import it:

import MyLib.Collections.List

namespace MyApplication {
    …
}


Some problems with this construct:

Every file that uses MyLib.Collections.List has to know where it is in the project. In other words every file has to know about the global organization of the project.

If I move List to another namespace then every file that imported it now has to change its reference to it. This is NOT loose coupling and constrains the evolution of your project.

Another issue is that static state is also shared between importers. 
-	If it’s mutable  then even worse. If a third-party piece of code imports your namespace and manipulates your shared project variable then you have a security problem: Did you cache some database connection as a static variable for instance? 
-	If you have code working in parallel, then what if more than one importer is touching that static state?
-	When can a garbage collector cleanup these global shared state variables? Does it have to scan the entire running application to make sure there is no reference anymore?
-	There is a tendency for people to use this capability as a form of cache or initialization. This harms startup time, and if you happen to have parallel code then some code might see uninitialized state while other code sees the proper state


Modules are an improvement over this state of affairs by not being a global registry. All code executes in a local scope and can not be accessed by another module with being explicitly exported. Importing is a new instance of the module code.

The most popular example of modules is TypeScript/JavaScript. Compare with C# or Java to get a feel for the difference.


Even if a language has modules instead of namespaces, the language may still have not done a good job with them. Remember before that I said that namespacing is a global registry that everyone has to know about. If your module system replaces this with file references or urls then you are still doing the same thing. In JavaScript for example:

import {Addition} from '../math/addition';

…

You still have to know about the file system layout and can no longer reorganize the project without editing every file referencing it.

Fundamentally the remaining problem in both is the “import” statement (or “using” if you’re in C#)

The import statement combines module definition and module configuration. 

Module definition should simply be: here is what I provide (what I export or make public) and this is what I require to do my work (not what I import, but a declaration of what interface I need).

Module configuration describes how modules are found and composed. You can see a half-ass example of this in a JavaScript project’s package.json file dependency section. That says where the modules come from but still doesn’t define how they are composed.

Why would I want to do it this way? Well besides the loose coupling this also gives you the ability to enforce a capability model of security: In other words a module in your project couldn’t modify the file system or do an ajax call unless you gave it a reference to the code to actually do it. The module couldn’t do it otherwise because it can’t import anything on its own. What could that look like? Is there any language that does this? I only know of two in practice: Newspeak by Gilad Bracha and PLT Scheme. I am working on a similar system in my language as well.

Bracha has written quite a bit on this topic:
https://gbracha.blogspot.com/2009/07/ban-on-imports-continued.html


Anyway, that’s a lot on just namespaces and modules so let’s move on. 

Regarding Lisp, I suggest the classic: SICP. You can watch them on Youtube. Maybe try to implement the examples in your own favorite language to get the feel for it easier:

https://www.youtube.com/watch?v=-J_xL4IGhJA&list=PLE18841CABEA24090

Regarding structural typing: there’s nothing wrong with it on its own, same with nominal typing. Also nothing wrong with having both. The problem is to have just one and pretend to have the other when you don’t. There are known Type Systems that can do both soundly.

System F with subtyping
System F omega with subtyping (higher-order bounded quantification) 
    The only reference I have to this is the book Types and Programming Languages by Benjamin Pierce

Haskell and some ML based languages have variants of these type systems

Regarding Smalltalk: I first learned it through Squeak:
https://squeak.org/

The philosophy is more important though and can be a bit of a challenge to “get it”. Watching videos by Alan Kay can do a lot to help understand it. I could find some of them if you’re interested. I’ve probably already sent enough for now.

"""