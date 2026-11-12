# -*- coding: utf-8 -*-

SPRINT_1_DATA = {
    "title": "2.1 Sprint 1: Foundation, Database Architecture & Course Question Seeding",
    "goal": (
        "2.1.1 Sprint Goal with User Stories of Sprint 1\n"
        "The primary goal of Sprint 1 was to establish the architectural foundation of QuizForge, including the "
        "relational MySQL database schema, Spring Data JPA entity mappings, initial 60-question syllabus seeder, "
        "and player identification REST endpoints."
    ),
    "user_stories": [
        ["#US 01", "Student Registration & Identification", "Implement POST /api/players to locate or create a Player entity by unique username.", "Must Have", "Completed"],
        ["#US 02", "Syllabus Question Bank Seeding", "Develop DataInitializer CommandLineRunner to seed 60 technical questions covering Units 1 to 5.", "Must Have", "Completed"],
        ["#US 03", "Platform Statistics Endpoint", "Implement GET /api/stats/overview returning total question count and total examination attempts.", "Should Have", "Completed"]
    ],
    "functional": (
        "2.1.2 Functional Document\n"
        "2.1.2.1 Introduction: Sprint 1 delivers the foundational data structures and persistence mechanisms necessary "
        "for the entire QuizForge ecosystem. It provides the database schema, CORS-compliant API configuration, and "
        "comprehensive questions aligned with the SRM FSWD curriculum.\n\n"
        "2.1.2.2 Product Goal: Ensure seamless player record lookup and populate an educational question repository without "
        "duplicating entries across multiple application restarts.\n\n"
        "2.1.2.3 Demography: Undergraduate software engineering students and faculty examiners operating across campus and "
        "remote environments.\n\n"
        "2.1.2.4 Business Processes: Candidate enters registration identifier -> PlayerService queries PlayerRepository -> "
        "existing record is returned or a new record with timestamp is persisted in MySQL -> candidate identifier is cached in "
        "client localStorage.\n\n"
        "2.1.2.5 Features: Candidate Profile Resolution (POST /api/players) and Syllabus Question Auto-Seeding (CommandLineRunner).\n\n"
        "2.1.2.6 Authorization Matrix: Unauthenticated users can register/retrieve profile identifiers; platform statistics are public.\n\n"
        "2.1.2.7 Assumptions: MySQL Server 8.0+ is running locally on port 3306 with accessible credentials."
    ),
    "architecture": (
        "2.1.3 Architecture Document\n"
        "2.1.3.1 Application: Structured following standard three-tier enterprise patterns:\n"
        "- Presentation Layer: WebMvcConfigurer enabling CORS for http://localhost:3000.\n"
        "- Business Logic Layer: PlayerService handling entity resolution and transaction boundaries.\n"
        "- Persistence Layer: Spring Data JPA repositories extending JpaRepository<Player, Long> and JpaRepository<Question, Long>.\n\n"
        "2.1.3.2 System Architecture: MySQL relational database schema with tables 'players' and 'questions'. The 'players' "
        "table enforces a UNIQUE NOT NULL constraint on username. The 'questions' table stores questionText (VARCHAR 500), "
        "options A through D, correctAnswer (A/B/C/D), unit, and difficulty.\n\n"
        "2.1.3.3 Data Exchange Contract:\n"
        "- POST /api/players: Request body {'username': 'RA2211003010001'}, Response 200 OK with Player JSON object.\n"
        "- GET /api/stats/overview: Response 200 OK {'totalQuestions': 60, 'totalAttempts': 0}."
    ),
    "ui_design": (
        "2.1.4 UI Design\n"
        "The Home page UI incorporates a formal, distraction-free aesthetic with a dark slate background (#0f172a), "
        "card surfaces (#1e293b), and subtle slate borders (#334155). The layout features a Student Registration input "
        "field with user icon, category and difficulty dropdown selectors, action buttons for starting assessments, and "
        "clean metric cards displaying live syllabus question counts."
    ),
    "test_cases": [
        ["TC-01", "Player Creation", "POST /api/players with new username 'TestCandidate'", "New Player entity created with generated ID and timestamp", "Player created with ID 1", "Pass"],
        ["TC-02", "Player Retrieval", "POST /api/players with existing username 'TestCandidate'", "Existing Player record returned without creating duplicate", "Existing ID returned", "Pass"],
        ["TC-03", "Question Bank Seeding", "Start Spring Boot application with empty database", "DataInitializer seeds exactly 60 questions across Units 1 to 5", "60 questions verified in DB", "Pass"],
        ["TC-04", "Duplicate Seeding Prevention", "Restart Spring Boot application with 60 questions present", "DataInitializer detects existing records and skips seeding", "Question count remains 60", "Pass"],
        ["TC-05", "Platform Overview API", "GET /api/stats/overview", "Returns totalQuestions: 60 and totalAttempts count", "Returned valid JSON counts", "Pass"]
    ],
    "daily_progress": (
        "2.1.6 Daily Call Progress\n"
        "Day 1: Project kickoff; defined Maven pom.xml with Spring Boot 3.2, Data JPA, and MySQL dependencies.\n"
        "Day 2: Designed JPA entity classes (Player, Question) and configured Hibernate ddl-auto=update in application.properties.\n"
        "Day 3: Authored 60 technically accurate multiple-choice questions matching SRM FSWD units in DataInitializer.\n"
        "Day 4: Implemented PlayerRepository, PlayerService, and PlayerController; validated JSON endpoints via curl.\n"
        "Day 5: Verified CORS mappings in WebConfig; initialized React 19 frontend project with Lucide icons."
    ),
    "committed_vs_completed": [
        ["Sprint 1 User Stories", "Committed", "Completed", "Variance"],
        ["US#01: Player Profile Management", "Yes", "Yes", "0% (On Schedule)"],
        ["US#02: 60-Question Syllabus Seeding", "Yes", "Yes", "0% (On Schedule)"],
        ["US#03: Platform Statistics Endpoint", "Yes", "Yes", "0% (On Schedule)"]
    ],
    "retrospective": [
        ["Liked", "Learned", "Lacked", "Longed For"],
        [
            "Spring Boot 3 auto-configuration and Hibernate ddl-auto dramatically accelerated database schema initialization.",
            "Learned how to implement custom CommandLineRunner beans to safely seed fixed curricular questions without duplication.",
            "Initial development lacked automated integration test harnesses for verifying cross-origin preflight requests.",
            "Longed for pre-configured MySQL Docker containers to standardize database environments across student development machines."
        ]
    ]
}

