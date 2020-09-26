---
layout: post
icon: file-text
title:  "A Criticism of Web Components"
date:   2019-03-18 12:00:00 -0600
category: Web Development
permalink: /web-development/a-criticism-of-web-components
redirect_from:
    - /a-criticism-of-web-components/
commentThreadId: 1
---

*This is a repost of my (now deleted) comment on [SitePen](https://www.sitepen.com/blog/2018/07/06/web-components-in-2018/){:target="_blank"}. I’ve added some additions and references. A similar comment of mine was removed from the [Mozilla blog](https://hacks.mozilla.org/2018/11/the-power-of-web-components){:target="_blank"}.*

* TOC
{:toc}

---

It seems that [The Emperor has no clothes](https://en.wikipedia.org/wiki/The_Emperor%27s_New_Clothes){:target="_blank"}...

> "Safe upon the solid rock the ugly houses stand: Come and see my shining palace built upon the sand!"
>
> <cite>--  Edna St Vincent Millay</cite>

Sadly there are significant issues with the standards still in many places, and many undefined behaviors.

## CSS pseudo selectors don’t work

Did you create your own form component such as `<calendar />`?

Well the :checked selector won’t find it unless you happened to have hidden inside of it the right native `<input/>` to catch it. It’s then up to you to get that to actually “check” the right parts of your UX.

Want something more semantic and relevant to your component like `:focusable`? Too bad. you can’t define your own as that is not part of any standard. The closest is the [following](https://drafts.csswg.org/css-shadow-parts/){:target="_blank"} which is *barely* a draft standard

## Incompatible with native elements

If you have a custom input element the surrounding `<form>` ignores your component so you may have to create `<my-form/>` too, or add extra logic to the native one to simply recognize your new element.

Alternatively you have to dynamically [hack](https://stackoverflow.com/questions/38623176/how-can-i-create-a-web-component-that-acts-like-a-form-element/38667839){:target="_blank"} your custom element to inject, update, and remove a hidden input field for every relevant value just so the container will get the right value. This won’t cover other issues such as the other DOM properties which ignore your components:

```js
HTMLFormElement.elements
HTMLFormElement.length
HTMLFormElement.autocomplete

new FormData(form)
```

and so on.

## Non-trivial elements HAVE to extend HTMLElement

It sucks to say the least to have to re-invent something like `<button />` [from scratch](https://codepen.io/mlhaufe/pen/yxBEdx){:target="_blank"} instead of a more specific element such as `HTMLButtonElement` but the current standard requires that you extend the base `HTMLElement`

* <https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example>
* <https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-autonomous-drawbacks>

Even IF you COULD extend a more specific element directly, not all elements have a class to extend, like `<footer />`. So you have to use the hacky property in registration, extends:

```js
customElements.define('custom-footer', CustomFooter, {extends: 'footer'});
```

The built-in tags were never designed to be extended, and if you tried you will probably break [Liskov’s Substitution Principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle){:target="_blank"} now or later. For example, if you could extend HTMLInputElement your new element has to support all of the current `type="…"` options, properties, and methods. When the standard changes and they add a new property or method, your subtype will be inconsistent with it and by definition NOT be an instance of `HTMLInputElement`. As a result of this, there is now a large set of guidelines published for you to deal with. A hallmark of poor design:

* <https://w3ctag.github.io/webcomponents-design-guidelines/>
* <https://github.com/webcomponents/gold-standard/wiki>

## JavaScript required

In the age of [ServiceWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API){:target="_blank"} and offline-support, I don’t know how much this matters to you, but it is still a valid point for some. WebComponents simply don’t work without JavaScript enabled, so if that matters get ready to develop some fallback content for graceful degradation for each element, or for the entire page; or, get ready to write some bootstrap code to find and replace/upgrade some elements with your updated code. In either case you’re not saving yourself any time nor code writing.

**Update**: Chrome for Android may start disabling JavaScript on 2G connections

## Potentially exponential fallbacks

WebComponents, like other HTML elements, are compositional by nesting:

```html
<my-foo>
    <my-bar></my-bar>
</my-foo>
```

Are your fallbacks compositional?

```html
<my-foo>
    <div class="my-foo-fallback"></div>
    <my-bar>
        <div class="my-bar-fallback"></div>
    </my-bar>
</my-foo>
```

Is that right? Maybe more so like this?

```html
<my-foo>
    <div class="my-foo-fallback">
        <my-bar>
            <div class="my-bar-fallback"></div>
        </my-bar>
    </div>
</my-foo>
```

That doesn’t seem right either… And this is with only TWO contrived tags.

Now, you might say that is why the `is=""` attribute exists:

```html
<div is="my-foo">
    <div is="my-bar"></div>
</div>
```

Looks good at first for something trivial, but this is a [hack](https://wiki.whatwg.org/wiki/Custom_Elements#Subclassing_existing_elements){:target="_blank"} and once you add in the Shadow DOM you’re back in the same situation.

## Polyfills required

* These are all DRAFT standards, so for a consistent experience you’re going to probably [polyfill](https://github.com/WebComponents/webcomponentsjs){:target="_blank"}.
* The polyfill is potentially [100kB+](https://pbs.twimg.com/media/DlKFIgtVAAEssTb.jpg:large){:target="_blank"} in size based on your support requirements and has a good chance of conflicting with your Content Security Policy (a lot of dynamic style manipulation).
* Your component will render differently across browsers due to the polyfill.

In my experience the child selector is unreliable (`>`) due to the intermediate html elements injected by the library (especially Firefox and Microsoft Edge)

* SLOOOOW at scale (10+ components). There is a significant amount of DOM Mutation listening going on behind the scenes
* [Other issue](https://www.webcomponents.org/polyfills#known-limitations){:target="_blank"}
* HTML Imports are now [deprecated](https://blog.chromium.org/2018/09/chrome-70-beta-shape-detection-web.html){:target="_blank"}, so that particular polyfill may not be around in the future.
  * **Update**: YouTube was [broken](https://techdows.com/2019/03/youtube-broken-chrome-canary-74-html-imports.html){:target="_blank"} due to this.

## Aria

I already mentioned earlier that you have to re-add Aria roles for the custom version of elements you’re creating, but in addition, there is no encapsulation of Aria declarations for your component:

<https://lists.w3.org/Archives/Public/public-webapps/2014JulSep/0355.html>

## SEO

Assuming you were able to get Aria figured out in a reasonable manner does not automatically mean it will be “accessible” to search engines (go figure). [@check_ca](https://twitter.com/check_ca){:target="_blank"} discovered [recently](https://twitter.com/check_ca/status/1121561114276433920){:target="_blank"} that Google does not do well with indexing heavy WebComponent sites. His search around April 25, 2019 yielded the following:

<figure>
    <img src="/media-library/web-development/webcomponent-search-1.png" alt="WebComponent Search results">
</figure>

Slightly later when I attempted the same search (April 29, 2019):

<figure>
    <img src="/media-library/web-development/webcomponent-search-2.png" alt="WebComponent Search results">
</figure>

Reviewing the source code of one of these pages (holy shitballs):

<figure>
    <img src="/media-library/web-development/webcomponent-search-3.png" alt="WebComponent Search results">
</figure>

`<dom-if/>` ? Really? Well, I’m not going to go into why that’s a terrible idea in this post. Gilad Bracha has already criticized this in the following [article](https://gbracha.blogspot.com/2014/09/a-domain-of-shadows.html){:target="_blank"} sufficiently. Back to SEO:

I’m going to assume this is simply growing pains for search engines. They’ve had to deal with worse in the past with Java Applets, Silverlight, and Adobe Flash. Though I can’t help but point to a weekend project I did in [2012](https://ht2012.org/){:target="_blank"} with XML+XSLT for much better effect. The [Skechers site](http://thedailywtf.com/articles/Sketchy-Skecherscom){:target="_blank"} and a World of Warcraft [site](https://web.archive.org/web/20071030105540/http://www.wowarmory.com/#team-info.xml?){:target="_blank"} did similar.

## Additional Limitations

<https://github.com/webcomponents/gold-standard/wiki/Web-Component-Limitations>

## Conclusion

While I have hopes for this standard, I’ve been burned too often to suggest it to anyone. I’d say wait to see if the current native elements could be implemented as WebComponents, otherwise be prepared to potentially be doing it yourself. If you’re going to go down that path you might as well throw it all away and just build yet another web framework fully suited to your needs. Feel free to add comments, workarounds, and updates on your frustrations and efforts. As time goes on I hope this post can be thrown in the dustbin of history.

## Additional Reading

* [Adam Silver](https://adamsilver.io/){:target="_blank"} has written an [article](https://adamsilver.io/articles/the-problem-with-web-components/){:target="_blank"} based on this one and others that provides another perspective.
* [Lea Verou](https://lea.verou.me/){:target="_blank"}'s [article](https://lea.verou.me/2020/09/the-failed-promise-of-web-components/){:target="_blank"} covers some usability issues and has a call to action.
