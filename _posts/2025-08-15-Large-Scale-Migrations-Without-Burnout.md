---
title: "Leading Large-Scale Migrations: Lessons from Chegg's Move to Recurly"
description: "Lessons and strategies from Chegg's migration to Recurly — balancing technical complexity with protecting team energy."
excerpt: "How we moved Chegg's commerce to Recurly with a cohort rollout, CSV-driven migrations, and compensation services — without burning out the team."
featured_image: /assets/images/chegg-commerce-migration-recurly.png
categories: [architecture]
tags:
  - aws
  - commerce
  - graphql
  - kafka
  - leadership
  - migration
  - Optimizely
  - Recurly
  - SaaS
  - schema
  - subscriptions
  - spring-boot
# featured: false
mermaid: true
class: wide
exclude: true
search: false
# toc_sticky: true
# toc: true
hidden: true
---

When our team at Chegg decided to migrate our in-house commerce system to a SaaS vendor, Recurly, the stakes couldn't have been higher. Tens of millions of students depended on seamless billing and subscription access. A single mistake could have led to broken checkouts, canceled subscriptions, and lost trust.  

**TL;DR**  
- Start with a focused POC; design APIs and schemas first as alignment contracts.  
- Roll out in cohorts with feature flags (Optimizely); use CSV-driven S3 imports into Recurly and webhook-driven distribution to Kafka.  
- Automate reconciliation with compensation services to handle edge cases — protect both customers and engineering teams.  

<picture>
  <source type="image/webp" srcset="/assets/images/chegg-commerce-migration-recurly.webp 1x, /assets/images/chegg-commerce-migration-recurly@2x.webp 2x">
  <img src="/assets/images/chegg-commerce-migration-recurly.png"
       srcset="/assets/images/chegg-commerce-migration-recurly@2x.png 2x"
       alt="Chegg → Recurly migration overview: local subscription copies, CSV ingestion, webhook distribution to Kafka, and compensation services"
       loading="lazy"
       decoding="async"
       class="screenshot">
</picture>

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

By designing GraphQL schemas first, we gave frontend and business teams clear contracts. This became a critical leadership tool — APIs as alignment mechanisms.

## Document First, Then Build

Before we built new services, we:

- Designed and implemented target GraphQL schemas to support the SaaS use case.
- Created detailed field mappings from legacy schemas to new GraphQL schemas.
- Shared documentation internally to gather early feedback.
- Designed database tables to hold migrated Recurly subscriptions alongside legacy data.

This deliberate, documentation-first approach helped us move faster later — teams were aligned before code was written.

### Target architecture

The diagram below shows our target state during the migration and still includes the **Legacy Subscription Services** because the cutover had not yet completed. After the migration finished, those legacy services were deprecated and removed.

![Architecture Overview](/assets/images/chegg-recurly-migration-overview.png)

## Incremental Rollouts With Optimizely

We didn't flip the switch overnight. Using **Optimizely** (a feature flagging and experimentation platform that allows controlled rollouts to specific user segments), we:

- Directed new cohorts of users to the Recurly checkout flow.
- Served subscription data for all users through the new GraphQL APIs.

This meant the frontend never had to decide which backend to call. It also gave us confidence: if something broke, only a small cohort was affected.

