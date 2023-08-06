const localHostAPIUrl = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault();

    const mC = document.getElementById('mainContainer');
    const caC = document.getElementById('categoriesContainer');
    const cuC = document.getElementById('cuisinesContainer');
    const rC = document.getElementById('randomContainer');

    document.getElementById('category').addEventListener('click',(e)=>{
        e.preventDefault();
        resetPage(mC);
        fetchCategories(caC);
    });

    document.getElementById('cuisine').addEventListener('click',(e)=>{
        e.preventDefault();
        resetPage(mC);
        fetchCuisines(cuC);
    });

    document.getElementById('randomButton').addEventListener('click',(e)=>{
        e.preventDefault();
        resetPage(mC);
        fetchRandomMeals(rC);
    });

});

function fetchCategories(caC){
    fetch(`${localHostAPIUrl}/categories`)
        .then(resp=>resp.json())
        .then(data=>{
            data.forEach(category=>{
                caC.append(displayingCategories(category,caC));
            });
        });
};

function displayingCategories(category,container){
    const categoryCard = document.createElement('div');
    categoryCard.classList.add('category-card');

    const img = document.createElement('img');
    img.src = category.strCategoryThumb;
    img.alt = category.strCategory;
    img.addEventListener('click',(e)=>{
        e.preventDefault();
        filterByCategories(category.strCategory,container);
    });

    const title = document.createElement('p');
    title.textContent = category.strCategory;

    categoryCard.append(img,title);
    return categoryCard;
};

function filterByCategories(category, container){
    const categoryUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    fetch(categoryUrl)
        .then(resp=>resp.json())
        .then(data=>{
            container.innerText = '';
            data.meals.forEach(meal=>{
                container.append(categoryImage(meal,container));
            });
        });
};

function categoryImage(meal,container){
    const mealCard = document.createElement('div');
    mealCard.classList.add('category-card');

    const mealImage = document.createElement('img');
    mealImage.src = meal.strMealThumb;
    mealImage.alt = meal.strMeal;
    mealImage.addEventListener('click',(e)=>{
        e.preventDefault();
        lookUpMealId(meal.idMeal,container);
    });

    const mealName = document.createElement('p');
    mealName.textContent = meal.strMeal;

    mealCard.append(mealImage, mealName);
    return mealCard;
};

function lookUpMealId(mealId,container){
    const lookUpUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(lookUpUrl)
        .then(resp=>resp.json())
        .then(data=>{
            container.innerText = '';
            const theMeal = data.meals[0];
            displayRandomMeal(theMeal,container);
        });
};

function fetchCuisines(cuC){
    fetch(`${localHostAPIUrl}/cuisine`)
        .then(resp=>resp.json())
        .then(data=>{
            data.forEach(cuisine=>{
                cuC.append(displayingCuisine(cuisine,cuC));
            });
        });
};

function displayingCuisine(cuisine,cuC){
    const name = document.createElement('ul');
    name.textContent = cuisine.strArea;
    name.classList.add('cuisine-item');
    name.addEventListener('click',(e)=>{
        e.preventDefault();
        lookUpCuisine(cuisine.strArea,cuC);
    });
    
    return name;
};

function lookUpCuisine(path,container){
    const cuisineUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${path}`;
    fetch(cuisineUrl)
        .then(resp=>resp.json())
        .then(data=>{
            lookUpMealId(data,container);
        });
};;

function fetchRandomMeals(rC){
    const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
    fetch(randomMealUrl)
        .then(resp=>resp.json())
        .then(data=>{
            const randomMeal = data.meals[0];
            displayRandomMeal(randomMeal,rC);
        });
};

function displayRandomMeal(meal,page){
    const mealCard = document.createElement('div');
    mealCard.classList.add('random-card');

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container');

    const mealHeading = document.createElement('h2');
    mealHeading.textContent = meal.strMeal;

    const mealImage = document.createElement('img');
    mealImage.src = meal.strMealThumb;
    mealImage.alt = meal.strMeal;
    
    const instruction = document.createElement('p');
    instruction.textContent = meal.strInstructions;
    instruction.classList.add('content', 'right-align');

    const ingredientsList = document.createElement('ul');
    ingredientsList.classList.add('content', 'left-align');
    for(let i = 0; i <= 20; i++){
        const ingredient = meal['strIngredient'+i];
        const measurements = meal['strMeasure'+i];
        if (ingredient && measurements){
            const ingredientItem = document.createElement('li');
            ingredientItem.textContent = `${measurements} ${ingredient}`;
            ingredientsList.appendChild(ingredientItem);
            
        };
    };
    contentContainer.append(ingredientsList,instruction);
    mealCard.append(mealHeading,mealImage,contentContainer);
    page.append(mealCard);
    page.style.display = 'block';
};

function resetPage(page){
    page.childNodes.forEach(child=>{
        child.innerText = '';
    });
};