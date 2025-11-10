https://www.quora.com/A-tech-interviewer-once-got-me-stuck-with-a-question-So-the-open-closed-principle-states-you-should-not-modify-existing-behavior-And-what-if-theres-a-bug-in-it-You-dont-fix-it-How-was-I-supposed-to-answer-this

==========================
Michael Haufe
  4:23 PM
I promise this isn't a trick question, but I am curious to the variety of responses this might garner.
The 'O' in the SOLID stands for the Open-Closed Principal. "software entities (classes, modules, functions, etc.)
 should be open for extension, but closed for modification"
So, if there is a bug in your code, what do you do? Not just for some HTTP interface to a client, but what about
 a class definition that some client code relies upon?

John ‘Johnny Rockstacks' Cairns
  20 days ago
You could extend and overwrite if possible


Grizzly Kier
  20 days ago
Or some kind of middlewear. The important thing is that you don't modify the base class directly. Like you
shouldn't be able to just add values/functions to it. Extending it, or creating some kind of interface class is fine though.


Matt Adams
  20 days ago
I might get roasted for some of these, but I promise I start from purism and move down the ladder to pragmatism.
1. Report the bug, and move on with a temporary fix. Track that fix and apply it later.
2. If it's a pure process, attempt to see if we can correct the data after the process the 3rd party code uses.
3. If it's an impure process, one of two things:
4. Redefine the class locally through extension (temporariliy as much as I can assure it to be temporary, knowing that
 temporary code becomes permanent)
5. Do some sort of reflection work which is needed for stranger issues
And then if 1 doesn't happen because the project is dead or the authors won't work it in, bring it up in a bigger scope
 and start talking about impacts and alternatives.
I see SOLID as strong guidelines and not law. If you can follow it, you should, but when money is on the line, shortcuts
 are permitted as long as you round back and fix it.
The hard part to me isn't the fix, the patch, the bug, or tracking, it's fixing temporary solutions, but I feel like this
 issue is one that tends to warrant temporary boo-boos.


Michael Haufe
  20 days ago
There is a saying: "Hacks Breed Hacks", how does that influence your reasoning?


Grizzly Kier
  20 days ago
Also important to note. Closed to modification is that you shouldn't alter the state of the class at runtime.
If there's a genuine bug in the class the closed for modification doesn't mean you can't fix said bug. Just don't
modify the class to handle specific cases that come up with only certain classes it interfaces with. This more relates
 to the Single Responsibility Principle. (edited)


Matt Adams
  20 days ago
Hacks Breed Hacks: That's a good point. I tend to start at how well designed the base is. An analogy I'd use is that
if the hood on your car is held together with clothespins, but you come to me to fix the latch at the front, we need
to address the lack of hinges first.
To me, it's all about future damage. If we keep applying hacks to keep the hood down, the damage will be greater with
 every temporary fix. We can weather some of them in small spots, but they can't be permanent and we can't fix the
 other issue now, we need to stop and discuss it.
If the other hack is still required for the time being, honestly it'd be a situational thing. If I don't have a
long-term stake in the project, I'd need to have discussions to imply the impact in terms of cost of maintenance and
detriment to reliability.


Matt Adams
  20 days ago
I have an example of that currently. My last project, same client/business unit, different initiative had to have a
temporary fix put in place due to a third party process bug. They're investigating that bug on their end right now
and working through a fix. (DCR->VOS if anybody here speaks EHI lingo)
I had a meeting with the PM and ITM to press home the risks associated with having the temp fix in place. They agreed
 and put a medium-pri ticket to track it.
I see each sprint update that they're tracking removing that fix as an issue, so I think it's working out, but I also have a long-term
 stake in that project and have good ties with management so it's easier for me to touch on it. If that wasn't the case, I'd need to
  think about it.


Leif Guillermo
  20 days ago
I've typically interpreted it like this: Imagine relying on an API and expecting a specific set of functionality from it. It would
be a really bad thing if the API changed on you without you knowing. Similarly, with objects, we wouldn't want dependencies to
change what they do, so if we need to modify for a new use-case we'd want to extend the existing functionality and then modify that extension. Anyone relying on the old object won't be affected.
If there's a bug in the original intended-functionality, I believe the Open-Closed principle doesn't apply, because in essence the
user of that object is expecting the intended functionality to be bug free. (edited)


