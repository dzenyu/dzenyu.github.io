---
description: "Use when writing, reviewing, editing, or improving blog posts in _posts/. Covers voice, structure, decision-making, diagrams, tradeoffs, and high-impact technical/product blog practices."
applyTo: "_posts/**/*.md"
---

# Blog Writing Rules

## Voice and Tone

Write in a direct, professional voice. Avoid informal contractions and shorthand.

### Banned contractions and shortcuts

Never use the following (or equivalent forms):

| Banned | Replace with |
|---|---|
| `we'd` | `we would` |
| `don't` | `do not` |
| `didn't` | `did not` |
| `weren't` | `were not` |
| `wasn't` | `was not` |
| `I'd` | `I would` |
| `I'm` | `I am` |
| `Here's` | `Here is` |
| `there's` | `there is` |
| `it's` | `it is` |
| `can't` | `cannot` |
| `won't` | `will not` |
| `that's` | `that is` |
| `you'll` | `you will` |
| `you've` | `you have` |
| `we've` | `we have` |
| `they're` | `they are` |
| `we're` | `we are` |

Apply this to all prose, captions, diagrams, and tables.

---

## Opening and Framing

### Opening paragraphs

- Do not use clichés or dramatic framing.
- Start with:
  - What the system was
  - The constraint or failure mode
  - The decision that was made

### Problem framing (mandatory)

Within the first two paragraphs:

- Define the **initial state**
- Define the **constraint** (scale, cost, latency, team size, timeline)
- State what would fail if nothing changed

---

## Audience

- Identify the audience within the first two paragraphs:
  - Engineers, product managers, founders, or mixed
- Optional: include targeted sections:
  - “For engineers”
  - “For product leaders”

---

## Structure

### TL;DR and Key Takeaways

- **TL;DR**:
  - Max 3 bullets
  - Strategic statements only

- **Key Takeaways / Playbook**:
  - Numbered list
  - Each item includes:
    - Rule
    - Rationale (1–2 sentences)

### Numbered playbooks over bullets

Use numbered lists for:
- Lessons learned
- Step-by-step processes
- Decision frameworks

### Summary tables for comparisons

For 4+ items, include a table first:

| Item | Detail | Outcome |

Keep cells concise.

### Before vs After (required for improvements)

When describing changes, include:

| Aspect | Before | After |
|--------|--------|-------|

---

## Decision Documentation (Critical)

For every major decision, include:

- Options considered (2–3 minimum)
- Tradeoffs
- Final decision
- Long-term implications

Example:

```

Decision: Use Kafka over SQS

Options:

* Kafka
* SQS
* Direct service calls

Tradeoffs:

* Kafka: complexity, replay capability
* SQS: simplicity, limited ordering

Decision:
Kafka selected for replay and event-driven architecture

Implication:
Higher operational cost but enables future analytics pipeline

```

---

## Failure and Incident Transparency

Explicitly document:

- What failed
- How it was detected
- Why it was not caught earlier
- Incorrect assumptions

Do not sanitize failure.

---

## Technical Content

### Mermaid diagrams

Include diagrams when explaining:

- Architecture
- Workflows
- Multi-step processes

Use:

- `flowchart TD` for flows
- `sequenceDiagram` for interactions
- `alt/else` for success/failure

Apply:

```

---

config:
look: neo
---------

```

### Sequence diagrams must reflect reality

- Include initiating actors
- Do not imply behavior that does not exist (e.g., polling)

---

## Quantitative Context

Always include approximate numbers:

- Scale: “tens of millions”
- Latency: p50/p95/p99
- Timeframe: rollout duration
- Team size

Avoid vague statements.

---

## Code and Configuration

- Include only high-signal snippets:
  - critical queries
  - configs
  - integration points
- Do not dump full files
- Explain why the snippet matters

---

## Tradeoffs and Cost

### Tradeoffs (mandatory)

- Always include what was lost, not just gained

### Cost awareness

- Highlight cost-impacting decisions
- Include estimates when possible

Example:
- “MSK cluster costs approximately $3K/month in production”

---

## Production and Operations

Include:

- Deployment strategy (blue/green, canary)
- Rollback approach
- Observability (metrics, logs, tracing)
- On-call or operational implications

Architecture without operations is incomplete.

---

## Terminology Consistency

- Define domain terms once
- Use consistently
- Avoid synonyms for core entities

---

## Anti-Patterns

Include a section for:

- What not to do
- Common mistakes
- Misleading but tempting approaches

---

## Readability and Visual Hierarchy

- Paragraphs: max 3–5 lines
- Use bold for:
  - decisions
  - outcomes
  - metrics
- Use callouts for warnings or key insights

Optimize for skimming.

---

## Sections Must Be Distinct

If two sections overlap:

- Merge them, or
- Rename clearly

Avoid conceptual duplication.

---

## Real-World Validation

Include:

- Production usage
- Real scenarios
- Edge cases encountered

Avoid purely theoretical writing.

---

## Call to Action (Product Tie-In)

End with a natural bridge:

- Connect the blog to the product
- Provide a clear next step

Example:
- Try the feature
- Explore the system
- Link to product or demo

---

## Series and Continuity

- Link to related posts
- Label multi-part series

Example:
- Part 1: Architecture
- Part 2: Scaling

---

## Titles

Titles must include:

- Technology or system
- Outcome or problem

Avoid vague titles.

---

## Closing

- Final paragraph must set up the closing line
- Closing line should reinforce:
  - insight
  - lesson
  - forward-looking idea

---

## References

- Group by category:
  - Vendor docs
  - Tools
  - Infrastructure

Do not list as a flat set.

---

## General Principles

- One idea per section
- Concrete over abstract
- Show decisions, not just results
- Show tradeoffs, not just wins
- Optimize for clarity and trust
- Avoid jargon and buzzwords