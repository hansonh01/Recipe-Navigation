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
                caC.append(displayingCategories(category))
            });
        });
};

function displayingCategories(category){
    const categoryCard = document.createElement('div');
    categoryCard.classList.add('category-card');

    const img = document.createElement('img');
    img.src = category.strCategoryThumb;
    img.alt = category.strCategory;

    const title = document.createElement('p');
    title.textContent = category.strCategory;

    categoryCard.append(img,title);
    return categoryCard;
};

function fetchCuisines(cuC){
    fetch(`${localHostAPIUrl}/cuisine`)
        .then(resp=>resp.json())
        .then(data=>{
            data.forEach(type=>{
                cuC.append(displayingCuisine(type));
            });
        });
};

function displayingCuisine(type){
    const name = document.createElement('ul');
    name.textContent = type.strArea;
    name.classList.add('cuisine-item');
    
    return name;
};

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