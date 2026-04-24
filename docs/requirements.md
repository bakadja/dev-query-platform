# dev-query-platform
A robust full-stack Q&A platform built with NestJS, Next.js, and TypeScript. Featuring real-time collaboration via WebSockets, AI-powered moderation (OpenAI), and a scalable architecture with TypeORM & Docker. 🚀

In this project, you will build a platform where users can ask technical questions, provide answers, and vote on the best solutions.

## Basic Features

- **Question Feed:** A main dashboard displaying a list of recent questions, showing the title, author, and timestamp.
- **Question Detail Page:** A dynamic route that displays the full question and a list of all submitted answers below it.
- **Ask a Question:** A form to submit a new question with a title and a body.
- **Post an Answer:** A form on the Question Detail page allowing users to submit a solution.
- **Basic Search:** The ability to search for questions by keywords in their titles.
- **Update Questions and Answers:** A form on the Question Detail page allowing users to update a question or answer.

## Additional Features

- **Authentication:** Allow users to sign up, log in, and log out.
- **Upvote / Downvote System:** Allow users to vote on questions and answers, and sort answers by their score.
- **Accept an Answer:** The author of a question can mark one answer as the "Accepted Solution" (highlighting it in green).
- **Tags System:** Add tags (e.g., `javascript`, `react`) to questions and filter the main feed by those tags.
- **Markdown Support:** Allow users to write questions and answers in Markdown so they can format code blocks cleanly.
- **User Profiles & Reputation:** Track how many upvotes a user's answers have received and display a "reputation score."
- **Live Updates:** Display a "Number of people viewing this question right now" badge, and broadcast a real-time event when a new answer is posted.

---

## Implementation Recommendations

Here is how this project maps to the specific technologies in your course:

### TypeScript

- **Data Contracts:** Create robust interfaces for complex API payloads (e.g., ensuring a `Question` object always includes an array of `Answer` objects and a `Tag` array).
- **Tooling:** Use `nodemon` or `tsx` to keep your backend development smooth as you constantly tweak your database models.

### Backend Basics / Template Engines

- **Server-Side Rendering:** Use `Express` and `Nunjucks` to render the list of questions on the server.
- **REST API:** Build clean endpoints like `GET /questions`, `POST /questions`, and `POST /questions/:id/answers`.
- **SQLite:** Restructure your data into separate tables (e.g., `users`, `questions`, `answers`, `tags`) and use `SQLite` and use relations to connect them.

### OOP

- **Inheritance:** Create an abstract `Post` class that contains shared properties (like `body`, `authorId`, `createdAt`, `score`). Then, have your `Question` class (adding `title` and `tags`) and `Answer` class (adding `isAccepted` and `questionId`) inherit from it.

### NestJS

- **Database Relations:** Use `TypeORM` and `MySQL` to handle complex relations:
  - `Many-to-Many` relationships between `Questions` and `Tags`
  - `One-to-Many` relationships between `Questions` and `Answers`
  - `Many-to-One` relationships between `Users` and `Questions`

### Next.js App Router

- **Server-Side Rendering:** Use `Server Components` to fetch and render the Question Detail pages so they load instantly.
- **Dynamic Routing:** Use file-based routing (e.g., `/questions/[id]`) to generate pages for each question automatically.
- **Server Functions:** Use `Server Actions` to handle form submissions and API requests.

### WebSockets

- **Live Notifications:** Broadcast a real-time event when a new answer is posted. If User A is reading their question, a toast notification can pop up saying "User B just posted an answer!" without them needing to refresh the page.
- **Live View Count:** Show a real-time "Number of people viewing this question right now" badge.
