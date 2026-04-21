# **Project Backlog: Q&A Forum (ASD Stack)**

Here is the breakdown of my project into actionable tickets, aligned with the project README and my curriculum.

## **🏁 Phase 1: Foundations & Modeling (Weeks 1 - 5)**

*Goal: Define the structure following OOP principles and TypeScript.*

* [ ] **TS-01: Define Data Interfaces**  
  * Create User, Question, Answer, and Tag interfaces (Data contracts).  
* [ ] **OOP-01: Class Architecture (Inheritance)**  
  * Implement the abstract `Post` class as requested in the README.  
  * Create Question and Answer classes inheriting from `Post`.  
* [ ] **SQL-01: Relational Database Schema**  
  * Model tables for users, questions, answers, and tags.  
  * Define Many-to-Many relations (Questions/Tags).

## **🏗️ Phase 2: NestJS Backend Core (Weeks 6 - 8)**

*Goal: Build a robust and secure API.*

* [ ] **NEST-01: Modules & Dependency Injection**  
  * Initialize NestJS with dedicated modules.  
* [ ] **DB-01: TypeORM & MySQL Configuration**  
  * Map entities and manage complex relationships.  
* [ ] **AUTH-01: Authentication & Sessions**  
  * Implement Login/Register and route protection for "Ask a Question".  
* [ ] **DOCKER-01: Dev Environment**  
  * Setup Docker for the DB and the API.

## **🖥️ Phase 3: Next.js Interface & UX (Weeks 9 - 10)**

*Goal: Create the Question Feed and detail pages.*

* [ ] **UI-01: Dashboard & Question Feed**  
  * Display the list using Server Components.  
* [ ] **UI-02: Dynamic Detail Page**  
  * Route `/questions/[id]` displaying the question and its answers.  
* [ ] **FORM-01: Full CRUD (Ask/Edit/Delete)**  
  * Forms to ask a question and modify its content.  
* [ ] **SEARCH-01: Search System**  
  * Keyword search bar within titles.

## **⚡ Phase 4: Advanced Features (Weeks 11 - 13)**

*Goal: Real-time, Voting, and AI.*

* [ ] **VOTE-01: Upvote/Downvote System**  
  * Score logic and sorting answers by popularity.  
* [ ] **WS-01: WebSockets (Live Updates)**  
  * "New post" notifications and "Reading now" badge.  
* [ ] **AI-01: Moderation & AI Tags**  
  * Use OpenAI to validate content and suggest tags.

## **🚀 Phase 5: Finalization**

* [ ] **MD-01: Markdown Support**  
  * HTML rendering of questions/answers written in Markdown.  
* [ ] **DEP-01: Deployment & CI/CD**