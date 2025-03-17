# Countries Full Stack App

## Technologies Used

- NestJS
- Supabase
- React
- TailwindCSS

## Features

- **Authentication** via Supabase
- User can view the countries of the world, including where it is in the world, details of the country, current weather and more.
- Option to **filter** countries via region or **search**
- **Dark/Light mode** for user preference

## What this project has taught me

### **Redux**

This project has given me the opportunity to learn about state management using **Redux**.  
The idea behind state management in react remains the same among most state management libraries:

1. Creating the context
2. Connecting the context
3. Providing the context
4. Listening for change

### **Tailwind CSS**

Something I've been curious about for a while and I finally got to try it.  
Basically you're able to add styling via classes and the class names are very self-explanatory.

**Pros:**

- I don't have to dig through a long CSS file or multiple CSS files to edit the styling
- Syntax is easy with a very nice [Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet) to look through

**Cons:**

- Components can become cluttered

### Testing using Cypress

I was pleasantly surprised seeing UI testing in action using Cypress.

### Running Cypress test using GitHub Actions

What I had to do:

1. Create a .yml file

```yml
// .github/workflows/main.yml
name: Run Cypress Tests

on:
  push:
    branches:
      - writing-tests

```

Here I have:

- Defined a name for the workflow ("Run Cypress Tests")
- Defined what events the workflow will run ("on: push")
- Defined which branches the workflow will run ("branches: writing-test")

**After a lot of trial and error I figured out how to set up the jobs**

```yml
// cont..

jobs:
  cypress:
    runs-on: ubuntu-latest

    defaults:
      run:
        working-directory: ./frontend

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Run Cypress tests
        run: npm run e2e:dev
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
          VITE_WEATHER_API_KEY: ${{ secrets.VITE_WEATHER_API_KEY }}
          VITE_GOOGLE_MAPS_API_KEY: ${{ secrets.VITE_GOOGLE_MAPS_API_KEY }}
```

#### Jobs

You can have multiple jobs for a workflow but in this one we only need one.

#### Defaults

In **defaults** I define default settings for the workflow. In this case, I only want the testing to run in the frontend directory, since that's what we'll be testing.

#### Steps

The different steps of that specific job that will be run.  
For this job, these are the steps that the job is performing:

Each step has a **name**, and a corresponding command (**run**)

1. Checking out repository
   (Still need to research this one)

2. Setting up Node

3. Installing dependencies

4. Build the project

5. Running the tests

#### Using environment variables

Setting up the environment variables for github actions is actually really simple.
Before adding them to the `.yml` file, I had to add the variables to my repository settings on github.

Navigate to:  
`https://github.com/USER_NAME/REPOSITORY_NAME/settings/secrets/actions`

Here you can add the secrets (aka env variables) the project uses. It's important these are named the same as in the code. Then, you add them to the workflow using the following syntax:

```yml
- name: Run Cypress tests
  run: npm run e2e:dev
  env:
    VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
    VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
    VITE_WEATHER_API_KEY: ${{ secrets.VITE_WEATHER_API_KEY }}
    VITE_GOOGLE_MAPS_API_KEY: ${{ secrets.VITE_GOOGLE_MAPS_API_KEY }}
```
