const localHostAPIUrl = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault();

    const page = document.getElementById('contentContainer');

    document.getElementById('category').addEventListener('click',(e)=>{
        e.preventDefault();
        resetPage(page);
        fetchCategories(page);
    });

    document.getElementById('cuisine').addEventListener('click',(e)=>{
        e.preventDefault();
        resetPage(page);
        fetchCuisines(page);
    })

    document.getElementById('randomButton').addEventListener('click',(e)=>{
        e.preventDefault();
        resetPage(page);
        fetchRandomMeals(page);
    });

});

function fetchCategories(categoriesContainer){
    fetch(`${localHostAPIUrl}/categories`)
        .then(resp=>resp.json())
        .then(data=>{
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

function fetchCuisines(cuisinePage){
    fetch(`${localHostAPIUrl}/cuisine`)
        .then(resp=>resp.json())
        .then(data=>{
            data.forEach(cuisine=>{
                const cuisineItems = listOutCuisine(cuisine);
                cuisinePage.append(cuisineItems);
            });
        });
};

function listOutCuisine(){
    
    const typeOfCuisines = document.createElement('li');
    typeOfCuisines.textContent = cuisine.strArea;

    return typeOfCuisines;
}

function fetchRandomMeals(recipeDetails){
    const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

    fetch(randomMealUrl)
        .then(resp=>resp.json())
        .then(data=>{
            const randomMeal = data.meals[0];
            displayMeals(randomMeal,recipeDetails);
        });
};

function displayMeals(meal,recipeDetails){

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

function resetPage(page){
    page.innerText = '';
};