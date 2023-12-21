var mealContainer = document.getElementById("meal-container")
function getRandomMeal() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            displayMeal(data.meals[0]);
        })
        .catch(error => console.error('Error fetching random meal:', error));
}

function displayMeal(meal) {
    const randomMealContainer = document.getElementById('random-meal-container');
    randomMealContainer.innerHTML = '';

    const randomMeal = document.createElement('div');
    randomMeal.classList.add('random-meal');

    const mealImage = document.createElement('img');
    mealImage.src = meal.strMealThumb;
    mealImage.alt = meal.strMeal;

    const mealName = document.createElement('h2');
    mealName.textContent = meal.strMeal;

    randomMeal.appendChild(mealImage);
    randomMeal.appendChild(mealName);

    randomMeal.onclick = function () {
        displayPopup(meal);
    };

    randomMealContainer.appendChild(randomMeal);
}

function displayPopup(meal) {
    const popupContent = `
        <span class="close-icon" onclick="closePopup()">×</span>
        <h2>${meal.strMeal}</h2>
        <h3>Ingredients</h3>
        <ul>${getIngredientsList(meal)}</ul>
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
    `;

    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `<div class="popup-content">${popupContent}</div>`;

    document.body.appendChild(popup);

    popup.onclick = function (event) {
        if (event.target.classList.contains('popup')) {
            closePopup();
        }
    };
}

function closePopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
        document.body.removeChild(popup);
    }
}

function getIngredientsList(meal) {
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== '') {
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        }
    }
    return ingredientsList;
}

function searchMealCategories() {
    mealContainer.style.display= "grid"
    const searchInput = document.getElementById('searchInput').value.trim();

    if (searchInput !== '') {
        const searchUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInput}`;

        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                displayMealCategories(data.meals);
            })
            .catch(error => console.error('Error fetching search results:', error));
    } else {
        alert('Please enter a search query.');
    }
}

function displayMealCategories(meals) {
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = '';

    if (meals) {
        meals.forEach(meal => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');

            const mealImage = document.createElement('img');
            mealImage.src = meal.strMealThumb;
            mealImage.alt = meal.strMeal;

            const mealName = document.createElement('p');
            mealName.textContent = meal.strMeal;

            gridItem.appendChild(mealImage);
            gridItem.appendChild(mealName);

            

            mealContainer.appendChild(gridItem);
        });
    } else {
        alert('No meal categories found. Please try another search.');
    }
}

function filterByCategory(category) {
    // Fetch and display meals based on the selected category
    mealContainer.style.display= "grid"
    const searchUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            displayMealCategories(data.meals);
        })
        .catch(error => console.error('Error fetching search results:', error));
}


function showHelp() {
    alert("To get the ingredients and steps to make the meal, click the image of the meal.");
}
