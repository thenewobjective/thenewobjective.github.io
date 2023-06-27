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

If the masks are not disposed after use or effectively washed they can increase
the odds of infection by many pathogens beyond COVID-19. Some examples:

<article class="gallery">
    <figure class='gallery-item'>
        <img src="/media-library/social-issues/covid/mask-fuzzies-2.png" alt="Mask Fuzzies">
        <figcaption>
            Credit: <a href="https://twitter.com/s_kirton/status/1327559617988218880" target="_blank">@s_kirton</a>
        </figcaption>
    </figure>

    <figure class='gallery-item'>
        <img src="/media-library/social-issues/covid/mask-staph.png" alt="Mask Staph Infection">
        <figcaption>
            Credit: <a href="https://twitter.com/brianhopkinsmd/status/1327726053335257089" target="_blank">@brianhopkinsmd</a>
        </figcaption>
    </figure>
</article>

Interestingly a [research paper](https://pubmed.ncbi.nlm.nih.gov/18710327/) that includes [Fauci](#can-fauci-be-trusted)
as a co-author concludes that: <em>"The majority of deaths in the 1918-1919 influenza pandemic
likely resulted directly from secondary bacterial pneumonia caused by common upper
respiratory-tract bacteria."</em>

While masks are not mentioned in the study, I can't help but wonder if this is a risk that
should be considered in our current pandemic. Has any study evaluated this for COVID-19?

<!--
#### TODO: Notes

* <https://www.livescience.com/face-masks-eye-protection-covid-19-prevention.html>
* <https://pubmed.ncbi.nlm.nih.gov/32512240/>
* <https://dailycaller.com/2021/02/05/cdc-director-too-early-tell-bidens-mask-mandates-delivering-results/>
* <https://twitter.com/gummibear737/status/1317950332870266882>
* <https://web.archive.org/web/20201024175748/https://twitter.com/boriquagato/status/1320060492321296384>
* <https://www.acpjournals.org/doi/10.7326/M20-6817>
* <https://twitter.com/boriquagato/status/1316011001066778624>
* <https://twitter.com/boriquagato/status/1317203873954779137>
* <https://twitter.com/boriquagato/status/1317188082358169600>
* <https://twitter.com/Dierenbach/status/1317849186121977858>
* <https://twitter.com/boriquagato/status/1317915599310376961>
* <https://twitter.com/gummibear737/status/1339679017897746433>
* <https://twitter.com/boriquagato/status/1273737005361315840>
* <https://twitter.com/Kevin_McKernan/status/1320033814131986433>
* <https://twitter.com/boriquagato/status/1338838390058479617>
* <https://twitter.com/BrendanEich/status/1339367981084672000>
* <https://web.archive.org/web/20210104231143/https://twitter.com/boriquagato/status/1346232824542580736>
* <https://twitter.com/EricRWeinstein/status/1339996694084087808>
* <https://www.medrxiv.org/content/10.1101/2020.10.21.20208728v2.full.pdf>

#### Notes

* <https://twitter.com/gummibear737/status/1316427529792696320>

</section>
</details>

<details>
<summary markdown="1">
### Can you be reinfected
</summary>
<section markdown="1">
<!--
* <https://twitter.com/gummibear737/status/1313137235546566656>
* <https://twitter.com/boriquagato/status/1316031729035964417>
* <https://twitter.com/Daniilgor/status/1316501414793838592>
* <https://dailycaller.com/2021/01/14/public-health-england-study-covid-19-infection-protects-vaccine/>
* <https://twitter.com/gummibear737/status/1356381000587206657>
* <https://dailycaller.com/2021/02/26/one-dose-pfizer-vaccine-may-be-enough-studies/>
</section>
</details>
<!--
TODO:

* <https://twitter.com/boriquagato/status/1314635924635111424>
* <https://twitter.com/boriquagato/status/1315669937269202944>
* <https://twitter.com/zerohedge/status/1315652194281152512>
* <https://twitter.com/zerohedge/status/1315633168247132164>
* <https://twitter.com/boriquagato/status/1316057586819620864>
* <https://twitter.com/boriquagato/status/1316369696724316160>
* <https://twitter.com/gummibear737/status/1316423780495917059>
* <https://twitter.com/rubiconcapital_/status/1330597052234002434>
* <https://twitter.com/MarkChangizi/status/1294285483426697218>
* <https://twitter.com/boriquagato/status/1339233953325178884>
* <https://twitter.com/boriquagato/status/1342171437990256641>
* <https://twitter.com/zerohedge/status/1349052724915171328>
* <https://twitter.com/zerohedge/status/1350201249245917190>
* <https://web.archive.org/web/20201015153244/https://twitter.com/boriquagato/status/1316762826636234754>
* <https://twitter.com/FatEmperor/status/1364547567619608580>

* <https://twitter.com/boriquagato/status/1315659683915595781>
* <https://gab.com/boriquagato/posts/105640978647511894>
* <https://web.archive.org/web/20201113131145/https://twitter.com/boriquagato/status/1327237316923035659>
* <https://web.archive.org/web/20201201123740/https://threadreaderapp.com/thread/1332858118682849282.html>
* <https://twitter.com/Kevin_McKernan/status/1348730638040518656>
* <https://www.breitbart.com/science/2021/01/22/w-h-o-modifies-virus-testing-criteria-on-biden-inauguration-day-may-result-in-fewer-positives/>
* <https://twitter.com/AdamRutherford/status/1327901972419276800>
* <https://web.archive.org/web/20201117130817/https://twitter.com/boriquagato/status/1328686067168505857>
* <https://twitter.com/zerohedge/status/1350144620706082818>
* <https://www.zerohedge.com/covid-19/fda-admits-pcr-tests-give-false-results-prepares-ground-biden-virus-rescue-miracle>
* <https://twitter.com/NickHudsonCT/status/1351765358949109760>
* <https://twitter.com/boriquagato/status/1315366367902695424>
* <https://twitter.com/KSTaxEconomist/status/1316394273315729411>
* <https://twitter.com/ClareCraigPath/status/1317009458325786624>
* <https://twitter.com/boriquagato/status/1340300019094724608>
* <https://twitter.com/rubiconcapital_/status/1340722772281077761>
* <https://twitter.com/boriquagato/status/1335580172758683650>
* <https://twitter.com/jengleruk/status/1349779896705445889>
* <https://twitter.com/zerohedge/status/1335611210415415298>
* <https://twitter.com/boriquagato/status/1339552065656381443>
* <https://web.archive.org/web/20201227210257/https://twitter.com/boriquagato/status/1343301300306362368>
* <https://twitter.com/Kevin_McKernan/status/1348742268245712898>
* <https://www.zerohedge.com/covid-19/its-long-past-time-cdc-clean-covid-19-death-counts>
</section>
</details>

<details>
<summary markdown="1">
### Propaganda
</summary>
<section markdown="1">
<!--
* [Asymptomatic to Presymptomatic](https://twitter.com/BrendanEich/status/1340722551459172353)
* <https://www.zerohedge.com/political/who-deletes-naturally-acquired-immunity-its-website>
* <https://dailycaller.com/2021/01/24/california-hiding-key-coronavirus-data-gavin-newsom-mislead-public/>
</section>
</details>

<!--
* <https://twitter.com/boriquagato/status/1316135154352562177>
* <https://web.archive.org/web/20201228152416/https://twitter.com/boriquagato/status/1343577116730740736>

In regards to effectiveness for the multi-dose varieties it should not be surprising to hear
[reports](https://www.zerohedge.com/covid-19/er-nurse-tests-positive-covid-8-days-after-being-vaccinated)
of COVID infection after receiving only a single dose or [reports](https://www.msn.com/en-us/news/us/new-york-congressman-who-got-vaccine-diagnosed-with-covid/ar-BB1cKMAV)
of infection immediately after the second dose.

Assuming you [trust the CDC](#can-the-cdc-be-trusted), note that they have a system of [reporting adverse reactions](https://www.cdc.gov/coronavirus/2019-ncov/vaccines/safety/adverse-events.html) referred to as [VAERS](https://vaers.hhs.gov/).

Note that these vaccines have been authorized for emergency use. Also note that they have been granted legal immunity for any side-effects they may cause.

March 8, 2021:

There was a [outbreak](https://www.cbc.ca/news/canada/british-columbia/with-vaccinations-about-to-roll-out-b-c-health-officials-provide-update-on-covid-19-1.5941508)
reported in a British Columbia care home where 82% of residents were already vaccinated.

According to [Paul Stoffels](https://en.wikipedia.org/wiki/Paul_Stoffels):

> "a one-shot vaccine is considered by the World Health Organization to be the best option in pandemic settings, enhancing access, distribution and compliance."

Sounds reasonable but WHO comments have to be heavily [scrutinized](#can-the-who-be-trusted).

#### AstraZeneca

This is an [adenovirus-based vaccine](https://www.news-medical.net/health/What-are-Adenovirus-Based-Vaccines.aspx).

According to their [Preprint](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3777268),
it is 100% effective in reducing symptoms of COVID-19 enough that hospitalization can be avoided.
They also claim 76% protection after the first dose. Two doses are required and they can not be
given close together or it would be less effective.

December 8, 2020

There are [multiple](https://web.archive.org/web/20201216135047if_/https://www.zerohedge.com/geopolitical/astrazeneca-vaccine-only-62-effective-impact-elderly-unclear-more-data-needed)
[claims](https://www.zerohedge.com/covid-19/it-just-doesnt-work-expected-macron-questions-covid-vaccine-credibility-eu-approves)
that this effectiveness is exaggerated and possibly ineffective for those over
the age of 65.

February 7, 2011

It has been [reported](https://web.archive.org/web/20210207134547if_/https://www.zerohedge.com/covid-19/wake-call-astrazeneca-jab-fails-prevent-south-africa-strain) that this vaccine is less effective against the
South African strain.

See Dopesick series w/ Michael Keaton to see some background on the FDA

March 11, 2021

[7 European Nations Halt AstraZeneca Jabs On Reports Of "Serious" Blood Clots](https://www.zerohedge.com/markets/astrazeneca-slides-denmark-suspends-vaccinations-blood-clot-fears)

<!-- 
https://www.zerohedge.com/covid-19/german-researchers-link-astrazeneca-jab-rare-blood-clots

https://www.zerohedge.com/covid-19/top-eu-regulator-shares-results-astrazeneca-jab-safety-review-after-blood-clot-claims

https://www.zerohedge.com/geopolitical/uk-reports-25-new-cases-rare-blood-clots-linked-astrazeneca-jab

https://www.zerohedge.com/covid-19/berlin-halts-astrazeneca-jab-germany-investigates-study-shows-link-deadly-blood-clots

https://www.zerohedge.com/markets/american-health-regulators-slam-astrazeneca-releasing-incomplete-trial-data

https://dailycaller.com/2021/03/23/astrazeneca-vaccine-data-outdated-incomplete/

https://dailycaller.com/2021/03/23/astrazeneca-coronavirus-vaccine-national-institutes-of-health/

April 03, 2021

[Netherlands temporarily halts AstraZeneca COVID vaccinations](https://www.msn.com/en-us/news/world/netherlands-temporarily-halts-astrazeneca-covid-vaccinations/ar-BB1fgn1E) due to blood clot fears.

#### Johnson & Johnson - Janssen

February 27, 2021

The efficacy is [reportedly](https://www.zerohedge.com/markets/fda-clears-jnj-covid-19-shot-use-us-giving-americans-3rd-vaccine-choicee) 72% in the USA.
68% in Brazil, and 64% against the South African mutation.

March 4, 2021

According to the [CDC](https://www.cdc.gov/coronavirus/2019-ncov/vaccines/different-vaccines/janssen.html) this vaccine has 66.3% efficacy at preventing moderate to severe symptoms with a single dose.

This is NOT an mRNA vaccine.

April 8, 2021

[Second vaccine site paused after adverse reactions to Johnson & Johnson shots](https://nypost.com/2021/04/08/second-vaccine-site-paused-after-adverse-reactions-to-johnson-johnson-shots/)

April 13, 2021

[FDA recommends pausing use of J&J vaccine due to rare side effect](https://www.youtube.com/watch?v=j_cmQeEyTMQ)

#### Pfizer

The Pfizer vaccine is an mRNA vaccine.

Dec. 31, 2020

According to [this publication](https://www.nejm.org/doi/full/10.1056/NEJMoa2034577?query=RP) the efficacy
of the vaccine is 52% with one dose and 95% with two doses.

January 14, 2021

Congressman Espaillat [tested positive](https://www.msn.com/en-us/news/us/new-york-congressman-who-got-vaccine-diagnosed-with-covid/ar-BB1cKMAV) after receiving
both doses of this vaccine. Depending on [how that test was performed](#casedemic) this may
just be a false positive as he claims to have experienced no symptoms.

January 20, 2021

The Israeli's [claim](https://news.yahoo.com/israel-warning-single-dose-pfizer-124313138.html) that this is
exaggerated and that the first dose is only 33% effective.

February 3, 2021

India has [banned](https://geopolitic.org/2021/02/20/newsweek-fact-check-claims-india-vaccine-ban-mostly-false-while-admitting-de-facto-ban/) (at least temporarily) the use of this vaccine due to concerns over the side-effects.

February 18, 2021

It is [reported](https://dailycaller.com/2021/02/18/pfizer-moderna-vaccines-less-protection-south-african-coronavirus-variant/) that this vaccine is significantly less effective against the South African variant of COVID

March 9, 2021

The vaccine [appears](https://dailycaller.com/2021/03/09/pfizer-vaccine-effective-brazilian-coronavirus-variant/) to have similar efficacy against the Brazilian variant.

#### Moderna

This is an mRNA vaccine that requires two doses.

The company [claims](https://investors.modernatx.com/news-releases/news-release-details/moderna-covid-19-vaccine-retains-neutralizing-activity-against) effectiveness against the
UK variant but is six-times less effective against the South African variant.

The vaccine is approved for those age 18 and older.

[Side effects have been reported for those with cosmetic facial fillers](https://nypost.com/2020/12/25/moderna-covid-vaccine-has-caused-side-effects-for-those-with-cosmetic-facial-fillers)

> “Your immune system which causes inflammation is revved up when you get a vaccine, that’s how it’s supposed to work,”
> said Dr. Shirley Chi, who noted the side effects were easily treated by medical personnel.

Other allergic reactions are possible according to the company news release.

[California halted injections of Moderna Covid vaccine batch due to ‘higher-than-usual number of adverse events’](https://www.rt.com/usa/512825-moderna-california-vaccine-adverse-reactions/)

Interestingly the [FDA report](https://www.fda.gov/media/144434/download) doesn't seem to mention
which variant of COVID it is effective against and claims 94.5% efficacy in preventing infection
after the 2nd dose. This also mentions severe adverse reactions in 0.2% to 9.7% of participants
after the second dose. This seems rushed.

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
https://twitter.com/Kevin_McKernan/status/1664593777925693441
https://twitter.com/michaelpsenger/status/1664652835269799936
https://twitter.com/kevin_mckernan/status/1664725834349834240
https://pubmed.ncbi.nlm.nih.gov/36751569/
https://twitter.com/Kevin_McKernan/status/1666277215447728128
https://twitter.com/zerohedge/status/1665184139635568642
https://gab.com/DrSimoneGold/posts/110483044255732793
https://www.coffeeandcovid.com/p/bio-shocks-monday-june-5-2023-c-and
https://twitter.com/kevin_mckernan/status/1666265359626665984
https://gab.com/RealAlexJones/posts/110533842714426305
https://twitter.com/DailyCaller/status/1668644708342538241
https://twitter.com/Kevin_McKernan/status/1668630502415425536
https://twitter.com/Kevin_McKernan/status/1665735869687365633
https://www.zerohedge.com/political/more-100-young-children-suffered-seizures-after-covid-vaccination-study
https://twitter.com/EWoodhouse7/status/1667589750461456385
https://www.zerohedge.com/covid-19/first-people-sickened-covid-19-were-chinese-scientists-wuhan-institute-virology-say-us
https://twitter.com/RandPaul/status/1669023284212506632
https://search.brave.com/search?q=nattokinase+spike+protein&source=web
https://search.brave.com/search?q=FDA+mrna+vaccine+in+food+supply
https://search.brave.com/search?q=vaccines+in+plants+for+humans
https://www.kanekoa.news/p/exclusive-dr-peter-hotezs-funding
https://twitter.com/Kevin_McKernan/status/1673677453825327107
https://twitter.com/chrismartenson/status/1673680771138158594
https://twitter.com/RandPaul/status/1673700802316181506
https://twitter.com/Kevin_McKernan/status/1673701364654809088
https://twitter.com/Kevin_McKernan/status/1673707992984743937
https://twitter.com/Kevin_McKernan/status/1673668486051053568
https://www.hartgroup.org/green-monkey/
https://gab.com/disclosetv/posts/110596220987749752
https://twitter.com/Kevin_McKernan/status/1670541435991465986
https://twitter.com/Kevin_McKernan/status/1672231921772814336
https://twitter.com/Kevin_McKernan/status/1671502750343913477
https://twitter.com/jimmy_dore/status/1670501954156658688
https://twitter.com/randpaul/status/1669427976381890560
https://www.conservativereview.com/horowitz-confidential-pfizer-document-shows-the-company-observed-1-6-million-adverse-events-covering-nearly-every-organ-system-2661316948.html
https://dailycaller.com/2023/06/13/covid-patient-zero-wuhan-institute-virology-china/
https://twitter.com/p_mcculloughmd/status/1668447564226609153
https://www.conservativereview.com/horowitz-confidential-pfizer-document-shows-the-company-observed-1-6-million-adverse-events-covering-nearly-every-organ-system-2661316948.html
-->