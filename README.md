# Krogsveen Technical Case 2024

## Introduction

The coding case is designed to test your knowledge on software development, 
as well as your ability to resonate around, understand, and solve problems.

The focus of your solution will be on your technical understanding, and the
reasoning behind your choices.

You may choose whether to:
- (1) Write a solution in advance, which we will review together, or;
- (2) Solve the problem during the interview.

## The task: Implement a simple web application

You are given a monorepo with the skeleton of a simple API (`backend/`) and 
a web application (`frontend/`) that should feature an activity dashboard.

The API is a simple Express server that serves a dummy database. The frontend
is a Next.js application bootstrapped with `create-next-app`, using the [pages
router](https://nextjs.org/docs/pages) to define the routes of the application.

The application structure is as follows:

```
frontend/
    pages/
        dashboard/
            index.tsx // The main dashboard page should be implemented here
        _app.tsx
        _document.tsx
        index.tsx     // Root page
    public/
    styles/
backend/
    src/
        database.ts // Dummy database
        app.ts      // Express server and routes / entry point
```

Start the backend dev server:
```bash
cd backend

npm run dev
# or
yarn dev
```

Start the frontend dev server:
```bash
cd frontend

npm run dev
# or
yarn dev
```


Your task is to implement the dashboard page, which should display a dashboard
made up of data fetched from the backend (layout and design is completely up to
you, but don't spend too much time on it).

Besides the UI, you will need to implement a route in the backend that returns
the data for the dashboard. The router (or controller) should validate the
request, get the data from the dummy database, and return the data to the
frontend client.

## Implementation
Choose either option 1 or 2.

### Option 1: Write a solution in advance
The solution should be written in Typescript.
You are free to implement the solution any way you see fit, but you should be
prepared to explain your choices. You shouldn't spend more than 2 hours on the
solution.

Don't worry if you don't finish everything. We will set aside time to discuss
your solution together, where you may explain your thought process and any
trade-offs you made.

### Option 2: Solve the problem during the interview
We will walk through the task, and you will be able to think out a solution
during the interview, where you can explain your thought process and any
trade-offs you would want to make. You are free to use a whiteboard and/or
write code to support your thoughts during the interview.
