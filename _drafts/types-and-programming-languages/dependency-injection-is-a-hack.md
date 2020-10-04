It has been recognized, by Peter Norvig and others, that Design Patterns can be seen as bug reports against a programming language. In recent years a particular design pattern (with related frameworks) has gained popularity under the monikers "Dependency Injection", and "Inversion of Control".
{Describe problem as given by DI Proponents}
{Describe solution as given by DI proponents}
{Describe real problem}
{Describe real solution}
{Conclude with comment about social tendency to overcomplicate, reinvent a broken wheel, etc. Talk about design patterns first}
{Attacks a pillar of SOL_I_D}

## Notes

"""
I love to use¹ dependency² injection³

¹ pass
² values
³ to functions
"""
-- [@importantshock](https://twitter.com/importantshock/status/1085740688283746304)

I wish people would stop talking about "dependency inversion" as if it was anything interesting. It is just a bizarre term for 'abstraction', primarily wrt something module-like.
-- [Andreas Rossberg](http://lambda-the-ultimate.org/node/3544#comment-53287)


'dependency inversion' ~ module abstraction
'dependency injection' ~ module instantiation
-- [Andreas Rossberg](http://lambda-the-ultimate.org/node/3544#comment-53309)

(This is a bit off-topic, but it came to mind, so what the hell.)
You are correct in your observations that given most programming languages (even those such as Haskell), it is difficult to see exactly how Curry-Howard is useful.
I recently stumbled across someone mentioning something called "dependency injection". I didn't know what it was, so I googled (I guess this is lowercase nowadays!) it and read Martin Fowler's article on it. It is a bit on the long side, and I kept waiting for the punch-line; you know, the point at which the author hits you with the insight which justifies the preceding verbosity and the hi-tech-sounding name ("dependency injection" — I can't help but think of "fuel injection", and gleaming motor engine showcases), but it seemed indefinitely postponed. And in the end, it turned out that "dependency injection" just means "abstraction" specifically by parametrization, by update and by what I think amounts to type abstraction plus update. (Apparently these are called — I kid you not — type 3 IoC, type 2 IoC and type 1 IoC...!)
To me this all seemed rather obvious and it got me thinking about why it isn't obvious to the author or his readership.
In Haskell, if I am given some type B which I need to produce somehow, and I realize that the B-values I need depend on some other values of type A, the first thing I do is write down "f :: A -> B". Then I write down "f a =", and then I start writing stuff after the equals sign until I have what I need. I do that because I know once I have the type that if there is an inhabitant of the type "A -> B" it can be expressed as "\a -> b" for some b, so the "f a =" part is always part of my solution and I will never have to change that unless I want to. So once I've written that down I feel one step closer to my solution.
I know that for three reasons. First, because of my experience as a functional programmer. Second, because it is part of the universal property of exponentials ("factors uniquely"), that is, of function types. And third, because by the Curry-Howard correspondence with natural deduction, I can start any proof of A which depends on B by assuming A, that is, adding it as a hypothesis.
So, why is it so obscure in Java? I think part of the reason is that in Java you have update, so there are complications and additional solutions. But part of the reason is also that it largely lacks structural typing, and that makes it hard to see that a class('s interface) is a product of exponentials. (With nominal typing, you tend to think of a class by its name, rather than its structure.)
You could also blame the syntax of method signatures, which obscure the relationship with exponentials and implication. But is the syntax the cause or just a symptom? (You know what I think about syntax...) If CH could be readily applied to Java, perhaps Java's designers would have chosen a more suggestive syntax. But even if they had decided to stick anyway with C-style syntax, the idea of using abstraction to handle dependencies would have been more obvious
-- [Frank Atanassow](http://lambda-the-ultimate.org/node/1532#comment-18406)

Yes, dependency inversion is a big part of programming in a capability language. Since objects are confined unless they carry reference to a shared service, providing dependencies directly is necessary.
As noted above, this is nothing special... it's simply proper abstraction.
Far more remarkable is the strange notion that objects should create their own dependencies. Even the idea that an object should create and encapsulate its very own mutable 'integer' variable - as opposed to a (potentially shared) integer variable being passed to it via constructor - is of questionable virtue. Objects that 'own' variables end up attempting to serve two roles, as both capability and object-graph description, and manage to achieve each of these poorly.
ease the syntactic weight by passing a "program" object pointer implicitly between modules during initialization. 
While doing this may ease syntactic burden, it would also violate capability principles. It's essentially the same as having static fields in classes... i.e. one can consider all static fields to be members of an implicit 'program' object.
The ability to implicitly pass parameters about is not bad so long as one can readily control the full set of hidden parameters. I would consider dynamically scoped variables a more promising feature for this purpose. For capability systems, one would need the ability to essentially capture all the dynamic variables and manipulate them as a set: it is important that 'main' or any other module can control, filter, etc. any objects referenced by these implicit parameters just as easily as they can explicit parameters - this is not something that could easily be performed with a 'program' object. For distribution and parallelization, it would be best if dynamic variables cannot be mutated (i.e. the set of variables and values is not mutable, even if the values may reference mutable things).
There are other ways to reduce syntactic burden, perhaps more effectively than the sort of implicit context described above.
In most OO languages, such as Java, object graphs are constructed procedurally. This is a bad thing, because it forces programmers to explicitly deal with order-of-construction and does not readily support composition or abstraction of object graphs without relying on a framework (i.e. for dependency injection).
I believe syntactic support for declaratively describing and parametrically abstracting large object graphs would greatly ease initialization burdens. Simultaneously, it could also simplify specification of special relationships such as automatic distribution (A nearby B), observer patterns (A observes B), survival dependency and redundancy (A depends on B), and allows for a wider variety of immutable objects (no need for mutation during initialization), which would in turn allow a variety of inlining and graph-reduction optimizations.
--[dmbarbour](http://lambda-the-ultimate.org/node/3544#comment-53288)

Mock objects and dependency injection are just for people who don't know math
-- [Erik Meijer](http://lambda-the-ultimate.org/node/3619)

The Mock Objects and Dependency Injection came from adapting the ideas of process calculi and formal architecture modelling (CSP, FSP and Darwin) to mainstream object-oriented programming and TDD.
-- [nat](http://lambda-the-ultimate.org/node/3619#comment-51225)

- [Wikipedia: Dependency injection](https://en.wikipedia.org/wiki/Dependency_injection)

- [Dependency injection via parameterized types (?!)](http://lambda-the-ultimate.org/node/4067)

- <https://en.wikipedia.org/wiki/Inversion_of_control>

- [Objects as Modules in Newspeak](http://lambda-the-ultimate.org/node/3544)

..."Dependency injection is a way to late-bind, so callers can pass in dependencies they prefer, instead of using those you force on them willy nilly."
-- [Rys McCusker](http://lambda-the-ultimate.org/node/4854#comment-77699)

[LTU: Dependency Injection](https://encrypted.google.com/search?domains=http://lambda-the-ultimate.org&q=dependency+injection+site:http://lambda-the-ultimate.org&cad=h)