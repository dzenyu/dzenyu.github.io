---
title: "Highlights from New Relic’s Roadmap Showcase"
date: 2023-12-06
categories: [conference]
tags: [newrelic, apm360, open-telemetry, dev-sec-ops, observability]
---

At a recent New Relic business meeting, I had the opportunity to see a preview of their upcoming features and long-term vision. The roadmap was packed with innovation in observability, security, and developer productivity. Below are the highlights and my takeaways from the session.

---

## 🚀 APM+

New Relic continues to expand its **Application Performance Monitoring (APM)** suite with more advanced diagnostics, deeper integrations, and security-first capabilities.

### 🧠 New Relic Grok
- Integration with **OpenAI** to act as a **personal assistant for observability**.
- Natural language queries: Ask questions about performance metrics, anomalies, or logs.
- [Learn more →](https://newrelic.com/platform/new-relic-ai)

### 🔄 APM 360 – Session Replay
- Built into the **browser agent**.
- Lets you **replay real user sessions** to understand what led to an error or crash.
- Bridges the gap between logs, metrics, and actual user experience.

---

## 👥 New Relic Teams

Collaboration is now built into New Relic:
- **In-app discussions** directly inside New Relic.
- Sync conversations with **Slack** or **Microsoft Teams**.
- Reduces context switching for DevOps, SREs, and developers.

---

## 📡 OpenTelemetry & Distributed Monitoring

New Relic is investing heavily in **OpenTelemetry (OTel)**:
- Launching their own [**New Relic Distribution of OpenTelemetry**](https://newrelic.com/lp/nrdot).
- Seamless collection of metrics, traces, and logs.
- **AWS standardization** on OTel collectors means easier interoperability.

### 🛠️ Next-Gen Telemetry Platform
- **Super Agent**: Single agent for host, logs, and APM monitoring.
- Includes OTel collector + infra agent.
- Supports **OpenMetrics, FluentBit, Elastic Common Schema**.
- Future-ready with **eBPF injection** for deep, low-overhead telemetry ([what is eBPF?](https://en.wikipedia.org/wiki/EBPF)).

---

## 🛡️ Security Enhancements

### 🔍 Interactive Application Security Testing (IAST)
- Built directly into APM.
- Detects vulnerabilities like **SQL injection** and **OWASP Top 10**.
- No separate setup—enable directly via APM agents.

---

## 📂 Logs & Storage

### 📦 Live Archives
- **Instant, long-term log storage** at **1/4th the cost**.
- No indexing overhead → no ingress/egress cost surprises.
- Perfect for compliance, auditing, and cost-sensitive teams.

---

## 🔔 Alerting & Query Enhancements

- **Alert Management Strategies**: Smarter ways to reduce noise and act on critical alerts.
- **Query Enhancements**: New lookup features improve dashboards and troubleshooting workflows.

---

## 🔮 Future Vision – Project SOLERA

- Workload-centric observability.
- Brings together telemetry, APM, and business KPIs.
- Helps teams focus on **end-to-end service reliability** instead of isolated metrics.

---

## Final Thoughts

New Relic’s roadmap shows a clear direction: **consolidation, intelligence, and cost optimization**. By embracing OpenTelemetry, enhancing security within APM, and layering collaboration, they’re setting themselves apart as more than just an observability vendor.

If your teams are scaling distributed systems, these upcoming features—especially APM 360, IAST, and the Super Agent—are worth keeping an eye on.

---

📌 *Have you tried New Relic Grok or OpenTelemetry in production? Share your experiences in the comments!*