Michael Haufe
  20 days ago
But you may rely on a bug for maintaining backwards compatibility.


Leif Guillermo
  20 days ago
True, but in that case you'd probably just extend. Some applications don't care about backwards compatibility, but when they do I
suppose following Open-Closed makes even more sense.


Leif Guillermo
  20 days ago
And if we're in Object land, and the object isn't exposed externally as an API then you're likely not going to run into a backwards
 compatibility issue unless there is a chain of changes that need to occur that reaches the boundary of the app.


Leif Guillermo
  20 days ago
The explanation about open/closed from refactoring.guru is basically what I said, and he even goes on to say that fixing bugs
shouldn't be the responsibility of the child. (Fix it in the existing implementation). Classes should be Closed when they are
completed, which is when developers are in agreement that the class is finished.


Michael Haufe
  20 days ago
So if it's in a 3rd party dll, where does that leave you? Not your responsibility but what does that translate to practically?


Michael Haufe
  20 days ago
I'm trying to avoid the phrase Expression Problem, but we're getting close to that territory


Leif Guillermo
  20 days ago
If there's a bug in the dll do you have the option of updating the version? I haven't worked with dll's a whole lot.


Michael Haufe
  20 days ago
The point is that the comment about it not being your responsibility is useless if the offending code is inaccessible for modification


kenn.scribner
  19 days ago
Wow...pretty interesting discussion. But what Open-Closed is saying is that you can fix bugs in the code. You should, actually.
 What you should not do is add new features to that existing code. Other objects have a dependency on it, and that new feature,
 however innocuous it may seem, could break the dependent code. So fix a bug-good. Add new non-bug code-bad. I say that, but life
  happens, everything in moderation, and be pragmatic over dogmatic. :slightly_smiling_face: In other words, it depends...you make
   the judgement call at the time.
:this_darkmode:
1



Michael Haufe
  19 days ago
Modifying the behavior of a base class method (even to fix a bug) would break subclasses though due to behavioral subtyping (LSP)
 violations, so yes it does mean you shouldn't modify that code.


kenn.scribner
  19 days ago
Feel free to disagree, but that's what Open-Closed is saying. If you prefer something different, or a different engineering tenet,
 then go for it.


Grizzly Kier
  19 days ago
This is what versioning and unit tests are for.


Grizzly Kier
  19 days ago
Sorry, let me add some context.


Grizzly Kier
  19 days ago
You absolutely can alter poorly written buggy code in a base level class, even ones which other people are using/relying on.
 Just make sure that A. you have good unit tests in place that pass before and after the alteration, and B. you are versioning
 your application and making notes in the releases/using a major version change when updating it in a way that's not necessarily
  backwards compatible.


Matt Adams
  19 days ago
I think there's a side conversation here, if almost philosophical, about how to handle third party code that you don't control.
 In a way, even if that code doesn't match its own stated documentation, it's "closed". That's the part of the conversation
 that's most interesting to me and doesn't have a really simple answer.


Grizzly Kier
  19 days ago
If the issue is in a 3rd party library you don't maintain, then you got a lot of options.
Create a pull request with the fix.
Request the author fix the bug.
Extend the class with your own fixed version overwriting the bad functions in question.
Use a different library
There's probably a few other ways you can tackle it as well. Patches, forking their repo, etc. etc. but


Michael Haufe
  19 days ago
Right Kenn, I was responding to this specifically: "But what Open-Closed is saying is that you can fix bugs in the code.
[...] So fix a bug-good. Add new non-bug code-bad." Which is not what that principal is stating. It explicitly says:
"...should be open for extension, but closed for modification"


Grizzly Kier
  19 days ago
