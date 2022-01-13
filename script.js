var mealDb = 'https:/www.themealdb.com/api/json/v1/1/random.php'

fetch(mealDb)
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })