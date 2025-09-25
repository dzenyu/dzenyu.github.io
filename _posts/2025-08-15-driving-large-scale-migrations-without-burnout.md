---
title: "How to Drive Large-Scale Migrations Without Burning Out Your Team"
description: "Lessons and strategies from Chegg’s migration to Recurly — balancing technical complexity with protecting team energy."
categories: [architecture]
tags: 
 - leadership
 - migration
 - architecture
 - recurly
 - graphql
 - spring-boot
 - kafka
 - aws
featured: true
---

Large-scale system migrations are the engineering equivalent of open-heart surgery—you can’t afford to get it wrong, but you also can’t keep the patient on the table forever. At Chegg, I led the migration of our in-house Commerce system to Recurly, a SaaS billing provider.  

This effort touched **subscriptions, payments, data pipelines, and customer experience.** The migration was ultimately successful, but the bigger win was that the team emerged stronger, not burned out.  

In this post, I’ll share both the **technical approach we took** and the **leadership lessons learned** about driving massive change while protecting team morale and energy.  



## Starting With the “Why”

Big migrations often begin as a technical mandate, but people need a **mission**, not just a task list. Our “why” was clear:  

- Our legacy billing system couldn’t scale with Chegg’s global growth.  
- Students needed more flexible subscription options.  
- The business wanted agility without reinventing billing.  

We didn’t just say, *“We’re moving to Recurly.”* We said, *“This will unlock global scale, smoother student experiences, and allow us to ship faster.”* That context was critical for keeping the team engaged over a long journey.  



## Preparing the Groundwork

### Proof of Concept (POC)  
We began with a **POC across web and mobile** to understand Recurly’s checkout, payments, product management, and subscription lifecycle (creation, renewal, cancellation). This revealed:  
- Which Chegg features had **direct parity** with Recurly.  
- Which features would need business trade-offs or Recurly extensions.  

This helped the business **drop unnecessary legacy features** and push for vendor support where needed.  

### Understanding the Data Model  
The POC also clarified Recurly’s underlying **data structures and flows**. Since Recurly would become the **source of truth for billing, payments, and subscriptions**, we needed a plan for how Chegg systems would integrate without becoming tightly coupled.  



## Key Design Decisions

### Local Subscription Copy  
Our initial instinct was to **proxy all calls through a service to Recurly**. But based on vendor guidance, we instead chose to **store a local copy of subscription data** at Chegg.  
- Subscriptions drove checkout, renewals, and cancellations.  
- Local persistence reduced latency and improved resilience.  
- All other billing and payment queries went directly to Recurly.  

### New GraphQL Schema  
We defined new **GraphQL schemas** that reflected Chegg’s subscription business model. This:  
- Exposed business-friendly APIs to front-end teams.  
- Abstracted vendor-specific differences.  
- Remained extensible in case of future SaaS vendor changes.  

We documented **field mappings** from legacy → GraphQL schema and sought feedback across Chegg teams.  

### Data Persistence & Services  
With the schema locked, we designed new **database tables** for Recurly data while retaining legacy subscription stores. A new **microservice** handled:  
- Persisting Recurly subscriptions locally.  
- Fetching both Recurly and legacy subscriptions.  
- Powering the new GraphQL APIs.  

### Gradual Frontend Rollout  
Using **Optimizely**, we:  
- Routed a subset of users to the **Recurly-powered checkout**.  
- Served subscription data via the new GraphQL APIs for all users (legacy and Recurly).  

This allowed the frontend to integrate seamlessly without complex conditional logic.  



## Migration Process

When the foundation was ready, we tackled **migrating legacy subscriptions into Recurly**.  

### Data Migration Order  
Recurly migrations required **CSV files**, ingested asynchronously. The sequence was:  
1. Users  
2. Products (mapped to Recurly Plans)  
3. Billing information (e.g., Braintree billing tokens)  
4. Active subscriptions  

### Understanding the Data  
Before moving anything, we analyzed:  
- User distribution across different segments.  
- Billing records by type, expiration, and validity.  
- Subscription counts and segments.  

We started with **US active subscriptions** that had *just renewed*—minimizing risk of near-term renewal or cancellation conflicts.  

### Migration Mechanics  
The CSV migration flow worked like this:  
1. **Generate CSVs** in Recurly-approved format.  
2. **Publish files** to S3/Google Drive.  
3. **Notify Recurly** of new migration batches.  
4. **Validation phase**: Recurly runs checks and shares a validation report.  
5. If validation errors < threshold, we authorized ingestion.  
6. For each ingested record, **Recurly published webhook events** back to Chegg.  
   - A webhook microservice received these events.  
   - Events were published to Kafka.  
   - Downstream services updated their data stores.  

### Compensation Handling  
Because ingestion was **asynchronous**, subscriptions could change state mid-migration (e.g., a user canceled during ingestion). To handle this:  
- We built a **Compensation microservice** listening to webhook events.  
- It reconciled subscription states and issued corrective actions in Recurly.  



## Data Preparation Without Impacting Live Systems

ETL-heavy migrations risk **slowing down production databases**. To avoid this:  
- We built a **migration service** using **Spring Boot + Spring Batch**.  
- It generated CSVs asynchronously and published them to S3.  
- We created two sets of tables:  
  - Tables mirroring the CSV format.  
  - Tables for replicated legacy data (using AWS DMS).  

This separation ensured migration work **never interfered with live read/write operations**.  



## Leadership Lessons

Looking back, a few leadership principles stand out:  

- **Anchor on the mission**: Remind the team *why* the migration matters.  
- **Break the monolith of work**: Celebrate incremental wins, not just the finish line.  
- **Build guardrails, not heroics**: Automated validation and compensation reduced stress.  
- **Protect the team’s energy**: No death marches—clear hours, fair rotations, and recognition.  
- **Communicate constantly**: Dashboards, updates, and transparency reduced anxiety.  



## Closing Thoughts

This migration wasn’t just about moving data. It was about moving people—through uncertainty, pressure, and complexity.  

By combining **sound technical design** with **intentional leadership**, we not only moved millions of subscriptions safely to Recurly but also ensured our engineers emerged stronger, not burned out.  

If you’re facing a large migration, remember:  
- Define the mission.  
- Slice the work into digestible chunks.  
- Protect energy as much as uptime.  

Done right, migrations don’t just upgrade systems. They upgrade teams.  
