---

# Task Manager Application - Documentation

## Overview

This project is a task management application built with **Vue 3**, **Pinia** for state management, and **MongoDB** as the database. The application allows users to add, update, and delete tasks, manage task completion status, and filter tasks based on their status.

---

## MongoDB Setup

### 1. Install MongoDB Locally

Make sure you have MongoDB installed locally. Follow the official installation guide: [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/).

### 2. Start MongoDB

Run MongoDB locally by using the following command (make sure MongoDB is running to persist tasks):

```bash
mongod
```

---

## Server Setup

### 1. Server Script

To run the server, use the following script located in `server/index.js`:

```bash
node server/index.js
```

This will launch the API server on `http://localhost:3001`.

---

## Vue 3 Setup and Configuration

### 1. Install Dependencies

Ensure you have the necessary packages installed:

```bash
npm install
```

### 2. Tailwind CSS Integration

Tailwind CSS has been installed to efficiently style the user interface. It is used for responsive design and grid layouts. Make sure Tailwind is properly configured by following these steps:

1. Install Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

2. Update `tailwind.config.js` to include your content paths:

```javascript
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. Import Tailwind into your `src/main.js`:

```javascript
import './assets/tailwind.css'
```

### 3. Project Structure Update

For better structure and separation of concerns, `App.vue` has been replaced by `pages/index.vue` to manage routing and page content more efficiently.

---

## Pinia Store for Task Management

A store was created using **Pinia** to manage tasks. This store allows for CRUD operations on tasks and maintains the application state, including task filtering and completion status.

---

## E2E Testing with Cypress

End-to-end tests are set up using **Cypress** to ensure that all user interactions work as expected. To run the tests:

1. Install Cypress:

```bash
npm install cypress --save-dev
```

2. Open Cypress test runner:

```bash
npm run cypress-open
```

3. Open tasks.spec.js script (Delete all tasks before start if you check before in localhost)

---

## Running the Application Locally

1. Start the API server:

```bash
node server/index.js
```

2. Run the Vue 3 development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3005`. I fix the port to have total compatibility with cypress tests.

---

This documentation covers the essential steps of setting up and running the project.