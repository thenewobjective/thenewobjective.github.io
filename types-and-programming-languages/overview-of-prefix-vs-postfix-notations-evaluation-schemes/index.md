---
title:  Overview of prefix vs postfix notations + evaluation schemes
date:   2010-10-04 12:00:00 -0600
category: Types and Programming Languages
---

*Yahoo decided to [kill Yahoo Groups](https://twitter.com/textfiles/status/1184461099237814273).
Below is a rescue of a [conversation](https://groups.yahoo.com/neo/groups/concatenative/conversations/topics/4997)
I was involved in. With luck the Web Archive can rescue the rest. Quotes have been formatted for presentation.*

---

## 1. Artjom Kossow

> Hi All,
>
> First of all, I am very glad to be a part of this awesome mailing list. Lets keep it alive :) Now, to the topic:
> I have tried to find a decent overview or an open discussion (if there is one) about the substantial differences of prefix vs postfix notation for concatenative languages, but I couldn’t. Also, I would like to discuss potential advantages of different evaluation schemes. I would be grateful if any could provide clarifications to the statements and give some examples, maybe. So:
>
> 1. **Postfix, left-to-right evaluation**
>    Well, this is like any FORTH-like language we know. Values and quotations are pushed onto the stack, operations and combinators are directly executed.
> 2. **Postfix, right-to-left evaluation**
>    This one is used, as far as I know only in [Ripple](https://github.com/joshsh/ripple). Values, execution tokens and such are pushed onto the stack and only evaluated once explicit apply “.” is encountered. Are there any direct advantages to that scheme, aside from the “inherent” laziness for all operations (say: we save some quoting here and there…)?
> 3. **Prefix, left-to-right evaluation**
>    As far as I know, this one is [Om Language](http://om-language.org/). The author itself mentions following advantages of a prefix notation:
>    - *Prefix notation more closely models function composition. Instead of storing a data stack in memory, the Om evaluator stores a composed partial function.*
>      – So? We can do that in a normal postfix notation as well, as [XY](http://www.nsl.com/k/xy/xy.htm) does.
>    - *The evaluator can read, parse and evaluate the input stream in a single pass, sending results to the output stream as soon as they are evaluated. This cannot be done with a postfix, stack-based language because any data on the stack must remain there as it may be needed by a function later.*
>      – Could someone give some examples here (and/or counter-examples)? I can’t get this :(
>    - *Functions can be optimized to only read into memory the data that is required; stack-based postfix languages have no knowledge of the function to apply until the data is already in memory, on the stack.*
>      – I guess we can get this for free with postfix, right-to-left evaluation, right?
>    - *Incoming data, such as events, become simple to handle at a language level: a program might evaluate to a function that acts as a state machine that processes any additional data appended to the program and transitions to a new state, ready to process new data.*
>      – Damn, I don’t get that either :(
>    - *An integrated development environment can provide hints to the user about the data that is expected by a function.*
>      – Why we can’t do the same for postfix? Almost every definition in forth-like languages has stack-effect diagram, so IDE can use that, right? What is a benefit of having prefix here? BTW, why there is no IDE that will show stack effect diagram inside a definition automatically, based on a current cursor position?
> 4. **Prefix, right-to-left evaluation**
>    I guess this is totally useless and not possible, right? :)
>
> Thank you very much for your time.
>
> Best Regards,
> Artjoms.
>

## 2. John Cowan

> Artjom Kossow [a.kosovs@...] [concatenative] scripsit:
>
> > 2. Postfix, right-to-left evaluation
> > This one is used, as far as I know only in Ripple
> > <https://github.com/joshsh/ripple>. Values, execution tokens and such
> > are pushed onto the stack and only evaluated once explicit apply “.” is
> > encountered. Are there any direct advantages to that scheme, aside from the
> > “inherent” laziness for all operations (say: we save some quoting here and
> > there…)?
>
> In general, laziness is of small benefit in itself: Haskell folks say that
> laziness is to keep them honest about purity. Though of course there are
> some programs that benefit from it directly, there are probably just as
> many that suffer.
>
> It also seems obvious that postfix RTL is equivalent to prefix LTR.
>
> > 4. Prefix, right-to-left evaluation
> > I guess this is totally useless and not possible, right? :)
>
> No, it would be the same as plain old postfix LTR.
>
> — John Cowan [http://www.ccil.org/~cowan](http://www.ccil.org/~cowan) [cowan@...](mailto:cowan@...)
> In politics, obedience and support are the same thing. –Hannah Arendt

## 3. Artjom Kossow
>
> Artjom Kossow [a.kosovs@...] [concatenative]
> <concatenative@yahoogroups.com> wrote:
> First of all, I am very glad to be a part of this awesome mailing list. Lets keep it alive :)
> No doubt :).
> Now, to the topic:
> I have tried to find a decent overview or an open discussion (if there is one) about the substantial differences of prefix vs postfix notation for concatenative languages, but I couldn’t. Also, I would like to discuss potential advantages of different evaluation schemes. I would be grateful if any could provide clarifications to the statements and give some examples, maybe. So:
> Such talk is fairly rare, but I wouldn’t mind seeing some thought about it. One problem is that usually we think about stack-based concatenative languages, which are simply left to right and postfix. (Another interesting issue is that “fix” implies a grammar, and concatenative grammar is the least grammatical possible.)
> Prefix, left-to-right evaluation
> As far as I know, this one is Om Language. The author itself mentions following advantages of a prefix notation:
> […]
> – Could someone give some examples here (and/or counter-examples)? I can’t get this :(
> You’re on the cutting edge here :). Sorry!
> I’ll say that there’s some purpose is making the syntax of the language reflect what you’re trying to express; even though a compiler may do something else, it’s not bad for the author to be able to tell the reader that additional information.
> Functions can be optimized to only read into memory the data that is required; stack-based postfix languages have no knowledge of the function to apply until the data is already in memory, on the stack.
> – I guess we can get this for free with postfix, right-to-left evaluation, right?
> Nothing’s free, and some of the analysis can become very complicated.
> What is a benefit of having prefix here? BTW, why there is no IDE that will show stack effect diagram inside a definition automatically, based on a current cursor position?
> I completely agree — it would seem kinda fun to have arrows pointing to the data sources for the current cursor position.
> Prefix, right-to-left evaluation
> I guess this is totally useless and not possible, right? :)
> Actually, this is how APL works (and J, K, and its other descendants, as well as FP/FL which were its ancestors). Not concatenative, though.
> Best Regards,
> Artjoms.
> -Wm

## 4. Michael Haufe

> On Sun, Jul 6, 2014 at 11:49 AM, John Cowan [cowan@...] [concatenative] <concatenative@yahoogroups.com> wrote:
>
> > In general, laziness is of small benefit in itself: Haskell folks say that
> > laziness is to keep them honest about purity. Though of course there are
> > some programs that benefit from it directly, there are probably just as
> > many that suffer.
>
> Lazy evaluation is more expressive than eager evaluation.
>
> Also compound expression may not have a Normal Form under eager evaluation, but have one under Lazy Evaluation:
>
> ```haskell
> left (x,y) = x
> right (x,y) = y
> answer = left (42,loop)
> loop = right loop
> ```
>
> With eager (innermost reduction):
>
> ```haskell
> answer
> => left (42,loop)
> => left (42,right loop)
> => left (42,right (right loop))
> => left (42,right (right (right loop)))
> => …
> ```
>
> With Lazy (outermost reduction):
>
> ```haskell
> answer
> => left (42,loop)
> => 42
> ```
>
> If your language is Non-Turing complete, it’s irrelevant of course (except in terms of efficiency which is aided
> by Graph Reduction when Normal Order is used).
>
> I’ve heard the claim more than once that with Lazy Evaluation you also lose the necessity for Macros, though I’m
> not sure how far you can take that beyond building the equivalent of your own version of If-Then-Else. I find Macros
> to be a more general symptom of having an insufficient syntax in your programming language.
>
> — Michael Haufe (Jul 6, 2014)

## 5. William Tanksley, Jr
>
> On Sun, Jul 6, 2014 at 1:25 PM, ‘William Tanksley, Jr’ [wtanksleyjr@...] [concatenative] <concatenative@yahoogroups.com> wrote:
> Artjom Kossow [a.kosovs@...] [concatenative]
> <concatenative@yahoogroups.com> wrote:
> > First of all, I am very glad to be a part of this awesome mailing list. Lets keep it alive :)
>
> No doubt :).
>
> > Now, to the topic:
> > I have tried to find a decent overview or an open discussion (if there is one) about the substantial differences of prefix vs postfix notation for concatenative languages, but I couldn’t. Also, I would like to discuss potential advantages of different evaluation schemes. I would be grateful if any could provide clarifications to the statements and give some examples, maybe. So:
>
> Such talk is fairly rare, but I wouldn’t mind seeing some thought
> about it. One problem is that usually we think about stack-based
> concatenative languages, which are simply left to right and postfix.
> (Another interesting issue is that “fix” implies a grammar, and
> concatenative grammar is the least grammatical possible.)

