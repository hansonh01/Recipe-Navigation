# Recipe-Navigatior

## Learning Goals
- Design and architect feature acress a frontend
- Communicate and collaborate in a technical environment
- Integrate JavaScript and an external API
- Debug issues in small- to medium-sized projects
- Build and iterate on a project MVP

## Introduction
Hi everyone! My name is Hanson Hua and this is my first project ever. Using everything I have learned up to this point of the program, I have built this Single Page Application for Phase 1.

A little about this program: The Recipe Navigator is a web application that allows users to explore and search for and through recipes, view meal details, and leave comments. It utilizes the MealDB API for retrieving recipe data and integrates with a local JSON server to manage and display user comments.

## Features

- Browse recipes by category and cuisine
- Display a random meal
- Search for recipes by name
- View meal details including ingredients and instructions
- Leave comments for specific meals

Some of the integration is utilized and accessible through a json-server at http://localhost:3000 in your web browser. The over half would be fetching from 'https://themealdb.com/'.

## Usage
1. Home Page: The home page displays different filtering options, including categories, cuisines, and a random meal.

2. Category and Cuisine Filters: Clicking on a category or cuisine will display relevant recipes.

3. Generate a Random Meal: Clicking on the "Generate Random Meal" button will display a randomly selected meal.

4. Search function: Enter a recipe name in the search input and click the "Search" button to find matching recipes.

5. Meal Details: Click on a meal's image to view its details, including ingredients and instructions.

6. Leave a Comment: Scroll down to the comments section and fill out the comment form to leave feedback for a meal.

## Code Structure
- The main application logic is in the index.js file, which handles event listeners, API requests, and data display.
- The app uses the MealDB API for retrieving meal data and a local JSON server to manage comments.
- styles are defined in the styles.css file to provide a user-friendly and responsive design.

## Project Requirements
1. App must be a HTML/CSS/JS frontend accessible data from a public API or from db.json using json-server. API or db.json should return a collection of at least 5 objects with each object having at least 3 attributes. All interactions between the client and the API should be handled asynchronously and use JSON as the communication format.

- Yes

2. Your entire app must run on a single page. There should be NO redirects or reloads. In other words, your project will contain a single HTML file.

- Yes. Single page, one HTML file.

3. Use at least 3 distinct event listeners (3 events of different types) that enable interactivity. 

- Yes.
    1. addEventListener('click',()=>{});
    2. addEventListener('mouseover',()=>{}) and addEventListener('mouseout',()=>{});
    3. addEventListener('submit',()=>{});
    4. Also addEventListener('DOMContentLoaded',()=>{});

4. Your project must implement at least one instance of array iteration using available array methods (map, forEach, filter, etc). Manipulating your API data in some way should present an opportunity to implement your array iteration.

- Yes. My go-to array iteration recently has been forEach(), while it is my favorite, I believe it's the most easy to use and can be utlized in most scenarios.

5. Follow good coding practices. Keep your code DRY (Do not repeat yourself) by utilizing functions to abstract repetitive code.

- Yes. I spent a lot of time optimizing and combining functions that I felt like was repetitive.

