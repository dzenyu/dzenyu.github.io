---
layout: single
title: Java Coding Best Practices
date: 2024-10-20
author_profile: true
comments: true
# Optional: add categories/tags if you want them to appear on taxonomy pages
categories: [java, coding best-practices]
tags: [best-practices, java]
---

## Engineers:

### 1. Follow the Java Naming Conventions
Use meaningful and descriptive names for classes, methods, and variables, following the standard Java naming conventions. This improves code readability and maintainability.

Bad ❌:
```java
class emp {
    int ID;
    String nm;
    void getdt() {}
}
```

Good ✅:

```java
class Employee {
    private int id;
    private String name;

    public String getDetails() {
        return String.format("Employee[id=%d, name=%s]", id, name);
    }
}
```

### 2. Keep Methods Short and Cohesive
Aim for smaller methods that perform a single task. This improves code readability, testability, and makes it easier to understand and modify the code.

Bad ❌:

```java
public void processEmployeeData(Employee emp) {
    // validates employee, saves to DB, and sends notification in one method
}
```

Good ✅:

```java
public void processEmployee(Employee emp) {
    validate(emp);
    save(emp);
    notify(emp);
}
```

### 3. Write Readable and Self-Documenting Code
Use meaningful variable and method names, write clear comments, and avoid unnecessary or complex code constructs. This helps other developers understand your code easily.

Bad ❌:

```java
int d; // days until due date 
```

Good ✅:

```java
int daysUntilDueDate;
```

### 4. Avoid Magic Numbers and Strings
Avoid using hard-coded numbers or strings in your code. Instead, use constants or configuration files to define such values, improving code maintainability and reducing potential bugs.

Bad ❌:

```java
if (userRole == 1) { // 1 = Admin
    // do something
}
```

Good ✅:

```java
private static final int ADMIN_ROLE = 1;

if (userRole == ADMIN_ROLE) {
    // do something
}
```

### 5. Use Appropriate Exception Handling
Handle exceptions gracefully by catching specific exceptions rather than using generic catch blocks. Provide meaningful error messages and handle exceptions at the appropriate level of abstraction.

Bad ❌:

```java
try {
    doWork();
} catch (Exception e) {
    e.printStackTrace();
}
```

Good ✅:

```java
try {
    doWork();
} catch (IOException e) {
    logger.error("File operation failed", e);
}
```

Reference: [Effective Java, Item 65: Don't ignore exceptions](https://kea.nu/files/textbooks/new/Effective%20Java%20%282017%2C%20Addison-Wesley%29.pdf).

### 6. Use Interfaces and Polymorphism
Utilize interfaces to define contracts and separate implementation details. Favor composition over inheritance and leverage polymorphism to write flexible and maintainable code.

Bad ❌:

```java
ArrayList<String> list = new ArrayList<>();
```


Good ✅:

```java
List<String> list = new ArrayList<>();
```

Reference: [Polymorphism (Wikipedia)](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)?utm_source=chatgpt.com)

### 7. Optimize Loops and Collections
Use enhanced for loops (for-each loop) whenever possible to iterate over collections. Prefer the appropriate collection type based on the requirements to optimize performance and memory usage.

Bad ❌:

```java
for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
}
```

Good ✅:

```java
for (String item : list) {
System.out.println(item);
}
```

Or with Java Streams:

```java
list.forEach(System.out::println);
```

### 8. Utilize Generics
Make use of generics to write type-safe and reusable code. This allows you to provide compile-time safety and avoid unnecessary casting.

Bad ❌:

```java
List list = new ArrayList();
list.add("hello");
Integer number = (Integer) list.get(0); // ClassCastException
```

Good ✅:

```java
List<String> list = new ArrayList<>();
list.add("hello");
String message = list.get(0);
```

Reference: [Generics in Java (Oracle Docs)](https://docs.oracle.com/javase/tutorial/java/generics)

### 9. Minimize Mutable State
Reduce mutable state as much as possible. Immutable objects are easier to reason about and less prone to bugs. Use the `final` keyword for variables, methods, and classes when appropriate.

Bad ❌:

```java
class Counter {
    int count;
}
```

Good ✅:

```java
final class Counter {
    private final int count;

    Counter(int count) {
        this.count = count;
    }
}
```

Reference: [Immutable object (Wikipedia)](https://en.wikipedia.org/wiki/Immutable_object)

### 10. Use StringBuilder for String Manipulation
When building or manipulating strings, use `StringBuilder` or `StringBuffer` instead of concatenating strings with the "+" operator. This improves performance by avoiding unnecessary string object creation.

Bad ❌:

```java
String result = "";
for (int i = 0; i < 1000; i++) {
    result += i;
}
```

Good ✅:

```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i);
}
String result = sb.toString();
```

Also consider:

```java
String message = "Processed %d records in %d seconds".formatted(1100, 10);
```

Reference: [StringBuilder (Oracle Docs)](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html)

Instead of string concatenation, consider `String.formatted(...)` which makes it easier to read the string.

```java
String message = "Successfully processed %d records in %d seconds".formatted(1_100, 10);
```

### 11. Avoid Unnecessary Object Instantiation
Be mindful of creating unnecessary objects in your code. Reuse objects or use object pooling techniques when possible, as object creation can be expensive.

Bad ❌:

```java
String s1 = new String("hello");
```

Good ✅:

```java
String s1 = "hello";
```

### 12. Implement Proper `equals` and `hashCode`
Override the `equals()` and `hashCode()` methods appropriately when implementing custom classes. This ensures correct behavior when using collections such as `HashMap` or `HashSet`.

Bad ❌:

```java
class Person {
    String name;
}
```

Consider using [Lombok](https://projectlombok.org/) in your Java POJOs which will add the necessary `equals(..)` and `hashCode()` methods.

Good ✅ (using [Lombok](https://projectlombok.org/)):

```java
@Data
public class Person {
    private String firstName;
    private String lastName;
    private int age;
}
```

See [@Data](https://projectlombok.org/features/Data) example.

Alternatively, consider using Java Records (ie. `record` feature). The above **POJO** can be rendered as:

```java
public record Person(String firstName, String lastName, int age) {}
```

### 13. Properly Manage Resources
When dealing with I/O operations or resources like files, database connections, or network sockets, make sure to properly close or release them using try-with-resources or try-finally blocks.

Bad ❌:

```java
FileReader reader = new FileReader("file.txt");
reader.close(); // may throw
```

Good ✅:

```java
try (FileReader reader = new FileReader("file.txt")) {
    // use reader
}
```

Reference: [Automatic resource management (Oracle Docs)](https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html)

### 14. Write Unit Tests
Emphasize the importance of writing unit tests for your code. Use frameworks like JUnit 5 to automate testing and ensure the correctness of your code. Aim for high code coverage to catch potential issues early.

Bad ❌:

> // No tests written

Good ✅:

```java
@Test
void shouldAddTwoNumbers() {
    assertThat(Calculator.add(2, 3)).isEqualTo(5);
}
```

Reference: [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/)
[Assertj](https://www.baeldung.com/introduction-to-assertj) is a popular assertion library for Java. 

### 15. Follow SOLID Principles
Encourage adherence to [SOLID](https://simple.wikipedia.org/wiki/SOLID_(object-oriented_design)) principles, which include:
- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

These principles promote modular and maintainable code.

### Final Note:
These best practices are not exhaustive — adapt them to your project’s context. Great engineering means continuously learning, improving, and sharing with peers.
