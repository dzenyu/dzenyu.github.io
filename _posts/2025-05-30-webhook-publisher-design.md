---
layout: post
title: "Designing a Scalable Webhook Publisher with FIFO Ordering and Resilience4j"
date: 2025-08-30
categories: [architecture]
tags: [webhooks, kafka, resilience4j, springboot, distributed-systems, architecture]
---

# Designing a Scalable Webhook Publisher with FIFO Ordering and Resilience4j

Webhooks are the backbone of event-driven systems. They allow services to notify downstream systems asynchronously. But designing a webhook publisher that is both scalable and reliable comes with challenges:

- **How do we ensure FIFO (first-in, first-out) ordering?**
- **How do we handle retries with backoff while preventing message storms?**
- **How do we keep throughput high even with thousands of events per second?**

In this blog, I’ll share how we scaled this design to handle **5K+ events in FIFO order** without impacting throughput.

---

## Architecture Overview

Our architecture leverages **Spring Boot**, **Kafka**, and **Resilience4j** for retries and resilience.

```mermaid
flowchart LR
    A[Event Producer] -->|Publishes| B[Kafka Topic: webhook_events]
    B --> C[Webhook Publisher Service]
    C --> D[Resilience4j Retry + Circuit Breaker]
    D --> E[Target Webhook Endpoints]
    C --> F[Dead Letter Queue (DLQ)]
Key Design Principles
1. FIFO Ordering with Kafka
Kafka guarantees ordering within a partition. To enforce strict FIFO:

Partition by subscriptionId or endpointId.

This ensures all messages for a given endpoint arrive in order.

2. Webhook Publisher with Resilience4j
Instead of using Spring Retry, we switched to Resilience4j for fine-grained control.

java
Always show details

Copy code
RetryConfig retryConfig = RetryConfig.custom()
    .maxAttempts(5)
    .waitDuration(Duration.ofSeconds(2))
    .intervalFunction(IntervalFunction.ofExponentialBackoff())
    .retryExceptions(IOException.class, TimeoutException.class)
    .build();

RetryRegistry registry = RetryRegistry.of(retryConfig);
Retry retry = registry.retry("webhookPublisher");
We wrap the outbound HTTP call with this retry policy to prevent message loss.

3. Circuit Breaker Protection
If an endpoint is failing consistently, we trip a circuit breaker to stop flooding it.

java
Always show details

Copy code
CircuitBreakerConfig config = CircuitBreakerConfig.custom()
    .failureRateThreshold(50)
    .waitDurationInOpenState(Duration.ofSeconds(30))
    .slidingWindowSize(20)
    .build();
4. Dead Letter Queue (DLQ)
If retries are exhausted, events are pushed to a DLQ for later inspection and reprocessing.

Scaling Considerations
Horizontal Scaling
Multiple webhook publisher instances can consume from Kafka in parallel.

As long as partitioning is aligned, FIFO is preserved.

Backpressure Handling
Kafka acts as a natural buffer when endpoints are slow.

Resilience4j prevents system-wide slowdowns via bulkhead + rate limiter.

Performance Tuning (New Section)
Designing for 5K+ events/sec required tuning at multiple levels:

Kafka Tuning
Increase partition count to improve parallelism.

Use linger.ms and batch.size for better batching efficiency.

Resilience4j Tuning
Configure dynamic backoff strategies.

Use RateLimiter to cap requests per endpoint.

Spring Boot + HTTP Client Tuning
Use WebClient (Reactor Netty) instead of RestTemplate for async I/O.

Configure connection pools and timeouts properly.

yaml
Always show details

Copy code
spring:
  webclient:
    connect-timeout: 2000
    read-timeout: 5000
Monitoring & Observability
Dashboards for retry counts, circuit breaker states, DLQ backlog.

Tracing with OpenTelemetry for end-to-end visibility.

Final Thoughts
Designing a webhook publisher that is both reliable and scalable requires more than just retries—it requires smart resilience patterns and system tuning.

By combining Kafka, Resilience4j, and Spring Boot, we built a solution that:

Guarantees FIFO ordering per endpoint.

Scales to 5K+ events/sec without throughput loss.

Handles failures gracefully with retries, circuit breakers, and DLQs.

Have you faced similar challenges scaling webhook systems? Share your experience in the comments below!
"""

Save as markdown file under _posts
output_path = Path("/mnt/data/_posts/2025-08-30-webhook-publisher.md")
output_path.parent.mkdir(parents=True, exist_ok=True)
output_path.write_text(blog_content, encoding="utf-8")

output_path

Always show details

Copy code
Result
PosixPath('/mnt/data/_posts/2025-08-30-webhook-publishe