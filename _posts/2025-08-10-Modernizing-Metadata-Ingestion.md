---
title: "From Perl to Spring Batch: Modernizing Metadata Ingestion for Global Expansion"
date: 2025-08-10
categories: case-study
tags:
  - architecture
  - ingestion
  - metadata
  - migration
  - modernization
  - perl
  - script
  - spring-batch
  - testing
  - transformation
  - validation
featured_image: /assets/images/From-Perl-to-Spring-Batch-Featured.png
excerpt:
featured: true
---

At TiVo, our metadata ingestion pipeline relied on a **5,000-line Perl script** — a critical but undocumented monolith that became a growing obstacle to innovation. Each new metadata provider, feature update, or market expansion meant diving into a labyrinth of nested `if-else` statements.

This script wasn’t just hard to maintain—it was holding us back.

- **Opaque logic:** Problems surfaced only when end users reported them. 
- **Slow iteration:** Testing required running the entire ingestion stack on VM servers.
- **Poor scalability:** The system could only scale vertically, limited by a single machine. 
- **Blocked expansion:** Onboarding new European markets became an engineering nightmare.

![TiVo Metadata Ingestion](/assets/images/From-Perl-to-Spring-Batch-Featured.png)

It was clear: if TiVo wanted to expand globally, we needed to replace the Perl monster with a system that was **flexible, testable, and scalable by design**.

## The Metadata Monster in the Room: Our 5K-Line Perl Script

The core of our metadata ingestion pipeline was a behemoth Perl script, sprawling over 5,000 lines. It was a classic "write-only" piece of software, riddled with nested `if-else` statements that made it incredibly difficult to decipher.

**Here's why it was a nightmare:**

* **Black Box Mentality:** Changes from metadata providers, or the introduction of new features, were often discovered reactively. If we weren't explicitly notified, the impact remained unknown until users reported issues.  
* **Tedious Verification:** Updating the script or validating new data required running the entire ingestion platform on VM servers. This process was painfully slow, consuming valuable engineering hours.  
* **Stifling Expansion:** TiVo was aggressively expanding into new European markets, each with its unique metadata providers and ingestion requirements. Retrofitting the existing Perl script for each new market became an unsustainable engineering burden. The system lacked flexibility and was a massive blocker to our global ambitions.  
* **Vertical Scaling Only:** Due to its in-memory data processing, the Perl script could only be scaled vertically by adding more resources to a single server. This was a severe limitation for handling increasing data volumes.

We knew this couldn't continue. The manual, reactive approach was not only inefficient but also posed a significant risk to data quality and our market expansion goals.

## Advocating for Change: A Leap Towards Modernity

I saw an opportunity for a fundamental shift. I advocated for a complete overhaul, proposing a move to a Java-based application, specifically leveraging the **Spring Boot** framework with **Spring Batch**. My proposal wasn't just about rewriting code; it was about introducing robust engineering practices, testability, and a flexible architecture.

The goal was clear:

* **Introduce Unit and End-To-End Testing:** Ensure code reliability and prevent regressions.  
* **Enhance Maintainability:** Break down complexity into manageable, understandable components.  
* **Be Agile:** Rapidly onboard new metadata providers and adapt to changes.  
* **Enable Horizontal Scaling:** Move beyond the limitations of single-instance, in-memory processing.

## The New Architecture: A Strategy-Based Pipeline

Our solution leveraged the power of **Spring Batch** to create a highly configurable and testable ingestion pipeline. The most significant architectural change was the complete elimination of the monolithic `if-else` logic in favor of a **strategy pattern**.

### Strategy Interface

We introduced a **strategy interface** that transformed metadata provider inputs into TiVo’s canonical format:

