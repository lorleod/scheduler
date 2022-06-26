# Interview Scheduler
Interview Scheduler is a responsive single-page application built with React. Users can book, edit, or delete appointments with interviewers.

Data is persisted by an API server uing a PostgreSQL database and accessed via HTTP using the JSON format. Jest and Cypress tests were used through the development of the project.

Stack: React, Webpack, Babel, Axios, Storybook, Jest, Cypress


## Setup
<ol>
  <li>Fork this repository.</li>
  <li>Clone your repositiroy onto your local device.</li>
  <li>Install dependencies with 'npm install'.</li>
  <li>Visit the API server repo and follow the README.md file for setup: https://github.com/lighthouse-labs/scheduler-api</li>
</ol>

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Dependencies
    "axios": "^0.27.2",
    "classnames": "^2.2.6",
    "fsevents": "^1.2.9",
    "normalize.css": "^8.0.1",
    "react": "^16.9.0",
    "react-dom": "^16.9.0",
    "react-scripts": "3.0.0"

## DevDependecies
    "@babel/core": "^7.4.3",
    "@storybook/addon-actions": "^5.0.10",
    "@storybook/addon-backgrounds": "^5.0.10",
    "@storybook/addon-links": "^5.0.10",
    "@storybook/addons": "^5.0.10",
    "@storybook/react": "^5.0.10",
    "@testing-library/jest-dom": "^4.0.0",
    "@testing-library/react": "^8.0.7",
    "@testing-library/react-hooks": "^8.0.0",
    "babel-loader": "^8.0.5",
    "cypress": "^9.7.0",
    "node-sass": "npm:sass@^1.52.3",
    "prop-types": "^15.8.1",
    "react-test-renderer": "^16.9.0"