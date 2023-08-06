document.addEventListener('DOMContentLoaded',()=>{
    const homeApi = 'http://localhost:3000';

    const mainC = document.getElementById('mainContainer');
    const categoryC = document.getElementById('categoriesContainer');
    const cuisineC = document.getElementById('cuisinesContainer');
    const randomC = document.getElementById('randomContainer');

    document.getElementById('category').addEventListener('click',()=>{
        resetPage(mainC);
        loadSelection(categoryC, `${homeApi}/categories`, createCategoryCard);
    });
    /*
    document.getElementById('cuisine').addEventListener('click',()=>{
        resetPage(mainC);
        loadSelection(cuisineC,`${homeApi}/cuisine`, createCategoryCard);
    });
    */
});

function loadSelection(container,url,displayFunction){
    fetch(url)
        .then(resp=>resp.json())
        .then(data=>{
            data.forEach(meal=>{
                displayFunction(container,meal);
            });
        });
};

function createCategoryCard(container,meal){
    const categoryCard = document.createElement('div');
    categoryCard.classList.add('category-card');

    const img = document.createElement('img');
    img.src = meal.strCategoryThumb;
    img.alt = meal.strCategory;

    img.addEventListener('click', () => {
        container.innerText='';
        selectedCategory(container, `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal.strCategory}`);
    });

    const title = document.createElement('p');
    title.textContent = meal.strCategory;

    categoryCard.append(img,title);
    container.append(categoryCard);
};

function selectedCategory(container,categoriesUrl){
    fetch(categoriesUrl)
        .then(resp=>resp.json())
        .then(data=>{
            data.meals.forEach(meal=>{
                displayCategorySelections(container,meal);
            });
        });
};

function displayCategorySelections(container,meal){
    const mealCard = document.createElement('div');
    mealCard.classList.add('category-card');

    const img = document.createElement('img');
    img.src = meal.strMealThumb;
    img.alt = meal.strMeal;

    img.addEventListener('click', () => {
        container.innerText='';
        searchThroughId(container, `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
    });

    const p = document.createElement('p');
    p.textContent = meal.strMeal;

    mealCard.append(img,p);
    container.append(mealCard);
};

function searchThroughId(container,searchIdUrl){
    fetch(searchIdUrl)
        .then(resp=>resp.json())
        .then(data=>{
            const selectedMeal = data.meals[0];
            mealBio(container,selectedMeal);
        });
};

function mealBio(container,meal){
    const mealCard = document.createElement('div');
    mealCard.classList.add('random-card');

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container');

    const header = document.createElement('h2');
    header.textContent = meal.strMeal;

    const img = document.createElement('img');
    img.src = meal.strMealThumb;
    img.alt = meal.strMeal;
    
    const p = document.createElement('p');
    p.textContent = meal.strInstructions;
    p.classList.add('content', 'center-align');

    const ul = document.createElement('ul');
    ul.classList.add('content', 'left-align');
    for(let i = 0; i <= 20; i++){
        const ingredient = meal['strIngredient'+i];
        const measurements = meal['strMeasure'+i];
        if (ingredient && measurements){
            const ingredientItem = document.createElement('li');
            ingredientItem.textContent = `${measurements} ${ingredient}`;
            ul.appendChild(ingredientItem);
            
        };
    };
    contentContainer.append(ul,p);
    mealCard.append(header,img,contentContainer);
    container.append(mealCard);
    container.style.display = 'block';
};

function resetPage(page){
    page.childNodes.forEach(child=>{
        child.innerText = '';
    });
};