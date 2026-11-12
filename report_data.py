# -*- coding: utf-8 -*-

ABSTRACT_TEXT = (
    "QuizForge is a full-stack, syllabus-driven examination web application designed and developed "
    "for the Full Stack Web Development course at SRM Institute of Science and Technology. Traditional "
    "assessment methodologies often rely on paper-based examinations or generic online testing tools "
    "that fail to align precisely with modular university curricula, lack persistent progress tracking, "
    "and frequently expose correct answers to the client browser through insecure frontend code. To "
    "overcome these critical limitations, QuizForge implements a robust three-tier enterprise architecture "
    "consisting of a modern React.js single-page application frontend, a Spring Boot 3 RESTful API backend, "
    "and a relational MySQL database managed via Spring Data JPA and Hibernate. The platform dynamically "
    "generates distraction-free, 10-question multiple-choice quizzes categorized across all five course "
    "units (HTML/CSS, JavaScript/React, SQL/JDBC, Spring Boot Fundamentals, and Spring Data JPA Microservices) "
    "with selectable difficulty tiers. To guarantee strict academic integrity, question payloads delivered "
    "to the client are decoupled from answer keys using Data Transfer Objects, enforcing tamper-proof "
    "server-side score calculation and immediate post-submission question review breakdowns. Furthermore, "
    "QuizForge features a real-time public leaderboard ranking students by cumulative points and highest "
    "performance, a personalized academic history tracker, and a secure administrator portal allowing "
    "course coordinators to perform full CRUD operations on the centralized 60-question syllabus repository. "
    "The system is fully responsive, container-ready, and incorporates client-side fallback resilience for "
    "uninterrupted offline demonstration. By fostering continuous self-evaluation, objective performance "
    "benchmarking, and syllabus-targeted preparation, QuizForge enhances student retention rates, reduces "
    "faculty evaluation overhead, and directly advances United Nations Sustainable Development Goal 4 "
    "(Quality Education)."
)

TABLE_OF_CONTENTS_DATA = [
    ("ABSTRACT", "iv"),
    ("TABLE OF CONTENTS", "v"),
    ("LIST OF FIGURES", "vi"),
    ("LIST OF TABLES", "vii"),
    ("ABBREVIATIONS", "viii"),
    ("1. INTRODUCTION", "1"),
    ("   1.1 General (Introduction to Project)", "1"),
    ("   1.2 Motivation", "2"),
    ("   1.3 Problem Statement and Description", "2"),
    ("   1.4 Sustainable Development Goal of the Project", "3"),
    ("   1.5 Product Vision Statement", "4"),
    ("       1.5.1 Audience", "4"),
    ("       1.5.2 Needs", "4"),
    ("       1.5.3 Products", "4"),
    ("       1.5.4 Values & Differentiators", "5"),
    ("   1.6 Product Goal", "5"),
    ("   1.7 Product Backlog (Key User Stories with Desired Outcomes)", "6"),
    ("   1.8 Product Release Plan", "7"),
    ("2. SPRINT PLANNING AND EXECUTION", "8"),
    ("   2.1 Sprint 1: Foundation, Database Architecture & Course Question Seeding", "8"),
    ("       2.1.1 Sprint Goal with User Stories of Sprint 1", "8"),
    ("       2.1.2 Functional Document", "9"),
    ("       2.1.3 Architecture Document", "11"),
    ("       2.1.4 UI Design", "13"),
    ("       2.1.5 Functional Test Cases", "14"),
    ("       2.1.6 Daily Call Progress", "15"),
    ("       2.1.7 Committed vs Completed User Stories", "15"),
    ("       2.1.8 Sprint Retrospective", "16"),
    ("   2.2 Sprint 2: Dynamic Quiz Engine, Server-Side Scoring & Answer Review", "17"),
    ("       2.2.1 Sprint Goal with User Stories of Sprint 2", "17"),
    ("       2.2.2 Functional Document", "17"),
    ("       2.2.3 Architecture Document", "19"),
    ("       2.2.4 UI Design", "21"),
    ("       2.2.5 Functional Test Cases", "22"),
    ("       2.2.6 Daily Call Progress", "23"),
    ("       2.2.7 Committed vs Completed User Stories", "23"),
    ("       2.2.8 Sprint Retrospective", "24"),
    ("   2.3 Sprint 3: Public Leaderboard, Admin Question Portal & Deployment Resilience", "25"),
    ("       2.3.1 Sprint Goal with User Stories of Sprint 3", "25"),
    ("       2.3.2 Functional Document", "25"),
    ("       2.3.3 Architecture Document", "27"),
    ("       2.3.4 UI Design", "29"),
    ("       2.3.5 Functional Test Cases", "30"),
    ("       2.3.6 Daily Call Progress", "31"),
    ("       2.3.7 Committed vs Completed User Stories", "31"),
    ("       2.3.8 Sprint Retrospective", "32"),
    ("3. RESULTS AND DISCUSSIONS", "33"),
    ("   3.1 Project Outcomes & Technical Verification", "33"),
    ("   3.2 Committed vs Completed User Stories Analysis", "35"),
    ("4. CONCLUSIONS & FUTURE ENHANCEMENTS", "36"),
    ("   4.1 Conclusion", "36"),
    ("   4.2 Future Enhancements", "36"),
    ("APPENDIX", "37"),
    ("   A. Patent Disclosure Form", "37"),
    ("   B. Sample Source Code", "40"),
    ("   C. Plagiarism Verification Report", "45")
]

