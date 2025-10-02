---
title: "Chegg Commerce: SaaS Vendor Selection (Stripe vs Recurly)"
date: 2025-03-01
categories: [case-study]
tags:
  - architecture
  - commerce
  - evaluation
  - payments
  - product
  - Recurly
  - SaaS
  - Stripe
  - subscriptions
featured: true
---

Led the evaluation to migrate Chegg's commerce infrastructure to a SaaS platform, ultimately selecting Recurly for its In-App subscription support and gateway flexibility.

## Executive Summary

As a Staff Software Engineer at Chegg, I led the evaluation to migrate our existing commerce infrastructure to a SaaS platform. The organization had already chosen to “buy not build,” so our goal was to identify the most suitable vendor to meet current and future business needs. After a structured assessment—including capability mapping, total cost of ownership (TCO), Proof of Concept (POC) implementation, and risk analysis—Chegg selected **Recurly**. The deciding factors were Recurly’s native In‑App (iOS and Android) subscription support, strong subscription lifecycle tooling, and gateway flexibility that reduced lock‑in.

## Context and Objectives

- Replace/augment in‑house commerce systems with a best‑of‑breed SaaS solution.
- Preserve critical business features (pricing, coupons, subscription lifecycles, dashboards, and analytics).
- Minimize time to market for new packages and promotions.
- Reduce operational burden (scaling, compliance, updates).
- Support In‑App subscriptions with minimal in‑house maintenance.
- Avoid vendor lock‑in where practical (gateway choice, data export).

We began by identifying and eliminating legacy/defunct features to scope the migration effectively. A preliminary cost‑benefit analysis narrowed candidates to **Stripe** and **Recurly**.

## Evaluation Criteria

The following criteria guided our selection. We applied weights to reflect Chegg’s priorities (e.g., In‑App support and subscription flexibility had higher weight than optional add‑ons).

- Client onboarding time and implementation effort
- Subscription models and pricing flexibility
- In‑App (Apple/Google) subscription support
- Dunning, churn reduction, and lifecycle tooling
- API design, webhooks, SDKs, and documentation quality
- Gateway flexibility vs. vendor lock‑in
- SLA, reliability, rate limits, and scaling posture
- Reporting, dashboards, and observability
- Security, compliance (PCI DSS, SCA/PSD2), and data residency/export
- TCO (platform + transaction fees + add‑ons + internal effort)

Example weighting schema:

| Criterion                                  | Weight |
|--------------------------------------------|:------:|
| In‑App support                             | 0.20  |
| Subscription flexibility                   | 0.15  |
| Dunning & churn reduction                  | 0.10  |
| API/Webhooks/Docs                          | 0.10  |
| Gateway flexibility / lock‑in              | 0.10  |
| SLA/Scale/Rate limits                      | 0.10  |
| Dashboards/Reporting                       | 0.08  |
| Security/Compliance                        | 0.07  |
| Onboarding/Implementation effort           | 0.05  |
| TCO                                         | 0.05  |

## Stripe vs Recurly: Capability Overview

| Feature                            | Stripe                                                                 | Recurly                                                                                          |
|------------------------------------|------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| Primary focus                      | Payments platform + subscriptions                                      | Subscription management (subscriptions-first) + payments via multiple gateways                    |
| In‑App (iOS/Android)               | No native subscription management (requires in‑house bridging)         | Native In‑App integrations and workflows                                                          |
| Subscription pricing models        | Strong; complex usage may need pre‑aggregation                         | Strong; rich built-in models (usage‑based, tiered, hybrid, prepaid)                              |
| Dunning/churn reduction            | Smart retries, reminders                                               | Advanced dunning with proactive tools (e.g., expired card management)                             |
| API model                          | Expandable objects (reduces round trips)                               | Classic REST; straightforward single‑object fetches                                               |
| Web UI/JS footprint                | Larger client library surface                                          | Lightweight JS (focus on tokenization/validation)                                                 |
| Gateways                           | Stripe is its own processor/gateway                                    | Supports many gateways (reduces lock‑in)                                                          |
| Ecosystem integrations             | Extensive marketplace                                                   | Solid set with major accounting/CRM; fewer total than Stripe                                      |
| Rate limits & flexibility          | Good; may require plan-tier upgrades                                   | Demonstrated flexibility to raise limits without penalties (case-by-case)                         |