```java
interface ProgramTransformer<T extends SourceProgram> {
    /**
     * Determines whether this strategy supports the given source.
     *
     * @param source Instance of the source metadata to be transformed
     * @return {@code true} if this instanc e is capable of transforming this source metadata
     */
    boolean supports(T source);

    /**
     * Transforms the given source into a canonical {@link TiVoProgram} format.
     *
     * @param source Instance of the source metadata to be transformed
     * @param metadataContext Contextual information about the metadata provider 
     * @return A canonical representation of the source metadata
     */
    TiVoProgram transform(T source, MetadataContext metadataContext);
}
```

Here’s how it worked:

- `SourceProgram` represents the common denominator for program metadata, whether a TV show or a movie.
- Each implementation of `ProgramTransformer` handled provider-specific transformations, mapping raw metadata into TiVo’s `TiVoProgram` model.
- Example strategies included:
  - `USMovieGenreTransformStrategy` - transforms US movie genre details.
  - `USTvShowTransformStrategy` - transforms US TV show genre details.
  - `OnoMovieGenreTransformStrategy` (for a Spanish metadata provider called Ono)
  - `OnoTVGenreTransformStrategy` (for a Spanish metadata provider called Ono)

The strategy pattern was also used to **validate** and **transform** metadata.

Instead of maintaining one massive script that tried to cover every case, we now had **modular, testable classes**. Each new provider could be onboarded by plugging in an existing transformer or writing a new one—without disturbing the rest of the pipeline.

### Strategy Chains

Once we had the ProgramTransformer interface, assembling provider-specific pipelines became straightforward. For example, a US metadata provider might require a chain of transformers for TV shows, while a European provider like Ono required a slightly different chain for movies.

Here’s a simplified example of how we configured this in Spring Batch:

```java
@Configuration
public class MetadataIngestionJobConfig {

    @Bean
    public Job metadataIngestionJob(JobRepository jobRepository,
                                    Step transformStep) {
        return new JobBuilder("metadataIngestionJob", jobRepository)
                .start(transformStep)
                .build();
    }

    @Bean
    public Step transformStep(JobRepository jobRepository,
                              PlatformTransactionManager transactionManager,
                              ItemReader<SourceProgram> reader,
                              ItemWriter<TiVoProgram> writer,
                              List<ProgramTransformer<? extends SourceProgram>> transformers) {
        return new StepBuilder("transformStep", jobRepository)
                .<SourceProgram, TiVoProgram>chunk(100, transactionManager)
                .reader(reader)
                .processor(source -> {
                    // Apply matching transformer based on source type/provider
                    for (ProgramTransformer transformer : transformers) {
                        if (transformer.supports(source)) {
                            return transformer.transform(source, MetadataConfigs.defaultConfig());
                        }
                    }
                    throw new IllegalArgumentException("No transformer found for " + source);
                })
                .writer(writer)
                .build();
    }
}
```

```mermaid
flowchart TD
    subgraph Providers
        A1[US Metadata Provider] 
        A2[Ono Metadata Provider (Spain)]
        A3[Other Providers...]
    end

    subgraph Transformer Layer
        T1[US Movie Genre Transform Strategy]
        T2[US TV Show Transform Strategy]
        T3[Ono Movie Genre Transform Strategy]
        Tn[...]
    end

    subgraph Canonical Model
        C[TiVoProgram]
    end

    subgraph Outputs
        O1[Ingestion CSVs]
        O2[Downstream APIs]
        O3[Analytics Pipelines]
    end

    A1 -->|SourceProgram| T1
    A1 -->|SourceProgram| T2
    A2 -->|SourceProgram| T3
    A3 -->|SourceProgram| Tn

    T1 --> C
    T2 --> C
    T3 --> C
    Tn --> C

    C --> O1
    C --> O2
    C --> O3

```

### 🔑Key points:

- Each `ProgramTransformer` could implement a simple `supports(SourceProgram source)` method to indicate if it applies.
- The **Spring Batch** processor looped through available strategies and delegated to the right one.
- Adding a new provider was as simple as writing a new `ProgramTransformer` and wiring it into the Spring context.

