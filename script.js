fetch('www.themealdb.com/api/json/v1/1/random.php1',  {
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
