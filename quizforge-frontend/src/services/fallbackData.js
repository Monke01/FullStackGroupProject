// Fallback questions aligned with SRM University FSWD syllabus
// Used automatically when the frontend is deployed to GitHub Pages or static hosts without a live backend connection.

export const FALLBACK_QUESTIONS = [
  // Unit 1
  {
    id: 1,
    questionText: "What does the <!DOCTYPE html> declaration specify?",
    optionA: "It defines the document type as HTML5",
    optionB: "It links an external stylesheet",
    optionC: "It creates a new HTML element",
    optionD: "It specifies the character encoding",
    correctAnswer: "A",
    unit: "Unit 1 - HTML and CSS",
    difficulty: "Easy"
  },
  {
    id: 2,
    questionText: "Which HTML tag is used to create a hyperlink?",
    optionA: "<link>",
    optionB: "<a>",
    optionC: "<href>",
    optionD: "<url>",
    correctAnswer: "B",
    unit: "Unit 1 - HTML and CSS",
    difficulty: "Easy"
  },
  {
    id: 3,
    questionText: "Which CSS property is used to create space between an element's border and its content?",
    optionA: "margin",
    optionB: "padding",
    optionC: "border-spacing",
    optionD: "gap",
    correctAnswer: "B",
    unit: "Unit 1 - HTML and CSS",
    difficulty: "Easy"
  },
  {
    id: 4,
    questionText: "What is the correct HTML tag for inserting a line break?",
    optionA: "<break>",
    optionB: "<lb>",
    optionC: "<br>",
    optionD: "<newline>",
    correctAnswer: "C",
    unit: "Unit 1 - HTML and CSS",
    difficulty: "Easy"
  },
  {
    id: 5,
    questionText: "Which CSS property is used to change the text color of an element?",
    optionA: "font-color",
    optionB: "text-color",
    optionC: "foreground",
    optionD: "color",
    correctAnswer: "D",
    unit: "Unit 1 - HTML and CSS",
    difficulty: "Medium"
  },
  {
    id: 6,
    questionText: "What does the CSS 'box-sizing: border-box' property do?",
    optionA: "Adds a border to all boxes",
    optionB: "Includes padding and border in the element's total width and height",
    optionC: "Removes all margins from the box",
    optionD: "Creates a shadow around the box",
    correctAnswer: "B",
    unit: "Unit 1 - HTML and CSS",
    difficulty: "Medium"
  },
  {
    id: 7,
    questionText: "Which CSS display value makes an element a flex container?",
    optionA: "display: block",
    optionB: "display: inline",
    optionC: "display: flex",
    optionD: "display: grid-flex",
    correctAnswer: "C",
    unit: "Unit 1 - HTML and CSS",
    difficulty: "Medium"
  },
  {
    id: 8,
    questionText: "What is the purpose of the HTML <meta> tag?",
    optionA: "To display metadata on the page",
    optionB: "To provide metadata about the HTML document",
    optionC: "To create a navigation menu",
    optionD: "To link JavaScript files",
    correctAnswer: "B",
    unit: "Unit 1 - HTML and CSS",
    difficulty: "Medium"
  },
  {
    id: 9,
    questionText: "Which CSS property controls the stacking order of positioned elements?",
    optionA: "stack-order",
    optionB: "layer",
    optionC: "z-index",
    optionD: "position-level",
    correctAnswer: "C",
    unit: "Unit 1 - HTML and CSS",
    difficulty: "Hard"
  },
  {
    id: 10,
    questionText: "What is the difference between 'em' and 'rem' units in CSS?",
    optionA: "em is relative to the parent element's font size, rem is relative to the root element's font size",
    optionB: "em is for margins, rem is for padding",
    optionC: "They are exactly the same",
    optionD: "em is an absolute unit, rem is a relative unit",
    correctAnswer: "A",
    unit: "Unit 1 - HTML and CSS",
    difficulty: "Hard"
  },
  {
    id: 11,
    questionText: "Which CSS pseudo-class selects an element when the user hovers over it?",
    optionA: ":active",
    optionB: ":focus",
    optionC: ":hover",
    optionD: ":visited",
    correctAnswer: "C",
    unit: "Unit 1 - HTML and CSS",
    difficulty: "Easy"
  },
  {
    id: 12,
    questionText: "What is the CSS Grid property used to define column sizes?",
    optionA: "grid-columns",
    optionB: "grid-template-columns",
    optionC: "column-template",
    optionD: "grid-col-size",
    correctAnswer: "B",
    unit: "Unit 1 - HTML and CSS",
    difficulty: "Hard"
  },

  // Unit 2
  {
    id: 13,
    questionText: "Which keyword is used to declare a constant variable in JavaScript?",
    optionA: "var",
    optionB: "let",
    optionC: "const",
    optionD: "final",
    correctAnswer: "C",
    unit: "Unit 2 - JavaScript and React",
    difficulty: "Easy"
  },
  {
    id: 14,
    questionText: "What is the output of typeof null in JavaScript?",
    optionA: "null",
    optionB: "undefined",
    optionC: "object",
    optionD: "boolean",
    correctAnswer: "C",
    unit: "Unit 2 - JavaScript and React",
    difficulty: "Medium"
  },
  {
    id: 15,
    questionText: "What is the virtual DOM in React?",
    optionA: "A lightweight copy of the actual DOM that React uses for efficient updates",
    optionB: "A browser extension for React",
    optionC: "The actual DOM rendered by the browser",
    optionD: "A server-side rendering technique",
    correctAnswer: "A",
    unit: "Unit 2 - JavaScript and React",
    difficulty: "Medium"
  },
  {
    id: 16,
    questionText: "Which method is used to add an element to the end of an array in JavaScript?",
    optionA: "append()",
    optionB: "push()",
    optionC: "add()",
    optionD: "insert()",
    correctAnswer: "B",
    unit: "Unit 2 - JavaScript and React",
    difficulty: "Easy"
  },
  {
    id: 17,
    questionText: "What hook is used to manage state in a React functional component?",
    optionA: "useEffect",
    optionB: "useContext",
    optionC: "useState",
    optionD: "useReducer",
    correctAnswer: "C",
    unit: "Unit 2 - JavaScript and React",
    difficulty: "Easy"
  },
  {
    id: 18,
    questionText: "What does the '===' operator do in JavaScript?",
    optionA: "Assigns a value",
    optionB: "Compares values with type coercion",
    optionC: "Compares both value and type without coercion",
    optionD: "Checks if a variable is defined",
    correctAnswer: "C",
    unit: "Unit 2 - JavaScript and React",
    difficulty: "Medium"
  },
  {
    id: 19,
    questionText: "In React, what is the purpose of the useEffect hook?",
    optionA: "To declare state variables",
    optionB: "To perform side effects like data fetching or subscriptions",
    optionC: "To create new components",
    optionD: "To handle form validation only",
    correctAnswer: "B",
    unit: "Unit 2 - JavaScript and React",
    difficulty: "Medium"
  },
  {
    id: 20,
    questionText: "What is a closure in JavaScript?",
    optionA: "A way to close the browser window",
    optionB: "A function that has access to variables from its outer scope even after the outer function has returned",
    optionC: "A method to end a loop",
    optionD: "A type of error handling",
    correctAnswer: "B",
    unit: "Unit 2 - JavaScript and React",
    difficulty: "Hard"
  },
  {
    id: 21,
    questionText: "Which method converts a JSON string into a JavaScript object?",
    optionA: "JSON.stringify()",
    optionB: "JSON.parse()",
    optionC: "JSON.toObject()",
    optionD: "JSON.convert()",
    correctAnswer: "B",
    unit: "Unit 2 - JavaScript and React",
    difficulty: "Easy"
  },
  {
    id: 22,
    questionText: "What is prop drilling in React?",
    optionA: "A testing technique for components",
    optionB: "Passing props through multiple nested components that don't need them",
    optionC: "A way to optimize component rendering",
    optionD: "Creating props dynamically",
    correctAnswer: "B",
    unit: "Unit 2 - JavaScript and React",
    difficulty: "Hard"
  },
  {
    id: 23,
    questionText: "What does the JavaScript 'map()' method return?",
    optionA: "The original array modified in place",
    optionB: "A new array with the results of calling a function on every element",
    optionC: "A single value",
    optionD: "undefined",
    correctAnswer: "B",
    unit: "Unit 2 - JavaScript and React",
    difficulty: "Medium"
  },
  {
    id: 24,
    questionText: "How do you pass data from a parent to a child component in React?",
    optionA: "Using state",
    optionB: "Using props",
    optionC: "Using context only",
    optionD: "Using localStorage",
    correctAnswer: "B",
    unit: "Unit 2 - JavaScript and React",
    difficulty: "Easy"
  },

  // Unit 3
  {
    id: 25,
    questionText: "Which SQL keyword is used to combine the results of two SELECT statements?",
    optionA: "MERGE",
    optionB: "JOIN",
    optionC: "UNION",
    optionD: "COMBINE",
    correctAnswer: "C",
    unit: "Unit 3 - SQL and JDBC",
    difficulty: "Medium"
  },
  {
    id: 26,
    questionText: "What does the SQL 'WHERE' clause do?",
    optionA: "Sorts the results",
    optionB: "Groups the results",
    optionC: "Filters rows based on a condition",
    optionD: "Joins two tables",
    correctAnswer: "C",
    unit: "Unit 3 - SQL and JDBC",
    difficulty: "Easy"
  },
  {
    id: 27,
    questionText: "Which SQL statement is used to insert new data into a table?",
    optionA: "ADD INTO",
    optionB: "INSERT INTO",
    optionC: "PUT INTO",
    optionD: "CREATE INTO",
    correctAnswer: "B",
    unit: "Unit 3 - SQL and JDBC",
    difficulty: "Easy"
  },
  {
    id: 28,
    questionText: "What is a primary key in a database?",
    optionA: "A key that can have duplicate values",
    optionB: "A unique identifier for each record in a table",
    optionC: "A foreign key reference",
    optionD: "An index for faster queries",
    correctAnswer: "B",
    unit: "Unit 3 - SQL and JDBC",
    difficulty: "Easy"
  },
  {
    id: 29,
    questionText: "Which JDBC interface is used to execute SQL queries?",
    optionA: "Connection",
    optionB: "Statement",
    optionC: "ResultSet",
    optionD: "DriverManager",
    correctAnswer: "B",
    unit: "Unit 3 - SQL and JDBC",
    difficulty: "Medium"
  },
  {
    id: 30,
    questionText: "What does the SQL GROUP BY clause do?",
    optionA: "Filters individual rows",
    optionB: "Groups rows that have the same values in specified columns",
    optionC: "Orders the result set",
    optionD: "Limits the number of results",
    correctAnswer: "B",
    unit: "Unit 3 - SQL and JDBC",
    difficulty: "Medium"
  },
  {
    id: 31,
    questionText: "Which SQL JOIN returns all rows from both tables, matching where possible?",
    optionA: "INNER JOIN",
    optionB: "LEFT JOIN",
    optionC: "RIGHT JOIN",
    optionD: "FULL OUTER JOIN",
    correctAnswer: "D",
    unit: "Unit 3 - SQL and JDBC",
    difficulty: "Hard"
  },
  {
    id: 32,
    questionText: "What is the purpose of PreparedStatement in JDBC?",
    optionA: "To create database tables",
    optionB: "To execute precompiled SQL statements with parameters, preventing SQL injection",
    optionC: "To manage database connections",
    optionD: "To read database metadata",
    correctAnswer: "B",
    unit: "Unit 3 - SQL and JDBC",
    difficulty: "Medium"
  },
  {
    id: 33,
    questionText: "Which SQL function returns the number of rows in a result set?",
    optionA: "SUM()",
    optionB: "TOTAL()",
    optionC: "COUNT()",
    optionD: "NUM()",
    correctAnswer: "C",
    unit: "Unit 3 - SQL and JDBC",
    difficulty: "Easy"
  },
  {
    id: 34,
    questionText: "What does ACID stand for in database transactions?",
    optionA: "Atomicity, Consistency, Isolation, Durability",
    optionB: "Addition, Consistency, Integration, Data",
    optionC: "Atomicity, Concurrency, Isolation, Distribution",
    optionD: "Access, Control, Integrity, Durability",
    correctAnswer: "A",
    unit: "Unit 3 - SQL and JDBC",
    difficulty: "Hard"
  },
  {
    id: 35,
    questionText: "Which SQL clause is used to filter grouped results?",
    optionA: "WHERE",
    optionB: "HAVING",
    optionC: "FILTER",
    optionD: "GROUP FILTER",
    correctAnswer: "B",
    unit: "Unit 3 - SQL and JDBC",
    difficulty: "Hard"
  },
  {
    id: 36,
    questionText: "What is the correct order of SQL clauses in a SELECT statement?",
    optionA: "SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY",
    optionB: "SELECT, WHERE, FROM, ORDER BY, GROUP BY, HAVING",
    optionC: "FROM, SELECT, WHERE, ORDER BY, GROUP BY, HAVING",
    optionD: "SELECT, FROM, GROUP BY, WHERE, HAVING, ORDER BY",
    correctAnswer: "A",
    unit: "Unit 3 - SQL and JDBC",
    difficulty: "Medium"
  },

  // Unit 4
  {
    id: 37,
    questionText: "What annotation marks a class as a Spring Boot application?",
    optionA: "@SpringApp",
    optionB: "@SpringBootApplication",
    optionC: "@Application",
    optionD: "@BootApplication",
    correctAnswer: "B",
    unit: "Unit 4 - Spring Boot Part 1",
    difficulty: "Easy"
  },
  {
    id: 38,
    questionText: "Which annotation is used to mark a class as a REST controller in Spring?",
    optionA: "@Controller",
    optionB: "@RestController",
    optionC: "@WebController",
    optionD: "@ApiController",
    correctAnswer: "B",
    unit: "Unit 4 - Spring Boot Part 1",
    difficulty: "Easy"
  },
  {
    id: 39,
    questionText: "What does the @Autowired annotation do in Spring?",
    optionA: "Creates a new bean",
    optionB: "Automatically injects dependencies",
    optionC: "Marks a class as a component",
    optionD: "Configures database connections",
    correctAnswer: "B",
    unit: "Unit 4 - Spring Boot Part 1",
    difficulty: "Medium"
  },
  {
    id: 40,
    questionText: "Which annotation maps HTTP GET requests to a handler method?",
    optionA: "@Get",
    optionB: "@RequestMapping(method=GET)",
    optionC: "@GetMapping",
    optionD: "Both B and C",
    correctAnswer: "D",
    unit: "Unit 4 - Spring Boot Part 1",
    difficulty: "Medium"
  },
  {
    id: 41,
    questionText: "What is the default embedded server in Spring Boot?",
    optionA: "Jetty",
    optionB: "Undertow",
    optionC: "Tomcat",
    optionD: "Netty",
    correctAnswer: "C",
    unit: "Unit 4 - Spring Boot Part 1",
    difficulty: "Easy"
  },
  {
    id: 42,
    questionText: "What is dependency injection in Spring?",
    optionA: "Downloading dependencies from Maven",
    optionB: "A design pattern where the framework provides objects that a class needs",
    optionC: "Injecting SQL queries into the database",
    optionD: "Adding new dependencies to pom.xml",
    correctAnswer: "B",
    unit: "Unit 4 - Spring Boot Part 1",
    difficulty: "Medium"
  },
  {
    id: 43,
    questionText: "Which file is used for configuration in a Spring Boot application?",
    optionA: "config.xml",
    optionB: "spring-config.json",
    optionC: "application.properties",
    optionD: "settings.yaml",
    correctAnswer: "C",
    unit: "Unit 4 - Spring Boot Part 1",
    difficulty: "Easy"
  },
  {
    id: 44,
    questionText: "What does @RequestBody annotation do?",
    optionA: "Sends a response body",
    optionB: "Binds the HTTP request body to a method parameter",
    optionC: "Creates a request header",
    optionD: "Validates the request URL",
    correctAnswer: "B",
    unit: "Unit 4 - Spring Boot Part 1",
    difficulty: "Medium"
  },
  {
    id: 45,
    questionText: "What is the purpose of @PathVariable in Spring MVC?",
    optionA: "To bind a method parameter to a query parameter",
    optionB: "To extract values from the URI path",
    optionC: "To set the response path",
    optionD: "To define the base URL",
    correctAnswer: "B",
    unit: "Unit 4 - Spring Boot Part 1",
    difficulty: "Medium"
  },
  {
    id: 46,
    questionText: "Which annotation is used to mark a class as a service component in Spring?",
    optionA: "@Bean",
    optionB: "@Component",
    optionC: "@Service",
    optionD: "Both B and C",
    correctAnswer: "D",
    unit: "Unit 4 - Spring Boot Part 1",
    difficulty: "Hard"
  },
  {
    id: 47,
    questionText: "What is the Spring IoC container?",
    optionA: "A Docker container for Spring applications",
    optionB: "A container that manages the lifecycle and configuration of application objects",
    optionC: "A web server container",
    optionD: "A database connection pool",
    correctAnswer: "B",
    unit: "Unit 4 - Spring Boot Part 1",
    difficulty: "Hard"
  },
  {
    id: 48,
    questionText: "What does @RequestParam annotation do in Spring MVC?",
    optionA: "Maps a URL path segment to a parameter",
    optionB: "Extracts query parameters from the request URL",
    optionC: "Sets a default response parameter",
    optionD: "Creates a new HTTP request",
    correctAnswer: "B",
    unit: "Unit 4 - Spring Boot Part 1",
    difficulty: "Easy"
  },

  // Unit 5
  {
    id: 49,
    questionText: "What is Spring Data JPA?",
    optionA: "A JavaScript framework",
    optionB: "A Spring module that simplifies database access using JPA",
    optionC: "A testing framework",
    optionD: "A build tool for Spring projects",
    correctAnswer: "B",
    unit: "Unit 5 - Spring Boot Part 2",
    difficulty: "Easy"
  },
  {
    id: 50,
    questionText: "Which annotation marks a Java class as a JPA entity?",
    optionA: "@Table",
    optionB: "@Entity",
    optionC: "@Model",
    optionD: "@Record",
    correctAnswer: "B",
    unit: "Unit 5 - Spring Boot Part 2",
    difficulty: "Easy"
  },
  {
    id: 51,
    questionText: "What does @GeneratedValue annotation do in JPA?",
    optionA: "Generates a new table",
    optionB: "Specifies the strategy for primary key generation",
    optionC: "Creates a default value for a column",
    optionD: "Generates SQL queries",
    correctAnswer: "B",
    unit: "Unit 5 - Spring Boot Part 2",
    difficulty: "Medium"
  },
  {
    id: 52,
    questionText: "What interface should a repository extend to get CRUD operations in Spring Data JPA?",
    optionA: "CrudRepository",
    optionB: "JpaRepository",
    optionC: "Repository",
    optionD: "All of the above can provide CRUD operations",
    correctAnswer: "D",
    unit: "Unit 5 - Spring Boot Part 2",
    difficulty: "Medium"
  },
  {
    id: 53,
    questionText: "What does 'spring.jpa.hibernate.ddl-auto=update' do?",
    optionA: "Drops and recreates tables on every startup",
    optionB: "Updates the schema to match entities without dropping existing data",
    optionC: "Validates the schema without making changes",
    optionD: "Creates tables only if they don't exist",
    correctAnswer: "B",
    unit: "Unit 5 - Spring Boot Part 2",
    difficulty: "Medium"
  },
  {
    id: 54,
    questionText: "Which annotation defines a many-to-one relationship in JPA?",
    optionA: "@OneToMany",
    optionB: "@ManyToOne",
    optionC: "@ManyToMany",
    optionD: "@JoinTable",
    correctAnswer: "B",
    unit: "Unit 5 - Spring Boot Part 2",
    difficulty: "Easy"
  },
  {
    id: 55,
    questionText: "What is the purpose of @JoinColumn in JPA?",
    optionA: "To create a new table",
    optionB: "To specify the foreign key column for an entity relationship",
    optionC: "To join two SELECT queries",
    optionD: "To add a column constraint",
    correctAnswer: "B",
    unit: "Unit 5 - Spring Boot Part 2",
    difficulty: "Medium"
  },
  {
    id: 56,
    questionText: "What does the @Query annotation do in Spring Data JPA?",
    optionA: "Creates a database connection",
    optionB: "Defines a custom query for a repository method",
    optionC: "Validates SQL syntax",
    optionD: "Generates a table",
    correctAnswer: "B",
    unit: "Unit 5 - Spring Boot Part 2",
    difficulty: "Medium"
  },
  {
    id: 57,
    questionText: "What is the purpose of @RestControllerAdvice?",
    optionA: "To create REST endpoints",
    optionB: "To provide global exception handling for REST controllers",
    optionC: "To configure CORS",
    optionD: "To validate request bodies",
    correctAnswer: "B",
    unit: "Unit 5 - Spring Boot Part 2",
    difficulty: "Hard"
  },
  {
    id: 58,
    questionText: "How does Spring Data JPA derive queries from method names?",
    optionA: "It requires XML configuration for every query",
    optionB: "It parses the method name to automatically generate the query (e.g., findByUsername)",
    optionC: "It uses reflection to scan the database",
    optionD: "It doesn't support derived queries",
    correctAnswer: "B",
    unit: "Unit 5 - Spring Boot Part 2",
    difficulty: "Hard"
  },
  {
    id: 59,
    questionText: "What is the role of the application.properties file in Spring Boot?",
    optionA: "To define HTML templates",
    optionB: "To configure application settings like database URL, server port, and JPA properties",
    optionC: "To store Java source code",
    optionD: "To define REST endpoints",
    correctAnswer: "B",
    unit: "Unit 5 - Spring Boot Part 2",
    difficulty: "Easy"
  },
  {
    id: 60,
    questionText: "What does @Transactional annotation do in Spring?",
    optionA: "Creates a new HTTP transaction",
    optionB: "Ensures that a method runs within a database transaction with rollback on failure",
    optionC: "Logs all method calls",
    optionD: "Validates method parameters",
    correctAnswer: "B",
    unit: "Unit 5 - Spring Boot Part 2",
    difficulty: "Hard"
  }
];

