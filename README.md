# Countries Full Stack App

[Live Page](https://countries-of-the-world-kantis.netlify.app/)

![Run Cypress Tests](https://github.com/athinakantis/full-stack-countries-app/actions/workflows/main.yml/badge.svg)

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
- Authenticated user has the option to **favorite**, **unfavorite** and view favorites.

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

### **E2E Testing with Cypress**

I never thought I would enjoy testing as much as I do. But when seeing E2E testing in action using Cypress I was pleasantly surprised. It's a great tool I will definitely bring with me in my future projects.

### **Automating tests using GitHub Actions**

What I had to do:

1. Create a .yml file

```yml
// .github/workflows/main.yml
name: Run Cypress Tests

on:
  push:
    branches-ignore:
      - starter

```

Here I have:

- Defined a **name** for the workflow ("Run Cypress Tests")
- Defined what events trigger the workflow ("on: push")
- Defined **which branches** the workflow will run (All branches except "starter")

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

You can have multiple jobs in a workflow but for this one we only need one.

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

##### Cypress environment variables

- **Creating**

There are multiple ways of creating the cypress environment variables.  
I chose to do this in a `cypress.env.json` file

```json
{
  "TEST_USER_EMAIL": "example@gmail.com",
  "TEST_USER_PW": "password_here"
}
```

- **Access in test**

```js
cy.get('#email').type(Cypress.env('TEST_USER_EMAIL'));
```

- **Access in .yml**

```yml
- name: Run Cypress tests
  run: npm run e2e:dev
  env:
    VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
    VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
    VITE_WEATHER_API_KEY: ${{ secrets.VITE_WEATHER_API_KEY }}
    VITE_GOOGLE_MAPS_API_KEY: ${{ secrets.VITE_GOOGLE_MAPS_API_KEY }}
    CYPRESS_TEST_USER_EMAIL: ${{ secrets.CYPRESS_TEST_USER_EMAIL }}
    CYPRESS_TEST_USER_PW: ${{ secrets.CYPRESS_TEST_USER_PW }}
```

### More on Cypress Testing

#### Intercepting requests

When creating some of my test, I had to make sure the requests had finished before navigating to another site. At first I used `.wait(ms)`, but it seemed time-inefficient to do so. That's when I found out about the built in method `.intercept`. This method allows you to spy on requests.

```ts
cy.intercept(
  'POST',
  `${Cypress.env('SUPABASE_URL')}/rest/v1/country_favorites*`
).as('favoriteRequest');
cy.get('button[data-test-id="favorite-button"]').first().click();
cy.wait('@favoriteRequest');
```

**_Some cool things about this snippet:_**

1. The request is intercepted using the **METHOD** and **URL**.
2. The interception is given an **alias** "favoriteRequest"
3. After the request is made, Cypress spies on it and waits for it to complete.

### Fix Netlify Routing issue

**The problem:**  
When deploying an app that uses react-router-dom with netlify the routes don't work, as in directly going to a route like `/home` or `/login` would result in a "Page not found" error, although these routes do exist in the project.

**The solution:**  
Super simple, add a `\_redirects` file in the projects public folder.  
In this file, add `/* /index.html 200`. Now any request goes through index.html which is where we have our script + routes.
