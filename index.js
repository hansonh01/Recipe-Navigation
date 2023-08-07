document.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault();

    const homeApi = 'http://localhost:3000';
    const randomApi = 'https://www.themealdb.com/api/json/v1/1/random.php';

    const mainC = document.getElementById('mainContainer');
    const categoryC = document.getElementById('categoriesContainer');
    const cuisineC = document.getElementById('cuisinesContainer');
    const randomC = document.getElementById('randomContainer');

    const filters = {
        'category':{ container: categoryC, url:`${homeApi}/categories`,displayFunction: createCategoryCard },
        'cuisine':{ container: cuisineC, url: `${homeApi}/cuisine`, displayFunction: createCuisineCard },
        'randomButton':{ container: randomC, url: randomApi, displayFunction: mealBio }
    };
    
    for(const filter in filters) {
        if(filters.hasOwnProperty(filter)){
            document.getElementById(filter).addEventListener('click',()=>{
                resetPage(mainC);
                loadSelection(filters[filter].container, filters[filter].url, filters[filter].displayFunction);
            });
        };
    };
});

function loadSelection(container,url,displayFunction){
    fetch(url)
        .then(resp=>resp.json())
        .then(data=>{
            if(Array.isArray(data)){
                data.forEach(meal=>{
                    displayFunction(container,meal);
                });
            }else if (data.meals){
                const randomMeal = data.meals[0];
                displayFunction(container,randomMeal);
            };
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
        selectedInput(container, `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal.strCategory}`);
    });

    const title = document.createElement('p');
    title.textContent = meal.strCategory;

    categoryCard.append(img,title);
    container.append(categoryCard);
};

function createCuisineCard(container,meal){
    const cuisineCard = document.createElement('button');
    cuisineCard.textContent = meal.strArea;
    cuisineCard.classList.add('cuisine-item');
    cuisineCard.addEventListener('click',(e)=>{
        e.preventDefault();
        selectedInput(container,`https://www.themealdb.com/api/json/v1/1/filter.php?a=${meal.strArea}`);
    });
    container.append(cuisineCard);
};

function selectedInput(container,categoriesUrl){
    fetch(categoriesUrl)
        .then(resp=>resp.json())
        .then(data=>{
            container.innerText = '';
            data.meals.forEach(meal=>{
                displaySelections(container,meal);
            });
        });
};

function displaySelections(container,meal){
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
    
    const pT = document.createElement('h4');
    pT.textContent = 'Instruction: ';
    pT.classList.add('content', 'title');

    const p = document.createElement('p');
    p.textContent = meal.strInstructions;
    p.classList.add('content', 'center-align');
    pT.appendChild(p);

    const ul = document.createElement('h4');
    ul.textContent = 'Ingredients: ';
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
    contentContainer.append(ul,pT);
    mealCard.append(header,img,contentContainer);
    container.append(mealCard);
    container.style.display = 'block';
};

function resetPage(page){
    page.childNodes.forEach(child=>{
        child.innerText = '';
    });
};