Let me give you what I think is a classic example of Open-Closed that I've run into in my own experience.
Let's say you have a class that renders widgets to the screen. You have different types of widgets, sliders, photo galleries,
music player, etc. To do so you call the page::render function and pass in a list of widgets all with their own unique data.
If your function has a big switch statement, then any time you add a new widget you'll have to modify that page class code.
You shouldn't have to modify this base classes' code when you add a new widget. This violates the open-closed principle.
If instead your render function should loop over each passed in widget, and call that widget's render function. Once done,
then the page's render function should never have to be touched when you add a new widget, and instead that widget is
responsible for rendering itself.
:this_darkmode:
1



Matt Adams
  19 days ago
Went ahead and pulled up my copy to see what Meyer said in this situation:
image.png
image.png


:+1::+1::skin-tone-3:
3



Michael Haufe
  19 days ago
I'm surprised some design patterns weren't mentioned explicitly yet. Adapter, Proxy, etc


kenn.scribner
  19 days ago
@michael.haufe
 Actually, there are exceptions to modification. A brief discussion is here:
https://howtodoinjava.com/best-practices/open-closed-principle/
But again, pragmatism over dogmatism usually works best, IMHO.
HowToDoInJavaHowToDoInJava
Open closed principle - SOLID principles - HowToDoInJava
The open closed principle (OCP) states that a module should be open to extension but closed for modification. It is one
of famous 5 solid principles.
Jan 31st, 2019 (28 kB)
https://howtodoinjava.com/best-practices/open-closed-principle/



Michael Haufe
  19 days ago
of course you're allowed if you own all dependencies, but once you have dependents that are uncontrolled you lose that option.


Grizzly Kier
  19 days ago
Design Patterns are tricky. There's dozens of them and it's difficult to hold every single one of them in your head at all
times and know exactly when to apply them. I personally find design patterns are better tools for refactoring than factoring.
You start writing your code and you're noticing some bad practices start to peek in. Let's see if there's a design pattern that
 addresses this.


Leif Guillermo
  19 days ago
I guess that's one of the issues with inheritance then. If you use inheritance then you're locked into the implementation of
the super-classes. However, if you've got a bug that is inherited by subclasses, it's probably best to fix it. Likely any
clients using that code are going to be getting bad results until the bug is fixed anyway.


Michael Haufe
  19 days ago
It has been argued that implementation inheritance when done incorrectly definitely violates encapsulation and causes a host
of other issues as well (hence the movement for compositional forms instead)
:100:
1



Grizzly Kier
  19 days ago
I just wanted to take a moment to thank Michael for starting this conversation! What a fantastic dialog it has been! I really
appreciate everyone stepping in with their sources, interpretations, pitfalls, etc.


Michael Haufe
  19 days ago
this isn't just an OOP problem though, it was mentioned upstream that you have this issue in functional approaches as well where
you might have a function with some behavior embedded (switch statement or otherwise) (edited)


Jeffrey Burke
  13 days ago
I didn't chime in originally, but after seeing part two, I wanted to now.
Open/close is tricky.  Here is the guiding phrase I use when talking about open close; "Open/Close is influenced by SRP
and mitigated by DRY."
That is to say the SRP has a lot do with understanding what "modification" means compared to "bug" (bugs are all about
expected behavior).  DRY mitigates SRP in that just because two methods contain the same code, if they have different
reasons to change then they generally should remain separate functions. To satisfy the "closed for modification" part,
you must define expected behavior.  A "bug" is about expectations.  So I offer an opinion; "Fixing a bug cannot not violate
Open/close."  If it's  bug, then it's expected behavior. :slightly_smiling_face:


Michael Haufe
  13 days ago
A bug for one client may be a feature for another. Example: JavaScript couldn't fix the Math.random() function to make it crypto
random, nor could they fix the Y2K bug in Date (inherited from Java). These would break the web. (edited)


Jeffrey Burke
  13 days ago
I actually have a real life story about that problem.
I was fixing bugs in a n ETL upstream. After implementing, downstream reports where coming up empty.  Turns out, in the
middle somewhere, a "hack" had been added to fix the very bug I was fixing ... just in a downstream location.  In the process
of fixing my bug, that code no longer functioned as expected.  I had to roll back my fix due to time and complexity ...
so I was unable to fix a known issue because I would break downstream consumers dependent on that bug.
I have no disagreement with your assessment lol ... but will say that should not remain status quo., lol


