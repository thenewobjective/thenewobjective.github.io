---
layout: post
icon: file-text
title:  "Not Svelte but Gros"
date:   2020-06-24 12:00:00 -0600
category: Web Development
permalink: /web-development/not-svelte-but-gros
commentThreadId: 36
---

* TOC
{:toc}

## Introduction

Recently I was asked to review [Svelte](https://svelte.dev/){:target="_blank"}.
My usual response to these requests is that "it's better than nothing" but that's
just [damning with faint praise](https://en.wikipedia.org/wiki/Damning_with_faint_praise){:target="_blank"}.
I'm not a fan of most web frameworks and I've seen my share since 1997. Sadly Svelte I also find
disappointing.

Svelte seems to
[sell itself](https://svelte.dev/blog/svelte-3-rethinking-reactivity){:target="_blank} as not being
[React](https://reactjs.org/){:target="_blank"} which is not a high bar but that's another story.
The efficiency of it's output leaved much to be desired. The "Hello World" example is 41 lines of code excluding the 7 imports:

<figure>
    <img src="/media-library/web-development/svelte/hello-world.png" alt="Hello World">
</figure>

The implementation also leaks:

```html
<script>
var args = arguments;

function handleClick() {
    alert(JSON.stringify(args))
    alert(create_fragment.toString())
}
</script>

<button on:click={handleClick}>Click</button>
```

Which produces:

<figure>
    <img src="/media-library/web-development/svelte/leaks.png" alt="Environment Leaks">
</figure>

[Leaky abstractions are just bad abstractions](/requirements-engineering/leaky-abstractions-are-just-bad-abstractions)

## Reactivity

Svelte has a feature referred to as Reactive declarations:

```js
let count = 0;
$: doubled = count * 2;
```

```js
$: if (count >= 10) {
    alert(`count is dangerously high!`);
    count = 9;
}
```

This abused JavaScript is meant to execute the labeled statement when the referenced value changes. While valid syntax
the semantics are definitely not JavaScript and the authors should not [gloss over this](https://svelte.dev/tutorial/reactive-declarations){:target="_blank}
as valid.

In addition to abusing syntax to support "reactivity" the framework relies on syntactic assignment to trigger it. The [official examples](https://svelte.dev/tutorial/updating-arrays-and-objects){:target="_blank"}
show how terribly broken this feature is:

```js
function addNumber() {
    numbers.push(numbers.length + 1);
    numbers = numbers; // redundant assignment to trigger the event
}
```

If that's not bad enough aliasing makes it worse:

```js
const foo = obj.foo;
foo.bar = 'baz';

```

To quote the documentation:

> ...the name of the updated variable must appear on the left hand side of the assignment.
> [Otherwise it] won't update references to `obj.foo.bar`, unless you follow it up with `obj = obj`.

## DSLs

So in addition to reinterpeting labels and the above terribly designed feature for "reacitivity"
the framework also provides conditional statements and await block:

```html
{#if someCondition}
    <h1>Hello World</h1>
{/if}
```

```html
<ul>
    {#each items as item, i}
    <li>
        <a target="_blank" href="https://example.com/{item.id}" data-index="{i}">{item.id}</a>
    </li>
    {/each}
</ul>
```

```html
{#await myPromise}
  <p>...waiting</p>
{:then response}
  <p>The response is {response}</p>
{:catch error}
  <p class="warn">{error.message}</p>
{/await}
```

Given that "JavaScript" and a compiler are already involved with this framework why does a new DSL for conditionals, loops,
and promises need to be reinvented? The language already has these features.

## Event Model

Due to how the compilation works a strange event system was created:

```html
<button on:click={handleClick}></button>
```

Which tries to make up for the loss of the vanilla functionality:

```html
<button onclick="handleClick()"></button>
```

The event modifiers could be done in the handler itself, so I don't understand the need to add another syntax such as:

```html
<button on:click|once={handleClick}>Click me</button>
```

This just promotes duplicating logic and mixing it with the "markup". If I had a list of elements with the same handler then adding a modifier on each element is not an improvement.

Speaking of an over-complicated [event model](https://svelte.dev/tutorial/event-forwarding){:target="_blank"}:

> "Unlike DOM events, component events don't bubble. If you want to listen to
> an event on some deeply nested component, the intermediate components must forward the event."

Svelte is using what is called the [Chain of Responsibility pattern](https://refactoring.guru/design-patterns/chain-of-responsibility){:target="_blank"} to process events.
 This has been known to be a bad idea since the late 90s When Java abandoned it. This approach requires either:

1. Every intermediate component has to explicitly forward the event (as mentioned in the quote)
2. A particular container component has to define a switch-statement or if-else to filter and
   handle the child events when there are many types. (as shown in the [example](https://svelte.dev/tutorial/event-forwarding){:target="_blank"} with `dispatch()` if more events were defined)

The [Delegation Event Model](https://www.developer.com/java/data/understanding-and-using-the-java-delegation-event-model.html) as used
in the DOM is superior and should have been kept instead. A true [reactive](https://en.wikipedia.org/wiki/Reactive_programming){:target="_blank"} approach would also have been better.

## Forms

> In the DOM, everything is a string. That's unhelpful when you're dealing with numeric inputs — type=&ldquo;number&rdquo;
> and type=&ldquo;range&rdquo; — as it means you have to remember to coerce input.value before using it.
>
> With bind:value, Svelte takes care of it for you

That is just wrong. `<input>` elements [support](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement){:target="_blank"}:

`value`, `valueAsDate`, `valueAsNumber`

Initially I thought this was just outdated information but Svelte was [released](https://svelte.dev/blog/frameworks-without-the-framework){:target="_blank"} in November of 2016
and these input properties have been in browsers for [at least 8 years](https://bugzilla.mozilla.org/show_bug.cgi?id=769370).

Svelte also provides a grouping syntax for checkboxes and radio buttons:

```html
{#each items as item}
    <label>
        <input type=checkbox bind:group={items} value={item}>
        {item.name}
    </label>
{/each}
```

The "name" attribute [already does this](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/checkbox#Handling_multiple_checkboxes){:target="_blank"}
but due to how binding and events work it's no surprise that this feature was reinvented.

## Context API

Due to the terrible event model described above an additional feature was added in Svelte to work around it called the [Context API](https://svelte.dev/tutorial/context-api){:target="_blank"}.
Strangely the authors don't recognize the problem and treat this as a [feature](https://svelte.dev/tutorial/context-api){:target="_blank"}:

> The context API provides a mechanism for components to 'talk' to each other
> without passing around data and functions as props, or dispatching lots of events.
> It's an advanced feature, but a useful one.

This may be a failure of imagination on my part, but it looks to me by the examples that "Stores" are just being used to bypass the event model
and GUI hierarchy in order to cross-communicate to other components. Perhaps if the event model was better this thing wouldn't exist.

## Transitions and Animations

```html
<script>
    import { fade, fly } from 'svelte/transition';
    let visible = true;
</script>

<label>
    <input type="checkbox" bind:checked={visible}>
    visible
</label>
{% raw %}
{#if visible}
    <p in:fly="{{ y: 200, duration: 2000 }}" out:fade>
        Flies in, fades out
    </p>
{/if}
{% endraw %}
```

On one hand I do like the fact that CSS can be avoided in favor of JavaScript directly,
on the other hand the approach leaves much to be desired. The style property of the
element is manipulated directly instead of using the [CSSOM](https://css-tricks.com/an-introduction-and-guide-to-the-css-object-model-cssom/#the-cssstylesheet-interface){:target="_blank"}.
You can imagine how this would scale poorly with more ambitious styling.

## Components

Regarding components, I'll just reference the criticism I've already given:

[A Criticism of Web Components](https://thenewobjective.com/web-development/a-criticism-of-web-components){:target="_blank"}

## Conclusion

Don't choose a framework for the sake of it. Beware of hype and contrived examples. Learn the fundamentals before seeking abstractions.
There is a difference between [simple and easy](https://youtu.be/rI8tNMsozo0?t=48){:target="_blank"}, and don't be afraid to roll-your-own
based on a sound foundation:

* <http://vanilla-js.com/>
* [MVC in ~100 lines](https://gist.github.com/mlhaufe/c841b2269b0099c3c52648717f9551cc){:target="_blank"}
