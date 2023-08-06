const localHostAPIUrl = 'http://localhost:3000/';


document.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault();

    const mainC = document.getElementById('mainContainer');
    const categoryC = document.getElementById('categoriesContainer');
    const cuisineC = document.getElementById('cuisinesContainer');
    const randomC = document.getElementById('randomContainer');

    document.getElementById('category').addEventListener('click',()=>{
        resetPage(mainC);
        loadSelection(categoryC,`categories`);
    });

    document.getElementById('cuisine').addEventListener('click',()=>{
        resetPage(mainC);
        loadSelection(cuisineC,`cuisine`);
    });

});

function loadSelection(container,path){
    fetch(`${localHostAPIUrl}${path}`)
        .then(resp=>resp.json())
        .then(data=>{
            data.forEach(meal=>{
                if(path === 'categories'){
                    container.append(categoryCard(meal,container));
                }if (path === 'cuisine'){
                    container.append(cuisineCard(meal,container));
                };
            });
        });
};

function categoryCard(meal,container){
    const categoryCard = document.createElement('div');
    categoryCard.classList.add('category-card');

    const img = document.createElement('img');
    img.src = meal.strCategoryThumb;
    img.alt = meal.strCategory;
    img.addEventListener('click',(e)=>{
        e.preventDefault();
        const filterUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal.strCategory}`;
        filtered(filterUrl,container);
    });

    const title = document.createElement('p');
    title.textContent = category.strCategory;

    categoryCard.append(img,title);
    return categoryCard;
};

function cuisineCard(cuisine,container){
    const cuisineName = document.createElement('ul');
    cuisineName.classList.add('cuisine-item');
    cuisineName.textContent = cuisine.strArea;

    cuisineName.addEventListener('click',(e)=>{
        filtered(cuisine,container);
    });
};

function filtered(filterUrl,container){
    
    fetch(filterUrl)
        .then(resp=>resp.json())
        .then(data=>{
            data.forEach(meal=>{
                displayCategory(meal,container);
            })
        })
};

function displayCategory(meal,container){
    const mealCard = document.createElement('section');
    mealCard.classList.add('category-card');

    const img = document.createElement('img');
    img.src = meal.strMealThumb;
    img.alt = meal.strMeal;

    img.addEventListener('click',()=>{
        container.innerText = '';
        searchMealId(meal.idMeal,container);
    });

    const p = document.createElement('p');
    p.textContent = meal.strMeal;

    mealCard.append(img,p);
    container.append(mealCard);
};

function searchMealId(id,container){
    fetch(`${searchIdUrl}${id}`)
        .then(resp=>resp.json())
        .then(meal=>{
            const selectedMeal = meal.meals[0];
            mealBio(selectedMeal,container);
        });
};

function mealBio(meal,container){
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