Michael Haufe
  13 days ago
I'm using the Socratic method in both threads and playing Devil's Advocate, so I haven't expressed my own opinion yet in
either thread. (edited)


Jeffrey Burke
  13 days ago
fair.  I recognize you were only providing a framework for a comment :slightly_smiling_face: (edited)


Michael Haufe
  13 days ago
I am going somewhere with both though, and as I said up front these aren't trick questions but there is a larger point


===========================================
Michael Haufe
  10:48 AM
In my last thread we talked about the 'Closed' aspect of the Open-Closed Principal.
I'd like to see how you handle the 'Open for extension' aspect.
It seems trivial on its surface, but the same condition applies:
The code is compiled away somewhere you reference.
This time I'll even use some sample code as a start.
Starting with an OOP style:

```
abstract class Exp {
    abstract evaluate(): number
}

class Lit extends Exp {
    constructor(
        public value: number
    ) { super(); }

    evaluate() {
        return this.value
    }
}

class Add extends Exp {
    constructor(
        public left: Exp,
        public right: Exp
    ) { super(); }

    evaluate() {
        return this.left.eval() + this.right.eval()
    }
}

// Expression instance. 4 + (2 + 1)
let expSeven: Exp = new Add(new Lit(4), new Add(new Lit(2), new Lit(1)))

let seven = expSeven.evaluate() // 7
```

How do I add a new expression type Mul? Easy, just declare a new class:

```
class Mul extends Exp {
    constructor(
        public left: Exp,
        public right: Exp
    ) { super(); }

    evaluate() {
        return this.left.eval() * this.right.eval()
    }
}

// Expression instance. 4 + (2 * 3)
let expTen: Exp = new Add(new Lit(4), new Mul(new Lit(2), new Lit(3)))

let ten = expTen.evaluate() // 10
```

But how do I add a new method (toString)?

You may respond:
"Ha you idiot, that's why we use functional programming. We don't have that problem"
That's true so here's the dual example for you:

```
// Data types
type ExpType = LitType | AddType
type LitType = { _brand: 'Lit', value: number }
type AddType = { _brand: 'Add', left: ExpType, right: ExpType }

// Data "Constructors" (aka Introduction rules)
function Lit(value: number): LitType {
    return { _brand: 'Lit', value }
}

function Add(left: ExpType, right: ExpType): AddType {
    return { _brand: 'Add', left, right }
}

// Operation (aka Elimination rule)
function eval(exp: ExpType) {
    switch(exp._brand) {
        case 'Lit': return exp.value;
        case 'Add': return exp.left + exp.right;
        default: throw new Error('Unhandled Exp type');
    }
}

// Expression instance. 4 + (2 + 1)
let expSeven: ExpType = Add(Lit(4), Add(Lit(2), Lit(1)))

let seven = eval(expSeven)
```

Adding toString is trivial as a functional programmer.
Just make a new function:

```
function toString(exp: ExpType) {
    switch(exp._brand) {
        case 'Lit': return `Lit(${exp.value});
        case 'Add': return `Add(${exp.left}, ${exp.right})`;
        default: throw new Error('Unhandled Exp type');
    }
}

