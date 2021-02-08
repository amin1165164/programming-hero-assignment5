// search meal name by name
const searchMeals = () => {
    document.getElementById("meals-ingredient").innerHTML = "";
    const mealName = document.getElementById("meal-name").value;
    document.getElementById("meal-name").value = "";

    // checking wether search box empty or not
    if(mealName == ""){
        alert("You cannot left blank in this portion. Please put a name of Meal.")
    }
    else{
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(response => response.json())
        .then(data => displayMeals(data))

        // Invalid name encounter error message 
        .catch((error) => {
            alert("Invalid Meal Name. Please put a valid meal name.");
        })
    }
}

// meals display function
const displayMeals = meals => {
    const mealsDiv = document.getElementById("meal-items");
    mealsDiv.innerHTML = "";

    meals.meals.forEach(meal => {
        const mealDiv = document.createElement("div");
        mealDiv.className = 'meal';
        const mealInfo = `
            <a href="#" onclick = "ingredientsOfMeals('${meal.strMeal}')"><img src = "${meal.strMealThumb}"></a>
            <h5><a href="#" onclick = "ingredientsOfMeals('${meal.strMeal}')">${meal.strMeal}</a></h5>
        `
        mealDiv.innerHTML = mealInfo;
        mealsDiv.appendChild(mealDiv);
    });
}


// fetch Ingredient API
const ingredientsOfMeals = mealsIngredients => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealsIngredients}`)
    .then(response => response.json())
    .then(data => displayIngredients(data.meals[0]))
};


// displaying information of particular meal
const displayIngredients = ingredient => {
    const mealsIngredientDiv = document.getElementById("meals-ingredient");
    mealsIngredientDiv.innerHTML = "";
    const mealIngredientDiv = document.createElement("div");
    mealIngredientDiv.className = 'ingredient';
    const ingredientInfo = `
        <img src = "${ingredient.strMealThumb}">
        <h2>${ingredient.strMeal}</h2>
        <h5>Ingredients</h5>
        `
    mealIngredientDiv.innerHTML = ingredientInfo;
    const mealIngredientUl = document.createElement("ul");
    mealIngredientUl.className = 'ingredientList';

    mealsIngredientDiv.appendChild(mealIngredientDiv);
    mealsIngredientDiv.appendChild(mealIngredientUl);

// using for loop for showing ingredients
    for(let i = 1; i < 25; i++){
        const ingredientListsOfMeal = `strIngredient${i}`
        if(ingredient[ingredientListsOfMeal]!="" && ingredient[ingredientListsOfMeal]!= undefined){
            const li = document.createElement("li");
            li.innerText = ingredient[ingredientListsOfMeal];
            mealIngredientUl.appendChild(li);
        }
    }

}
