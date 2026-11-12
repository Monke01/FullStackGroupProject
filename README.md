# QuizForge – Full Stack Quiz Application

A complete, full-stack quiz web application developed according to the Full Stack Web Development course syllabus at SRM University. 

Students can enter their username, configure quizzes by unit or difficulty, attempt 10 randomly selected multiple-choice questions, view their performance with question-by-question reviews, and compete on a live public leaderboard. Faculty and administrators can access the built-in **Admin Portal** to manage the entire course question bank.

---

## 🛠️ Technology Stack

### Frontend
- **React.js 19** (Functional Components & Hooks: `useState`, `useEffect`, `useLocation`, `useNavigate`)
- **React Router DOM 7** (Client-side routing)
- **Lucide React** (Clean, minimalist icons)
- **Professional Academic Theme** (Clean dark slate `#0f172a`, card surfaces `#1e293b`, subtle `#334155` borders, clean rectangular badges, standard typography)

### Backend
- **Java 17 / Java 23**
- **Spring Boot 3.2**
- **Spring Web / RESTful APIs**
- **Spring Data JPA & Hibernate** (ORM & Repositories)
- **MySQL 8+** (Persistent relational storage)

---

## 🔐 Administrative Access

- **Admin Portal URL**: `http://localhost:3000/admin`
- **Default Master Password**: `admin123`
- **Features**:
  - View all questions stored in the database with their options, correct answer, unit, and difficulty.
  - Search questions by statement or ID.
  - Filter questions by course unit.
  - Add new questions to the database via a clean modal form.
  - Delete outdated questions with one click.
  - Real-time question counter synchronized with the platform.

---

## 📂 Project Architecture

```
fswd/
├── quizforge-backend/              # Spring Boot REST API
│   ├── src/main/java/com/quizforge/
│   │   ├── config/WebConfig.java             # CORS configuration (http://localhost:3000)
│   │   ├── controller/                       # REST Controllers
│   │   │   ├── PlayerController.java         # /api/players
│   │   │   ├── QuizController.java           # /api/quiz
│   │   │   ├── LeaderboardController.java    # /api/leaderboard
│   │   │   ├── StatsController.java          # /api/stats
│   │   │   └── AdminController.java          # /api/admin (Login, List, Add, Delete)
│   │   ├── dto/                              # Data Transfer Objects
│   │   │   ├── QuestionDTO.java              # Exposed question without correctAnswer
│   │   │   ├── AnswerSubmission.java
│   │   │   ├── QuizSubmitRequest.java
│   │   │   ├── QuizResultResponse.java
│   │   │   ├── AnswerReview.java
│   │   │   ├── LeaderboardEntry.java
│   │   │   ├── PlayerStatsResponse.java
│   │   │   ├── AttemptSummary.java
│   │   │   └── StatsOverview.java
│   │   ├── entity/                           # JPA Entities
│   │   │   ├── Player.java                   # players table
│   │   │   ├── Question.java                 # questions table
│   │   │   ├── QuizAttempt.java              # quiz_attempts table
│   │   │   └── QuizAnswer.java               # quiz_answers table
│   │   ├── repository/                       # Spring Data JPA Repositories
│   │   │   ├── PlayerRepository.java
│   │   │   ├── QuestionRepository.java       # Random selection by unit/difficulty
│   │   │   ├── QuizAttemptRepository.java
│   │   │   └── QuizAnswerRepository.java
│   │   ├── service/                          # Business logic
│   │   │   ├── PlayerService.java
│   │   │   ├── QuizService.java              # Backend score calculation & validation
│   │   │   └── LeaderboardService.java       # Ranking & leaderboard metrics
│   │   ├── exception/GlobalExceptionHandler.java
│   │   ├── DataInitializer.java              # Seeds 60 syllabus-aligned questions on startup
│   │   └── QuizforgeApplication.java
│   ├── src/main/resources/application.properties
│   └── pom.xml
│
└── quizforge-frontend/             # React SPA Frontend
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js & Navbar.css        # Professional top navigation
    │   │   └── Footer.js
    │   ├── pages/
    │   │   ├── Home.js & Home.css            # Assessment configuration & student history
    │   │   ├── Quiz.js & Quiz.css            # Distraction-free quiz interface with rectangular tags
    │   │   ├── Result.js & Result.css        # Score metrics & question breakdown
    │   │   ├── Leaderboard.js & Leaderboard.css # Academic leaderboard table
    │   │   └── Admin.js & Admin.css          # Question management & creation portal
    │   ├── services/
    │   │   └── api.js                        # Centralized fetch client for backend APIs
    │   ├── App.js & App.css
    │   ├── index.js & index.css
    │   └── package.json
```

---

## 🚀 Setup & Execution Guide

### Prerequisites
- **Java 17+** installed
- **Node.js** (v18+) and `npm` installed
- **MySQL Server** running on port `3306` with database `quizforge`

### 1. Database Configuration
In MySQL:
```sql
CREATE DATABASE IF NOT EXISTS quizforge;
```
Configure `application.properties` with your MySQL credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/quizforge
spring.datasource.username=root
spring.datasource.password=admin123
```

### 2. Run Backend
```bash
cd quizforge-backend
mvn spring-boot:run
```
*(Runs at `http://localhost:8080`)*

### 3. Run Frontend
```bash
cd quizforge-frontend
npm start
```
*(Runs at `http://localhost:3000`)*
