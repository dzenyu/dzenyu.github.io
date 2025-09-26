---
title: "Leading Large-Scale Migrations: Lessons from Chegg's Move to Recurly"
description: "Lessons and strategies from Chegg's migration to Recurly — balancing technical complexity with protecting team energy."
featured_image: /assets/images/chegg-commerce-migration-recurly.png
categories: [architecture]
tags:
  - aws
  - graphql
  - kafka
  - leadership
  - migration
  - recurly
  - spring-boot
featured: true
---

When our team at Chegg decided to migrate our in-house commerce system to a SaaS vendor, Recurly, the stakes couldn't have been higher. Tens of millions of students depended on seamless billing and subscription access. A single mistake could have led to broken checkouts, canceled subscriptions, and lost trust.  

![Architecture Overview](/assets/images/chegg-commerce-migration-recurly.png)

But large-scale migrations don't have to be fire drills that burn out your engineering team. With careful planning, incremental rollout, and trust in both people and process, you can deliver a successful migration without sleepless nights.  

This is the story of how we approached our migration to Recurly and the lessons we learned along the way.  

## Why We Started With a Proof of Concept

Every migration begins with uncertainty. Instead of jumping straight into code, we started with a **Proof of Concept (POC)** for both front-end and backend flows.  

- We tested checkout, payments, product management, and subscription lifecycles (creation, renewals, cancellations) for both web and mobile.  
- We documented where Recurly provided parity with Chegg and where it didn't.  

This forced alignment across stakeholders: some legacy features were no longer worth carrying forward, while others required vendor collaboration. The POC became our map for what to build, drop, or renegotiate.  

## Data Decisions: Proxy or Local Copy?

Recurly was set to become our **source of truth** for billing, payments, and subscriptions. Initially, we considered building a proxy service to call Recurly directly for everything.  

Recurly, however, recommended a different approach:  
- Store **local copies of subscription data** (since subscriptions drive checkout, renewals, and cancellations).  
- Query Recurly directly for other data.  

This tradeoff balanced performance, resilience, and simplicity. It also meant defining new **GraphQL schemas** to provide business-friendly APIs that abstracted away vendor-specific quirks.  

**Chegg-Recurly Migration Architecture Overview**
```mermaid
flowchart LR
    A[Chegg Checkout] --> B[GraphQL API]
    B --> C[Local Subscription Store]
    B --> D[Recurly API]
    C <--> E[Legacy Chegg Subscriptions]
```

By designing GraphQL schemas first, we gave frontend and business teams clear contracts. This became a critical leadership tool — APIs as alignment mechanisms.

## Document First, Then Build

Before we built new services, we:

- Created detailed field mappings from legacy schemas to new GraphQL schemas.
- Shared documentation internally to gather early feedback.
- Designed database tables to hold migrated Recurly subscriptions alongside legacy data.

This deliberate, documentation-first approach helped us move faster later — teams were aligned before code was written.

## Incremental Rollouts With Optimizely

We didn't flip the switch overnight. Using **Optimizely**, we:

- Directed new cohorts of users to the Recurly checkout flow.
- Served subscription data for all users through the new GraphQL APIs.

This meant the frontend never had to decide which backend to call. It also gave us confidence: if something broke, only a small cohort was affected.

**Figure: Incremental Rollout Strategy Using Optimizely Cohorts**  
```mermaid
flowchart TD
    A[Users] -->|Legacy Cohort| B[Legacy Checkout]
    A -->|Experiment Cohort| C[Recurly Checkout]
    B --> D[GraphQL Subscriptions API]
    C --> D[GraphQL Subscriptions API]
```

The incremental rollout was not just a technical choice — it was a leadership choice to protect both customers and engineers from high-stress cutovers.

## The Migration Pipeline

Once our APIs and rollout plan were in place, we turned to the hardest part: migrating millions of active subscriptions.

The migration process was async and CSV-driven:

1. **Prepare CSV files** in Recurly's format (users, products, billing tokens, subscriptions).
2. **Publish to S3**, where Recurly ingested them.
3. **Validate**: Recurly returned validation errors, which we reviewed before ingestion.
4. **Ingest**: Records were imported, triggering webhook events.
5. **Distribute**: Webhook events were pushed into Kafka and consumed by subscription services.
6. **Compensate**: A compensation microservice reconciled async state mismatches (e.g., cancellations during migration).

```mermaid
sequenceDiagram
    participant CheggDB
    participant MigrationService
    participant S3
    participant Recurly
    participant Kafka
    participant CompensationService

    CheggDB->>MigrationService: Extract subscription data
    MigrationService->>S3: Publish CSV
    Recurly->>S3: Read CSV
    Recurly->>Recurly: Validate and Ingest
    Recurly->>Kafka: Publish Webhook Events
    Kafka->>CompensationService: Events Consumed
    CompensationService->>Recurly: Apply Fixes
```

This pipeline reduced manual effort and gave us confidence in correctness.

## Avoiding Bottlenecks in Production

Migration ETL jobs can overwhelm live databases. To avoid bottlenecks:

- We replicated legacy data into migration-specific tables using **AWS DMS**.
- We ran **Spring Batch jobs on AWS Batch** to generate CSVs asynchronously.

This separation ensured regular users weren't impacted while migration jobs crunched millions of records.

## Leadership Lessons: Avoiding Burnout

Technical success alone isn't enough. Large migrations can easily turn into multi-month slogs that drain morale. Here's what worked for us:

- Cohort rollouts reduced stress by lowering blast radius.
- Automation everywhere (batch jobs, CSV pipelines, compensation services) prevented long nights of manual fixes.
- Cross-team alignment: GraphQL schemas and documentation acted as contracts, preventing rework.
- Celebrating milestones kept morale high — every batch migrated was a reason to celebrate.

## Key Takeaways

Looking back, here's our playbook for running large migrations without burning out your team:

- Start with a **POC** to align stakeholders and clarify tradeoffs.
- Define **APIs** and schemas first — they are the contracts across business and engineering.
- Roll out incrementally with feature flags or experiments.
- Invest in compensation workflows — async migrations will always have edge cases.
- Protect your team with automation, observability, and clear milestones.

Large-scale migrations will never be trivial. But with the right approach, they can be opportunities to build trust, strengthen culture, and modernize systems — all without burning out the people who make it possible.

Done right, migrations don't just upgrade systems. They upgrade teams.