## Decision Matrix (Illustrative Scoring)

Weights applied to a 1–5 score (5 = best fit). Example results below reflect Chegg’s priorities and POC outcomes.

| Criterion                        | Weight | Stripe | Recurly | Weighted Stripe | Weighted Recurly |
|----------------------------------|:------:|:------:|:-------:|:----------------:|:----------------:|
| In‑App support                   |  0.20  |   2    |    5    |       0.40       |       1.00       |
| Subscription flexibility         |  0.15  |   4    |    5    |       0.60       |       0.75       |
| Dunning & churn                  |  0.10  |   4    |    5    |       0.40       |       0.50       |
| API/Webhooks/Docs                |  0.10  |   5    |    4    |       0.50       |       0.40       |
| Gateway flexibility / lock‑in    |  0.10  |   3    |    5    |       0.30       |       0.50       |
| SLA/Scale/Rate limits            |  0.10  |   4    |    4    |       0.40       |       0.40       |
| Dashboards/Reporting             |  0.08  |   4    |    4    |       0.32       |       0.32       |
| Security/Compliance              |  0.07  |   5    |    5    |       0.35       |       0.35       |
| Onboarding/Effort                |  0.05  |   4    |    4    |       0.20       |       0.20       |
| TCO                              |  0.05  |   4    |    3    |       0.20       |       0.15       |
| Total                            |        |        |         |     3.67         |     4.57         |

Result: Recurly scored higher given Chegg’s emphasis on In‑App and subscription lifecycle needs.

### Scoring Notes

Key scores explained:

- **In-App Support**: Stripe scored 2 (requires custom bridging for iOS/Android subscription 
  management); Recurly scored 5 (native in-app out-of-box integration).
