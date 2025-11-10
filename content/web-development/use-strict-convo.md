---
title:  use strict convo
date:   2019-06-03 12:00:00 -0600
---

*Below is a reposting of a twitter conversation on the topic of "use strict". Given the ephemeral nature of twitter, I think it's important to keep a copy of my participation before the context is lost. The thread has been edited slightly for presentation and hateful spammer participants have been removed.*

---

> ...That's why it makes no sense to see those directives in production sites,<br>
> libraries, etc. Think it through. ;) #js

&mdash; David Mark @Cinsoft &middot; July 28, 2016

---

> .@Cinsoft I can only partly agree. Language semantics are different,<br>
> it's not simply a linter. It also provides info for JS engines

&mdash; Michael Haufe @mlhaufe &middot; Jul 28, 2016

---

> It's not a linter. It's just a debugging aid. Throws exceptions when you do<br>
> something wrong. No place in production code.

&mdash; David Mark @Cinsoft &middot; Aug 16, 2016

---

> It isn't "just" a guard rail. Once again, semantics differ.
>
> <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode#Differences_from_non-strict_to_strict>
>
> <https://tc39.es/ecma262/#sec-strict-mode-code>

&mdash; Michael Haufe @mlhaufe &middot; Aug 16, 2016

---

> Give me an example of why it needs to go to user browsers. 99% it is copied<br>
> mindlessly. :(

&mdash; David Mark @Cinsoft &middot; Aug 16, 2016

---

> Alright one example: the with statement becomes illegal<br>
> A bonus example: arguments caller/callee poisoning pills

&mdash; Michael Haufe @mlhaufe &middot; Aug 16, 2016

---

> Exactly.That's three more things you shouldn't have been doing and if you had<br>
> those habits might consider 'use strict'.

&mdash; David Mark @Cinsoft &middot; Aug 20, 2016

---

> The point of evolving the language is to not have to worry about such "habits"

&mdash; Michael Haufe @mlhaufe &middot; Aug 20, 2016

---

> You misunderstand me. Just avoid the BS listed (e.g. arguments.callee) and<br>
> you'll be fine in strict mode. Do you need any of that?

&mdash; David Mark @Cinsoft &middot; Aug 24, 2016

---

> Let's not forget that ES5 was just a stepping stone anyway. A warning sign on<br>
> the road of deprecation.
>
> <https://brendaneich.com/2010/07/a-brief-history-of-javascript/>

&mdash; Michael Haufe @mlhaufe &middot; Aug 24, 2016

---

> ES5 strict mode was a one time stunt, in that it can't be extended, but is<br>
> implicitly enabled in class bodies & modules.

&mdash; BrendanEich @BrendanEich &middot; Aug 25, 2016

---

> I think the runtime-only semantic shifts were not worth their cost, e.g.,<br>
> arguments no-aliasing, vs true rest parameters

&mdash; BrendanEich @BrendanEich &middot; Aug 25, 2016

---

> indeed. I think we suffered Wadler's law here. Should<br>
> have been new syntax IMO. Fail early. @Cinsoft

&mdash; Michael Haufe @mlhaufe &middot; Aug 25, 2016

---

> Yes, strict mode should have been early errors on existing syntax to ban, or new<br>
> forms with better semantics, not a mix.

&mdash; BrendanEich @BrendanEich &middot; Aug 25, 2016

---

> Of course moot point now. @Cinsoft

&mdash; Michael Haufe @mlhaufe &middot; Aug 25, 2016

---

> Part of the standards game is 1 step backward, 2 forward. Strict mode is net<br>
> win, don't get me wrong! TC39 lesson learned.

&mdash; BrendanEich @BrendanEich &middot; Aug 25, 2016

---

> political lesson? @Cinsoft

&mdash; Michael Haufe @mlhaufe &middot; Aug 25, 2016

---

> Kinda. Concrete lesson: don't change runtime semantics for extant syntax via<br>
> ignored-in-old-browsers "use-strict" pragma.

&mdash; BrendanEich @BrendanEich &middot; Aug 25, 2016

---

> More abstract lesson, some reject it still: don't repave bad old cowpaths -<br>
> make better forms, lead cows to greener paths.

&mdash; BrendanEich @BrendanEich &middot; Aug 25, 2016