## 6. Michael Haufe

> If we were Japanese we might be arguing top-to-bottom, or bottom-to-top.
>
> Since the languages I speak are Left-to-Right, and because I prefer to glance at an
> expression and immediately know its ultimate purpose, I am firmly in the camp where the final
> expression is on the left side:
>
> ```
> sq := time dup
> ```
>
> instead of
>
> ```
> sq := dup time
> ```
>
> or
>
> ```
> dup time =: sq
> ```
>
> One shouldn’t have to execute a program in their head in order to understand what the goal is: that’s partly what a computer is for.
>
> [Michael Haufe](https://thenewobjective.com) (Jul 6, 2014)

## 7. William Tanksley, Jr

>
> Michael Haufe [tno@...] wrote:
> > Since the languages I speak are Left-to-Right, and because I prefer to
> > glance at an expression and immediately know its ultimate purpose, I am
> > firmly in the camp where the final expression is on the left side:
>
> This has absolutely nothing to do with how to express definitions, and
> only a tiny bit to do with expressing assignments. That’s the only
> time when “the final expression is on the left side” — and it can be
> treated as a special case.
>
> Please read Iverson’s “Notation as a tool of thought” to see more
> about how useful a right-to-left precedence language can be, even
> while reading left to right.
> [http://www.jsoftware.com/papers/tot.htm](http://www.jsoftware.com/papers/tot.htm)
>
> -Wm
>
> *William Tanksley, Jr (Jul 6, 2014)*

## 8. John Cowan

> Michael Haufe [tno@...] [concatenative] scripsit:
>
> > Also compound expression may not have a Normal Form under eager evaluation,
> > but have one under Lazy Evaluation:
>
> The converse is also true in non-confluent term rewriting systems like Pure.
>
> —
> John Cowan [http://www.ccil.org/~cowan](http://www.ccil.org/~cowan) [cowan@...](mailto:cowan@...)
> And through this revolting graveyard of the universe the muffled,
> maddening beating of drums, and thin, monotonous whine of blasphemous
> flutes from inconceivable, unlighted chambers beyond Time; the
> detestable pounding and piping whereunto dance slowly, awkwardly, and
> absurdly the gigantic tenebrous ultimate gods –the blind, voiceless,
> mindless gargoyles whose soul is Nyarlathotep. (Lovecraft)

## 9. Artjom Kossow

> Thank you all for the replies.
>
> > It also seems obvious that postfix RTL is equivalent to prefix LTR.
>
> >> 4. Prefix, right-to-left evaluation
> >> I guess this is totally useless and not possible, right? :)
>
> > No, it would be the same as plain old postfix LTR.
>
> Sure, they are “equivalent”, abstractly speaking. But in fact, as Michael Haufe pointed out (a good point, actually!), there are some differences for the programmer.
>
> > One shouldn’t have to execute a program in their head in order to understand what the goal is: that’s partly what a computer is for.
>
> All I wanted is to get a good scope about such “little things” (like Michael Haufe pointed out) in regard to each notation+evaluation scheme combination, disregarding their “formal” equivalence.
>
> Regarding all the benefits that I’ve listed for Om Language (which were unclear and unanswered), I guess that I will write an email to the author (I suppose he is also a member of this group, but he hasn’t replied) and then report here :)
>
> *artemonster (Jul 14, 2014)*

## 10. William Tanksley, Jr

> [a.kosovs@...](mailto:a.kosovs@...) [concatenative] <[concatenative@yahoogroups.com](mailto:concatenative@yahoogroups.com)> wrote:
> > Regarding all the benefits that I’ve listed for Om Language (which were unclear and unanswered), I guess that I will write an email to the author (I suppose he is also a member of this group, but he hasn’t replied) and then report here :)
>
> I look forward to hearing the results! I’m glad we’re digging around.
>
> *William Tanksley, Jr (Jul 14, 2014)*

