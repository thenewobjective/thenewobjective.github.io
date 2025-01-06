---
layout: post
icon: file-text
title:  "A DevOps Maturity Model"
date:   2021-05-14 12:00:00 -0600
category: Software Systems Engineering
permalink: /software-systems-engineering/a-devops-maturity-model
---

* TOC
{:toc}

## Introduction

The practices and goals of DevOps can be represented with a Maturity Model.
Some examples of Maturity Models are:
[CMMI](https://en.wikipedia.org/wiki/Capability_Maturity_Model_Integration),
[PSP](https://en.wikipedia.org/wiki/Personal_software_process),
[TSP](https://en.wikipedia.org/wiki/Team_software_process),
and more weakly [Shu-Ha-Ri](https://www.scrum.org/resources/blog/shu-ha-ri-professional-coaching)
in the Agile methodology.

This model is chosen

## The Practices

## The Goals

## The Enablers

### Cultural Enablers

1. Shared Goals, definition of success, incentives
2. Shared ways of working, responsibility, collective ownership
3. Shared values, respect and trust
4. Constant, effortless communication
5. Continuous experimentation and learning

### Technological Enablers

1. Build Automation
2. Test Automation
3. Deployment automation
4. Monitoring automation
5. Recovery automation
6. Infrastructure Automation
7. Configuration management for code and infrastructure
8. Version Control

## The Model

<table>
  <thead>
    <tr>
      <th rowspan="3">Capability</th>
      <th colspan="5">Maturity</th>
      <th rowspan="3">Goal</th>
    </tr>
    <tr>
      <th colspan="2">Shu</th>
      <th colspan="2">Ha</th>
      <th colspan="1">Ri</th>
    </tr>
    <tr>
      <th>Initial</th>
      <th>Repeatable</th>
      <th>Defined</th>
      <th>Quantitatively Managed</th>
      <th>Optimizing</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Planning</td>
      <td colspan="5">&nbsp;</td>
      <td>Continuous Planning</td>
    </tr>
    <tr>
      <td>Development</td>
      <td colspan="5">&nbsp;</td>
      <td>Continuous Development</td>
    </tr>
    <tr>
      <td>Integration</td>
      <td colspan="5">&nbsp;</td>
      <td>Continuous Integration</td>
    </tr>
    <tr>
      <td>Testing</td>
      <td>None</td>
      <td colspan="4">&nbsp;</td>
      <td>Continuous Testing</td>
    </tr>
    <tr>
      <td>Release Management</td>
      <td>Manual</td>
      <td colspan="4">&nbsp;</td>
      <td>Continuous Release Management</td>
    </tr>
    <tr>
      <td>Infrastructure Monitoring</td>
      <td>None</td>
      <td colspan="4">&nbsp;</td>
      <td>Continuous Infrastructure Monitoring</td>
    </tr>
    <tr>
      <td>Infrastructure Optimization</td>
      <td colspan="5">&nbsp;</td>
      <td>Continuous Infrastructure Optimization</td>
    </tr>
    <tr>
      <td>User Behavior</td>
      <td colspan="5">&nbsp;</td>
      <td>Continuous Monitoring &amp; Feedback</td>
    </tr>
    <tr>
      <td>Service Failure Management</td>
      <td colspan="5">&nbsp;</td>
      <td>Service Failure Recovery Without Delay</td>
    </tr>
  </tbody>
</table>

## Further Reading

* Smeds, J., Nybom, K., & Porres, I. (2015). _DevOps: A Definition and Perceived Adoption Impediments._
  * [Presentation](https://pdfs.semanticscholar.org/ea36/96c46ca99b0fb7866af152db0e161efe37d3.pdf)
  * [Paper](https://link.springer.com/chapter/10.1007%2F978-3-319-18612-2_14)
* Ineta Būcena. _[DevOps maturity model](https://devopsadoptmeth.wordpress.com/method-description/devops-maturity-model/)_ (Accessed May 2021)
* Phil Wittmer. (July 16, 2020) [A DevOps Maturity Model to Monitor Your Progress](https://www.tiempodev.com/blog/devops-maturity-model/)
* [Explore DORA's research program](https://www.devops-research.com/research.html)
* <https://www.3pillarglobal.com/insights/a-devops-maturity-model-to-monitor-your-progress/>

## Notes

* Release Cadence

<!--
* Features
  * Security
    * SSL (Mozilla Observatory)
  * Hosting
  * Continuous Integration
    * Unit Testing
      * <https://www.c-sharpcorner.com/article/selenium-automation-test-cases-for-the-net-web-application/>
    * Screaming Frog
  * Continuous Delivery
    * <https://docs.microsoft.com/en-us/iis/install/installing-publishing-technologies/installing-and-configuring-web-deploy-on-iis-80-or-later>
  * Monitoring
    * Availability Testing (Application Insights)
    * Analytics
    * Security
  * Maintenance
    * DB backups
* Continuous Deployment

* What gets released together gets versioned together
* Infrastructure as Code
-->
