---
layout: software-rendering
icon: file-text
category: Software Rendering
title:  "2 - Plotting Points"
date:   2020-04-26 03:00:00 -0600
permalink: /software-rendering/plotting-points
commentThreadId: -1
---

Last time we rendered random noise to our canvas, now we'll add some more control over plotting points.
Before we continue let's refactor to separate our specific noise example from what we might consider basic functionality:

<script src="https://gist.github.com/mlhaufe/497ccec681b170aedbb6905b488be2e9.js?file=1.js"></script>

So now we can re-introduce the noise example from before:

<script src="https://gist.github.com/mlhaufe/497ccec681b170aedbb6905b488be2e9.js?file=2.js"></script>

<script type="module" src="/scripts/software-rendering/example-5.js"></script>

<figure id='example-5'>
    <figcaption>example-5</figcaption>
</figure>

Going forward we'll follow this methodology to keep the separation of concerns clear. Now on to the
main objective: plotting.

Recall from last time that our pixel data is stored in a one-dimensional array in RGBA order:

```text
[R,G,B,A,R,G,B,A,...,R,G,B,A]
[0,0,0,0,0,0,0,0,...,0,0,0,0]
```

To update a specific pixel's color data will require a little arithmetic. First imagine
this array in matrix form like it would be displayed on the canvas:

```text
y x -------------------------->
|  R B G A R B G A ... R B G A  
|  R B G A R B G A ... R B G A
|  ...
v  R B G A R B G A ... R B G A
```

Mathematically this is referred to as [Matricization](https://en.wikipedia.org/wiki/Tensor_reshaping#Matricization){:target="_blank"}
in [Row-Major order](https://en.wikipedia.org/wiki/Row-_and_column-major_order){:target="_blank"}. In other words you read left to right,
from top to bottom. With this you can work out the following formula to find a desired x/y position:

```text
((y * (width * bytes)) + (x * bytes)) + component
```

Simplified as:

```text
bytes * (width * y + x) + component
```

In this case `bytes = 4` for RGBA, `width = 640`, and `height = 360`. The component is the offset for the particular color channel.
So to access the colors at `x = 240`, `y = 12`:

```text
let r = data[bytes * (width * y + x)  + 0],
    g = data[bytes * (width * y + x)  + 1],
    b = data[bytes * (width * y + x)  + 2],
    a = data[bytes * (width * y + x)  + 3]
```

Time to define our `plot` function:

<script src="https://gist.github.com/mlhaufe/497ccec681b170aedbb6905b488be2e9.js?file=3.js"></script>

Web developers will probably think it feels awkward and noisy to have to pass in the RGBA components separately `.plot(120,4,255,0,0,255)`, so we'll
update the method to support hex colors: `.plot(120,4,0xFF0000FF)` which is convenient as we can name them `.plot(120,4,RED)`:

<script src="https://gist.github.com/mlhaufe/497ccec681b170aedbb6905b488be2e9.js?file=4.js"></script>

Passing in a single number for a color requires some work to get the individual components out again, so above you can see
this being done with [bitwise shifting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators){:target="_blank"}.

How this works is that the binary representation of the color is left shifted to remove any previous channels and then right shifted to remove subsequent color channels
leaving the desired result. The following may help to visualize how the green channel `0x99` is obtained from the color `0xFF99AACC` :

```text
Hex: |                       0xFF99AACC |
Dec: |                       4288260812 |
Bin: | 11111111100110011010101011001100 |

Hex: |       FF        99        AA        CC |
Dec: |      255       153       170       204 |
Bin: | 11111111  10011001  10101010  11001100 |

Left shift (<<) 8 bits

Hex:       FF |       99        AA        CC        0 |
Dec:      255 |      153       170       204        0 |
Bin: 11111111 | 10011001  10101010  11001100 00000000 |

Only 32 bits are supported so anything to the left of the line are discarded:

Hex: |       99        AA        CC        0 |
Dec: |      153       170       204        0 |
Bin: | 10011001  10101010  11001100 00000000 |

Right shift (>>>) 24 bits

Hex: |        0        0        0       99 |       AA        CC        0
Dec: |        0        0        0      153 |      170       204        0
Bin: | 00000000 00000000 00000000 10011001 | 10101010  11001100 00000000

Only 32 bits are supported so anything to the right of the line are discarded:

Hex: |        0        0        0       99 |
Dec: |        0        0        0      153 |
Bin: | 00000000 00000000 00000000 10011001 |

Which leaves us with:

0x99
```

Now we don't want to attempt to draw pixels outside of the canvas nor do we want
to try and draw pixels at a fractional position such as `plot(-1, 18.5, BLUE)`. Let's
update the method to handle these cases:

<script src="https://gist.github.com/mlhaufe/497ccec681b170aedbb6905b488be2e9.js?file=5.js"></script>

Let's plot some pixels now:

<script src="https://gist.github.com/mlhaufe/497ccec681b170aedbb6905b488be2e9.js?file=6.js"></script>

<figure id='example-6'>
    <figcaption>example-6</figcaption>
</figure>

<script type="module" src="/scripts/software-rendering/example-6.js"></script>

You'll notice that this example required access to the canvas size which is reasonable, so
the property was exposed as a read-only accessor on the base class. Here's our final `Canvas`
class for this chapter:

<script src="https://gist.github.com/mlhaufe/497ccec681b170aedbb6905b488be2e9.js?file=7.js"></script>
