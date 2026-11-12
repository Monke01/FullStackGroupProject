# -*- coding: utf-8 -*-

CHAPTER_1_CONTENT = {
    "title": "CHAPTER 1\nINTRODUCTION",
    "intro_heading": "1.1 General (Introduction to Project)",
    "intro_p1": (
        "QuizForge is a full-stack, syllabus-aligned assessment web application engineered specifically "
        "for the Full Stack Web Development (FSWD) curriculum at SRM Institute of Science and Technology. "
        "As modern software engineering paradigms increasingly emphasize decoupling client-side user "
        "interfaces from server-side business logic and data persistence, practical educational assessment "
        "must mirror these real-world engineering standards. The platform serves as an interactive evaluation "
        "ecosystem where undergraduate computer science students authenticate using registration identifiers, "
        "configure tailored quiz parameters across distinct course units, attempt dynamically generated "
        "ten-question multiple-choice examinations, receive immediate automated evaluations, and benchmark "
        "their academic performance on a centralized public leaderboard."
    ),
    "intro_p2": (
        "Architecturally, QuizForge is structured as a decoupled two-tier client-server enterprise application. "
        "The frontend is constructed using React.js 19 and React Router DOM 7, utilizing functional components "
        "and state management hooks (useState, useEffect, useLocation, useNavigate) with a distraction-free, "
        "formal dark-slate user interface. The backend is implemented using Java 17/23 with the Spring Boot 3.2 "
        "framework, providing high-throughput RESTful Web APIs, Spring Data JPA repositories, and Hibernate Object-"
        "Relational Mapping (ORM) connected to a persistent MySQL 8 relational database. By incorporating strict "
        "server-side score computation, answer key decoupling, and a password-protected administrative portal "
        "for question management, QuizForge establishes an academically rigorous and transparent platform for "
        "continuous evaluation in computer science education."
    ),
    "motivation_heading": "1.2 Motivation",
    "motivation_p1": (
        "The motivation behind developing QuizForge arises from observed pedagogical shortcomings in conventional "
        "assessment methodologies used across computer science departments. Traditional paper-based examinations and "
        "infrequent summative testing encourage passive rote memorization rather than active, conceptual comprehension "
        "of web architectures. Furthermore, students often lack accessible platforms where they can independently "
        "assess their strengths and identify weaknesses across specialized modules—such as cascading CSS models, "
        "DOM lifecycle hooks, SQL relational algebra, JDBC connection pools, and Spring inversion-of-control containers."
    ),
    "motivation_p2": (
        "Additionally, existing commercial quiz solutions often impose steep subscription costs, introduce complex "
        "third-party dependencies, or enforce monolithic designs that fail to map onto university curricula. "
        "Crucially, many open-source student quiz applications exhibit severe architectural flaws, such as embedding "
        "correct answer keys directly in client-side HTML/JavaScript payloads, allowing students to inspect answers "
        "via browser developer tools. QuizForge addresses these challenges by delivering an internal, syllabus-tailored, "
        "and academically secure web platform that empowers students to engage in autonomous self-testing while "
        "stimulating peer engagement through transparent academic leaderboard rankings."
    ),
    "problem_heading": "1.3 Problem Statement and Description",
    "problem_p1": (
        "Contemporary digital assessment platforms frequently prioritize commercial features over curricular relevance "
        "and data integrity. Within university technical courses, instructors encounter substantial challenges in: "
        "(1) maintaining consistent, syllabus-aligned question banks categorized by topical difficulty; "
        "(2) preventing client-side examination tampering in single-page web environments; "
        "(3) tracking longitudinal student progress across multiple assessment attempts; and "
        "(4) providing granular question-by-question review mechanisms that facilitate post-assessment learning."
    ),
    "problem_p2": (
        "QuizForge directly resolves this problem statement by providing a unified web platform engineered to: "
        "(a) maintain a pre-seeded relational repository of 60 vetted questions mapping to the five course units of the "
        "SRM FSWD syllabus; (b) dynamically serve ten randomized questions per session using MySQL native random selection; "
        "(c) enforce total decoupling of question options from correct answer keys using Data Transfer Objects (DTOs); "
        "(d) execute all grading server-side with atomic transaction persistence in MySQL; (e) provide immediate post-quiz "
        "review cards illustrating user selections against validated answer keys; and (f) equip course instructors with "
        "an administrative management portal for real-time question authoring and curation."
    ),
    "sdg_heading": "1.4 Sustainable Development Goal of the Project",
    "sdg_p1": (
        "QuizForge aligns directly with the United Nations Sustainable Development Goal 4 (SDG 4: Quality Education), "
        "which aims to ensure inclusive and equitable quality education and promote lifelong learning opportunities for all. "
        "Specifically, the project addresses Target 4.4 by enhancing technical and vocational skills for employment, decent jobs, "
        "and entrepreneurship in software development."
    ),
    "sdg_p2": (
        "By providing open, responsive, and barrier-free access to automated technical assessments, QuizForge democratizes "
        "educational evaluation. Students can repeatedly test their competency regardless of geographic location or computing "
        "hardware, receiving instant formative feedback without relying on manual instructor grading. Furthermore, the inclusion "
        "of a resilient offline client mode guarantees that students with limited internet connectivity can continuously access "
        "the full syllabus question repository, bridging digital learning divides and advancing sustainable academic growth."
    ),
    "vision_heading": "1.5 Product Vision Statement",
    "vision_audience": (
        "1.5.1 Audience:\n"
        "- Primary Audience: Undergraduate students enrolled in the SRM Full Stack Web Development course seeking objective, "
        "self-paced conceptual evaluation.\n"
        "- Secondary Audience: Course instructors, teaching assistants, and university evaluators requiring a streamlined, "
        "tamper-proof assessment management engine."
    ),
    "vision_needs": (
        "1.5.2 Needs:\n"
        "- Primary Needs: On-demand 10-question evaluation, topical filtering by syllabus units, selectable difficulty tiers, "
        "tamper-proof scoring, and question-level review explanations.\n"
        "- Secondary Needs: Real-time competitive leaderboard tracking, persistent attempt history, responsive mobile layout, "
        "and instructor portal for question bank curation."
    ),
    "vision_products": (
        "1.5.3 Products:\n"
        "- Core Product: Single-page React application coupled to a Spring Boot REST backend and MySQL database.\n"
        "- Supplementary Modules: Live competitive ranking table, candidate performance history dashboard, and administrative "
        "question CRUD management panel."
    ),
    "vision_values": (
        "1.5.4 Values & Differentiators:\n"
        "- Curricular Precision: Strict alignment with the 5 units of the SRM University FSWD syllabus.\n"
        "- Data Integrity: Absolute decoupling of answer keys from client payloads; grading executed solely on backend.\n"
        "- Professional Usability: Formal academic design devoid of distracting gamified clutter, fully responsive across devices."
    ),
    "goal_heading": "1.6 Product Goal",
    "goal_p1": (
        "The overarching goal of QuizForge is to provide an end-to-end, high-performance web evaluation platform that "
        "bridges theoretical computer science lectures with measurable cognitive assessment. The platform achieves this by "
        "automating the entire lifecycle of student examination—from unique registration identification and topical filtering "
        "to secure transactional evaluation and longitudinal performance tracking—while ensuring zero operational downtime "
        "and minimal administrative overhead."
    )
}

