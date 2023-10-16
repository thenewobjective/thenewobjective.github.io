---
layout: post
icon: file-text
title:  "A Layman's View of COVID-19"
date:   2020-10-13 12:00:00 -0600
category: Social Issues
permalink: /social-issues/a-laymans-view-of-covid-19
---

{% assign groups = site.data.covid | group_by: 'category' | sort: 'name' %}
{% for group in groups %}
  <details>
    <summary>{{group.name}}</summary>
      <ul class="timeline">
        {% for item in group.items %}
        <li class="entry">
          <time datetime="{{item.date}}">{{item.date}}</time>
          <span class="entry-title" markdown="1">[{{item.title}}]({{item.url}})</span>
        </li>
        {% endfor %}
      </ul>
  </details>
{% endfor %}

<!--
*With the deluge of information both fact and fiction as well as the active censorship of
people and ideas surrounding the pandemic I've decided to consolidate and distill what
seem consistent with the reality of the situation as I see it. Note that I am not an
expert in any field directly relevant to the topic. **This is a living document** I am
using as a personal reference. Perhaps you'll find it informative as well.
Comments and corrections welcome.*

<!--
#### Hygiene

Interestingly a [research paper](https://pubmed.ncbi.nlm.nih.gov/18710327/) that includes [Fauci](#can-fauci-be-trusted)
as a co-author concludes that: <em>"The majority of deaths in the 1918-1919 influenza pandemic
likely resulted directly from secondary bacterial pneumonia caused by common upper
respiratory-tract bacteria."</em>

See Dopesick series w/ Michael Keaton to see some background on the FDA

March 11, 2021

[7 European Nations Halt AstraZeneca Jabs On Reports Of "Serious" Blood Clots]()

<!--

#### Pfizer

The Pfizer vaccine is an mRNA vaccine.

<!--
## (TODO) Further Reading

See the OneDrive covid folder

Gain of Function Research

Hank Aaron vaccine death?

WHO Quotes:

"we in the World Health Organization do not
advocate lockdowns as the primary means of control
of this virus. The only time we believe a lockdown is
justified is to buy you time to reorganize, regroup,
rebalance you resources, protect your health
workers who are exhausted, but by and large, we'd
rather not do it."

"Locdowns just have one consequence that you
musr never every belittle, and that is making poor
people an awful lot poorer.
Look what's happened to smallholder farmers all
over the world. Look what's happening to poverty
levels, It seems that we may well have a doubling of
world poverty by next year.
We may well have at least a doubling of child
malnutrition."

Stockholm syndrome and vaccines

vaccine passports and penn's bullshit episode on recycling bins

The general willingness to "be a good person" and as a result falling into regulatory slavery

epitope
	where antibodies bind on proteins

johnson and johnson discontinued
	are they now considered unvaccinated?

Omicron variant being used as an excuse to remove monoclonal antibodies?

JRE #1701
	Rhonda Patrick
	Vaccines
	@130:00
	- myocarditis
		- more likely from COVID than mrna vaccine?
		- but wouldn't you get COVID anyway? See israeli breakout...
			- and if you already had COVID, the vaccine side-effects are stronger...
	- What is Long Haul COVID?
		- mostly impacts the younger?
	- VAERS reporting. healht care professionals supposed to report.
		- Do they?
		- What is the time frame?
	- POTS
		Post orthostatic tachiocarcial syndrome?
	- "For most people vaccines are safe"
	- Spike protein
		- prefussion/postfusion
			- pfizer/J&J lock the spike protein so it won't expand
		- from virus is different than from vaccine
		- "we don't now if it's harmful"
			- not enough evidence
		- What of the side-effects then?
			- they don't stay in the injection site
			- biodistribution studies (from pfizer?)
				- Is this consistent with the FOIA request of the Japanese data?
			- She doesn't talk about the aggregation in the ovaries and bones
			- SIMOA test: 25% false positives for spike protein?
			- mRNA vaccines
				- associated with myocarditis
			- J&J uses adenoviral
				- linked to blood clots?
		- ADE: Abtibody dependent enhancement
			- might make viruses able to infect better
			- or causes immune system to be more sensitive and self-damage
			- caused by postfusion antibodies?
				- What about Israel?
		- Testing positive means what in practice?
		- vaccines reduce overall transmission?
			- this is questionable
		- why is the comparison between vaccinated vs unvaccinated
			- why not covid recovered?
		- since subsequent vaccines cause harder side-effects, what would the "boosters" do?
		- claims natural vs vaccinated immunity are equivalent in effectiveness
			- doubtful
		- Ivermectin
			- anecdotal evidence is limited
			- many studies are flawed
				- some people are getting Ivermectin alone
				- some are getting it in combination with numerous things
				- placebo groups seem iffy
				- this data then gets aggregated
				- benefit might be exaggerated?
				- what is the effectiveness on variants?
				- Does seem to shorten the time of infection?
				- Animal grade could be harful due to dosage issues
				- but is generally a safe drug
		- regeneron does not work against variant?
	- vs pregnancy?
		- COVID vs vaccine...
			- claims data suggests it's ok
=========
https://twitter.com/Inversionism/status/1707103052526715216
https://www.zerohedge.com/political/covid-reinfections-clear-faster-including-unvaccinated-people-study
https://twitter.com/IamBrookJackson/status/1711612865294008551
https://twitter.com/IamBrookJackson/status/1710724896680976699
https://boriquagato.substack.com/p/did-the-pfizer-vaccine-even-really
https://dailysceptic.org/2023/09/23/german-whistleblower-finds-dna-contamination-up-to-354-times-recommended-limit-in-biontech-pfizer-vaccine/
https://twitter.com/Kevin_McKernan/status/1705198391393722814
https://www.theepochtimes.com/us/cdc-refuses-to-release-updated-information-on-post-vaccination-heart-inflammation-5496214
https://twitter.com/zerohedge/status/1706108167677940114
https://twitter.com/VigilantFox/status/1706696540956283365
https://twitter.com/stkirsch/status/1707929424379912673
https://twitter.com/JohnBeaudoinSr/status/1712426335690281050
https://twitter.com/boriquagato/status/1710291573445951632
https://www.zerohedge.com/political/will-make-your-blood-boil-biden-admin-goes-full-orwell-denying-vaxx-mandates-ever
https://twitter.com/Kevin_McKernan/status/1708468675081077200
https://www.quantamagazine.org/how-many-microbes-does-it-take-to-make-you-sick-20230927
https://www.zerohedge.com/covid-19/cdc-ends-covid-19-vaccination-cards
https://www.zerohedge.com/covid-19/cdc-journal-and-five-others-rejected-key-paper-covid-vaccines-heart-inflammation
https://twitter.com/RefugeOfSinner5/status/1709225153429737584
https://rwmalonemd.substack.com/p/nobel-prize-for-physiology-or-medicine
https://twitter.com/zerohedge/status/1706831391445623171
https://twitter.com/Kevin_McKernan/status/1708538027448885737
https://www.zerohedge.com/medical/excess-deaths-cardiovascular-diseases-44-last-year-among-uk-citizens-aged-15-44
https://twitter.com/zerohedge/status/1708559940644700314
https://web.archive.org/web/20231002171647/https://twitter.com/BretWeinstein/status/1708861716245934359
https://gab.com/EpochTV/posts/111156772614108438
https://twitter.com/zerohedge/status/1706828152436293975
-->
