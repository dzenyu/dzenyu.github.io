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

Sometimes the best ideas do not come from brainstorming.
They come from watching someone struggle with a problem that should not exist.

For me, that someone was my wife.

She runs an event planning and coordination business—handling everything from decor to day-of execution. One recurring request from her clients was simple on the surface:

> “Make sure only people who RSVP’d or paid are allowed in.”

Simple request. Painful execution.

---

## The Problem I Saw Up Close

The process looked something like this:

* Receive a PDF with a list of attendees
* Manually extract and convert it into Excel or Google Sheets
* Clean and organize the data
* Print multiple copies of the list
* Use paper checklists at the event entrance

It was tedious. Error-prone. Stressful—especially when guests are arriving quickly and expectations are high.

I remember watching guests arrive while names were being crossed off on printed sheets—people waiting, organizers flipping through pages trying to find the right name.

That moment made something clear:

This process does not scale under pressure.

And it was not a one-off situation. It kept happening.

At some point, it became obvious: this is not just a workflow issue.
It is a product gap.

---

## The Moment It Started

In November, I was on vacation in Ocho Rios, Jamaica.

What was supposed to be a one-week trip turned into two and a half weeks—we ended up stuck due to Hurricane Melissa.

Unexpectedly, that became the turning point.

With time on my hands and this problem still fresh in my mind, I started building a proof of concept. No grand plan. No roadmap. Just a simple idea:

> There has to be a better way to manage event attendees and check-ins.

That was the beginning of what is now AttendOnTime.

---

## What I Set Out to Build

Initially, the goal was narrow:

* Replace paper checklists
* Make attendee lookup fast
* Enable clean, reliable check-in

But as I went deeper, the scope naturally expanded.

Check-in is not the problem. Fragmentation is.

* Tickets are sold in one place
* Attendees are tracked in another
* Check-in is handled separately

So AttendOnTime started evolving into something bigger:

> A platform where event organizers can manage the entire lifecycle—from registration to check-in—in one place.

I also made an early mistake: I started sketching a broad “event operations suite” before validating the most critical flow.

That slowed me down.

The reset was simple: focus first on the check-in path that breaks most often in real events, then expand only when that flow is reliable.

---

## Building Solo (and Building Right)

I am building this alone, alongside my full-time work as a backend engineer.

That forces clarity.

Every decision matters—especially around time, complexity, and scope.

From a technical perspective, I chose to build this as a microservices platform with a bias toward long-term scalability and real-time coordination.

The stack reflects that direction:

* **Spring Boot** — the backbone for building reliable, production-grade services
* **Kafka** — enabling an event-driven architecture that keeps services loosely coupled and responsive
* **PostgreSQL** — the primary data store, chosen for consistency and reliability
* **Valkey (Redis-compatible)** — powering caching and real-time capabilities like WebSocket-driven updates
* **GraphQL** — providing a flexible and efficient API layer for the frontend
* **AWS** — handling infrastructure, scaling, and operational concerns
* **Amazon SES** — supporting transactional email delivery for critical user interactions

Was this the fastest way to build an MVP? Probably not.

Was it intentional? Yes.

I wanted a system that could scale without needing to be rewritten later.

At the same time, this introduced one of the biggest tensions in this journey:

> How do you balance building fast vs building right?

That is a question I am still learning to answer.

---

## Practical Lessons So Far

A few lessons have already become clear:

### 1. Real Problems Are the Best Starting Point

This did not come from market research.
It came from observing a real, repeated pain point.

### 2. Scope Expands Quickly

What starts as a simple tool can evolve into a platform faster than expected.
Being intentional about boundaries is critical.

### 3. Solo Building Requires Discipline

There is no one else to:

* challenge decisions
* push deadlines
* simplify designs

You have to do all of that yourself.

### 4. Over-Engineering Is a Real Risk

It is tempting to build for scale from day one.

If I optimized only for speed, I could have shipped a narrower monolith sooner.
If I optimized only for architecture, I could spend months building abstractions no organizer asked for.

Finding that balance is ongoing.

---

## Where Things Stand Today

The platform is live:

* [AttendOnTime landing page](https://attendontime.com)
* [AttendOnTime application](https://app.attendontime.com)

Today, AttendOnTime supports a practical foundation for real-world event operations.

### Organizer Workflows

Organizers can securely sign in, create organizations, and manage events within those organizations. From there, they can invite and manage team members, with the system keeping everyone informed through automated notifications as organizations and events evolve.

### Attendee Experience

Events can be exposed publicly when needed, allowing organizers to share a clean and accessible event page without manual coordination.

### Communication & Notifications

Communication is treated as a core part of the platform. Organizers can send targeted updates to attendees based on their status—whether they have RSVP’d, checked in, or not yet arrived.

These updates are delivered through:

* Real-time in-app notifications powered by WebSocket connections
* Email notifications for confirmations and important updates

### Payments and Ticket Ownership

On the commerce side, the platform integrates with Stripe to support paid events. Organizers can generate payment links, associate purchases with attendees, and automatically process payments through webhooks.

From there, the system begins to handle ticket ownership workflows, including sharing access with others and handling refund scenarios when needed.

### In Progress

Support for SMS notifications is currently in progress.

---

## What Comes Next

The next phase is focused on:

* By July 2026: complete end-to-end ticket lifecycle flows (purchase, transfer, refund, and validation) with fewer manual support steps
* By September 2026: reduce organizer onboarding time by simplifying setup and event publishing
* By December 2026: onboard the first 10 active organizer teams and gather consistent feedback from live events

Beyond that, the focus shifts toward repeatability: tighter feedback loops, better reliability under event-day pressure, and clearer onboarding for non-technical teams.

---

## Why I Am Sharing This

This is not just about building a product.

It is about the process:

* Seeing a problem clearly
* Taking the step to solve it
* Staying consistent over time

If you are an event organizer, I hope this eventually makes your life easier.

If you are a builder, I hope this encourages you to start—especially when the idea comes from something real.

If you are an organizer and this sounds useful, you can follow updates and request access through the [AttendOnTime landing page](https://attendontime.com).

This is just the beginning—and I am committed to seeing where this goes.