PRODUCT_BACKLOG_TABLE = [
    ["#US 01", "Student Identification", "As a student, I want to enter my registration username so that my scores and history are tracked across sessions.", "Must Have", "Functional", "Player entity persisted in MySQL with unique username constraint."],
    ["#US 02", "Question Bank Infrastructure", "As an instructor, I want 60 vetted questions pre-seeded across 5 units so that the assessment reflects our syllabus.", "Must Have", "Functional", "CommandLineRunner auto-seeds 60 questions covering Units 1 to 5 without duplicates."],
    ["#US 03", "Unit Filtering", "As a student, I want to choose a specific unit or 'All Units' so that I can practice targeted topics.", "Must Have", "Functional", "Native SQL random selection filtered by unit parameter."],
    ["#US 04", "Difficulty Selection", "As a student, I want to choose difficulty (Easy, Medium, Hard, Mixed) so that I can calibrate challenge level.", "Must Have", "Functional", "Repository queries dynamically apply difficulty predicates."],
    ["#US 05", "Decoupled Quiz Generation", "As a security measure, the frontend must receive 10 random questions without correct answers to prevent cheating.", "Must Have", "Security", "Controller maps Question entity to QuestionDTO, omitting correctAnswer field."],
    ["#US 06", "Distraction-Free UI", "As a student, I want a single-question card with progress bar so that I can focus during the quiz.", "Must Have", "UI/UX", "Clean slate theme with rectangular badges, previous/next buttons, and progress percentage."],
    ["#US 07", "Submission Confirmation", "As a student, I want a confirmation modal before submission so that I don't submit accidentally.", "Should Have", "UI/UX", "Modal prompts candidate, displaying count of answered vs unanswered questions."],
    ["#US 08", "Server-Side Evaluation", "As an examiner, scoring must be calculated on the backend to guarantee grading authenticity.", "Must Have", "Functional", "QuizService validates answers against database records, computing correct count and percentage."],
    ["#US 09", "Question Breakdown Review", "As a student, I want to see my choice versus the correct answer for every question after submission.", "Must Have", "Functional", "Result view displays all 10 questions with color-coded answer badges and status tags."],
    ["#US 10", "Public Leaderboard", "As a student, I want to view a ranked leaderboard sorted by total points so that I can compare standing.", "Should Have", "Functional", "LeaderboardService aggregates player scores, sorts descending, and assigns numerical ranks."],
    ["#US 11", "Leaderboard Search", "As a user, I want to search candidates by username on the leaderboard so that I can locate peers quickly.", "Could Have", "Functional", "Instant case-insensitive username search filter."],
    ["#US 12", "Admin Question Portal", "As a course coordinator, I want a password-protected admin portal to view, add, and delete questions.", "Should Have", "Functional", "AdminController authenticates master password, exposes full CRUD APIs, and UI modal."]
]

RELEASE_PLAN_TABLE = [
    ["Milestone", "Sprint", "Key Deliverables", "Target Timeline", "Status"],
    ["Phase 1: Architecture & Foundation", "Sprint 1", "MySQL schema design, JPA entities, 60-question syllabus seeder, Player REST APIs, Base UI layout.", "Weeks 1 - 2", "Completed"],
    ["Phase 2: Assessment Engine", "Sprint 2", "Dynamic 10-question randomizer, QuestionDTO decoupling, Distraction-free quiz UI, Server grading, Result review.", "Weeks 3 - 4", "Completed"],
    ["Phase 3: Engagement & Administration", "Sprint 3", "Public competitive leaderboard, Username search filter, Admin Portal with CRUD modal, Production build.", "Weeks 5 - 6", "Completed"],
    ["Phase 4: Verification & Release", "Final", "End-to-end integration testing, CORS security audit, GitHub Pages deployment workflow, Offline fallback.", "Week 7", "Completed"]
]

print("Chapter 1 data ready.")

