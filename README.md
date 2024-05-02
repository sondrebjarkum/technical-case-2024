# Krogsveen Technical Case 2024

## Introduction

The coding case is designed to test your knowledge on software development, 
as well as your ability to resonate around, understand, and solve problems.

The focus of your solution will be on your technical understanding, and the
reasoning behind your choices.

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

Your task is to implement the dashboard page (`frontend/pages/dashboard/index.tsx`),
which should display a dashboard made up of data fetched from the backend.
You may choose what data to fetch and how to display it. You are also free to
add other dummy data to the database if you see fit.
Layout and design is completely up to you, but don't spend too much time on it.

Besides the UI, you will need fetch data from the backend dummy database. 
Implement a route in the backend that returns
the data for the dashboard. The route should validate the
request, get the data from the dummy database, and return the data to the
frontend client.

## Implementation
The solution should be written in Typescript.
You are free to implement the solution any way you see fit, but you should be
prepared to explain your choices. You shouldn't spend more than 2 hours on the
solution.

Don't worry if you don't finish every little bit. As long as the basics look good,
we will set aside time to discuss your solution together, where you may explain
your thought process and any trade-offs you made.