// "Add(Lit(4), Add(Lit(2), Lit(1)))"
let strSeven = toString(expSeven)
```

But how do I add a new expression type (Mul)?

Matt Adams
  13 days ago
Are you looking to add toString to all Exps or just to Mul?


Michael Haufe
  13 days ago
They all must support it.


Matt Adams
  13 days ago
To me, this violates the "well-defined, stable description" requirement of Open-Closed, and would require a
new version/implementation of this module. e.g. a library upgrade. When the contract changes, downline dependents
must agree to the new contract.

Michael Haufe
  13 days ago
Wouldn't that require perfect knowledge of the future?


Leif Guillermo
  13 days ago
When coming up with an approach for implementation, it can help to determine whether you're going to have variability
in functionality or variability in structure. Data structures are going to be better for variability in functionality,
and Objects are going to be better for variability in structure.
Data structures can expose their fields and shouldn't have unnecessary functionality associated with them, you create
other classes that handle the functionality. (edited)


Michael Haufe
  13 days ago
So, are you saying apply Fundamental theorem of software engineering and introduce some intermediary/helper function/class?


Matt Adams
  13 days ago
Wouldn't that require perfect knowledge of the future?
No, it shouldn't. For version 1.0.0, whatever the public interface of a module is, that should be set in stone. For users of
that library, that is the stable interface and everything in it is open/closed. However, if the author needs to change that
interface, they cannot do so without introducing a versioning change, say, 1.1.0 in this case (minor since interface additions
should be non-downline breaking generally).
If you only ever published one version of something, then yes, your first version would have to be forward thinking and consider
every aspect of how it could be used or need to be modified, as changing the interface would violate the Closed principle.
Edit - Summarizing a bit: The way I interpret it is that Open/Closed depends on what's shipped. If you need to modify the
interface, you must ship a new version with an updated interface. Software itself is holistic with its version number, in
that something like Spring 4 going to Spring 5 doesn't break Closed since it, in itself, is a different "module of software"
with its own interface contracts entirely. (edited)


Leif Guillermo
  13 days ago
I don't think it's an intermediary/helper, You're just separating the data from the logic.


Leif Guillermo
  13 days ago
In cases where you're concerned with variable functionality, I'm just saying its better to not tightly couple data/structure
to that functionality.


Jeffrey Burke
  13 days ago
In GO:  wrap the interface.  Recommended solution, also very supported as an idea in the language.
In C#: Static Extension methods.  Specifically intended to solve this problem.
If you don't own the code, you have introduce new functionality at the boarder of your code, not in the middle of it.
Good organization of whatever you implement will make a good design, or a make it a bad one. :slightly_smiling_face:


Leif Guillermo
  13 days ago
Oh, also, switch statements are bad in OOP when you can use generics/polymorphism :slightly_smiling_face: Kind of similar
to what Matt was saying though, you'd want to figure out what your specification is prior to implementing it. A switch is a
 nice quick and dirty way of implementing something if you know things aren't going to change, but if you're expecting to add
 additional methods, you're going to be changing the logical flow of your application, and it can become harder to test the
 more you add, so it's not really good for future maintainability. (edited)
:100:
1



Jeffrey Burke
  13 days ago
A switch is a code smell for open/close violation. lol.  While not always, it is often an opportunity to do something better
:slightly_smiling_face:
:this_darkmode:
1



Michael Haufe
  13 days ago
the switch example above is in the FP code not the OOP code


Michael Haufe
  13 days ago
swap that out with the case expression or maze of if-elsedom if you like, but it doesn't change the fact that in FP you need the
type discriminator


Jeffrey Burke
  13 days ago
in Functional programming, a command pattern is generally the best way to get out of a switch.  but over all, some framework has to
decide what to do.  Whether you write it, or you use one.  Whether it's MVC in C# ASP.NET, or OWIN middle ware in Express or Dotnet
Core .... or you have to write it yourself.
Someone's going to do it.  Personally, better to have a package I don't need to maintain do it. lol.  Less complexity for me.
But if I have to, I'll focus on a command pattern to achieve that.  or a variant of it. :slightly_smiling_face:


Michael Haufe
  13 days ago
Seems like alot of overhead to solve what seems to be a "simple" problem of extending some base code


Michael Haufe
  13 days ago
"I want to create a new data type or add a new method"
"Sure thing, install this framework"


Michael Haufe
  13 days ago
"Design patterns are bug reports against your programming language." -- Peter Norvig
:nice:
1
:+1:
2



Leif Guillermo
  13 days ago
Another thought about going back to fix something like this is if you're following the interface segregation principle,
then you don't want to expose clients to functionality they don't need. If you've already put out some software and clients
are expecting behaviors X and Y, then you realize you want to add Z for a specific new client or something, then you'll want
to create a new interface/class to handle Z for that new client.
If existing clients decided they needed X and Y originally, and decided they now want Z, then the specification wasn't fully
informed, and the clients would be expecting a change.
