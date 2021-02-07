const findMeals = meal => {
    const mealName = document.getElementById("meal-name").value;
    document.getElementById("meal-name").value = "";
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(response => response.json())
    .then(data => displayFoods(data))
    // .catch(function() {
    //     console.log("error");
    // }

}

const displayFoods = foods => {
    console.log(foods);
    const mealsDiv = document.getElementById("meal-items");
    mealsDiv.innerHTML = "";

    foods.meals.forEach(food => {
        const mealDiv = document.createElement("div");
        mealDiv.className = 'meal';
        const mealInfo = `
            <img src = "${food.strMealThumb}">
            <h5><a href="#" onclick = "ingredientsOfMeals('${food.strMeal}')">${food.strMeal}</a></h5>
        `
        mealDiv.innerHTML = mealInfo;

        mealsDiv.appendChild(mealDiv);
        
    });
}


const ingredientsOfMeals = mealsIngredients => {
    // const ingredient = document.getElementById("meals-ingredient").value;
    // console.log(ingredient);
    
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealsIngredients}`)
    .then(response => response.json())
    .then(data => displayIngredients(data.meals[0]))
        // {
        // const meal = data.meals;
        // // ingredientsOfMeal(meal[0]);
        // console.log(meal);});
};

const displayIngredients = ingredient => {

    const mealsIngredientDiv = document.getElementById("meals-ingredient");
    mealsIngredientDiv.innerHTML = "";


    // console.log(ingredient);
    // const imgOfMeal = ingredient.strMealThumb;
    // console.log(imgOfMeal);
    // const nameOfMeal = ingredient.strMeal;
    // console.log(nameOfMeal);
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

    

    for(let i = 1; i < 25; i++){
        const listOfIngredient = `strIngredient${i}`
        if(ingredient[listOfIngredient]!="" && ingredient[listOfIngredient]!= undefined){
            const li = document.createElement("li");
            li.innerText = ingredient[listOfIngredient];
            mealIngredientUl.appendChild(li);
        }
    }

}
