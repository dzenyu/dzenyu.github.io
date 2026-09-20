export interface LegacyRedirect {
  /** Exact, case-sensitive path the old Jekyll site served. */
  oldPath: string;
  /** New canonical path on the Astro site. */
  newPath: string;
}

export const legacyRedirects: LegacyRedirect[] = [
  {
    oldPath: "/conference/2018/04/13/AWS-Summit-SFO-2018.html",
    newPath: "/conference/2018/04/13/aws-summit-sfo-2018/",
  },
  {
    oldPath: "/conference/2021/11/01/Amazon-ION-QLDB.html",
    newPath: "/conference/2021/11/01/amazon-ion-qldb/",
  },
  {
    oldPath: "/conference/2023/12/06/Newrelic-Roadmap-Showcase.html",
    newPath: "/conference/2023/12/06/newrelic-roadmap-showcase/",
  },
  {
    oldPath: "/faith/2024/08/15/From-Old-To-New-Testament.html",
    newPath: "/faith/2024/08/15/from-old-to-new-testament/",
  },
  {
    oldPath: "/best-practices/2024/10/20/Java-Coding-Best-Practices.html",
    newPath: "/best-practices/2024/10/20/java-coding-best-practices/",
  },
  {
    oldPath: "/best-practices/2024/10/21/General-Coding-Best-Practices.html",
    newPath: "/best-practices/2024/10/21/general-coding-best-practices/",
  },
  {
    oldPath: "/best-practices/2024/10/30/MR-Best-Practices.html",
    newPath: "/best-practices/2024/10/30/mr-best-practices/",
  },
  {
    oldPath: "/kafka/2025/02/08/Optimizing-Kafka-Streams-RocksDb.html",
    newPath: "/kafka/2025/02/08/optimizing-kafka-streams-rocksdb/",
  },
  {
    oldPath: "/case-study/2025/03/01/Chegg-Commerce-SAAS-Vendor-Selection.html",
    newPath: "/case-study/2025/03/01/chegg-commerce-saas-vendor-selection/",
  },
  {
    oldPath:
      "/architecture/2025/05/30/Designing-Scalable-Webhook-Delivery-System.html",
    newPath:
      "/architecture/2025/05/30/designing-scalable-webhook-delivery-system/",
  },
  {
    oldPath:
      "/remote-work/2025/08/01/Lessons-Remote-First-Work-Since-2013.html",
    newPath: "/remote-work/2025/08/01/lessons-remote-first-work-since-2013/",
  },
  {
    oldPath: "/walkthrough/2025/08/05/Onboarding-dgraph.html",
    newPath: "/walkthrough/2025/08/05/onboarding-dgraph/",
  },
  {
    oldPath:
      "/architecture/2025/10/15/chegg-recurly-migration-cohorts-compensation.html",
    newPath:
      "/architecture/2025/10/15/chegg-recurly-migration-cohorts-compensation/",
  },
  {
    oldPath:
      "/education/technology/2025/11/20/confluent-data-streaming-cert-prep.html",
    newPath:
      "/education/technology/2025/11/20/confluent-data-streaming-cert-prep/",
  },
  {
    oldPath: "/startup/attendontime/2026/01/18/Building-AttendOnTime.html",
    newPath: "/startup/attendontime/2026/01/18/building-attendontime/",
  },
  {
    oldPath:
      "/case-study/2025/08/10/modernizing-metadata-ingestion-perl-to-spring-batch.html",
    newPath:
      "/case-study/2025/08/10/modernizing-metadata-ingestion-perl-to-spring-batch/",
  },
];
