const localHostAPIUrl = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault();
    
    document.getElementById('category').addEventListener('click',()=>{
        fetchCategories();
    });

    document.getElementById('randomButton').addEventListener('click',()=>{
        fetchRandomMeals();
    });
});

function fetchCategories(){
    const categoriesContainer = document.getElementById('categoriesContainer');
    fetch(`${localHostAPIUrl}/categories`)
        .then(resp=>resp.json())
        .then(data=>{
            categoriesContainer.innerText = '';
            data.forEach(category=>{
                categoriesContainer.append(displayCategories(category));
            });
        });
};

function displayCategories(category){
    const categoryCard = document.createElement('div');
    categoryCard.classList.add('category-card');

    const img = document.createElement('img');
    img.src = category.strCategoryThumb;
    img.alt = category.strCategory;

    const selection = document.createElement('p');
    selection.textContent = category.strCategory;

    categoryCard.append(img,selection);
    return categoryCard;
};

function fetchRandomMeals(){
    const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

    fetch(randomMealUrl)
        .then(resp=>resp.json())
        .then(data=>{
            const randomMeal = data.meals[0];
            displayMeals(randomMeal);
        });
};

function displayMeals(meal){
    const recipeDetails = document.getElementById('recipeDetails');
    recipeDetails.innerText = '';

    const mealHeading = document.createElement('h2');
    mealHeading.textContent = meal.strMeal;

    const mealImage = document.createElement('img');
    mealImage.src = meal.strMealThumb;
    mealImage.alt = meal.strMeal;
    
    const instruction = document.createElement('p');
    instruction.textContent = meal.strInstructions;

    const ingredientsList = document.createElement('ul');
    for(let i = 0; i <= 20; i++){
        const ingredient = meal['strIngredient'+i];
        const measurements = meal['strMeasure'+i];
        if (ingredient && measurements){
            const ingredientItem = document.createElement('li');
            ingredientItem.textContent = `${measurements} ${ingredient}`;
            ingredientsList.appendChild(ingredientItem);
        };
    };
    recipeDetails.append(mealHeading,mealImage,instruction,ingredientsList);

    recipeDetails.style.display = 'block';
};


//1. Categories
//2. Cusines xx
//3. Ingredients
//4. Random