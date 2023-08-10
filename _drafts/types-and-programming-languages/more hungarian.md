Robert Bott
  12:01 PM
Thoughts on using "I" for interface prefix vs not?

Michael Haufe
  12:01 PM
Avoid it

Paul Plakut
  1 hour ago
Why’s that?

Robert Bott
  1 hour ago
one problem I have with not using it is, if I have an implementation, now I have to use "MyClassImp" for the implementation. The main reason for not using it is the encapsulation issue it causes, ie client does not need to know its an interface. (edited)

Robert Bott
  1 hour ago
also i feel like it helps peeking code to know the type. But hungarian notation man ,... so bad

Michael Haufe
  1 hour ago
First, it's a form of Hungarian notation that's not needed when you have a type system already.

Michael Haufe
  45 minutes ago
Second, you don't treat abstract classes that way

Michael Haufe
  44 minutes ago
Client code shouldn't know or care explicitly that they're dealing with an interface

Michael Haufe
  42 minutes ago
If you see yourself needing to use names like "Impl", "Abstract" and "IFoo", then it hints that your code is not organized well (edited)

Robert Bott
  42 minutes ago
yeah i can see that.

Paul Plakut
  42 minutes ago
What’s the recommended way of doing it?

Michael Haufe
  41 minutes ago
If I have a Person class, why would I need an IPerson?

Robert Bott
  41 minutes ago
I would say, your concrete implementations should be more specifically names. Interface Car, your implementation should be Class SortsCar implements Car.

Robert Bott
  41 minutes ago
hmm also good point lol

Michael Haufe
  41 minutes ago
And you don't call it an ICar

Paul Plakut
  41 minutes ago
I agree if the class represents an object

Paul Plakut
  40 minutes ago
What if you’re trying to enforce the implementation of methods

Michael Haufe
  39 minutes ago
An interface and class will already do that but you don't need to label it with IFoo

Michael Haufe
  39 minutes ago
Example: Equality

Michael Haufe
  39 minutes ago
"IEquals" vs "Equatable"

Michael Haufe
  38 minutes ago
The "I" gives you what value?

Robert Bott
  38 minutes ago
it comes down to naming things properly, which is one of the two or three most difficult things in Computer Science/Engineering ... (edited)

Robert Bott
  37 minutes ago
almost as hard as naming your damn wizard in an RPG!

Michael Haufe
  37 minutes ago
In this case because your problem is elsewhere

Michael Haufe
  37 minutes ago
With a layered approach it's hard to run into this issue

Michael Haufe
  36 minutes ago
If you have a Person and an IPerson you messed up

Michael Haufe
  36 minutes ago
IPerson is what's referred to as a False Abstraction

Paul Plakut
  35 minutes ago
Yeah it doesn’t make sense in that context

Paul Plakut
  34 minutes ago
However if I have an interface that requires a class to implement HTTP Verbs. What do I name things. IHttpService (interface) HttpService (implementation)

Michael Haufe
  33 minutes ago
Just call it HttpService.

Paul Plakut
  32 minutes ago
That’s the same as the implementation then

Michael Haufe
  32 minutes ago
It's a bad name. Think in layers

Michael Haufe
  31 minutes ago
At the core of your program is a Domain of Discourse

Michael Haufe
  31 minutes ago
These are POCOs. Entities and values.

Michael Haufe
  31 minutes ago
Like Person, Point3D, Circle, etc.

Michael Haufe
  30 minutes ago
They know nothing of how they'll be used and are platonic

Michael Haufe
  29 minutes ago
In the next layer you have the Application which contains use cases

Paul Plakut
  29 minutes ago
Yeah agree on all of those

Michael Haufe
  29 minutes ago
These operate on interfaces and the domain entities (edited)

Michael Haufe
  28 minutes ago
Interfaces like Factory, Presenter, etc.

Michael Haufe
  28 minutes ago
It's ignorant of what database or UI framework you choose. It manages businesses requirements and intent

Michael Haufe
  27 minutes ago
In the next layers of presentation and data you have the implementations of the interfaces

Michael Haufe
  26 minutes ago
HtmlPresenter : Presenter
ElementFactory : Factory

Michael Haufe
  24 minutes ago
Or HttpService : CrudService

Paul Plakut
  24 minutes ago
Got it. That’s fair

Michael Haufe
  23 minutes ago
In this example, does your use case care that its Http, or that it supports CRUD verbs?

Michael Haufe
  23 minutes ago
Http would be an implementation detail

Michael Haufe
  22 minutes ago
I couldn't mock so easy if my use case dictated how network communication was supposed to be performed

Michael Haufe
  22 minutes ago
That would tightly couple businesses requirements with how the requirements would be actualized

Robert Bott
  19 minutes ago
