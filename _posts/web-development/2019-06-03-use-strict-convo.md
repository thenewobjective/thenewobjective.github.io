---
layout: post
icon: file-text
title:  "“use strict” convo"
date:   2019-06-03 12:00:00 -0600
category: Web Development
permalink: /web-development/use-strict-convo
redirect_from:
    - /use-strict-convo/
---

*Below is a reposting of a twitter conversation on the topic of “use strict”. Given the ephemeral nature of twitter, I think it’s important to keep a copy of my participation before the context is lost. The thread has been edited slightly for presentation and hateful spammer participants have been removed.*

---

> ...That's why it makes no sense to see those directives in production sites,<br>
> libraries, etc. Think it through. ;) #js
>
> <cite>David Mark @Cinsoft &middot; July 28, 2016</cite>

---

> .@Cinsoft I can only partly agree. Language semantics are different,<br>
> it's not simply a linter. It also provides info for JS engines
>
> <cite>Michael Haufe @mlhaufe &middot; Jul 28, 2016</cite>

---

> It's not a linter. It's just a debugging aid. Throws exceptions when you do<br>
> something wrong. No place in production code.
>
> <cite>David Mark @Cinsoft &middot; Aug 16, 2016</cite>

---

> It isn't "just" a guard rail. Once again, semantics differ.
>
> <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode#Differences_from_non-strict_to_strict>
>
> <https://tc39.es/ecma262/#sec-strict-mode-code>
>
> <cite>Michael Haufe @mlhaufe &middot; Aug 16, 2016</cite>

---

> Give me an example of why it needs to go to user browsers. 99% it is copied<br>
> mindlessly. :(
>
> <cite>David Mark @Cinsoft &middot; Aug 16, 2016</cite>

---

> Alright one example: the with statement becomes illegal<br>
> A bonus example: arguments caller/callee poisoning pills
>
> <cite>Michael Haufe @mlhaufe &middot; Aug 16, 2016</cite>

---

> Exactly.That's three more things you shouldn't have been doing and if you had<br>
> those habits might consider 'use strict'.
>
> <cite>David Mark @Cinsoft &middot; Aug 20, 2016</cite>

---

> The point of evolving the language is to not have to worry about such "habits"
>
> <cite>Michael Haufe @mlhaufe &middot; Aug 20, 2016</cite>

---

> You misunderstand me. Just avoid the BS listed (e.g. arguments.callee) and<br>
> you'll be fine in strict mode. Do you need any of that?
>
> <cite>David Mark @Cinsoft &middot; Aug 24, 2016</cite>

---

> Let's not forget that ES5 was just a stepping stone anyway. A warning sign on<br>
> the road of deprecation.
>
> <https://brendaneich.com/2010/07/a-brief-history-of-javascript/>
>
> <cite>Michael Haufe @mlhaufe &middot; Aug 24, 2016</cite>

---

> ES5 strict mode was a one time stunt, in that it can't be extended, but is<br>
> implicitly enabled in class bodies & modules.
>
> <cite>BrendanEich @BrendanEich &middot; Aug 25, 2016</cite>

---

> I think the runtime-only semantic shifts were not worth their cost, e.g.,<br>
> arguments no-aliasing, vs true rest parameters
>
> <cite>BrendanEich @BrendanEich &middot; Aug 25, 2016</cite>

---

> indeed. I think we suffered Wadler's law here. Should<br>
> have been new syntax IMO. Fail early. @Cinsoft
>
> <cite>Michael Haufe @mlhaufe &middot; Aug 25, 2016</cite>

---

> Yes, strict mode should have been early errors on existing syntax to ban, or new<br>
> forms with better semantics, not a mix.
>
> <cite>BrendanEich @BrendanEich &middot; Aug 25, 2016</cite>

---

> Of course moot point now. @Cinsoft
>
> <cite>Michael Haufe @mlhaufe &middot; Aug 25, 2016</cite>

---

> Part of the standards game is 1 step backward, 2 forward. Strict mode is net<br>
> win, don't get me wrong! TC39 lesson learned.
>
> <cite>BrendanEich @BrendanEich &middot; Aug 25, 2016</cite>

---

> political lesson? @Cinsoft
>
> <cite>Michael Haufe @mlhaufe &middot; Aug 25, 2016</cite>

---

> Kinda. Concrete lesson: don't change runtime semantics for extant syntax via<br>
> ignored-in-old-browsers "use-strict" pragma.
>
> <cite>BrendanEich @BrendanEich &middot; Aug 25, 2016</cite>

---

> More abstract lesson, some reject it still: don't repave bad old cowpaths -<br>
> make better forms, lead cows to greener paths.
>
> <cite>BrendanEich @BrendanEich &middot; Aug 25, 2016</cite>
