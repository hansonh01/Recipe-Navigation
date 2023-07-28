document.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault();

    const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const recipeContainer = document.getElementById('recipesContainer');

    fetch(randomMealUrl)
        .then(resp=>resp.json())
        .then(data=>{
            const randomMeal = data.meals[0];
            displayMeal(randomMeal);
        });
    function displayMeal(meal){
        recipeContainer.innerText = '';

        const mealHeading = document.createElement('h2');
        mealHeading.textContent = meal.strMeal;

        const mealImage = document.createElement('img');
        mealImage.src = meal.strMealThumb;
        mealImage.alt = meal.strMeal;
        mealHeading.appendChild(mealImage);

        recipeContainer.appendChild(mealHeading);
    };
});