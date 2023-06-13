---
layout: post
icon: file-text
title:  "CSS Grid With Detail View"
date:   2019-06-03 12:00:00 -0600
category: Web Development
permalink: /web-development/css-grid-with-detail-view
redirect_from:
    - /css-grid-with-detail-view/
---

There have been a couple projects over the years where information would need to be displayed in a grid with an inline detail view. This could be a product listing, a gallery with long descriptions, or anything else you might imagine as appropriate. A challenge though is to make such a layout without JavaScript, make it responsive, and when the detail view is expanded to keep the details immediately below the chosen item.

The solution I’ve come up with you can see below. Interact and resize your browser as necessary:

{% include codepen.html user="mlhaufe" id="aONRGP" %}

You can see an example of real world usage on a colleague’s website:

<a href="https://grahammueller.com/pages/projects.html" target="_blank"><img src="/media-library/web-development/graham-mueller.png" alt="Graham Mueller's website"></a>

As well as an [answer](https://stackoverflow.com/a/30245615) that subsumes a StackOverflow problem

The original application was for a prototype version of a product configurator for the Inpro Corporation:

<img src="/media-library/web-development/signscape-configurator.png" alt="Signscape Configurator">
