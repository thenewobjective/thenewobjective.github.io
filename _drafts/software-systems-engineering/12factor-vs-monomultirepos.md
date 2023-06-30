https://news.ycombinator.com/item?id=18808909&p=2

========
Mono Repo vs Multi-Repo

Context

•	The back-end implementation utilizes a Micro-Services architecture.
•	The front-end implementation utilizes a Micro-Frontend architecture.
•	There is one system being developed.
•	This system has three or more front-end implementations (portals)
•	There is a significant amount of shared functionality and infrastructure supporting the portals
•	There is currently one development team
•	There are multiple product owners
•	In the future there will be multiple teams and product owners

Challenges

•	For the One Team in the short term and intermediate term
o	Where will shared dependencies be stored and managed?
o	Where will requirements and work be managed?
•	In the long term for multiple-teams
o	Where will shared dependencies be stored and managed?
o	Where will requirements and work be managed?

Multi-Repo

•	Clear ownership
•	Project per service / portal
•	At least 3 repos
o	Potentially many more for other services
•	1 repo for the data factory?
•	1 repo for managing finance or ncrx service? Etc
•	How is Program Level backlog managed?
•	Bugs/issues that impact multiple portals are difficult to debug
•	Knowledge of entire system is lost (blinders on)
•	Integration
Mono-Repo

•	Potentially heavier to clone for developers (workarounds possible)
•	Backlog management can be challenging (workarounds possible)
•

References

•	[Microservices](https://martinfowler.com/articles/microservices.html) – James Lewis, Martin Fowler
•	[Micro Frontends](https://martinfowler.com/articles/micro-frontends.html) – Cam Jackson