- **Gateway Flexibility**: Stripe scored 3 (locked to Stripe's own gateway); Recurly scored 5 
  (supports Braintree, Adyen, Stripe Connect, and regional processors).
- **TCO**: Recurly scored 3 vs Stripe's 4 due to higher per-transaction fees at our scale 
  (notable monthly cost difference), offset by significant monthly savings in engineering maintenance.

Scoring scale: 1 = Poor fit, 3 = Adequate, 5 = Excellent fit

## Proof of Concept (POC) Approach

POC goals: validate fit for key business flows, identify integration friction, and estimate effort.

1. Dashboard configuration: model products/plans, coupons, taxes, and entitlements.  
2. Pricing/packaging: map current and near‑term pricing; document trade‑offs.  
3. Webhooks ingestion service: receive events, verify signatures, define idempotency strategy, and map events to domain actions.  
4. Minimal web experience: integrate vendor JS library where needed; verify PCI scope and customizability of checkout.  
5. In‑App flows: confirm purchase/renewal/cancellation mapping and data reconciliation.  
6. Backend impact: evaluate changes to fulfillment, entitlements, invoicing, CRM, and analytics.  

POC success criteria:
- End‑to‑end subscription lifecycle works (create, trial, renew, pause/cancel, refund).
- Webhooks processed reliably with idempotency and replay handling.
- Dashboards provide sufficient operator controls and reporting.
- Meets preliminary rate/throughput targets and error budgets.

## Risks and Mitigations

| Risk                                 | Impact                         | Mitigation                                                                 |
|--------------------------------------|--------------------------------|----------------------------------------------------------------------------|
| Vendor lock‑in                       | Strategic/Cost                 | Prefer gateway‑agnostic vendor, ensure data export and contract clauses    |
| In‑App complexity                    | Delays/Support burden          | Choose native In‑App support; add reconciliation jobs and monitoring       |
| Webhook reliability                  | Data drift/Failed ops          | Signatures, retries, DLQs, idempotency keys, replay tooling               |
| Rate limits during peaks             | Throttling/Outages             | Pre‑agree limits, backoff, bulk APIs, and proactive capacity planning     |
| Compliance changes (PSD2/SCA, taxes) | Checkout friction/Failures     | Keep vendor features enabled; A/B test strong auth paths                  |
| Reporting gaps                       | Operator pain/Shadow systems   | Define must‑have reports; export to data warehouse for advanced analytics  |

## Migration Plan (High Level)

1. Discovery and deprecation: catalog features, retire unused paths, finalize accounting rules.  
2. POC and decision: execute POC with top flows, gather metrics, finalize weighted scores.  
3. Contracting and compliance: SLA, rate limits, data export, DPA, and audit requirements.  
4. Build integration: webhook services, pricing/catalog sync, entitlement mapping.  
5. Dual‑run and shadow testing: mirror production traffic (where feasible), reconcile events.  
6. Controlled rollout: pilot cohorts, monitor KPIs (conversion, churn, auth rates, declines).  
7. Full cutover and decommission: switch traffic, stabilize, retire legacy components.

Key KPIs:
- Conversion rate, SCA success, auth/decline rates
- Renewal success, dunning recovery, churn (voluntary/involuntary)
- Refund/chargeback rates and response times
- Time‑to‑launch for new packages/promos

## Why Recurly Was Selected

- Native **In‑App** subscription handling, reducing the need to maintain an internal bridging service.  
- Strong **subscription lifecycle** features (dunning, churn controls, complex pricing).  
- **Payment gateway flexibility**, reducing lock‑in and enabling regional optimization.  
- Demonstrated **rate‑limit flexibility** for peak events without punitive costs.

> "In-App subscription support alone accounted for 20% of our decision weight. 
> For companies with mobile-first offerings, underestimate this at your peril."
>
> "The decision matrix is not just a scoring exercise, it forces alignment on what 
> actually matters to your business."
>
> "We chose Recurly not because it was 'better' than Stripe, but because it was 
> better *for us*. Context matters more than features."

### Key Takeaway

For Chegg, **Recurly’s strengths in subscription flexibility, churn management, and native In-App support outweighed Stripe’s broader ecosystem**.

This evaluation highlights the importance of **POC-driven vendor selection**, balancing cost, feature coverage, and long-term scalability.  

## Architecture Notes (At a Glance)

- Client → Vendor Checkout → Payment Auth (SCA/3DS as required)  
- Vendor Webhooks → Webhook Ingestion Service (verify signatures, idempotency, DLQ)  
- In‑App purchase events → Vendor → Webhooks → Entitlement Service  
- Data sync/export → Data Warehouse (reporting, forecasting, LTV, churn analysis)

## References

### Decision-Influencing Resources
- [Recurly In-App Purchase Overview](https://docs.recurly.com/docs/in-app-purchase-overview) - Key resource for evaluating iOS/Android support
- [Stripe Billing vs Recurly Comparison](https://www.chargebee.com/blog/stripe-billing-vs-recurly/) - Third-party analysis
- [SaaS Metrics That Matter](https://www.forentrepreneurs.com/saas-metrics-2/) - Framework for KPI selection

### Technical Implementation Guides

- [Webhooks Best Practices](https://webhooks.guide/) - Idempotency and retry patterns
- [PCI DSS Compliance Guide](https://www.pcisecuritystandards.org/document_library)
- [Strong Customer Authentication (PSD2)](https://stripe.com/docs/strong-customer-authentication)

### Vendor Documentation
- [Recurly API Documentation](https://developers.recurly.com/)
- [Recurly Webhooks Reference](https://docs.recurly.com/docs/webhooks)
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe vs Recurly Feature Comparison](https://recurly.com/demo/stripe-alternative/)

### Business Context
- [Subscription Business Model Fundamentals](https://en.wikipedia.org/wiki/Subscription_business_model)
- [India Unified Payment Interface](https://en.wikipedia.org/wiki/Unified_Payments_Interface)
- Related: Migration story — [Large-Scale Migrations Without Burnout](/architecture/2025/08/15/Large-Scale-Migrations-Without-Burnout.html)