SPRINT_2_DATA = {
    "title": "2.2 Sprint 2: Dynamic Quiz Engine, Server-Side Scoring & Answer Review",
    "goal": (
        "2.2.1 Sprint Goal with User Stories of Sprint 2\n"
        "The objective of Sprint 2 was to implement the core evaluation engine, including native randomized question "
        "selection by unit and difficulty, question decoupling via DTOs to eliminate client-side cheating, single-question "
        "assessment UI with animated progress bar, server-side grading, and detailed question-by-question review."
    ),
    "user_stories": [
        ["#US 04", "Topical & Difficulty Filtering", "Enable candidates to filter quizzes by unit (Units 1-5 or All) and difficulty (Easy, Medium, Hard, Mixed).", "Must Have", "Completed"],
        ["#US 05", "Secure Question DTO Delivery", "Serve exactly 10 random questions with correctAnswer stripped from the API payload.", "Must Have", "Completed"],
        ["#US 06", "Single-Question Assessment Interface", "Display one question card at a time with option badges, previous/next navigation, and progress bar.", "Must Have", "Completed"],
        ["#US 07", "Server-Side Grading & Detailed Review", "Calculate score securely on backend, save QuizAttempt and QuizAnswer entities, and return detailed review.", "Must Have", "Completed"]
    ],
    "functional": (
        "2.2.2 Functional Document\n"
        "2.2.2.1 Introduction: Sprint 2 delivers the intellectual core of the application: dynamic exam generation, "
        "secure evaluation, and formative review mechanisms.\n\n"
        "2.2.2.2 Product Goal: Provide an authentic, distraction-free examination experience that guarantees academic "
        "rigor by prohibiting client-side answer disclosure prior to submission.\n\n"
        "2.2.2.3 Demography: Students engaging in self-paced topical revision and formal laboratory assessments.\n\n"
        "2.2.2.4 Business Processes: Candidate initiates quiz -> GET /api/quiz/start fetches 10 random QuestionDTOs -> "
        "student answers questions one-by-one -> submission confirmation modal is triggered -> answers array is transmitted "
        "via POST /api/quiz/submit -> server grades against database records -> attempt and answers are persisted -> client receives "
        "score percentage and comprehensive breakdown review.\n\n"
        "2.2.2.5 Features: Dynamic 10-Question Randomizer, Decoupled Question DTOs, Confirmation Modal, Server-Side Evaluator, "
        "and Comprehensive Answer Review.\n\n"
        "2.2.2.6 Authorization Matrix: Candidates can only attempt quizzes with a valid registered playerId.\n\n"
        "2.2.2.7 Assumptions: The questions table contains at least 10 questions per unit and difficulty combination."
    ),
    "architecture": (
        "2.2.3 Architecture Document\n"
        "2.2.3.1 Application: Business logic encapsulated within QuizService. Question entity is transformed into QuestionDTO "
        "in QuizController, ensuring correctAnswer is never serialized into JSON during quiz delivery.\n\n"
        "2.2.3.2 System Architecture: The QuizAttempt entity represents an assessment session, holding a foreign key to Player, "
        "along with totalQuestions, score, correctAnswers, and attemptedAt timestamp. The QuizAnswer entity maps each attempt to "
        "individual Question records, storing selectedAnswer and boolean isCorrect flag.\n\n"
        "2.2.3.3 Data Exchange Contract:\n"
        "- GET /api/quiz/start?unit={unit}&difficulty={diff}: Returns 10 QuestionDTO objects (id, questionText, optionA-D, unit, diff).\n"
        "- POST /api/quiz/submit: Request payload {playerId: 1, answers: [{questionId: 12, selectedAnswer: 'B'}]}. "
        "Response 200 OK with QuizResultResponse containing score, percentage, performance message, and list of AnswerReview DTOs."
    ),
    "ui_design": (
        "2.2.4 UI Design\n"
        "The Quiz page presents a clean, formal exam interface. The question statement is prominent, flanked by rectangular "
        "unit and difficulty indicator badges. The four options are rendered as interactive selection buttons with A-D badges. "
        "A slim blue progress bar indicates completion progress. Upon clicking Submit, an confirmation modal prevents accidental "
        "premature submission. The Result view displays an evaluation summary card alongside color-coded question cards highlighting "
        "the student's choice against the official answer."
    ),
    "test_cases": [
        ["TC-06", "Quiz Randomization", "Invoke GET /api/quiz/start twice in succession", "Both responses contain 10 questions with randomized order", "Verified random question IDs", "Pass"],
        ["TC-07", "Answer Key Decoupling", "Inspect network JSON payload of /api/quiz/start", "JSON contains no 'correctAnswer' or answer key attributes", "Zero answer leakage confirmed", "Pass"],
        ["TC-08", "Server-Side Scoring", "Submit 8 correct and 2 incorrect answers via POST /api/quiz/submit", "Server returns score: 8, percentage: 80.0, and 10 review items", "Score 8/10 accurately computed", "Pass"],
        ["TC-09", "Attempt Persistence", "Query MySQL quiz_attempts and quiz_answers tables after submission", "New attempt record and 10 answer records successfully persisted", "Verified relational records in MySQL", "Pass"],
        ["TC-10", "Unanswered Question Handling", "Submit quiz leaving 3 questions unanswered (empty string)", "Unanswered questions marked as incorrect (isCorrect: false)", "Correctly graded as incorrect", "Pass"]
    ],
    "daily_progress": (
        "2.2.6 Daily Call Progress\n"
        "Day 1: Formulated native MySQL random query methods in QuestionRepository utilizing ORDER BY RAND() LIMIT :limit.\n"
        "Day 2: Designed QuestionDTO, AnswerSubmission, QuizSubmitRequest, and QuizResultResponse data structures.\n"
        "Day 3: Built QuizService scoring logic and transactional persistence for QuizAttempt and QuizAnswer entities.\n"
        "Day 4: Developed React Quiz component with single-question state, progress bar, and confirmation dialog.\n"
        "Day 5: Built Result review screen with dynamic score cards and color-coded answer verification breakdown."
    ),
    "committed_vs_completed": [
        ["Sprint 2 User Stories", "Committed", "Completed", "Variance"],
        ["US#04: Unit & Difficulty Selection", "Yes", "Yes", "0% (On Schedule)"],
        ["US#05: Question DTO Security Decoupling", "Yes", "Yes", "0% (On Schedule)"],
        ["US#06: Distraction-Free Quiz Card UI", "Yes", "Yes", "0% (On Schedule)"],
        ["US#07: Server Evaluation & Result Review", "Yes", "Yes", "0% (On Schedule)"]
    ],
    "retrospective": [
        ["Liked", "Learned", "Lacked", "Longed For"],
        [
            "The separation of entities from DTOs provided a robust, architecturally sound solution to prevent client-side inspection attacks.",
            "Learned effective use of React state hooks to manage complex multi-question assessments without third-party form libraries.",
            "Initially lacked comprehensive sample questions for Spring Boot microservices, requiring iterative syllabus review.",
            "Longed for built-in visual diagram rendering in questions to support architecture-based quiz problems."
        ]
    ]
}