well ... that settles it then. I have just done and seen so many IStuff's in my life. Bad behaviors.

Michael Haufe
  18 minutes ago
I think alot of the debates around this are a consequence of larger application structure

Michael Haufe
  18 minutes ago
Whicg is why they are less helpful deciding one way or another

Michael Haufe
  17 minutes ago
I recall an old Java thread where this was debated and while they all generally agreed that IFoo was bad, they settled instead on FooType (edited)

Michael Haufe
  17 minutes ago
Which misses the larger point

Michael Haufe
  15 minutes ago
It's also not helpful since a common piece of advice is: "program against interfaces and not implementations"

Michael Haufe
  15 minutes ago
Whereas it would be better stated as: "program against abstractions and not implementations"

Michael Haufe
  12 minutes ago
In a compile time type checked language you can't accidentally "new" an interface so encoding the fact that it is one into the name gains you very little

Michael Haufe
  9 minutes ago
One more thing to think of: If I started with an interface, then later determined that an abstract class would have been better, I would be required to rename it to get rid of the "I" prefix

Michael Haufe
  7 minutes ago
Now, with all that being said. It's a convention in C# to use IFoo

Michael Haufe
  7 minutes ago
in TypeScript, Microsoft says avoid the prefix

Oh yeah, a minor irritant with the "I" prefix approach as well is when the name starts with an "I":
interface IItem { ... }

====
Robert Bott
  14 minutes ago
To open another can of worms, thoughts on using "_" for private variables in a class/component? I think it helps quick scanning and readability. Seems convention in some languages.

Robert Bott
  14 minutes ago
also, using modern IDE's when typing _ it pops up auto-complete for a quick tab-select on your variable


Robert Bott
  13 minutes ago
technically, hungarian notation though.

Michael Haufe
  12 minutes ago
Correct, if your language is not designed well, it can require additional notation to support

Robert Bott
  12 minutes ago
its a similar thing to using "$" for RxJS observables at the end, for various reasons. Though I do not necessarily like it, it does help more quickly distinguish O's from other variables

Michael Haufe
  11 minutes ago
In early JavaScript for example there was no support for private properties (only closure scoped variables), so _foo was popular

Robert Bott
  11 minutes ago
it comes down to readability, though my question is basically "waht price am I paying for this alleged increase in readability"? What am I not seeing long-term

Michael Haufe
  11 minutes ago
With modern JavaScript, the language adopted private variables with #foo which makes the earlier form pointless

Michael Haufe
  11 minutes ago
but in that case, it just chose a hungarian notation for you. Still poor language design

Michael Haufe
  10 minutes ago
compare with a language like Self which is also dynamically typed, it doesn't have this problem

Michael Haufe
  10 minutes ago
every variable is private by default and you have to define a get/set to expose it under the desired name

Michael Haufe
  7 minutes ago
A theoretical syntax to show what I mean:
class Point2(x: number, y: number) {
  get x(){ return x }
  get y(){ return y }
}

Michael Haufe
  7 minutes ago
If I don't define the getter, then x stays private

Michael Haufe
  6 minutes ago
with such a design you don't need special hungarian letters or sigils to make it clear to you

Michael Haufe
  5 minutes ago
With type level instead of term level privacy (like private foo ), then we can debate what value the hungarian gives you again

Michael Haufe
  5 minutes ago
in this case the naming convention is not for client code, but for your own class.

Michael Haufe
  4 minutes ago
class Point2 {
  private _x
  private _y

  get x(){ return this._x }
  get y(){ return this._y }

...
}

Robert Bott
  3 minutes ago
typically in typescript i use _ for private, then the set/get without underscore for the function name. C# uses pascal case to "get around" this.

Michael Haufe
  3 minutes ago
right, for TypeScript I'd consider that legacy code

Michael Haufe
  3 minutes ago
since #foo is standardized now

Michael Haufe
  2 minutes ago
but that's just picking a notation and putting it in stone

Michael Haufe
  2 minutes ago
you can see the language design for C#, Java, TypeScript, etc. all have this shortcoming
:+1:
1


Robert Bott
  2 minutes ago
C#-related: https://www.c-sharpcorner.com/article/stop-use-var-everywhere-and-think-before-use-underscore-with-private-variable-in/

Michael Haufe
  < 1 minute ago
So my opinion is: avoid the hungarian notation if you can, but you may be limited by your language or social conventions
:ok_hand:
1

Robert Bott
  < 1 minute ago
i noticed in unity C# you do not need this key word either, unlike TS and angular. Not sure I like that. this helps make it explicit that you are referring to member variable, also in my mind helps readability.

## Additional Resources

- <https://softwareengineering.stackexchange.com/questions/117348/should-interface-names-begin-with-an-i-prefix>
- <https://stackoverflow.com/questions/541912/interface-naming-in-java>