LIST_OF_FIGURES_DATA = [
    ("Figure 1.1", "Agile Board Backlog of QuizForge Application in MS Planner", "6"),
    ("Figure 1.2", "Product Release Plan and Feature Roadmap", "7"),
    ("Figure 2.1", "System Architecture & 3-Tier Enterprise Design Diagram", "12"),
    ("Figure 2.2", "Entity-Relationship (ER) Diagram for QuizForge Relational Database", "13"),
    ("Figure 2.3", "UI Layout for Candidate Home Page and Preference Configuration", "14"),
    ("Figure 2.4", "Sprint 1 Standup Meeting Summary and Progress Log", "15"),
    ("Figure 2.5", "Sprint 1 Committed vs Completed User Stories Bar Graph", "16"),
    ("Figure 2.6", "Sprint 1 Agile Retrospective Quadrants", "16"),
    ("Figure 2.7", "Sequence Diagram for Secure Quiz Generation and Answer Validation", "20"),
    ("Figure 2.8", "UI Layout for Distraction-Free Quiz Assessment Card with Progress Bar", "21"),
    ("Figure 2.9", "UI Layout for Submission Confirmation Dialog Modal", "21"),
    ("Figure 2.10", "UI Layout for Performance Summary and Detailed Question Breakdown", "22"),
    ("Figure 2.11", "Sprint 2 Standup Meeting Summary and Progress Log", "23"),
    ("Figure 2.12", "Sprint 2 Committed vs Completed User Stories Bar Graph", "24"),
    ("Figure 2.13", "Sprint 2 Agile Retrospective Quadrants", "24"),
    ("Figure 2.14", "UI Layout for Live Public Leaderboard Ranking Table", "29"),
    ("Figure 2.15", "UI Layout for Administrator Authentication Screen", "29"),
    ("Figure 2.16", "UI Layout for Question Bank Management Portal and Question Creation Modal", "30"),
    ("Figure 2.17", "Sprint 3 Standup Meeting Summary and Progress Log", "31"),
    ("Figure 2.18", "Sprint 3 Committed vs Completed User Stories Bar Graph", "32"),
    ("Figure 2.19", "Sprint 3 Agile Retrospective Quadrants", "32"),
    ("Figure 3.1", "Overall Project Sprint Velocity and User Story Completion Chart", "35")
]

LIST_OF_TABLES_DATA = [
    ("Table 1.1", "Comprehensive Product Backlog of QuizForge Application", "6"),
    ("Table 1.2", "Release Roadmap and Milestone Deliverables Schedule", "7"),
    ("Table 2.1", "Detailed User Stories for Sprint 1 (Foundation & Database Setup)", "9"),
    ("Table 2.2", "Role-Based Access Control and Authorization Matrix", "10"),
    ("Table 2.3", "Functional Test Cases for Sprint 1 (Player Management & Data Seeding)", "14"),
    ("Table 2.4", "Detailed User Stories for Sprint 2 (Quiz Engine & Scoring)", "17"),
    ("Table 2.5", "Functional Test Cases for Sprint 2 (Quiz Flow & Server Validation)", "22"),
    ("Table 2.6", "Detailed User Stories for Sprint 3 (Leaderboard, Admin & Deployment)", "25"),
    ("Table 2.7", "Functional Test Cases for Sprint 3 (Leaderboard & Admin Operations)", "30"),
    ("Table 3.1", "Comprehensive Committed vs Completed User Stories Across All Sprints", "35")
]

ABBREVIATIONS_DATA = [
    ("API", "Application Programming Interface"),
    ("CRUD", "Create, Read, Update, and Delete"),
    ("CSS", "Cascading Style Sheets"),
    ("CORS", "Cross-Origin Resource Sharing"),
    ("DDL", "Data Definition Language"),
    ("DOM", "Document Object Model"),
    ("DTO", "Data Transfer Object"),
    ("FSWD", "Full Stack Web Development"),
    ("HTML", "HyperText Markup Language"),
    ("HTTP", "HyperText Transfer Protocol"),
    ("IDE", "Integrated Development Environment"),
    ("IoC", "Inversion of Control"),
    ("JDBC", "Java Database Connectivity"),
    ("JPA", "Java Persistence API"),
    ("JSON", "JavaScript Object Notation"),
    ("JVM", "Java Virtual Machine"),
    ("MVC", "Model-View-Controller"),
    ("ORM", "Object-Relational Mapping"),
    ("REST", "Representational State Transfer"),
    ("SDG", "Sustainable Development Goal"),
    ("SPA", "Single Page Application"),
    ("SQL", "Structured Query Language"),
    ("SRM", "SRM Institute of Science and Technology"),
    ("UI", "User Interface"),
    ("UX", "User Experience"),
    ("VCS", "Version Control System")
]
