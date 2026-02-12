---
title: The Roel of Programming
---

## Introduction

> "Computer Science is no more about computers than astronomy is about telescopes."

&mdash; [Edsger Dijkstra](https://en.wikipedia.org/wiki/Edsger_W._Dijkstra)

## The Invention of Formal Thought

## The Cognitive Role of Programming

## The Automation Paradox and the Regression to Myth

## LLMs and the Place of Automation

## Programming as the Material of Thought

## Conclusion

## References, Notes, and Further Information

- [Gerald Jay Sussman: The Role of Programming (Dan Friedman's 60th Birthday)](https://www.youtube.com/watch?v=arMH5GjBwUQ)
  - PLs as the representation of knowledge
  - How can I express my ideas in a way that not only the computer can understand, but also other people?
  - Mathematical knowlege is declarative "What is true": `sqrt(x) = y where y^2 = x and y >= 0`
  - Imperative knowledge is "How to": `Approximate sqrt(x) { guess g; improve g by avg(g, x/g); repeat until good enough }`
  - PLs enable a formal means of expressing declarative and imperative knowledge
    - Aside: Why do we need formal means of expressing knowledge?
      - Because natural language is ambiguous
      - Because natural language is imprecise
      - Because natural language is context dependent
      - Because natural language is not executable (until now with LLMs?)
  - Aside: Lincoln in his youth grappled with what it meant to "demonstrate" something. He then [studied Euclid's Elements](https://drloihjournal.blogspot.com/2020/11/lincolns-logic-how-abe-learned-to-tell-when-a-thing-is-proved.html) and learned the power of formal reasoning.
  - Mathematical notation sucks.
    - `cos^2 x  = (cos x)^2 = cos(x) * cos(x)`
      but `cos^-1(x) != 1/cos(x)` but `cos^-1(x) = arccos(x)`
      - This is an idiom
    - Why? To mathematicians it's a Natural language. Like English, when we communicate to one another we assume there
      is a shared context and shared understanding of the terms we use so impressionistic notation to express ideas.
      I think this impressionism is used due to the limitations of the notation/medium.
    - But this impressionism makes it hard for learners to understand the concepts as the shared context is missing and
      the notation may be unable to express the ideas precisely.
    - Calculus can lead to "symbol pushing" where one manipulates symbols without understanding the underlying concepts.
      - Aside: In LLM usage for programming this is akin to "vibe coding" where one prompts the LLM to generate code without
        understanding the underlying concepts.
    - By rewriting mathematical notation in a more precise way (such as a functional programming languages) we can
      better express our ideas and reason about them.
    - "Programming forces one to be precise and formal, without being excessively rigorous. The computer does not
      tolerate vague descriptions or incomplete constructions. Thus the act of programming makes one keenly aware of
      one's errors of reasoning or unsupported conclusions." - Gerald Jay Sussman
      - "Formal" means that the terms and operations are well defined.
      - "Rigorous" means you know it converges.
  - "A computer is like a violin. You can imagine a novice trying ﬁrst a phonograph and then a violin. The latter, he
    says, sounds terrible. That is the argument we have heard from our humanists and most of our computer scientists.
    Computer programs are good, they say, for particular purposes, but they aren’t ﬂexible. Neither is a violin, or a
    typewriter, until you learn how to use it." - Marvin Minsky
- [Gerald Jay Sussman - Programming for the Expression of Ideas](https://www.infoq.com/presentations/Expression-of-Ideas/)
  - Most of the time we think of computers as doing work for us, but what is overlooked is that computers changed
    the way we think. The computer revolution is a revolution in the way we think and the way we express what we think.
  - Mathematicians and Physicists have shared culture within their disciplines as well as significant shared culture
    with one another. This shared culture enables them to communicate complex ideas with one another impressionistically
    using mathematical notation. What's difficult for students is that they lack this shared culture and thus have to
    simultaneously learn the notation, the concepts, and the shared culture.
  - a well-crafted program is an expression of an idea, and it may be a work of art.
- [How Terence Tao uses AI with Lean programming language | Terence Tao and Lex Fridman](https://www.youtube.com/watch?v=hh4cjZOddQA)
- [Alan Kay - Doing with Images Makes Symbols: Communicating with Computers](https://www.youtube.com/watch?v=p2LZLYcu_JY)
  - Learning happens when attention is focused.
  - The parts of the body you want to have learn don't understand english.
  - The problem with being a beginner is that you get alot of practice staying a beginner.
- [AI Does Not Help Programmers - Bertrand Meyer (2023)](https://cacm.acm.org/blogs/blog-cacm/273577-ai-does-not-help-programmers/fulltext)
  - > As a programmer, I know where to go to solve a problem. But I am fallible;
    > I would love to have an assistant who keeps me in check, alerting me to
    > pitfalls and correcting me when I err. A effective pair-programmer. But
    > that is not what I get. Instead, I have the equivalent of a cocky graduate
    > student, smart and widely read, also polite and quick to apologize, but
    > thoroughly, invariably, sloppy and unreliable. I have little use for such
    > supposed help."
  - > [...] programming has a distinctive requirement: programs must be right.
    > We tolerate bugs, but the core functionality must be correct.
  - > AI in its modern form, however, does not generate correct programs: it
    > generates programs inferred from many earlier programs it has seen. These
    > programs look correct but have no guarantee of correctness. [...]
    > Today's AI works by statistical inference.
  - > Fascinating as they are, AI assistants are not works of logic; they are works of words.
  - > Help me produce a basic framework for a program that will “kind-of” do the job, including
    > in a programming language that I do not know well? By all means. There is a market for that.
    > But help produce a program that has to work correctly? In the current state of the
    > technology, there is no way it can do that.
- [Gulliver's Travels: The Engine](https://en.wikipedia.org/wiki/The_Engine)
  - A satire on the idea of a machine that could produce all knowledge by mechanical means.
  - The engine is a machine that can generate all possible combinations of letters and symbols, effectively producing
    all possible books and knowledge.
  - The satire highlights the absurdity of the idea that knowledge can be generated mechanically without understanding
    or context.
  - The story critiques the notion that simply having access to information is equivalent to knowledge or wisdom.
  - > "... Every one knew how laborious the usual method is of attaining to arts and sciences; whereas, by his
    > contrivance, the most ignorant person, at a reasonable charge, and with a little bodily labour, might write
    > books in philosophy, poetry, politics, laws, mathematics, and theology, without the least assistance from
    > genius or study."
- <https://x.com/bentossell/status/1751970362940608850>
  > Microsoft released their annual Future of Work report and this time around it’s not about remote work, it’s about AI. (slide numbers in brackets)
  > - Knowledge workers with ChatGPT are 37% faster, 40% higher quality but ~20% less accurate. Simple UX solutions to solve this are possible. (6)
  > - From a survey of enterprise users of Microsoft Copilot 365 (7):
  > - 73% agree that Copilot makes them faster.
  > - 85% said it would help them get to a good first draft faster.
  > - 72% agreed about spending less mental effort on mundane or repetitive tasks.
  > - Most early studies have found that new or low-skilled workers benefit the most from LLMs. Less skilled workers improved by 43% vs more skilled who improved by about 17%. (8)
  > - Assistant needs to be paired with provacators i.e. LLM-based tools that challenge assumptions, encourage evaluation, and offer counterarguments. (9)
  > - AI can help with breaking down simple commands into micro-moments and microtasks, improving overall quality and efficiency. (10)
  > - Analyzing and integrating AI-generated information may become more important than searching and creating information. Skills not directly related to content production (leading, social interactions, trust issues, or emotional awareness) may be more valuable. (11)
  > - Prompting is hard, but people are getting good at it. Fine-tuning/using LLMs to generate prompts is making it easier as well. Prompt templates are helpful for end users. (12-14)
  > - Highlighting errors/uncertainty percentages can help balance reliance on LLMs. Prompting can be complemented with co-audit tools to check LLM outputs. (17-18)
  > - Generative AI requires self-awareness and well-calibrated confidence. At the same time, it can help in getting there too. (19)
  > - Creative activities are a process and LLMs can help across different parts. (21) 69% of Bing Chat conversations are in domains oriented toward professional tasks. (22)
  > - A larger chunk of LLM-based searches is complex (36% of them) than traditional searches (13% are complex). (22)
  > - In a study of 69 students, the use of Codex improved their performance in learning Python, but it did not impact their manual code-modification abilities. (24)
  > - LLMs can rapidly analyze data from humans and generate synthetic data. That’ll change how social science research is done. (27)
  > - LLMs in meeting can solve different problems like equal participation (instant feedback) and better interactions (retrospective feedback) (28-29).
  > - AI can help in delegating management responsibilities, freeing execs to focus on team vision. (30)
  > - Modern office knowledge is in chats, not documents but applying AI over employee chats is tricky. (31-32)
  > - Approx. 80% of the US workforce could have at least 10% of their work tasks affected by GPTs. Around 19% of workers may have 50% of their tasks impacted. (38)
  > - “Innovation vs. automation” is often a better framework to use than “substitution vs. augmentation”. Augmentation can still mean job loss. It is important to try to track whether and where human labour is being used in innovative new ways. (39)
  > - Instead of “How will AI affect work?”, the question should be “How do we want AI to affect work?” (40)
- Reading books vs reading Cliff Notes or Spark Notes
- [Thamus and Theuth (Phaedrus 274b-278d)](https://web.archive.org/web/20141120225042/http://www.john-uebersax.com/plato/myths/phaedrus.htm)
  - Theuth presents his invention of writing to King Thamus, claiming it will improve both the wisdom and memory of the Egyptians. Thamus responds:
  - > father of letters, from a paternal love of your own children have been led to attribute to them a quality which they cannot have;
    > for this discovery of yours will create forgetfulness in the learners' souls, because they will not use their memories;
    > they will trust to the external written characters and not remember of themselves. The specific which you have discovered
    > is an aid not to memory, but to reminiscence, and you give your disciples not truth, but only the semblance of truth;
    > they will be hearers of many things and will have learned nothing; they will appear to be omniscient and will generally
    > know nothing; they will be tiresome company, having the show of wisdom without the reality.
- "Be wary of unearned wisdom" - Carl Jung
- "We have become the tool of our tools." - Henry David Thoreau
- "We become what we behold. We shape our tools and then our tools shape us." — Marshall McLuhan
- <https://en.m.wikipedia.org/wiki/Thinking,_Fast_and_Slow#Two_systems>
  - System 1: fast, automatic, frequent, emotional, stereotypic, subconscious
  - System 2: slow, effortful, infrequent, logical, calculating, conscious
  - "Most of the time, we operate using System 1, which requires little effort. System 2 is often in a comfortable low-effort mode,
    in which only a fraction of its capacity is engaged. System 2 is activated when an event is detected that violates the model of
    the world that System 1 maintains. System 2 is also required to overcome the impulses and habits generated by System 1,
    especially when they are inappropriate to the situation at hand."
- [Dijkstra On the foolishness of "natural language programming"](https://www.cs.utexas.edu/~EWD/transcriptions/EWD06xx/EWD667.html)
  - > In order to make machines significantly easier to use, it has been proposed (to try) to design
    > machines that we could instruct in our native tongues. this would, admittedly, make the machines
    > much more complicated, but, it was argued, by letting the machine carry a larger share of the burden,
    > life would become easier for us. It sounds sensible provided you blame the obligation to use a formal
    > symbolism as the source of your difficulties. But is the argument valid? I doubt.
  - > Instead of regarding the obligation to use formal symbols as a burden, we should regard the convenience
    > of using them as a privilege: thanks to them, school children can learn to do what in earlier days only
    > genius could achieve
    - Aside: This is another justification for the current article to compare word problems vs symbolic problems.
  - > When all is said and told, the "naturalness" with which we use our native tongues boils down to the ease
    > with which we can use them for making statements the nonsense of which is not obvious.
    - Aside: The "Simple" vs "Easy" distinction made by Rich Hickey in ["Simple Made Easy"](https://www.youtube.com/watch?v=SxdOUGdseq4).
  - > As a result of the educational trend away from intellectual discipline, the last decades have shown in
    > the Western world a sharp decline of people's mastery of their own language [...]
    > This phenomenon —known as "The New Illiteracy"— should discourage those believers in natural language
    > programming that lack the technical insight needed to predict its failure.
    - Aside from <https://news.ycombinator.com/item?id=43564386>
      - "I think there is a reason why legalese is not plain English, and it goes beyond mere gatekeeping."
- [No Silver Bullet—Essence and Accident in Software Engineering](https://worrydream.com/refs/Brooks_1986_-_No_Silver_Bullet.pdf), Frederick P. Brooks, Jr. 1986
  - > The hard thing about building software is deciding what to say, not saying it. No facilitation of expression can give more than marginal gains.
  - > The hardest single part of building a software system is deciding precisely what to build. No other part of the conceptual work
    > is to difficult as establishing the detailed technical requirements, including all the
    > interfaces to people, to machines, and to other software systems. No other part of the
    > work so cripples the resulting system if done wrong. No other part is more difficult go
    > rectify later.
- I am reminded of the Proof of the Four-Color theorem which was controversial because it relied on computer verification rather than a human-verifiable proof.
  - What good is a proof that no human can verify or understand?
  - Especially if it is a proof by case-exhaustion that provides no insight into why the theorem is true.
- "Programs must be written for people to read, and only incidentally for machines to execute." — Harold Abelson
- [The Impact of Generative AI on Critical Thinking: Self-Reported Reductions in Cognitive Effort and Confidence Effects From a Survey of Knowledge Workers](https://www.microsoft.com/en-us/research/wp-content/uploads/2025/01/lee_2025_ai_critical_thinking_survey.pdf)
  - > ... higher confidence in GenAI is associated with less critical thinking, while higher self-confidence is associated with more critical thinking.
  - > Qualitatively, GenAI shifts the nature of critical thinking toward information verification, response integration, and task stewardship
    > by mechanising routine tasks and leaving exception-handling to the human user, you deprive the user of the routine opportunities to practice
    > their judgement and strengthen their cognitive musculature, leaving them atrophied and unprepared when the exceptions do arise.
  - > users with access to GenAI tools produce a less diverse set of outcomes for the same task, compared to those without.
  - > Surprisingly, while AI can improve efficiency, it may also reduce critical engagement, particularly in routine or lower-stakes
    > tasks in which users simply rely on AI, raising concerns about long-term reliance and diminished independent problem-solving.
  - > For tasks like knowledge retrieval, AI reduces effort by automating information gathering, but workers must now invest more in verifying the accuracy of AI outputs.
    > Analysing 936 real-world GenAI tool use examples our participants shared, we
    > find that knowledge workers engage in critical thinking primarily to ensure the quality of their work, e.g. by verifying outputs against
    > external sources. Moreover, while GenAI can improve worker efficiency, it can inhibit critical engagement with work and can potentially lead to long-term overreliance
    > on the tool and diminished skill for independent problem-solving
- [The Automation Paradox: How More Tech Can Mean More Human Challenges](https://uxpsychology.substack.com/p/the-automation-paradox-how-more-tech)
  - The automation paradox is the idea that as we automate more tasks, we create new challenges that require human intervention.
    This can lead to a situation where humans are less prepared to handle unexpected situations because they have become reliant on automation.
  - Automation complicating the operator's task instead of simplifying it
  - Automation obscuring system failures instead of making them obvious
  - Automation deskilling operators and undermining their sense of achievement
  - Without regular hands-on practice, operators lose manual and cognitive skills needed
    to control processes and diagnose issues. They lack understanding of the current system state when asked to rapidly take over from automated systems. Tasks like monitoring for unlikely failures exceed human vigilance capabilities. In addition to this, operators lose their skills as their roles erode, causing stress and decreased motivation.
  - Aside: I am reminded of Plane crashes and car crashes where the human operator is expected to take over in an emergency but is unable to do so:
    - [Air France Flight 447](https://en.wikipedia.org/wiki/Air_France_Flight_447)
      - A failure of automation put the pilots into a manual situation they were not prepared for
    - Numerous reports of self-driving car crashes due to complacency:
      - <https://knowledge.wharton.upenn.edu/podcast/knowledge-at-wharton-podcast/automated-car-accidents/>
      - [Vehicle-human handover at Level 3 still an unsolved challenge on path to autonomous vehicles](https://urgentcomm.com/drones-robots/vehicle-human-handover-at-level-3-still-an-unsolved-challenge-on-path-to-autonomous-vehicles)
    - Note how the prevalence of keyboards has led to a decline in handwriting skills: Penmanship, Cursive Writing>
- [Trithemius on printing, scribes, and reason](https://www.purplemotes.net/2012/12/23/trithemius-printing-scribes-reason/)
  - > Brothers, no one should think or say “Why do I have to wear myself out writing by hand, when the art of printing has
    > brought so many books to light, so that we can cheaply put together a great library?”  Truly, whoever says this is trying
    > to conceal his own sloth. …  He who ceases the work of a scribe because of printing is not a true friend of Scripture,
    > because heeding no more than the present he takes no care to educate posterity.  But we, dearest brothers, heeding the
    > reward of this sacred labor we will not cease our work, even if we have many thousands of printed volumes.  Printed books
    > will never equal scribed books, especially because the spelling and ornamentation of some printed books is often neglected.
    > Copying requires greater diligence.
- [The virtue of learning how to compute by hand](https://matheducators.stackexchange.com/a/19550)
  - Numerical Fluency and Intuition: Performing calculations manually enhances a student's number sense and mental dexterity, which are crucial for understanding and solving more complex problems.
  - Conceptual Understanding: By-hand computations help students grasp the underlying principles of arithmetic, which supports their ability to reason and solve problems creatively.
  - Error Checking and Estimation: Manual computation allows for better estimation and error-checking, both of which are essential in real-world scenarios and academic settings.
  - Independence and Self-Reliance: Learning to compute by hand builds confidence and independence, enabling students to solve problems without relying solely on technology.
  - Foundation for Advanced Mathematics: Manual arithmetic is a foundation for more advanced topics, such as algebra, calculus, and algorithmic thinking.
  - Everyday Life Skills: Being able to perform basic arithmetic mentally or on paper is valuable in daily life, from budgeting to understanding news and making informed decisions.
  - Critical Thinking and Problem Solving: Learning to show work and think through problems step-by-step fosters critical thinking and problem-solving skills that are essential in both academic and professional contexts.
  - In summary, learning to compute by hand is not just about arithmetic—it's about building a strong foundation for mathematical thinking, independence, and real-world problem-solving.
- ["We Really Don't Know How to Compute!" - Gerald Sussman (2011)](https://www.youtube.com/watch?v=HB5TrK7A4pI)
  - Perhaps we don't know how to compute becuase we don't know how to think/program?
    - the rise of LLMs and vibe coding implies what?
- <https://x.com/ID_AA_Carmack/status/1762110222321975442>
  - > “Coding” was never the source of value, and people shouldn’t get overly
    > attached to it. Problem solving is the core skill. The discipline and
    > precision demanded by traditional programming will remain valuable
    > transferable attributes, but they won’t be a barrier to entry.
  - <https://x.com/WinDig21/status/1762127357714845842>
    - > I literally do this, in a form. I manage a bunch of CNC machines am
      > robots now. We use software like SolidWorks or MasterCam to write
      > our code now and it’s all conversational between the robots and machines.
      > 10 years or so ago, being a CNC programmer was high level but then the
      > software came and we just scan the blueprint in, it pops out a rough
      > program, and I edit them. DLC it into a lathe or mill, same for the
      > robot program and take it to the manufacturing floor and prove it out.
      > It takes some editing there too, some massaging. Once proven out on the
      > floor, I have a fully automated work cell a few hours to couple days
      > later. Then, we pop a guy over to that cell to monitor and run it.
- <https://x.com/thefrankbraun/status/1595576993583702016>
  - > How could AI help reduce essential complexity (vs. accidental complexity),
    > as so aptly argued by Fred Brooks in "No Silver Bullet—Essence and
    > Accident in Software Engineering"? Isn't AI just a way to write more
    > shitty code faster, but no help in dealing with the problem domain?
- [Do Users Write More Insecure Code with AI Assistants?](https://arxiv.org/pdf/2211.03622)
  - > AI code assistants have emerged as powerful tools that can aid in
    > the software development life-cycle and can improve developer
    > productivity. Unfortunately, such assistants have also been found
    > to produce insecure code in lab environments, raising significant
    > concerns about their usage in practice.
  - > Overall, we find that participants who had access to an AI assistant
    > wrote significantly less secure code than those without access to an
    > assistant. Participants with access to an AI assistant were also more
    > likely to believe they wrote secure code, suggesting that such tools
    > may lead users to be overconfident about security flaws in their code.
  - > We observed that participants who had access to the AI
    > assistant were more likely to introduce security vulnerabilities for
    > the majority of programming tasks, yet were also more likely to rate
    > their insecure answers as secure compared to those in our control
    > group. Additionally, we found that participants who invested more
    > in the creation of their queries to the AI assistant, such as providing
    > helper functions or adjusting the parameters, were more likely to
    > eventually provide secure solutions.
- @mlhaufe, @gilad, @headinthebox conversation on X
  > @headinthebox
  > I have said it many times before, and you all told me that I was crazy, but I'll say it again: ***The golden age of SWE is over***.
  >
  > @headinthebox
  > Here is a more down-to-earth way to think about the effect of AI on coding. I'm sure all the farmhands in the early 1900s argued that a combine harvester couldn't possibly do the job as well as they could by hand. And yet, here we are.
  >
  > @Gilad_Bracha
  > I tend to agree. We might ask if Jevon's paradox will create so much software that requires humans to oversee/verify that SE employment remains intact. I doubt it, but it is possible.
  >
  > @mlhaufe
  > GUIs didn't replace the CLI, and WYSIWYGs haven't replaced the implementation of UIs despite decades of existence. Even with commodity software we suffer under it. So I'm suspicious of LLMs successfully eating commodity software as well.
  >
  > @mlhaufe
  > Lowering the barrier to entry for new software and being a low-pass filter for brainstorming is no small feat of course. As you said: a dialogue of development. The caveat I see is that you would not be programming against your domain, but programming against an implied one
  >
  > @mlhaufe
  > I recall the story of Norvig vs Ron Jeffries implementing Sudoku:
  >
  > <https://web.archive.org/web/20220209031932/https://news.ycombinator.com/item?id=3033446>
  >
  > I can't help but think we'll see analogous problems with "vibe coded" solutions
  >
  > @Gilad_Bracha
  > Again, I want to distinguish between current situation and where it's moving to. Vibe-coding is problematic: The AI isn't up to it,  the people who use it naively trust it etc.  It's like writing software w/o testing. Socratic dialog with a card shark.
  >
  > @mlhaufe
  > The sense that I'm getting is that we're asymptoting in LLM competence (A stream can't rise above its source).
  > As a result, LLM oriented programming rhymes with "scripting" that is glue for 3rd party tools written in traditional deterministic languages.
  >
  > @mlhaufe
  > I'm interested in knowing what that balance will be.
  >
  > Semi-rhetorical question: Will  the LLM just perform NLP + tool search for application?
  >
  > How does the Smalltalk tradition think about this?
  >
  > (This is an idle thought; I'm not expecting a reply, especially in a tweet...)
- [The rise and fall of rationality in language](https://www.pnas.org/doi/10.1073/pnas.2107848118)
  - Language Evolution exists. Human languages change over time.
  - This has very significant implications for LLMs as they are trained on historical data.
  - The impact this would have on Vive Coding is what? Does your Vibed prompt no longer work
     because the semantics of the words have changed? Same prompt, different model, different output
     in addition to the natural probabilistic variation of LLM outputs.
- "Debugging is twice as hard as writing the code in the first place.
  Therefore, if you write the code as cleverly as possible, you are,
  by definition, not smart enough to debug it." - Kernighan
  - For non-commodity software the LLMs aren't good enough to even write it.
  - With Vibe-Coding, who is responsible for debugging the code?
  - When the LLM fails, then what?
- "The Natural Language interface has lowered the bar so much that we've effectively automated
  Type-1 thinking, so much so that we've effectively democratized "programming", and hopefully
  made commodity code and such effectively zero cost for users. But I think we're going to pay
  a heavy penalty as well. To quote Djikstra:"It is practically impossible to teach good
  programming to students that have had a prior exposure to BASIC: as potential programmers
  they are mentally mutilated beyond hope of regeneration".Dijkstra's point is not just that
  BASIC was a "bad" language, but that languages shape mental habits, and bad ones entrench
  poor habits. In this sense, programming languages are like cognitive prosthetics:
  A good prosthetic extends your reach and strengthens your agency, A bad one deforms your
  movement and locks you into maladaptive patterns .So with Vibe Coding: what is it's proper
  place? I'd say for prototyping, for domain experts, or for exploration. But if we treat it
  as a dominant mode of programming, it leads to: fragile, poorly understood black boxes with
  no formal model of understanding.I want programming to be treated as an
  [Extended Mind](https://en.wikipedia.org/wiki/Extended_mind_thesis),  where we become more
  than we are. I don't want it to become a [Contracted Intellect](https://www.youtube.com/watch?v=LCPhbN1l024)
  where dependency replaces mastery."
- I was reviewing The Automation Paradox (ref: <https://uxpsychology.substack.com/p/the-automation-paradox-how-more-tech>),
  and am wondering about the following: In Software Engineering, Abstraction can be seen as information hiding. Software Architecture
  can be seen as a form of indirection accomplished via the application of Abstractions.
  How does Abstraction differ from Obfuscation / Obscuration and can automation (such as vibe coding)
  be seen of as more of the latter than the former?
  - Abstraction is a semantic compression: it hides irrelevant details but preserves structure.
  - Obfuscation is a syntactic occlusion: it hides structure itself, preventing reconstruction of meaning.
- [Comprehension of computer code relies primarily on domain-general executive brain regions](https://elifesciences.org/articles/58906)
- <https://jso.eecs.yorku.ca/2025/09/07/llms-the-illusion-of-thinking/>
- Edsger W. Dijkstra famously argued that the question of whether machines can think is not a meaningful inquiry, comparing it to asking whether a submarine can swim.
  He contended that such questions are irrelevant because they stem from an anthropomorphic misunderstanding of technology; just as a submarine is designed for underwater travel rather than swimming, a computer is built for specific computational tasks, not for human-like cognition.
  Dijkstra's point was that evaluating machines based on human characteristics like "thinking" adds no practical value and distracts from understanding their actual functions.
  He emphasized that the focus should be on problem-solving and functionality rather than philosophical debates about machine consciousness.
- <https://search.brave.com/search?q=doug+englebart+the+augmentation+of+human+intellect&summary=1&conversation=08b5e7aec2e4ac748c28c3972e74b4ebb116>
- <https://en.wikipedia.org/wiki/Bloom's_taxonomy>
- <https://x.com/jamesacowling/status/2011924122922852599>
- <https://x.com/mlhaufe/status/1889366152733700466>
- <https://search.brave.com/search?q=gerald+sussman%3A+programming+as+epistemology&summary=1&conversation=22d25f559815b1a278bb86>
- <https://news.ycombinator.com/item?id=42158711>
- <https://x.com/mlhaufe/status/1928494327501590954>
- <https://x.com/TimSweeneyEpic/status/1984737735945404845>
- <https://x.com/debasishg/status/2015434786547142936>
--------------------------------------------
--------------------------------------------
--------------------------------------------

## Notes

<https://x.com/c_valenzuelab/status/1856809765055467583>

- <https://rosettacode.org/wiki/Conway%27s_Game_of_Life#JAMES_II/Rule-based_Cellular_Automata>
  - Compare the English description of the Game of Life rules to the one-line code of APL.
  - Reference the fitness landscape of complexity trade-offs described in <https://thenewobjective.com/software-systems-engineering/managing-complexity/>

### Guitar vs Guitar Hero

Vibe coding analogy

Guitar vs guitar hero

Southpark visualization

### A head in the clouds

Having your head in the clouds is easier than trying to fit the heavens in your head.

Hence the utility of the extended mind hypothesis.

### LLMs and the illusion of thinking

On LLMs generating code:

“Debugging is harder than programming, so don’t use up all your cleverness in writing the program!” Tony Hoare

### The outsourcing of labor

With the mechanical revolution we've outsourced our physical labor

With the AI revolution we're outsourcing our mental labor.

What remains?

### Spell Checkers

    The influence of spell checkers on student's ability to generate repairs of spelling errors

    A study conducted by Hazelynn Rimbar investigated the influence of spell-checkers on students' ability to generate repairs of spelling errors. The research involved 30 Form 1 students in Kuching, Sarawak, who were given dictations containing commonly misspelled words according to Oxford University Press (2012).
    The experimental group was given three dictations, one of which allowed the use of word processors with spell-checker tools, while the control group was given two handwritten dictations. The data were analyzed using statistical software, and the findings indicated that while spell-checkers helped learners revise their spelling on one dictation exercise, learners still made the same errors in their spelling after using spell-checkers.
    This suggests that spell-checkers help eliminate surface errors but have very little influence on correcting errors on the cognitive level.

    https://www.researchgate.net/publication/326014514_THE_INFLUENCE_OF_SPELL-CHECKERS_ON_STUDENTS'_ABILITY_TO_GENERATE_REPAIRS_OF_SPELLING_ERRORS

### GPS

Habitual use of GPS negatively impacts spatial memory during self-guided navigation
<https://www.nature.com/articles/s41598-020-62877-0>

### Static vs Dynamic Typing

### The Illusion of exponential growth

<https://x.com/DataSciFact/status/1923901398153842739>

<https://x.com/mlhaufe/status/1923412516379513225>

### Knowledge is too vast for a single person to know

{Will Durant Quote}

Additional Book reference: Science since Babylon

---

@DataSciFact
Depending on which part of the logistic curve you look at, it can be growing exponentially, growing linearly, or exponentially approaching an plateau.

"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it." - Kernighan

For non-commodity software the LLMs aren't good enough to even write it

<https://x.com/mlhaufe/status/1928494327501590954>

## Word Problems vs Symbolic Problems

{ Compare word problems vs symbolic problems. Compare how verbose the problem is stated to how concise the symbolic representation is. }

{ Also note that good symbolic representation are suggestive of additional properties that can be exploited for reasoning.
for example the the suggested use of a triangle and an upside down triangle to represent logarithms and their inverse exponentiation. }

Notation as a tool/material for thought and how Vibe Coding lacks this.

## Natural Language Programming and Vibe Coding

- [SudoLang: A Powerful Pseudocode Programming Language for LLMs](https://medium.com/javascript-scene/sudolang-a-powerful-pseudocode-programming-language-for-llms-d64d42aa719b)
- [Erik Meijer: Universalis](https://x.com/headinthebox/status/1952175559989170453)
  - "That is what I am currently working on, it is called Universalis, and basically a Prolog/Datalog/SQL variant."
- [Unleashing the Power of End-User Programmable AI: Creating an AI-first program Synthesis framework](https://queue.acm.org/detail.cfm?id=3746223)
- [Universalis](https://www.youtube.com/watch?v=0A10LcXs570)

Vibing is not abstraction, it is indirection. Indirection in itself is not architecture.
A paragraph of Natural Language is no substitute for a well understood set of symbols.
  - Signs vs Symbols
  - Doing with Images Makes Symbols: Communicating with Computers - Alan Kay

- Ralph the Vibe Coder on one-hand and [Temple Grandin](https://www.youtube.com/watch?v=4Wt19VZpYkM) on the other who says "Computers weren't made for people like me"

This is probably better as a separate post: Automation and Responsibility

- <https://x.com/mlhaufe/status/1604907759509667848>
  "A computer can never be held accountable therefore a computer must never make a management decision."

“We’re smart enough to invent AI, dumb enough to need it, and still so stupid we can’t figure out if we did the right thing.” - Jerry Seinfeld

A big difference though is that through different language generations (1GL -> 4GL+) we added abstractions and architecture. With LLMs (Vibe Coding specifically) we are adding obfuscation and indirection.

We want the [Extended Mind](https://en.wikipedia.org/wiki/Extended_mind_thesis), not the [Contracted Intellect](https://www.youtube.com/watch?v=LCPhbN1l024).