Instead of one giant script trying to handle every scenario, we now had:

1. **Modular Strategies:** Each `if-else` block from the Perl script was refactored into a focused, testable Java class implementing our strategy interface.  
2. **Configurable Chains:** For each new metadata provider, we simply configured a specific sequence of these strategies. This allowed us to onboard new metadata providers by either plugging in existing strategies or building custom strategies tailored to their unique requirements.  
3. **Spring Batch Power:** Spring Batch provided the robust framework for managing batch jobs, including transaction management, restartability, and comprehensive logging.  
4. **Database-Backed Storage:** By utilizing MySQL as our persistence layer, we moved away from in-memory limitations, enabling data to be stored, queried, and manipulated more effectively. This also allowed us to generate CSV outputs from the database.

## Deployment Strategy: Parallel Run and Shadow Mode

Migrating such a critical system required a careful, low-risk deployment strategy. We chose a **parallel run** approach with a **shadow mode**:

1. **Co-existence:** Initially, the Spring Boot application was deployed alongside the existing Perl script.  
2. **Dual Output & Comparison:** The Perl script continued its primary role of ingesting files and producing its CSV output. However, it was also configured to trigger the new Spring Boot application asynchronously. The Spring Boot application, in turn, parsed the same input file and generated its own output.  
3. **Real-time Diffing:** A crucial step was added to the Spring Boot application to compare its output with the output generated by the Perl script.  
4. **Validation & Refinement:**  
   * For critical discrepancies, we either fixed the Spring Boot application to correctly replicate the desired logic or, if the Perl script's behavior was a non-critical business-specific quirk, we explicitly disabled that particular diff in our comparison logic.  
   * In some cases, the diffs exposed actual bugs in the Perl script, which we then fixed in both systems.  
5. **Confidence Building:** We ran this parallel "shadow mode" for over a month. This period allowed us to build significant confidence in the new system's accuracy and stability under real-world production load.  
6. **Cutover:** Once we were fully confident, we gracefully shut down the Perl script, making the Spring Boot application the primary and sole metadata ingestion engine.

## The Impact: Uncovering Bugs, Accelerating Growth, and Unlocking Scalability

The migration delivered far more than just a modernization—it transformed how we worked:

- **Uncovered hidden bugs:** Unit testing each strategy surfaced long-standing issues in the Perl script. Dozens of defects—some lurking in production for years—were finally fixed.
- **Accelerated onboarding:** What once took weeks of retrofitting could now be done in days by composing new strategy chains. This directly fueled TiVo’s expansion into multiple European markets.
- **Boosted developer confidence:** With modular, testable components, engineers could extend the pipeline without fear of regressions.
- **Scalable by design:** Horizontal scaling through Spring Boot and MySQL let us ingest growing data volumes simply by adding more instances.
- **Faster iteration cycles:** Automated testing and database-backed validation replaced slow, manual verification, cutting release cycles dramatically.

This wasn’t just a rewrite of a script—it was the removal of a **global bottleneck**. By replacing fragility with flexibility, we turned ingestion into an enabler of growth rather than a blocker.

## Lessons Learned: Making Legacy Modernization Work

1. **Run old and new applications in parallel.** Shadow systems build trust. Comparing outputs in real time gave us confidence before cutover. 
2. **Tie tech to business goals.** Modernization gained traction because we linked it directly to faster onboarding and global expansion. 
3. **Invest in testing early.** Unit and end-to-end tests surfaced hidden bugs and protected us from regressions. 
4. **Earn leadership buy-in.** Consistent validation results turned skepticism into support. 
5. **Monitor everything.** Dashboards and metrics ensured we caught edge cases quickly and tracked success post-launch. 

**Bottom line:** Modernization is not just a technical upgrade—it’s a business strategy. With the right approach, even the most intimidating legacy systems can become engines of agility and growth.

> Thanks to the engineering leadership and engineering team at TiVo, we were able to successfully complete this project in less than 3 months.