var mealDb = 'https:/www.themealdb.com/api/json/v1/1/random.php'
var foodList = $("#previousrecipes"); 
var foodArray = []; 

fetch(mealDb)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    showRecipe(data);
    displayVideo(data);
    showList(data);
    // showMeasure(data);
    previousFood(data)
  })

  //embeds youtube videos in the iframe
function displayVideo(num) {
  var video = $("#video");
  var fetchedURL = num.meals[0].strYoutube;
  var firstSplit = fetchedURL.split("watch");
  var secondSplit = firstSplit[1].split("=");
  videoURL = firstSplit[0] + "embed/" + secondSplit[1];
  video.attr("src", videoURL);
}

//displays recipe instructions
function showRecipe(num) {
  var recipeDiv;
  var recipeName = $("#recipename");
  var name = num.meals[0].strMeal;
  var instructions = num.meals[0].strInstructions;
  recipeName = recipeName.text(name);
  recipeDiv = $("<p></p>").text(instructions);
  $("#recipetext").append(recipeDiv);
  foodArray.push({"foodItem": num.meals[0].strMeal, "url": document.location.href});
  localStorage.setItem("foodItem", JSON.stringify(foodArray));
}

//displays recipe ingredients
function showList(data) {
  //cycles through JSON array object looking for strIngredient1-20 and strMeasure keys, then appends them to a list as a pair 
  for (i = 1; i < 21; i++) {
    var ingredientKey = "strIngredient" + i;
    var measureKey = "strMeasure" + i;
    var meal = data.meals[0];
    if (!meal[ingredientKey]) {
      break;
    }
    //console.log(meal[ingredientKey] + " " + meal[measureKey]);
    var recipeLi = $("<li>").text(meal[ingredientKey] + " " + meal[measureKey]);
    //console.log(recipeLi[0]);
    $("#shoppinglist").append(recipeLi);
  }
} 

function previousFood(data) { 
   storedArray = JSON.parse(localStorage.getItem("foodItem")); 

  if (storedArray) {
    foodArray = storedArray;
    foodList.textContent = "";
    for (i = 0; i < foodArray.length; i++) {
        var newDiv;
        var newBtn;
        var strMeal = data.meals[i].strMeal;
        console.log(strMeal);
        newDiv = document.createElement("div");
        //newDiv.setAttribute();
        newBtn = document.createElement("button");
       // newBtn.setAttribute();
        newBtn.textContent = foodArray[i].foodItem;
        foodList.append(newDiv);
        newDiv.appendChild(newBtn);
        console.log(foodArray[i]);
        foodArray.push({"foodItem": data.meals[0].strMeal, "url": document.location.href});
        console.log(foodArray);
        localStorage.setItem("foodItem", JSON.stringify(foodArray));
      
    }
}
}
