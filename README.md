# Full Stack Open 

Certificate of accomplishment: [here](https://studies.cs.helsinki.fi/stats/api/certificate/fullstackopen/en/0fa0cc98411a68986d604c1bbfec0295)

This repository contains my projects & solutions to the [Full Stack Open](https://fullstackopen.com/en/) course from the University of Helskinki.

The course covers topics such as:
- React
- Express, Node.js
- MongoDB
- REST APIs, Postman
- Redux
- Unit, Integration, End-to-End testing (Jest, Vitest, Playwright)
- CI/CD
- Docker
- PostgreSQL with Sequelize

## Course content & Projects

### Part 0: Fundamentals of Web Apps
Topics:
- HTML/CSS
- HTTP requests
- JSON
- Document Object Model (DOM)
- JavaScript libraries

### Part 1: Introduction to React
Topics:
- React
- Props
- Event handlers
- State management using hooks

Projects:
- [Course Info](https://github.com/feliciahmq/full-stack-open/tree/main/part1/courseinfo) - A page that displays course information using React.
- [Unicafe](https://github.com/feliciahmq/full-stack-open/tree/main/part1/unicafe) - A feedback & statistics page using React hooks for state.
- [Anecdotes](https://github.com/feliciahmq/full-stack-open/tree/main/part1/anecdotes) - A page that displays random anecdotes for voting.

### Part 2: Communicating with the Server

Topics:
- HTTP requests using Axios
- 3rd party APIs
- Forms
- Rendering server data

Projects:
- [Course Info](https://github.com/feliciahmq/full-stack-open/tree/main/part2/courseinfo) - Refactored version of Part 1 with a maintainable structure.
- [Countries](https://github.com/feliciahmq/full-stack-open/tree/main/part2/dataforcountries) - A page that fetches country data from APIs based on user search.
- [Phonebook Front End](https://github.com/feliciahmq/full-stack-open/tree/main/part2/phonebook) - A phonebook frontend app to add, delete or modify entries. Uses a mock REST API.

## Part 3: Programming a Server with Node.js and Express

Topics:
- REST APIs using Node.js and Express
- MongoDB with Mongoose
- Express middleware for logging, error handling, etc.
- ESlint

Projects:
- [Phonebook Back End](https://github.com/feliciahmq/full-stack-open/tree/main/part3) - An RESTful backend in Express for the phonebook frontend in part 2. Uses Mongoose and a MongoDB database.

### Part 4 - Testing Express Servers, User Administration

Topics:
- Unit testing and integration testing Express back ends with Jest and SuperTest
- User authentication using using JSON web tokens
- Password hashing using bcrypt

Projects:
- [Blog List Back End](https://github.com/feliciahmq/full-stack-open/tree/main/part4) - A RESTful backend in Express for creating, reading, and updating blog posts data. Certain endpoints are limited to authenticated users only. Unit and integration tests were done using Jest and SuperTest.

## Part 5 - Testing React Apps

Topics:
- Unit testing of React components using Jest and React Testing Library
- End-to-end testing of full stack applications using Cypress
- Handling login on the front end using JSON web tokens
- Defining props using PropTypes

Projects:
- [Blog List Front End](https://github.com/feliciahmq/full-stack-open/tree/main/part5/bloglist-frontend) - A React front end for the blog list backend from part 4. Users can add or like their favourite blog posts. Unit testing of React components was done using Jest and React Testing Library. End-to-End testing of the full stack application was done using Playwright.

### Part 6 - State Management with Redux

Topics:
- Redux for state management (using both hooks and connect)
- Redux Thunk middleware for asynchronous actions

Projects:
- [Unicafe Redux](https://github.com/feliciahmq/full-stack-open/tree/main/part6/unicafe-redux) - The unicafe app from part 1 with Redux for state management. 
- [Redux Anecdotes](https://github.com/feliciahmq/full-stack-open/tree/main/part6/redux-anecdotes) - The anecdotes app from part 1 with Redux for state management. Uses reducers for notifications, filtering data, and initializing/adding/voting for anecodotes. Uses Redux Thunk middleware for for asynchronous actions.
- [Query Anecdotes](https://github.com/feliciahmq/full-stack-open/tree/main/part6/query-anecdotes) - The anecdotes app from part 1 with React Query for state management.


### Part 12 - Containers

Topics:
- Using Docker, Docker Compose

[Docker for todo-app backend](https://github.com/feliciahmq/full-stack-open/tree/main/part12/part12-containers-applications-main)
