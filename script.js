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
    showMeasure(data);
  })

  function displayVideo(num) {
    //match to iframe in page2
    var video = $("#video");
    var fetchedURL = num.meals[0].strYoutube;
    var firstSplit = fetchedURL.split("watch");
    var secondSplit = firstSplit[1].split("=");
    videoURL = firstSplit[0] + "embed/" + secondSplit[1];
    //match to iframe in page2
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
    $("body").append(recipeDiv);
  }

  //displays recipe ingredients
  function showList(num) {
    //cycles through JSON array object looking forstrIngredient1-20 keys 
    for (i = 1; i < 21; i++) {
      var idCheck = "strIngredient" + i;
      //Goes through every key in array and compares to idCheck, then creates an element to display one that matches
      $.each(num.meals[0], function(index, ingredient) {
        if ( ingredient === "") {
          return false;
        }
        if (index === idCheck) {
          console.log(ingredient);
          recipeLi = $("<li></li>").text(ingredient);
          $("#shoppinglist").append(recipeLi);
        }
      });
    }
  }

  //displays recipe measurements
  function showMeasure(num) {
    //cycles through JSON array object looking forstrMeasure1-20 keys 
    for (i = 1; i < 21; i++) {
      var idCheck = "strMeasure" + i;
      if (!num.meals[0]["strMeasure" + i]) {
        break;
      }
            //Goes through every key in array and compares to idCheck, then creates an element to display one that matches
      $.each(num.meals[0], function(index, measure) {
        if (index === idCheck) {
          console.log(measure);
          measureLi = $("<li></li>").text(measure);
          $("#measurelist").append(measureLi);
        }
      });
    }
  }


  function previousFood(query) { 
    foodArray = JSON.parse(localStorage.getItem("foodItem")); 

    if (foodArray) {
      foodArray = foodArray;
      foodList.textContent = "";
      for (i = 0; i < foodArray.length; i++) {
          var newDiv;
          var newBtn;
          newDiv = document.createElement("div");
          newDiv.setAttribute();
          newBtn = document.createElement("button");
          newBtn.setAttribute();
          newBtn.textContent = foodArray[i].city;
          foodList.appendChild(newDiv);
          newDiv.appendChild(newBtn);
          console.log(foodArray[i]);
      }
  }
}