- flex order vs nth-child and tabindex
- https://manishearth.github.io/blog/2017/08/10/font-size-an-unexpectedly-complex-css-property/
- We ruined state?
- https://twitter.com/mlhaufe/status/938405708197965824
"""
Flexbox isn't all roses: using the 'order' property will likely conflict with tabindex. Also, DOM order remains the same which may be confusing if you expect different as the result of a query.
"""

- https://twitter.com/mlhaufe/status/838565384987033600
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
