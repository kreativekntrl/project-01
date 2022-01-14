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
    showMeasure(data);
  })

  function displayVideo(num) {
    //match to iframe in page2
    var test = $("#test");
    var fetchedURL = num.meals[0].strYoutube;
    var firstSplit = fetchedURL.split("watch");
    var secondSplit = firstSplit[1].split("=");
    videoURL = firstSplit[0] + "embed/" + secondSplit[1];
    //match to iframe in page2
    test.attr("src", videoURL);
  }

  //displays recipe instructions
  function showRecipe(num) {
    var recipeDiv;  
    var instructions = num.meals[0].strInstructions;
    recipeDiv = $("<p></p>").text(instructions);
    $("body").append(recipeDiv);
  }

  //displays recipe ingredients
  function showList(num) {
    //cycles through strIngredient1-20 keys in JSON array object
    for (i = 1; i < 21; i++) {
      var idCheck = "strIngredient" + i;
      //Goes through every key in array and compares to idCheck, then creates an element to display one that matches
      $.each(num.meals[0], function(index, ingredient) {
        if (index === idCheck) {
          console.log(ingredient);
          newDiv = $("<div></div>").text(ingredient);
          $("#ingredientDiv").append(newDiv);
        }
        if ( ingredient === "") {
          return false;
        }
      });
    }
  }

  //displays recipe measurements
  function showMeasure(num) {
    //cycles through strMeasure1-20 keys in JSON array object
    for (i = 1; i < 21; i++) {
      var idCheck = "strMeasure" + i;
            //Goes through every key in array and compares to idCheck, then creates an element to display one that matches
      $.each(num.meals[0], function(index, measure) {
        if (index === idCheck) {
          console.log(measure);
          newDiv = $("<div></div>").text(measure);
          $("#measureDiv").append(newDiv);
        }
      });
    }
  }