**Figure 2: Incremental Rollout Strategy Using Optimizely Cohorts**  
```mermaid
flowchart TD
    U["Users"] -- Start Checkout Flow --> O["<b>Optimizely</b><br><i>Is in<br>experiment?</i>"]
    O -- Legacy Cohort --> L["Legacy Checkout"]
    O -- Experiment Cohort --> R["Recurly Checkout"]
    L --> E["Legacy REST API"]
    R --> D["GraphQL Checkout<br>Mutation"]

    U@{ shape: start}
    O@{ shape: diam}
     O:::Rose
     L:::Ash
     R:::Sky
     E:::Ash
     D:::Sky
    classDef Ash stroke-width:1px, stroke-dasharray:none, stroke:#999999, fill:#EEEEEE, color:#000000
    classDef Sky stroke-width:1px, stroke-dasharray:none, stroke:#374D7C, fill:#E2EBFF, color:#374D7C
    classDef Rose stroke-width:1px, stroke-dasharray:none, stroke:#FF5978, fill:#FFDFE5, color:#8E2236
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
---
config:
  look: neo
---
sequenceDiagram
  participant MigrationService as Migration<br/>Service
  participant MigrationDB as Migration<br/>DB
  participant S3 as S3
  participant Recurly as Recurly
  participant Kafka as Kafka
  participant CompensationService as Compensation<br/>Service
  participant SubscriptionService as Subscription<br/>Service
  participant SubscriptionDB as Subscription<br/>DB
  autonumber
  MigrationService ->> MigrationDB: Extract data<br/>- user info<br/>- billing<br/>- subscription
  MigrationService ->> S3: Publish CSV files
  Recurly ->> S3: Read CSV
  Recurly ->> Recurly: Validate and Import data
  Recurly ->> Kafka: Publish Webhook Events
  Kafka ->> CompensationService: Consume Events
  CompensationService ->> Recurly: Apply Fixes
  CompensationService ->> MigrationDB: Mark records as migrated
  Kafka ->> SubscriptionService: Consume Events
  SubscriptionService ->> SubscriptionDB: Upsert<br/>subscriptions
```

This pipeline reduced manual effort and gave us confidence in correctness.

### Avoiding Bottlenecks in Production

Migration ETL jobs can overwhelm live databases. To avoid bottlenecks:

- We replicated legacy data into migration-specific tables using **AWS DMS**.
- We ran **Spring Batch jobs on AWS Batch** to generate CSVs asynchronously.

This separation ensured regular users weren't impacted while migration jobs crunched millions of records.

### Cohort-based rollout (not a big-bang)

The migration was intentionally staged rather than a single cutover. We began by migrating recurring subscriptions from small-population countries to limit blast radius, then progressed to larger cohorts (for example, the US and other European countries). For each cohort we deliberately selected subscriptions that exercised different billing, payment, and lifecycle edge cases so our ingestion, webhook processing, and compensation logic were validated end-to-end. After each cohort we monitored ingestion metrics, webhook delivery, consumer processing, and reconciliation results — only advancing when both automated metrics and manual checks met our thresholds. This careful, incremental approach let us surface issues early and ensure student data was migrated correctly without impacting the broader user base.

## Challenges We Encountered

Despite careful planning, we hit several significant roadblocks that taught us valuable lessons:

- **Data Inconsistencies**: Legacy data had accumulated years of edge cases — subscriptions with missing billing tokens, orphaned records, and inconsistent state transitions. What seemed like clean data in our POC revealed complexities at scale.
- **Vendor API Limitations**: Recurly's bulk import had undocumented rate limits and timeout behaviors that only surfaced when processing millions of records. We had to implement exponential backoff and chunking strategies mid-migration.
- **Braintree Tokens**: Though we migrated Braintree tokens, we could not fetch credit card details from the corresponding tokens until such time the tokens were actioned upon within Recurly. This forced us to build a fallback logic to retrieve card details from our legacy data store if billing information was sparse in Recurly.
- **Inconsistencies in vendor's test and production environments**: Vendor test environments often use mock data; some complex production cases only surfaced in live runs — always verify end‑to‑end.
- **Webhook Delivery Delays**: During peak processing, Recurly's webhook delivery experienced delays of several minutes. Our compensation service had to handle out-of-order events and duplicate deliveries more gracefully than initially designed.
- **Cross-System Dependencies**: Other Chegg services that depended on subscription data had assumptions about data freshness and consistency that broke during the async migration. We discovered these dependencies through production alerts, not testing.
- **Team Coordination**: With multiple teams working in parallel (frontend, backend, data, QA), staying synchronized became increasingly difficult. Feature branches diverged, integration environments fell out of sync, and communication overhead grew exponentially.

The key insight: **plan for 3x more edge cases than your POC reveals**. Production data and production scale always surprise you.

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

