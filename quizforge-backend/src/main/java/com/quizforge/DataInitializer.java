package com.quizforge;

import com.quizforge.entity.Question;
import com.quizforge.repository.QuestionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final QuestionRepository questionRepository;

    public DataInitializer(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Override
    public void run(String... args) {
        if (questionRepository.count() == 0) {
            List<Question> questions = new ArrayList<>();

            // ===== Unit 1 - HTML and CSS (12 questions) =====

            questions.add(new Question(
                "What does the <!DOCTYPE html> declaration specify?",
                "It defines the document type as HTML5",
                "It links an external stylesheet",
                "It creates a new HTML element",
                "It specifies the character encoding",
                "A", "Unit 1 - HTML and CSS", "Easy"));

            questions.add(new Question(
                "Which HTML tag is used to create a hyperlink?",
                "<link>",
                "<a>",
                "<href>",
                "<url>",
                "B", "Unit 1 - HTML and CSS", "Easy"));

            questions.add(new Question(
                "Which CSS property is used to create space between an element's border and its content?",
                "margin",
                "padding",
                "border-spacing",
                "gap",
                "B", "Unit 1 - HTML and CSS", "Easy"));

            questions.add(new Question(
                "What is the correct HTML tag for inserting a line break?",
                "<break>",
                "<lb>",
                "<br>",
                "<newline>",
                "C", "Unit 1 - HTML and CSS", "Easy"));

            questions.add(new Question(
                "Which CSS property is used to change the text color of an element?",
                "font-color",
                "text-color",
                "foreground",
                "color",
                "D", "Unit 1 - HTML and CSS", "Medium"));

            questions.add(new Question(
                "What does the CSS 'box-sizing: border-box' property do?",
                "Adds a border to all boxes",
                "Includes padding and border in the element's total width and height",
                "Removes all margins from the box",
                "Creates a shadow around the box",
                "B", "Unit 1 - HTML and CSS", "Medium"));

            questions.add(new Question(
                "Which CSS display value makes an element a flex container?",
                "display: block",
                "display: inline",
                "display: flex",
                "display: grid-flex",
                "C", "Unit 1 - HTML and CSS", "Medium"));

            questions.add(new Question(
                "What is the purpose of the HTML <meta> tag?",
                "To display metadata on the page",
                "To provide metadata about the HTML document",
                "To create a navigation menu",
                "To link JavaScript files",
                "B", "Unit 1 - HTML and CSS", "Medium"));

            questions.add(new Question(
                "Which CSS property controls the stacking order of positioned elements?",
                "stack-order",
                "layer",
                "z-index",
                "position-level",
                "C", "Unit 1 - HTML and CSS", "Hard"));

            questions.add(new Question(
                "What is the difference between 'em' and 'rem' units in CSS?",
                "em is relative to the parent element's font size, rem is relative to the root element's font size",
                "em is for margins, rem is for padding",
                "They are exactly the same",
                "em is an absolute unit, rem is a relative unit",
                "A", "Unit 1 - HTML and CSS", "Hard"));

            questions.add(new Question(
                "Which CSS pseudo-class selects an element when the user hovers over it?",
                ":active",
                ":focus",
                ":hover",
                ":visited",
                "C", "Unit 1 - HTML and CSS", "Easy"));

            questions.add(new Question(
                "What is the CSS Grid property used to define column sizes?",
                "grid-columns",
                "grid-template-columns",
                "column-template",
                "grid-col-size",
                "B", "Unit 1 - HTML and CSS", "Hard"));

            // ===== Unit 2 - JavaScript and React (12 questions) =====

            questions.add(new Question(
                "Which keyword is used to declare a constant variable in JavaScript?",
                "var",
                "let",
                "const",
                "final",
                "C", "Unit 2 - JavaScript and React", "Easy"));

            questions.add(new Question(
                "What is the output of typeof null in JavaScript?",
                "null",
                "undefined",
                "object",
                "boolean",
                "C", "Unit 2 - JavaScript and React", "Medium"));

            questions.add(new Question(
                "What is the virtual DOM in React?",
                "A lightweight copy of the actual DOM that React uses for efficient updates",
                "A browser extension for React",
                "The actual DOM rendered by the browser",
                "A server-side rendering technique",
                "A", "Unit 2 - JavaScript and React", "Medium"));

            questions.add(new Question(
                "Which method is used to add an element to the end of an array in JavaScript?",
                "append()",
                "push()",
                "add()",
                "insert()",
                "B", "Unit 2 - JavaScript and React", "Easy"));

            questions.add(new Question(
                "What hook is used to manage state in a React functional component?",
                "useEffect",
                "useContext",
                "useState",
                "useReducer",
                "C", "Unit 2 - JavaScript and React", "Easy"));

            questions.add(new Question(
                "What does the '===' operator do in JavaScript?",
                "Assigns a value",
                "Compares values with type coercion",
                "Compares both value and type without coercion",
                "Checks if a variable is defined",
                "C", "Unit 2 - JavaScript and React", "Medium"));

            questions.add(new Question(
                "In React, what is the purpose of the useEffect hook?",
                "To declare state variables",
                "To perform side effects like data fetching or subscriptions",
                "To create new components",
                "To handle form validation only",
                "B", "Unit 2 - JavaScript and React", "Medium"));

            questions.add(new Question(
                "What is a closure in JavaScript?",
                "A way to close the browser window",
                "A function that has access to variables from its outer scope even after the outer function has returned",
                "A method to end a loop",
                "A type of error handling",
                "B", "Unit 2 - JavaScript and React", "Hard"));

            questions.add(new Question(
                "Which method converts a JSON string into a JavaScript object?",
                "JSON.stringify()",
                "JSON.parse()",
                "JSON.toObject()",
                "JSON.convert()",
                "B", "Unit 2 - JavaScript and React", "Easy"));

            questions.add(new Question(
                "What is prop drilling in React?",
                "A testing technique for components",
                "Passing props through multiple nested components that don't need them",
                "A way to optimize component rendering",
                "Creating props dynamically",
                "B", "Unit 2 - JavaScript and React", "Hard"));

            questions.add(new Question(
                "What does the JavaScript 'map()' method return?",
                "The original array modified in place",
                "A new array with the results of calling a function on every element",
                "A single value",
                "undefined",
                "B", "Unit 2 - JavaScript and React", "Medium"));

            questions.add(new Question(
                "How do you pass data from a parent to a child component in React?",
                "Using state",
                "Using props",
                "Using context only",
                "Using localStorage",
                "B", "Unit 2 - JavaScript and React", "Easy"));

            // ===== Unit 3 - SQL and JDBC (12 questions) =====

            questions.add(new Question(
                "Which SQL keyword is used to combine the results of two SELECT statements?",
                "MERGE",
                "JOIN",
                "UNION",
                "COMBINE",
                "C", "Unit 3 - SQL and JDBC", "Medium"));

            questions.add(new Question(
                "What does the SQL 'WHERE' clause do?",
                "Sorts the results",
                "Groups the results",
                "Filters rows based on a condition",
                "Joins two tables",
                "C", "Unit 3 - SQL and JDBC", "Easy"));

            questions.add(new Question(
                "Which SQL statement is used to insert new data into a table?",
                "ADD INTO",
                "INSERT INTO",
                "PUT INTO",
                "CREATE INTO",
                "B", "Unit 3 - SQL and JDBC", "Easy"));

            questions.add(new Question(
                "What is a primary key in a database?",
                "A key that can have duplicate values",
                "A unique identifier for each record in a table",
                "A foreign key reference",
                "An index for faster queries",
                "B", "Unit 3 - SQL and JDBC", "Easy"));

            questions.add(new Question(
                "Which JDBC interface is used to execute SQL queries?",
                "Connection",
                "Statement",
                "ResultSet",
                "DriverManager",
                "B", "Unit 3 - SQL and JDBC", "Medium"));

            questions.add(new Question(
                "What does the SQL GROUP BY clause do?",
                "Filters individual rows",
                "Groups rows that have the same values in specified columns",
                "Orders the result set",
                "Limits the number of results",
                "B", "Unit 3 - SQL and JDBC", "Medium"));

            questions.add(new Question(
                "Which SQL JOIN returns all rows from both tables, matching where possible?",
                "INNER JOIN",
                "LEFT JOIN",
                "RIGHT JOIN",
                "FULL OUTER JOIN",
                "D", "Unit 3 - SQL and JDBC", "Hard"));

            questions.add(new Question(
                "What is the purpose of PreparedStatement in JDBC?",
                "To create database tables",
                "To execute precompiled SQL statements with parameters, preventing SQL injection",
                "To manage database connections",
                "To read database metadata",
                "B", "Unit 3 - SQL and JDBC", "Medium"));

            questions.add(new Question(
                "Which SQL function returns the number of rows in a result set?",
                "SUM()",
                "TOTAL()",
                "COUNT()",
                "NUM()",
                "C", "Unit 3 - SQL and JDBC", "Easy"));

            questions.add(new Question(
                "What does ACID stand for in database transactions?",
                "Atomicity, Consistency, Isolation, Durability",
                "Addition, Consistency, Integration, Data",
                "Atomicity, Concurrency, Isolation, Distribution",
                "Access, Control, Integrity, Durability",
                "A", "Unit 3 - SQL and JDBC", "Hard"));

            questions.add(new Question(
                "Which SQL clause is used to filter grouped results?",
                "WHERE",
                "HAVING",
                "FILTER",
                "GROUP FILTER",
                "B", "Unit 3 - SQL and JDBC", "Hard"));

            questions.add(new Question(
                "What is the correct order of SQL clauses in a SELECT statement?",
                "SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY",
                "SELECT, WHERE, FROM, ORDER BY, GROUP BY, HAVING",
                "FROM, SELECT, WHERE, ORDER BY, GROUP BY, HAVING",
                "SELECT, FROM, GROUP BY, WHERE, HAVING, ORDER BY",
                "A", "Unit 3 - SQL and JDBC", "Medium"));

            // ===== Unit 4 - Spring Boot Part 1 (12 questions) =====

            questions.add(new Question(
                "What annotation marks a class as a Spring Boot application?",
                "@SpringApp",
                "@SpringBootApplication",
                "@Application",
                "@BootApplication",
                "B", "Unit 4 - Spring Boot Part 1", "Easy"));

            questions.add(new Question(
                "Which annotation is used to mark a class as a REST controller in Spring?",
                "@Controller",
                "@RestController",
                "@WebController",
                "@ApiController",
                "B", "Unit 4 - Spring Boot Part 1", "Easy"));

            questions.add(new Question(
                "What does the @Autowired annotation do in Spring?",
                "Creates a new bean",
                "Automatically injects dependencies",
                "Marks a class as a component",
                "Configures database connections",
                "B", "Unit 4 - Spring Boot Part 1", "Medium"));

            questions.add(new Question(
                "Which annotation maps HTTP GET requests to a handler method?",
                "@Get",
                "@RequestMapping(method=GET)",
                "@GetMapping",
                "Both B and C",
                "D", "Unit 4 - Spring Boot Part 1", "Medium"));

            questions.add(new Question(
                "What is the default embedded server in Spring Boot?",
                "Jetty",
                "Undertow",
                "Tomcat",
                "Netty",
                "C", "Unit 4 - Spring Boot Part 1", "Easy"));

            questions.add(new Question(
                "What is dependency injection in Spring?",
                "Downloading dependencies from Maven",
                "A design pattern where the framework provides objects that a class needs",
                "Injecting SQL queries into the database",
                "Adding new dependencies to pom.xml",
                "B", "Unit 4 - Spring Boot Part 1", "Medium"));

            questions.add(new Question(
                "Which file is used for configuration in a Spring Boot application?",
                "config.xml",
                "spring-config.json",
                "application.properties",
                "settings.yaml",
                "C", "Unit 4 - Spring Boot Part 1", "Easy"));

            questions.add(new Question(
                "What does @RequestBody annotation do?",
                "Sends a response body",
                "Binds the HTTP request body to a method parameter",
                "Creates a request header",
                "Validates the request URL",
                "B", "Unit 4 - Spring Boot Part 1", "Medium"));

            questions.add(new Question(
                "What is the purpose of @PathVariable in Spring MVC?",
                "To bind a method parameter to a query parameter",
                "To extract values from the URI path",
                "To set the response path",
                "To define the base URL",
                "B", "Unit 4 - Spring Boot Part 1", "Medium"));

            questions.add(new Question(
                "Which annotation is used to mark a class as a service component in Spring?",
                "@Bean",
                "@Component",
                "@Service",
                "Both B and C",
                "D", "Unit 4 - Spring Boot Part 1", "Hard"));

            questions.add(new Question(
                "What is the Spring IoC container?",
                "A Docker container for Spring applications",
                "A container that manages the lifecycle and configuration of application objects",
                "A web server container",
                "A database connection pool",
                "B", "Unit 4 - Spring Boot Part 1", "Hard"));

            questions.add(new Question(
                "What does @RequestParam annotation do in Spring MVC?",
                "Maps a URL path segment to a parameter",
                "Extracts query parameters from the request URL",
                "Sets a default response parameter",
                "Creates a new HTTP request",
                "B", "Unit 4 - Spring Boot Part 1", "Easy"));

            // ===== Unit 5 - Spring Boot Part 2 (12 questions) =====

            questions.add(new Question(
                "What is Spring Data JPA?",
                "A JavaScript framework",
                "A Spring module that simplifies database access using JPA",
                "A testing framework",
                "A build tool for Spring projects",
                "B", "Unit 5 - Spring Boot Part 2", "Easy"));

            questions.add(new Question(
                "Which annotation marks a Java class as a JPA entity?",
                "@Table",
                "@Entity",
                "@Model",
                "@Record",
                "B", "Unit 5 - Spring Boot Part 2", "Easy"));

            questions.add(new Question(
                "What does @GeneratedValue annotation do in JPA?",
                "Generates a new table",
                "Specifies the strategy for primary key generation",
                "Creates a default value for a column",
                "Generates SQL queries",
                "B", "Unit 5 - Spring Boot Part 2", "Medium"));

            questions.add(new Question(
                "What interface should a repository extend to get CRUD operations in Spring Data JPA?",
                "CrudRepository",
                "JpaRepository",
                "Repository",
                "All of the above can provide CRUD operations",
                "D", "Unit 5 - Spring Boot Part 2", "Medium"));

            questions.add(new Question(
                "What does 'spring.jpa.hibernate.ddl-auto=update' do?",
                "Drops and recreates tables on every startup",
                "Updates the schema to match entities without dropping existing data",
                "Validates the schema without making changes",
                "Creates tables only if they don't exist",
                "B", "Unit 5 - Spring Boot Part 2", "Medium"));

            questions.add(new Question(
                "Which annotation defines a many-to-one relationship in JPA?",
                "@OneToMany",
                "@ManyToOne",
                "@ManyToMany",
                "@JoinTable",
                "B", "Unit 5 - Spring Boot Part 2", "Easy"));

            questions.add(new Question(
                "What is the purpose of @JoinColumn in JPA?",
                "To create a new table",
                "To specify the foreign key column for an entity relationship",
                "To join two SELECT queries",
                "To add a column constraint",
                "B", "Unit 5 - Spring Boot Part 2", "Medium"));

            questions.add(new Question(
                "What does the @Query annotation do in Spring Data JPA?",
                "Creates a database connection",
                "Defines a custom query for a repository method",
                "Validates SQL syntax",
                "Generates a table",
                "B", "Unit 5 - Spring Boot Part 2", "Medium"));

            questions.add(new Question(
                "What is the purpose of @RestControllerAdvice?",
                "To create REST endpoints",
                "To provide global exception handling for REST controllers",
                "To configure CORS",
                "To validate request bodies",
                "B", "Unit 5 - Spring Boot Part 2", "Hard"));

            questions.add(new Question(
                "How does Spring Data JPA derive queries from method names?",
                "It requires XML configuration for every query",
                "It parses the method name to automatically generate the query (e.g., findByUsername)",
                "It uses reflection to scan the database",
                "It doesn't support derived queries",
                "B", "Unit 5 - Spring Boot Part 2", "Hard"));

            questions.add(new Question(
                "What is the role of the application.properties file in Spring Boot?",
                "To define HTML templates",
                "To configure application settings like database URL, server port, and JPA properties",
                "To store Java source code",
                "To define REST endpoints",
                "B", "Unit 5 - Spring Boot Part 2", "Easy"));

            questions.add(new Question(
                "What does @Transactional annotation do in Spring?",
                "Creates a new HTTP transaction",
                "Ensures that a method runs within a database transaction with rollback on failure",
                "Logs all method calls",
                "Validates method parameters",
                "B", "Unit 5 - Spring Boot Part 2", "Hard"));

            questionRepository.saveAll(questions);
            System.out.println("Initialized " + questions.size() + " quiz questions.");
        }
    }
}
