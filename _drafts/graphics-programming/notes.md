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
- <https://en.wikipedia.org/wiki/Chroma_key>
- <https://developer.mozilla.org/en-US/docs/Web/CSS/filter>
- <https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/contrast>
- <https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Filter_effects>
- <https://web.dev/canvas-imagefilters/>
- <https://1library.net/document/q5egw9rq-image-processing-in-smalltalk.html?utm_source=related_list>
- <https://docs.gimp.org/2.10/en/filters.html>
- <https://en.wikipedia.org/wiki/Impossible_color>
- <https://www.tutorialspoint.com/dip/brightness_and_contrast.htm>
- <https://softwarebydefault.com/2013/03/03/colomatrix-image-filters/>
- <https://docs.microsoft.com/en-us/dotnet/api/system.drawing.imaging.colormatrix?redirectedfrom=MSDN&view=dotnet-plat-ext-6.0&viewFallbackFrom=net-5.0>
- <https://www.codeproject.com/Articles/3772/ColorMatrix-Basics-Simple-Image-Color-Adjustment>
- <https://www.techrepublic.com/article/how-do-i-convert-images-to-grayscale-and-sepia-tone-using-c/>
- <http://www.jhlabs.com/ip/filters/index.html>
- <https://en.wikipedia.org/wiki/2D_computer_graphics>
- <https://yoksel.github.io/svg-filters/#/>
- <https://en.wikipedia.org/wiki/SVG_filter_effects>
- <https://css-tricks.com/creating-patterns-with-svg-filters/>
- <https://en.wikipedia.org/wiki/Digital_image_processing#Digital_image_transformations>
- <https://web.archive.org/web/20200117191525/http://www.dmc.fmph.uniba.sk/public_html/doc/Java/index.htm>
- <https://kaboomjs.com/blog/3000>
- <https://twitter.com/fgasking/status/1675779146771845120>

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
- <https://twitter.com/TimSweeneyEpic/status/1580710552900636672>
- <https://twitter.com/JJcoolkl/status/1296085259243720705>
- <https://twitter.com/_eseidel/status/1417147297473826819>
- <https://twitter.com/Foone/status/1421109783264862208>
- <https://web.archive.org/web/20170314133311/http://xnaresources.com/default.asp?page=Tutorial:TileEngineSeries:1>
<https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection>
<http://conal.net/fran/tutorial.htm>
<https://ailef.tech/2022/11/12/creating-a-2d-physics-engine-from-scratch-in-javascript/>
<https://gab.com/AwwesomeAI>
<https://opengameart.org/content/pixtura12-medieval-pixel-font>
<https://twitter.com/gabrielpeyre/status/1604355786343419904>
<https://twitter.com/InputOutputHK/status/1609229317371740161>
<https://www.sciencedirect.com/science/article/pii/S2590148619300032>

color keys

- <https://twitter.com/migueldeicaza/status/1379493005116243976>

<https://avikdas.com/2020/09/08/rendering-curves-in-3d.html>

<https://github.com/jagregory/abrash-black-book>

Rasterizer

(Qy - Py)(x + 1 - (Qx + Px)/2)

- Treat pixels as a square grid
- A line intercepts the square in a shape of a trapezoid.
- The area of a trapezoid is:

h * (a+b)/2

'a' and 'b' are parallel sides. 'h' is the distance between them

======
<https://tutorial.math.lamar.edu/Classes/Alg/SystemsTwoVrble.aspx>

=====
<https://ciechanow.ski/curves-and-surfaces/>
<https://www.youtube.com/watch?v=NbSee-XM7WA>

========
L-System

mipmaps

Area of polygon
<https://mobile.twitter.com/keenanisalive/status/1436318376654147585>