## 11. Michael Haufe

> > On Sun, Jul 6, 2014 at 9:50 PM, ‘William Tanksley, Jr’ [wtanksleyjr@...] [concatenative] <concatenative@yahoogroups.com> wrote:
> >
> > > Michael Haufe [tno@...] wrote:
> > > > Since the languages I speak are Left-to-Right, and because I prefer to
> > > > glance at an expression and immediately know its ultimate purpose, I am
> > > > firmly in the camp where the final expression is on the left side:
> >
> > This has absolutely nothing to do with how to express definitions, and
> > only a tiny bit to do with expressing assignments. That’s the only
> > time when “the final expression is on the left side” — and it can be
> > treated as a special case.
>
> What I was primarily referring to here was if a syntax tree representing the compound expression was flattened, where the
> root would be positioned. (Though yes, I do prefer the assignments on the left side)
>
> > Please read Iverson’s “Notation as a tool of thought” to see more
> > about how useful a right-to-left precedence language can be, even
> > while reading left to right.
> > [http://www.jsoftware.com/papers/tot.htm](http://www.jsoftware.com/papers/tot.htm)
>
> Yes, I’ve read this a number of times over the years. Is there anything in particular you want to
> point to in the ~50 pages referenced?
>
> Immediately before section 1.5, for instance, is the following which is similar to what I said earlier (irt. monadic forms):
>
> “Syntactic rules are further simplified by adopting a single form for all dyadic functions, which appear between their
> arguments, and for all monadic functions, which appear before their arguments.”
>
> — Michael Haufe (Jul 15, 2014)

## 12. Jason Hemann

---
>
> Hi, everybody! I heard from Artyom that folks were interested in some clarifications about Om. My mind hasn’t been in the language for a while, but I’ll see if I can shed some light on what I was trying to get at on the website. Some of that is likely specific to Om vs. prefix languages in general.
>
> > Prefix notation more closely models function composition. Instead of storing a data stack in memory, the Om evaluator stores a composed partial function.
>
> The in-memory state of a computation in a postfix language is represented by a data stack. In Om, an in-memory computation is a function stack, which is analogous to a function composition.
>
> For example, the hypothetical Om program “swap {A}” would first push the “swap” function, then the constant “{A}” function. The function stack now represents the composition of “swap” and “{A}”.
>
> > The evaluator can read, parse and evaluate the input stream in a single pass, sending results to the output stream as soon as they are evaluated. This cannot be done with a postfix, stack-based language because any data on the stack must remain there as it may be needed by a function later.
>
> Think of Om as a stream-based language that rewrites a program from an input stream into a program sent to an output stream.
>
> In the above example: when “{B}” is pushed onto “swap {A}”, the state is “swap {A} {B}”, which the interpreter then rewrites as “{B} {A}”. These are both constant functions, and since there is no way that any remaining program could modify these (because it is prefix), they can be written to the output stream.
>
> So for the program “swap {A} {B} swap {C}”, this will get rewritten to “{B} {A} swap {C}”, and {B} and {A} can be written to the output stream, leaving only “swap {C}” on the “function stack”. When the constant program {D} gets pushed, {D} and {C} are output to the output stream, leaving the function stack empty.
>
> To better understand evaluation in Om: given the program “swap {A} swap {B} {C}”, the interpreter will:
> – Push “swap” onto the function stack
> – Push “{A}” onto the function stack
> – Push “swap” onto the function stack
> – Push “{B}” onto the function stack
> – Push “{C}” onto the function stack
> – Rewrite the program as “swap {A} {C} {B}”
> – Rewrite the program as “{C} {A} {B}”
> – Output constant functions “{C}”, “{A}”, and “{B}”.
> – The function stack is now empty.
>
> > Functions can be optimized to only read into memory the data that is required; stack-based postfix languages have no knowledge of the function to apply until the data is already in memory, on the stack.
>
> An example is the “drop” function. In Om, when the “drop” function is pushed onto the stack, any constant function that follows (i.e. an operand) will cause the “drop” function and the constant function to be rewritten as an empty program.
>
> In a postfix language, a function like this would first require the operand to be pushed onto a data stack in memory, and then “drop” would come along and remove it.
>
> Om, however, never needs to read the full operand into memory. The “drop” function can read the operand directly from the input stream and discard the characters as they come in.
>
> > Incoming data, such as events, become simple to handle at a language level: a program might evaluate to a function that acts as a state machine that processes any additional data appended to the program and transitions to a new state, ready to process new data.
>
> As any Om computation is a “function stack” (which represents a composed function), one could imagine that events could arrive as program elements on the input stream, thereby changing the state of the program to a new state, ready to receive new events. Therefore, a simple event-handling mechanism is central to the language.
>
> > An integrated development environment can provide hints to the user about the data that is expected by a function.
>
> The idea here is that the operator is typed first in a prefix language (followed by its operands). As soon as the operator is entered, the operands it expects could be indicated to the user by an IDE. (I suppose this breaks down for people who typically enter data in a right-to-left direction in their text editor…)
>
> Thanks again for the interest! Hope that helps. Please let me know if any of that still doesn’t make sense.
>
> Jason
>
> *the.sparist (Jul 15, 2014)*
