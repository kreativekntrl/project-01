var mealDb = 'https:/www.themealdb.com/api/json/v1/1/random.php'
// API references id at the end
var priorMeal = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="
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
    previousFood(data);
  })

//embeds youtube videos in the iframe
function displayVideo(num) {
  var video = $("#video");
  var fetchedURL = num.meals[0].strYoutube;
  if (fetchedURL === "") {
    return;
  }
  var firstSplit = fetchedURL.split("watch");
  var secondSplit = firstSplit[1].split("=");
  videoURL = firstSplit[0] + "embed/" + secondSplit[1];
  video.attr("src", videoURL);
}

//displays recipe instructions
function showRecipe(data) {
  $("#recipetext").empty();
  var recipeDiv;
  var recipeName = $("#recipename");
  var name = data.meals[0].strMeal;
  var instructions = data.meals[0].strInstructions;
  recipeName = recipeName.text(name);
  recipeDiv = $("<p>").text(instructions);
  $("#recipetext").append(recipeDiv);
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
    var recipeLi = $("<li>").text(meal[ingredientKey] + " " + meal[measureKey]);
    $("#shoppinglist").append(recipeLi);
  }
} 

function previousFood(data) {
  storedArray = JSON.parse(localStorage.getItem("foodItem"));
  console.log(storedArray)

  if (storedArray) {
    foodArray = storedArray;
    foodList.textContent = "";
    
    foodArray.push({
      "foodItem": data.meals[0].strMeal,
      "id": data.meals[0].idMeal
    });
    localStorage.setItem("foodItem", JSON.stringify(foodArray));

    for (i = 0; i < foodArray.length; i++) {
      var newDiv = document.createElement("div");
      //newDiv.setAttribute();
      var newBtn = document.createElement("button");
      // newBtn.setAttribute();
      newBtn.textContent = foodArray[i].foodItem;
      foodList.append(newDiv);
      newDiv.appendChild(newBtn);
      var test = foodArray[i].id;

      // when value is clicked, it uses the stored id and fetches new data
      $("#previousrecipes").on("click", function(event) {
        event.preventDefault();
        // replace id value with pull id
        fetch(priorMeal + 52856)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          // runs showRecipe function using new api generated from ID
          showRecipe(data);
        })
      });
    }
  }
}