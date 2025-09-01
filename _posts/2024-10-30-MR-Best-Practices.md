---
title: Merge Request Best Practices
date: 2024-10-30
categories: [best-practices]
tags: 
  - best-practices
  - merge-request
  - mr
  - pr
---

# Overview
This is a living document to be used as a reference to the agreed-upon best practices to follow when creating or reviewing a Merge Request (MR).

**NOTE** that these best practices are meant to be guidelines to follow; however, as we evolve, some practices may no longer be deemed best, and so this document should be updated accordingly.

## Merge Request Best Practices
There are several best practices you can follow when creating merge requests on GitLab. These practices ensure efficient collaboration, maintain code quality, and facilitate the review process. Here are some recommendations:

### 1. Use Meaningful Titles
Choose descriptive titles that summarize the purpose of your merge request. A well-written title helps reviewers quickly grasp the nature of your changes and facilitates efficient collaboration.

### 2. Provide Clear and Concise Descriptions
Clearly explain the purpose and context of your merge request. Describe what problem you're addressing, the solution you've implemented, and any relevant information that reviewers should know. This helps reviewers understand the intent behind your changes.

#### 2.1 Make use of the MR description
Think about your reviewers when creating an MR. Consider adding contextual descriptions to your MR. For example, when fixing an API, paste the request and response to your MR to provide visual evidence that your code has addressed the underlying issue. This is a great way to confirm that you have tested your code changes.

### 3. Create Small, Focused Merge Requests
Break down your changes into smaller, logical units of work. This makes it easier for reviewers to understand and provide feedback. It also allows for better tracking of changes and helps identify specific issues if they arise.

#### 3.1 Keep Code Changes Focused
Try to limit the scope of your merge requests to a single feature or bug fix. Mixing unrelated changes in the same MR can complicate the review process and make it harder to track specific changes.

#### 3.2 Break Jira Story into Subtasks
Consider creating Jira Subtasks for your stories so that MR is created against the Subtasks. This will help in making sure your MR is small and focused.

#### 3.3 Break Huge MR into Smaller MRs
Sometimes reviewers may recommend a code change that may require refactoring. If the refactoring will affect many files, consider creating a separate MR to tackle the refactoring first, so that your original MR is focused on the business changes and not the refactoring.

### 4. Review Your Code
Before submitting a merge request, take the time to review your code. This self-review process helps with catching any obvious mistakes or issues and ensures that your changes meet the project's standards. It also shows your commitment to delivering high-quality code.

### 5. Test Locally Before Submitting
Before creating a merge request, thoroughly test your changes locally to catch any obvious issues. This helps reduce the burden on reviewers and ensures that the merge request is of high quality.

#### 5.1 Include Test Cases
Include relevant test cases to verify the correctness of your changes. This demonstrates that you've considered different scenarios and helps maintain the overall code quality.

#### 5.2 Update Existing Test Cases
Run a full build before raising your MR. Existing well-written test cases may fail if your new code modified existing behavior. If existing test cases do not fail as a result of the new code changes, then you need to update the existing test cases appropriately.

#### 5.3 Create New Test Cases
Where possible, create new test cases for new functionality. Or better yet, inspect the Code Coverage metrics and add any relevant test cases.

#### 5.4 Make Sure You Have Not Regressed on Code Coverage
Make sure you run a clean build with the `jacocoReport` task which will fail your build locally in the event that you have not provided enough code coverage.
```sh
sh gradlew clean build jacocoReport
```

### 6. Keep an Eye on the Merge Request
Actively participate in the review process by responding to feedback and addressing any concerns. Collaboration and timely communication with reviewers can help expedite the merging process.

#### 6.1 Address Code Review Comments
Actively engage with the feedback received during the review process. Take the time to understand and address the comments and suggestions from reviewers. This collaboration ensures that the final code is high quality and aligns with the project's standards.

#### 6.2 Use Discussion and Collaboration Features
GitLab provides various collaboration features, such as inline commenting and discussions. Encourage reviewers to use these features to provide feedback, ask questions, and have meaningful discussions about the code. Engage in these discussions promptly and provide clear responses to facilitate a constructive review process. If you and the reviewer have had a side conversation outside of GitLab, please add a comment explaining what was agreed upon in your MR so as to give context to other reviewers.

### 7. Maintain a Consistent Coding Style
Follow the established coding style guidelines of the project. Consistency in code formatting helps improve readability and ensures that the codebase remains cohesive.

#### 7.1 Be Consistent in Your Coding
Follow a specific style and stick with it and do not use different styles. For example, we recommend that you import the `org.assertj.core.api.Assert` class statically; however, if you choose to be more verbose, then stick with this pattern. Consider following existing project patterns.

### 8. Consider the Impact on Other Modules
When making changes, consider the potential impact on other modules or components of the system. Document any necessary modifications or dependencies in your merge request, ensuring that other developers are aware of any related changes they need to make.

#### 8.1 Reach Out to Code Owners
If you are fixing a bug in a service you are not familiar with, reach out to code owners for guidance on how to test your code changes effectively.

#### 8.2 Add Integration Tests
In order to avoid impacting other modules, add integration tests against the dependent services so that you can catch issues before they fail.

### 9. Leverage Merge Request Templates
GitLab allows you to create merge request templates that include predefined sections for description, tasks, testing, and other relevant information. Utilize these templates to provide consistent and structured information in your merge requests, making it easier for reviewers to understand and evaluate your changes.

#### 9.1 Use the Commitizen Tool
[Commitizen](https://commitizen.github.io/cz-cli/) is a release management tool designed for teams and it uses conventional commits. Follow the conventional commits as they are great for auto-managing the release version for the project.

### 10. You Are Your Own Advocate
As the owner of your MR, it should be in your best interest to ensure that you get the true benefits of code review, like consistent design & implementation, confidence of stakeholders, teaching & sharing knowledge, etc.

#### 10.1 Include Subject Owner Experts as Your Reviewers
It is in your best interest that subject owner experts have a say in your design choices. Most often some of your reviewers are reviewing coding structure but may not have the full business knowledge. Use your own judgment to the extent that you engage with subject owner experts. Having a design document upfront and having it reviewed goes a long way.

#### 10.2 Share Knowledge and New Techniques
Think of an MR as a place for developers to interact and share knowledge. Call upon your peers to review your code for the benefit of sharing new techniques and as a way to disseminate knowledge to others.

