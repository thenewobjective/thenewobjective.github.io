- flex order vs nth-child and tabindex
- <https://manishearth.github.io/blog/2017/08/10/font-size-an-unexpectedly-complex-css-property/>
- We ruined state?
- <https://twitter.com/mlhaufe/status/938405708197965824>
"""
Flexbox isn't all roses: using the 'order' property will likely conflict with tabindex. Also, DOM order remains the same which may be confusing if you expect different as the result of a query.
"""

- <https://twitter.com/mlhaufe/status/838565384987033600>
"""

- <https://increment.com/frontend/ask-an-expert-why-is-css-the-way-it-is/>

"""
Just one of those little things about CSS you need to know... when styling links, you put the pseudos in this order:

:link (meh)
:visited
:hover
:active
:focus

Otherwise, you might, say, override your hover style with your visited style.
"""

- <https://twitter.com/chriscoyier/status/1279052807790723073>

- <https://twitter.com/anatudor/status/1295370755560157187>
"""
When I first heard about environment variables, I was delighted. Until I understood they can't be used like:

@​keyframes a {  calc(env(--i)*20%), 100% { /* stuff */ } }

.item {
  --i: 1;
  animation: a 2s infinite;

  &:nth-child(2) { --i: 2 }
}

Well, they're useless then. :(

A really big problem it would solve is I wouldn't have to write:

@​keyframes a1 {  20%, 100% { --x: 5em } }
@​keyframes a2 {  40%, 100% { --x: 5em } }
@​keyframes a3 {  60%, 100% { --x: 5em } }

.item:nth-child(1) { animation-name: a1 }
.item:nth-child(2) { animation-name: a2 }
"""

<https://twitter.com/lzsthw/status/1355974096174141448>
<https://twitter.com/lzsthw/status/1336757142154596355>
<https://twitter.com/AmeliasBrain/status/1369667885593862147>
<https://twitter.com/anatudor/status/1377969167765274627>
<https://twitter.com/anatudor/status/1379384427151818756>

<https://twitter.com/BraveSampson/status/1440721838418501633>
<https://twitter.com/anatudor/status/1454161279959109641>

<https://mobile.twitter.com/anatudor/status/1452187811747139589>
<https://www.stefanjudis.com/today-i-learned/the-surprising-behavior-of-important-css-custom-properties/>
<https://www.quirksmode.org/blog/archives/2021/07/custom_properti.html>

Bad defaults
  <https://ishadeed.com/article/defensive-css/>

<https://twitter.com/LeaVerou/status/1668984897162149888>
<https://twitter.com/challengescss/status/1668536462906621953>
<https://twitter.com/romainmenke/status/1669004363828797442>

<https://www.smashingmagazine.com/2023/07/define-array-colors-css/>
<https://twitter.com/ChallengesCss/status/1669625956493869057>
<https://dev.to/janeori/css-type-casting-to-numeric-tanatan2-scalars-582j>
<https://css.oddbird.net/scope/explainer/>
