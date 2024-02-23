# News Aggregator API

This Node.js project implements a RESTful API for a news aggregator Application that allows users to receive personalized news articles based on their preferences.

The API supports user registration, login, preference management, and fetching news articles.

The tasks are stored in an in-memory data store (Array).

The project utilizes Node.js, Express.js, and various NPM packages.

## Installation

Clone the repository:

```bash
  git clone https://github.com/yash17-12-98/news-aggregator.git
```

Navigate to the project directory:

```bash
  cd news-aggregator
```

Install dependencies:

```bash
  npm install
```

Start the server:

```bash
  npm run start
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Endpoints

- POST /users/login: Login a user.

- POST /users/signup: Register a new user.

- GET /users/prefernces: Retrieve the list of news preferences for the logged-in user.

- PUT /users/prefernces: Update the list of news preferences for the logged-in user.

- GET /news: Fetch news articles based on the logged-in user's news preferences.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`JWT_SECRET`

`NEWSAPI_KEY`
