---
title: "AMAZON QLDB"
date: 2021-11-01
categories: [conference]
tags: [databases, qldb, ledger, ion, java]
---

> Deprecated — Amazon QLDB was retired by AWS in July 2025.
> 
> This post remains for historical reference and may contain outdated APIs/links. Consider alternatives for auditability and immutability (e.g., Amazon Aurora with audit logging, DynamoDB + Streams/event sourcing, OpenSearch for tamper‑evident logs, or third‑party ledger databases).
>
> Choose based on your consistency, verification, and operational requirements.
{: .notice--danger}

## What was Amazon QLDB?

Amazon Quantum Ledger Database (QLDB) was a fully managed ledger database that provided:
- An immutable, append-only journal: All data changes were recorded in a cryptographically verifiable transaction log.
- Verifiable history: You could cryptographically verify that your data hadn’t been tampered with.
- Familiar query surface: It used PartiQL, a SQL-compatible query language, and stored data in Amazon Ion (a superset of JSON).
- Fully managed: No servers to manage, with transactional guarantees and optimistic concurrency control (OCC).

Common use cases included systems of record and audit trails for financial transactions, supply chain events, and other domains requiring data integrity and change history.

Key concepts:
- Journal: The append-only, immutable transaction log.
- Ledger tables and revisions: QLDB maintained a full revision history for each document.
- Verification: Cryptographic digest APIs enabled end-to-end tamper-evidence.
- PartiQL + Ion: Query with SQL-like syntax over semi-structured Ion documents.
- OCC: Optimistic concurrency to manage concurrent updates.

---

# AMAZON QLDB

# Code Snippet

```bash
sudo yum -u update
sudo yum -y install java-1.8.0-openjdk-dev
sudo yum -y install java-1.8.0-openjdk-devel
udo update-alternatives --config javac

java -version
javac -version

curl -s "https://get.sdkman.io" | bashsource "$HOME/.sdkman/bin/sdkman-init.sh"
sdk install gradle

gradle -version
```

### Gradle stuff

```bash
mkdir lab2cd lab2

gradle init --type java-application
```

### build.gradle

```java
dependencies {    
    // This dependency is used by the application.    
    implementation 'com.google.guava:guava:29.0-jre'    
    // Use JUnit test framework    
    testImplementation 'junit:junit:4.13'    
    compile group: 'com.amazon.ion', name: 'ion-java', version: '1.6.1'    
    compile group: 'software.amazon.qldb', name: 'amazon-qldb-driver-java', version: '2.0.0-rc.1'    
    compile group: 'com.amazonaws', name: 'aws-java-sdk-qldb', version: '1.11.785'
}

mavenCentral()
```

### Application.java

```java
package lab2;

public class App {
    public static void main(String[] args) {        
         System.out.println("Let's play with Ion!");    
    }
}
```

The code

```java
package lab2;

import java.util.Iterator;

import com.amazon.ion.*;
import com.amazon.ion.system.*;
import com.amazon.ion.util.*;
import software.amazon.awssdk.services.qldbsession.*;
import software.amazon.awssdk.services.qldbsession.model.OccConflictException;
import software.amazon.qldb.*;
import software.amazon.qldb.exceptions.TransactionAbortedException;
 
public class SlowUpdate {
    public static void main(String[] args) throws Exception {
        QldbSessionClientBuilder sessionClientBuilder = QldbSessionClient.builder();
        //RetryPolicy retryPolicy = RetryPolicy.builder().maxRetries(3).build();
        RetryPolicy retryPolicy = RetryPolicy.none();
        QldbDriver driver = QldbDriver.builder()
                .ledger("ion-lab")
                .sessionClientBuilder(sessionClientBuilder)
                .transactionRetryPolicy(retryPolicy)
                .build();
         try {
         driver.execute(txn -> { 
             Result result = txn.execute("SELECT * FROM myTable");
             Iterator<IonValue> iterator = result.iterator();
             while (iterator.hasNext()) {
                 IonValue ionValue = iterator.next();
                 System.out.println(ionValue);
             }
            });
         } catch (TransactionAbortedException e) {
             System.out.println("Transaction aborted: " + e.getMessage());
         } catch (OccConflictException e) {
             System.out.println("Occ conflict: " + e.getMessage());
         }
    }
}
```

# References

* Amazon QLDB - https://aws.amazon.com/qldb/
* https://docs.aws.amazon.com/qldb/latest/developerguide/what-is.html
* Amazon QLDB Java Driver - https://javadoc.io/doc/software.amazon.qldb/amazon-qldb-driver-java/latest/index.html
* Amazon ION - http://amzn.github.io/ion-docs/
* Amazon ION Cook book - http://amzn.github.io/ion-docs/guides/cookbook.html
* PartiQL (compatible access to relational, semi-structured, and nested data.) - https://partiql.org/
* http://tinyurl.com/y4kdbt3k
* Ledger capabilitlies of QLDB as a demo
* Emile Baizel (AWS): https://tinyurl.com/y4kdnt3k
* https://tinyurl.com/y64kmpmd
