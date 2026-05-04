---
title: "Building AttendOnTime: My Startup Journey from Check-in Chaos to Event Platform"
date: 2026-02-28
last_modified_at: 2026-05-03
categories: [startup]
tags: [indie-hacker, event-management, saas, microservices, kafka, spring-boot, founder-journey, build-in-public]
featured: false
---

## Building AttendOnTime: From Check-in Chaos to a Platform

I did not set out to build a startup.
I was trying to fix a broken check-in process.

What started as a small attempt to remove friction at live events has grown into my first serious journey as a builder.

The idea did not come from brainstorming.
It came from watching someone deal with a problem that should not exist.

For me, that someone was my wife.

She runs an event planning and coordination business. One recurring request from her clients was simple:

> “Make sure only people who RSVP’d or paid are allowed in.”

Simple request. Painful execution.

---

## The Problem I Saw Up Close

The workflow looked like this:

* Receive a PDF with a list of attendees
* Convert it manually into Excel or Google Sheets
* Clean the data
* Print multiple copies
* Check people in using paper lists

It worked—but barely.

I remember watching guests arrive while organizers flipped through printed pages trying to find names. People were waiting. Pressure was building.

That moment made it clear:

**This does not scale under real event conditions.**

And it kept happening.

This was not just inefficient. It was a gap.

---

## The Moment It Started

In October of 2025, I was on vacation in Ocho Rios, Jamaica.

What was supposed to be a one-week trip turned into two and a half weeks—we got stuck due to Hurricane Melissa.

That unexpected time became the starting point.

I began building a proof of concept with one simple goal:

> There has to be a better way to manage event attendees and check-ins.

That was the beginning of AttendOnTime.

---

## What I Set Out to Build

At first, the goal was simple:

* Replace paper checklists
* Make attendee lookup fast
* Enable reliable check-in

But the deeper I went, the clearer it became:

Check-in is not the problem. Fragmentation is.

* Tickets in one place
* Attendees in another
* Check-in somewhere else

So the vision evolved:

> A platform where event organizers can manage everything—from registration to check-in—in one place.

I made an early mistake trying to design a full “event operations suite” too soon.

The reset was simple:
Focus on the check-in flow first. Make it solid. Expand from there.

---

## Building Solo (and Building Right)

I am building this alone, alongside my full-time work as a backend engineer.

That forces discipline.

From a technical perspective, I chose a microservices architecture with a focus on real-time coordination and long-term scalability.

The stack reflects that:

* Spring Boot
* Kafka (event-driven architecture)
* gRPC for internal service communication
* PostgreSQL
* Valkey (Redis-compatible) for caching and real-time updates
* GraphQL
* AWS infrastructure
* Amazon SES for email delivery
* MaxMind GeoLite2 for geo-fenced check-in

Was this the fastest way to build an MVP? No.
Was it intentional? Yes.

The challenge has been constant:

> Build fast enough to learn, but solid enough to last.

---

## Practical Lessons So Far

### 1. Real Problems Matter More Than Ideas

This started from observation, not theory.

### 2. Scope Expands Quickly

What looks like a tool can become a platform fast.

### 3. Solo Building Requires Clarity

You have to challenge your own assumptions.

### 4. Over-Engineering Is Always Nearby

Speed vs architecture is not a one-time decision—it is continuous.

---

## Where Things Stand Today

The platform is live:

- 🌐 [Visit the landing page](https://attendontime.com) 
- 👉 [Try AttendOnTime](https://app.attendontime.com)

Today, AttendOnTime supports real-world event operations end to end.

### Event Management

Organizers can create:

* In-person events (with location)
* Online events (Zoom, Meet, Teams)
* Hybrid events

Events can be:

* Public — open registration
* Private — invite-only

Ticketed events automatically convert payments into registrations—removing manual steps.

Events are fully customizable with branding, links, and configuration.

### Team Coordination (Where It Gets Practical)

Execution teams can:

* Create and assign event tasks
* Group responsibilities by roles (Security, Setup, Helpers)
* Send role-based messages
* Track progress with reminders

This becomes critical in the final hours before an event—where most breakdowns happen.

### Communication & Notifications

Organizers can send targeted updates to attendees based on:

* RSVP status
* Check-in status

Delivered via:

* Real-time in-app notifications
* Email (Amazon SES)

### Attendee Check-in (Core Value)

Check-in is designed for real event pressure:

* Self check-in (optional geo-fencing)
* Staff-assisted check-in
* Real-time sync across all devices
* Live attendee stats

Ticket validation ensures only legitimate attendees gain access.

### Payments & Subscriptions

Paid events are powered through Stripe:

* Payment links for ticket sales
* Automatic attendee association
* Webhook-based payment processing
* Ticket transfers and refunds

Organizations operate on subscription tiers, with event limits enforced automatically—no manual intervention required.

### In Progress

* SMS notifications

---

## What Comes Next

* **July 2026** — complete full ticket lifecycle
* **September 2026** — simplify onboarding
* **December 2026** — onboard first 10 active organizer teams

The focus is shifting toward reliability, usability, and real event feedback.

---

## Why I Am Sharing This

This is about more than building a product.

It is about:

* Seeing a problem clearly
* Taking action
* Staying consistent

If you are an event organizer, I hope this makes your life easier.

If you are a builder, I hope this encourages you to start.

👉 [Try AttendOnTime](https://app.attendontime.com)

I do not take this journey for granted. It is been a process of growth, discipline, and trusting the path as it unfolds.
