var mealDb = 'https:/www.themealdb.com/api/json/v1/1/random.php'

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
    console.log(meal[ingredientKey] + " " + meal[measureKey]);
    var recipeLi = $("<li>").text(meal[ingredientKey] + " " + meal[measureKey]);
    console.log(recipeLi[0]);
    $("#shoppinglist").append(recipeLi);
  }
}