SPRINT_3_DATA = {
    "title": "2.3 Sprint 3: Public Leaderboard, Admin Question Portal & Deployment Resilience",
    "goal": (
        "2.3.1 Sprint Goal with User Stories of Sprint 3\n"
        "The goal of Sprint 3 was to complete user engagement and administrative modules, including the competitive "
        "public leaderboard with username search, an authenticated administrator question bank management portal with "
        "full CRUD capabilities, and deployment hardening with automated GitHub Actions CI/CD and offline resilience."
    ),
    "user_stories": [
        ["#US 08", "Public Leaderboard & Rankings", "Calculate real-time cumulative scores and rank players primarily by total points, then highest score.", "Must Have", "Completed"],
        ["#US 09", "Username Search Filter", "Provide an instant search input on the leaderboard to locate specific students by registration ID.", "Should Have", "Completed"],
        ["#US 10", "Admin Authentication", "Implement password-protected admin portal restricted by master credential 'admin123'.", "Must Have", "Completed"],
        ["#US 11", "Question Bank Management Portal", "Allow administrators to view, search, add, and delete questions from the MySQL database via web UI.", "Must Have", "Completed"],
        ["#US 12", "Deployment & Offline Resilience", "Configure GitHub Pages automated workflow, HashRouting, and fallback syllabus data store.", "Must Have", "Completed"]
    ],
    "functional": (
        "2.3.2 Functional Document\n"
        "2.3.2.1 Introduction: Sprint 3 finalizes the project with administrative governance, gamified student ranking, "
        "and multi-environment deployment readiness.\n\n"
        "2.3.2.2 Product Goal: Enable course instructors to maintain syllabus questions dynamically while motivating student "
        "engagement through transparent competitive metrics.\n\n"
        "2.3.2.3 Demography: Course instructors managing assessment content and students benchmarking performance against peers.\n\n"
        "2.3.2.4 Business Processes: Candidate navigates to Leaderboard -> LeaderboardService aggregates all attempts from MySQL -> "
        "computes total attempts, highest score, average score, and total points -> ranks top candidates with visual badges. "
        "Instructor enters password 'admin123' -> AdminController grants session access -> instructor views table of all questions -> "
        "instructor adds/deletes questions -> MySQL repository is updated instantly.\n\n"
        "2.3.2.5 Features: Real-Time Ranking Table, Instant Leaderboard Filter, Admin Authentication, Question Bank CRUD Portal, "
        "and GitHub Pages CI/CD Pipeline.\n\n"
        "2.3.2.6 Authorization Matrix: Public access to Leaderboard; administrative role required for question creation/deletion.\n\n"
        "2.3.2.7 Assumptions: The admin master password is securely managed and session states are maintained in client storage."
    ),
    "architecture": (
        "2.3.3 Architecture Document\n"
        "2.3.3.1 Application: LeaderboardService dynamically streams player records, aggregates relational QuizAttempt collections, "
        "and sorts entries descending by totalPoints and highestScore. AdminController exposes authenticated endpoints for question "
        "authoring and deletion.\n\n"
        "2.3.3.2 System Architecture: The frontend employs HashRouter to guarantee zero 404 routing errors on static hosts. "
        "An API abstraction layer in api.js includes an automatic fallback data store that seamlessly activates when deployed "
        "without a live MySQL backend.\n\n"
        "2.3.3.3 Data Exchange Contract:\n"
        "- GET /api/leaderboard: Returns list of LeaderboardEntry DTOs (rank, username, totalAttempts, highestScore, avgScore, totalPoints).\n"
        "- POST /api/admin/login: Body {'password': '...'}, returns 200 OK or 401 Unauthorized.\n"
        "- POST /api/admin/questions: Creates new Question entity in MySQL, returning 201 Created.\n"
        "- DELETE /api/admin/questions/{id}: Deletes question record from database, returning 200 OK."
    ),
    "ui_design": (
        "2.3.4 UI Design\n"
        "The Leaderboard UI presents a clean, formal academic table with rank badges, student identifiers, total attempts, and "
        "points badges. The Admin Portal features a clean sign-in screen, a summary statistics banner, a question table displaying "
        "options and highlighted correct answers, and a structured modal dialog for adding new questions."
    ),
    "test_cases": [
        ["TC-11", "Leaderboard Aggregation", "Submit quizzes for 3 distinct students and invoke GET /api/leaderboard", "All 3 students correctly ranked by total points descending", "Verified accurate leaderboard ranks", "Pass"],
        ["TC-12", "Leaderboard Search", "Filter leaderboard with search query 'Aaditya'", "Table updates instantly displaying only matching username", "Search filtering verified", "Pass"],
        ["TC-13", "Admin Authentication", "Submit POST /api/admin/login with incorrect password", "Returns 401 Unauthorized with error message", "Correctly rejected invalid login", "Pass"],
        ["TC-14", "Admin Question Creation", "Submit new question via POST /api/admin/questions", "Question persisted in MySQL with generated ID and immediate table refresh", "New question created with ID 61", "Pass"],
        ["TC-15", "Admin Question Deletion", "Invoke DELETE /api/admin/questions/61", "Question successfully removed from MySQL database", "Question deleted confirmed", "Pass"]
    ],
    "daily_progress": (
        "2.3.6 Daily Call Progress\n"
        "Day 1: Implemented LeaderboardService ranking algorithm and LeaderboardController REST APIs.\n"
        "Day 2: Built React Leaderboard view with instant search filter and formal academic rank pill styling.\n"
        "Day 3: Engineered AdminController with password validation and CRUD question management endpoints.\n"
        "Day 4: Designed Admin Portal UI with question table, search filtering, and modal question creation form.\n"
        "Day 5: Built production bundle, configured HashRouting, and established GitHub Actions CI/CD deployment."
    ),
    "committed_vs_completed": [
        ["Sprint 3 User Stories", "Committed", "Completed", "Variance"],
        ["US#08: Public Leaderboard Rankings", "Yes", "Yes", "0% (On Schedule)"],
        ["US#09: Leaderboard Username Search", "Yes", "Yes", "0% (On Schedule)"],
        ["US#10: Admin Authentication Portal", "Yes", "Yes", "0% (On Schedule)"],
        ["US#11: Question Bank Management CRUD", "Yes", "Yes", "0% (On Schedule)"],
        ["US#12: Deployment & Offline Resilience", "Yes", "Yes", "0% (On Schedule)"]
    ],
    "retrospective": [
        ["Liked", "Learned", "Lacked", "Longed For"],
        [
            "The Admin Portal empowers non-technical faculty to curate quiz content without modifying Java source code or executing SQL.",
            "Learned how to design resilient frontend API clients that gracefully fall back to local data stores during remote evaluation.",
            "Lacked initial support for bulk question imports via CSV or Excel spreadsheets.",
            "Longed for role-based student authentication with SRM University single sign-on (SSO) integration."
        ]
    ]
}

print("Sprint data ready.")
