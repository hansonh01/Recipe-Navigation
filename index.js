document.addEventListener('DOMContentLoaded',()=>{

    const homeApi = 'http://localhost:3000';
    const randomApi = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const searchByNameApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;

    const mainC = document.getElementById('mainContainer');
    const categoryC = document.getElementById('categoriesContainer');
    const cuisineC = document.getElementById('cuisinesContainer');
    const randomC = document.getElementById('randomContainer');

    const filters = {
        'category':{ container: categoryC, url:`${homeApi}/categories`,displayFunction: createCategoryCard },
        'cuisine':{ container: cuisineC, url: `${homeApi}/cuisine`, displayFunction: createCuisineCard },
        'randomButton':{ container: randomC, url: randomApi, displayFunction: mealBio },
        'searchButton': { container: mainC, url: '', displayFunction: mealBio }
    };
    
    function userSelections(){
        for(const filter in filters) {
            if(filters.hasOwnProperty(filter)){
                document.getElementById(filter).addEventListener('click',()=>{
                    resetPage(mainC);
                    
                    if(filter === 'searchButton'){
                        const searchValue = document.getElementById('searchInput').value;
                        if(searchValue === ''){
                            displayError(mainC, 'Please enter a search term.');
                        } else {
                            filters[filter].url = `${searchByNameApi}${searchValue}`;
                            loadSelection(filters[filter].container, filters[filter].url, filters[filter].displayFunction);
                        }
                    } else {
                        loadSelection(filters[filter].container, filters[filter].url, filters[filter].displayFunction);
                    };
                });
            };
        };
    };
    userSelections();
});

function displayError(container, message){
    const errorContainer = document.createElement('h1');
    errorContainer.textContent = message;
    errorContainer.classList.add('error-message');
    container.appendChild(errorContainer);
};

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
        const description = document.createElement('h3');
        description.textContent = meal.strCategoryDescription;
        container.append(description);
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
        container.innerText = '';
        selectedInput(container,`https://www.themealdb.com/api/json/v1/1/filter.php?a=${meal.strArea}`);
    });
    container.append(cuisineCard);
};

function selectedInput(container,url){
    fetch(url)
        .then(resp=>resp.json())
        .then(data=>{
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

function mealBio(container, meal){
    container.innerText = '';
    const mealCard = document.createElement('div');
    mealCard.classList.add('random-card');

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container');

    const header = document.createElement('h2');
    header.textContent = meal.strMeal;

    const img = document.createElement('img');
    img.src = meal.strMealThumb;
    img.alt = meal.strMeal;
    img.addEventListener('mouseover',(e)=>{
        const tags = document.createElement('div');
        tags.classList.add('tags-tool');
        tags.textContent = meal.strTags;

        tags.style.position = 'fixed';
        tags.style.left = e.clientX + 'px';
        tags.style.top = e.clientY + 'px';

        container.appendChild(tags);
    });
    img.addEventListener('mouseout',()=>{
        const tags = container.querySelector('.tags-tool');
        if(tags){
            tags.remove();
        };
    });

    //commentForm(container);
    
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
/*
function commentForm(container){
    const commentForm = container.querySelector('#commentForm');
    const commentFormContainer = container.querySelector('#commentFormContainer');
    commentFormContainer.classList.remove('hidden');

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = e.target.querySelector('#name').value;
        const comment = e.target.querySelector('#comment').value;

        commentFormContainer.append(displayComment(name, comment));

        e.target.reset();
    });
};

function displayComment(name,comment){
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    
    const nameElement = document.createElement('strong');
    nameElement.textContent = name;
    
    const commentText = document.createElement('p');
    commentText.textContent = comment;
    
    commentDiv.append(nameElement,commentText);
    
    return commentDiv;
};
*/
function resetPage(page){
    page.childNodes.forEach(child=>{
        child.innerText = '';
    });
};