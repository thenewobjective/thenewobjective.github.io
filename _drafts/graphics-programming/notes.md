- <https://twitter.com/Foone/status/1270273487270105088>
- <https://pomax.github.io/bezierinfo/#decasteljau>
- <https://generativeartistry.com/tutorials/>
- <https://pomax.github.io/bezierinfo/#decasteljau>
- <https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Constructing_B%C3%A9zier_curves>
- <https://rosettacode.org/wiki/Bitmap/B%C3%A9zier_curves/Cubic#Racket>
- <https://www.codeproject.com/articles/223159/midpoint-algorithm-divide-and-conquer-method-for-d>
- <https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm>
- <https://j2kun.github.io/bezier/bezier-draw.js>
- <https://jeremykun.com/2013/05/11/bezier-curves-and-picasso/>
- <https://en.wikipedia.org/wiki/De_Casteljau's_algorithm#Example_implementation>
- <https://en.wikipedia.org/wiki/Linear_interpolation>
- <https://theeducationlife.com/interpolation-formula/>
- <https://stackoverflow.com/questions/1734745/how-to-create-circle-with-b%C3%A9zier-curves>
- <https://spencermortensen.com/articles/bezier-circle/>
- <https://blog.demofox.org/2019/12/07/bezier-triangles/>
- <https://pomax.github.io/bezierinfo/#whatis>
- <https://rosettacode.org/wiki/Bitmap/B%C3%A9zier_curves/Cubic>
- <https://github.com/jacobcpeters/Unit-Bezier>
- <https://github.com/WebKit/webkit/blob/89c28d471fae35f1788a0f857067896a10af8974/Source/WebCore/platform/graphics/UnitBezier.h#L62>
- <https://sf2platinum.wordpress.com/2020/10/15/row-scrolling-for-parallax-effects/>
- <https://en.wikipedia.org/wiki/Ordered_dithering>

---

Determining the points of this curve can be accomplished by divide and conquer between the control points.

<figure>
    <img src="/media-library/graphics-programming/bezier-curve-midpoint.svg" alt="Bézier curve midpoints">
    <figcaption>Bézier curve divide and conquer</figcaption>
</figure>

Given the control points a point in between can be determined for each pair. This process can then be repeated until
a single point is determined. This point will be a point of the Bézier curve itself. This process for obtaining points
of the curve is called [de Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau's_algorithm). Before
getting to the algorithm though we'll want some utility functions first:

---

> Octrees also suffer from the 'near miss' problem. Which is important because your shader
> will only be as fast as the slowest branch. A ray can deep dive into many nodes and end up hitting nothing
> -gavanw
---

- <https://twitter.com/ciaccodavide/status/964407412634472448>
- <https://twitter.com/pcwalton/status/1299884289010495490>
- <https://twitter.com/icaroleles1/status/1299789424193138688>
- <https://twitter.com/JJcoolkl/status/1296085259243720705>
- <https://bartwronski.com/2021/02/28/computing-gradients-on-grids-forward-central-and-diagonal-differences/>
- <https://jbaker.graphics/resources/voraldo_paper/Voraldo.pdf>
- <https://twitter.com/ciaccodavide/status/964407412634472448>
- <https://twitter.com/pcwalton/status/1299884289010495490>
- <https://twitter.com/icaroleles1/status/1299789424193138688>
- <https://twitter.com/JJcoolkl/status/1296085259243720705>
- <https://web.archive.org/web/20110408024242/http://designfestival.com/the-cicada-principle-and-why-it-matters-to-web-designers/>
- <https://news.ycombinator.com/item?id=2419347>
- <https://ronvalstar.nl/creating-tileable-noise-maps>
- <https://twitter.com/BretWeinstein/status/1360040670228934656>
- <https://www.timesofisrael.com/hmo-sees-only-544-covid-infections-among-523000-fully-vaccinated-israelis/>
- <https://twitter.com/PerpetualValue/status/1361601758305390596>
- <https://gab.com/boriquagato/posts/105777513369610588>
- <https://gab.com/CharmingBarbie/posts/105776877353427431>
- <https://gab.com/boriquagato/posts/105776718161162997>

color keys

- <https://twitter.com/migueldeicaza/status/1379493005116243976>
