---
title:  The Effectiveness of Digital Music Recording
date:   2010-07-18 12:00:00 -0600
category: Music
---

*The following is a derivative of a paper written in 2010 for [the late](https://shepherdexpress.com/music/on-music/update-memorial-service-dr.-martin-jack-rosenblum-planned-thursday/)
Dr. Martin Rosenblum, who was kind enough to request a copy of this for his library. It has been updated for presentation
on the web.*

How effective is digital recording in capturing the musical intent of an artist and to what degree does this matter?
To answer effectively, it is important to answer a number of smaller related questions first: What are the limits of what
a musician can create acoustically? What are the limits that people are capable of perceiving music? What does a practical
digital recording consist of?

When an artist creates music it can extend beyond the notes, chords and lyrics heard. Music is an art form and as such it
implies that a creative use of sound will be used. Therefore simply focusing on these limited aspects would be a gross
oversimplification. It seems prudent to assume that a musician will take advantage of whatever range of sound he can muster.
So the question that should be asked is what can he muster? Traditionally the performance of music has been limited to the use
of the human voice and a variety of relatively well-known and ad-hoc instrument types including, but not limited to: string
instruments (guitars and violins), percussion instruments (drums and cymbals), and wind instruments (trumpets and clarinets).
In the past few years, these have been even further enhanced by the invention of the computer, synthesizer and a variety of
audio editing and composition software. With these assets in hand, a musician could create sounds ranging upwards of
[100 kHz](http://www.its.caltech.edu/~boyk/spectra/spectra.htm) and [120 dB](http://www.guinnessworldrecords.com/world-records/loudest-blow-of-an-alphorn).

Knowing what an artist can potentially create, to what degree can we experience this creation? Without enumerating over a
detailed description of the anatomy of the ear and how each individual portion works, it is sufficient to say that the human
ear can [detect sounds](http://hypertextbook.com/facts/2003/ChrisDAmbrose.shtml){:target="blank"} ranging from approximately
15 Hz to upwards of 20 kHz. Relative to the sound ranges creatable by a musician our ears pale in comparison, covering only one
fifth of the potential spectrum. While this may be the case, it is not representative of what it entails for a person to
experience music, though it is commonly accepted to be the most important part. Sound consists of vibrations in the air and while
our ears have evolved to be sensitive to them, they are not the only part of our body with which we can feel them. Vibrations in
the air, especially when intense enough, vibrate our bodies which we can feel. There have been a number of studies to this effect
involving the deaf and their exceptional ability to to “hear” [through vibrations](http://www.scientificamerican.com/article.cfm?id=brain-scans-show-deaf-sub).
So even with a lack of ears one can still appreciate the sounds a musician can create given that they are within a bearable range
not to cause injury.

With knowledge of the practical limits of a musician’s performance and knowledge of the limits of an average listener’s sound
perception, we can now tackle the main question of whether the performance can be recorded effectively for the listener to perceive
accurately. The recording medium that will be focused on will not be analog but digital as this is currently the most prevalent and
is of arguably comparable quality.

Digital recording works fundamentally by sampling the changes in air pressure (amplitude) over a given period of time (frequency)
at a high rate, translating these variables into a set of numbers which are then stored in an electronic or other format onto a medium
such as a disc or an electronic device. The higher the rate of sampling and the greater the range of amplitudes recorded, the more
accurate the representation becomes.

![Sine Wave w/ Sampling](/media-library/music/sine-wave-sampling.png "Sine Wave w/ Sampling")

The figure above represents a sound wave (a sine wave in this case). The vertical lines represent a sampling rate of the
amplitude over time at the desired frequency. The recording also contains an upper and lower bound beyond which the sampling
value is rounded towards if the amplitude exceeds this limit. This limitation can be either arbitrary or due to a physical
limitation in the target medium or recording device (a storage device can’t have an infinite capacity for instance, and a
recording device can’t record an infinite range of amplitudes). The basic idea to effectively record music is to capture every
peak and trough of the created sound wave. This means that the sampling rate will have to be at least
[twice the frequency](http://www.rctn.org/bruno/npb261/aliasing.pdf)(:target="_blank") of the sound and will have to have a
bit depth large enough to represent the largest possible amplitudes given. The rule for converting between dynamic range of
the amplitude and a bit depth is approximately [1 bit per 6 dB](https://micro.magnet.fsu.edu/primer/digitalimaging/concepts/dynamicrange.html).

With the given information thus far, it can be concluded that an effective sampling rate to cover any particular musician’s
creation would have to be at least 200 kHz (twice the maximum potential frequency range) and would have to have a bit depth
of at least 20 bits (120 dB / 6 dB per bit = 20 bits). In a perfect world this seems to be a pretty straightforward calculation
but alas, reality is not so kind. In all sound recording there is some level of background noise that can interfere with a
recording, effectively lowering the decibel range of the composition. Since the level of potential background noise in a recording
varies from place to place, we’ll assume that it will add up to approximately 24 dB of noise, which may be a liberal estimate in
most cases. This implies that another 4 bits are necessary to capture the amplitude range of the composition, giving us a total
of 24 bits. There is one more monkey wrench to throw in our calculation though: Most listeners of music expect the recording to
be in stereo. This effectively doubles the information rate giving us: 200,000 samples per second times 24 bits per sample times
2 channels, resulting in a rate of 9,600,000 bits per second or 9.6 megabits per second. Suffice it to say that a ten minute sound
recording in stereo would require a significant amount of storage space: 9.6 Mbit/second times 60 seconds/minute times 10 minutes =
5760 megabits or 720 megabytes (8 bits = 1 byte).

Such a large amount of data demands some form of compression to maximize the space available for the common consumer as the
commonly used digital media of today is measured in ranges of only a few gigabytes. Regretfully though, many compression schemes
remove some of the information in the process. In the case of the mp3 format for example, an
[algorithm is used](https://cs.stanford.edu/people/eroberts/courses/soco/projects/2000-01/data-compression/lossy/mp3/concept.htm)
to take advantage of how the ear perceives sounds in order to remove information that is believed to be beyond the range of hearing.
As was already discussed though, people experience music beyond what the ear can perceive. Thus, we can conclude then that lossy
compression of music potentially degrades the artistic intent of the musician. This leaves us with the options of using only
uncompressed music, which is unwieldy in its size, or to use a lossless compression format. As luck would have it, there are a
number available, most notably the FLAC format, which aptly stands for [Free Lossless Audio Codec](http://flac.sourceforge.net/).

In summary, it has been determined that modern day digital recording is effectively sufficient to store a musician’s potential
compositions if he wishes to explore the limits of his instrumental tools and more than enough otherwise. A number of caveats need
to be kept in mind though to the more subtle issues of noise and lossy compression as they can have a significant effect on the
quality of the recording. The issue of multiple sound channels beyond stereo were not covered nor was the issue of error correction
in digital formats. Though these topics can have a significant effect on the size of the recording, their use is generally
considered to be optional. With the use of data compression and appropriately sized storage mediums (such as DVD-Audio or Blu-Ray
disc), these size issues become decreasingly significant. Limitations to what sound a musician wishes to convey to his listeners
seem to lay beyond what can be effectively stored in a digital medium, a problem which is more likely to exist with what equipment
a particular listener uses to recreate the recorded sound.
