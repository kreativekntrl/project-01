var test = document.getElementById("test");
var fetchedURL = data.meals[0].strYoutube;
var firstSplit = fetchedURL.split("watch");
var secondSplit = firstSplit[1].split("=");
console.log(firstSplit[0]);
console.log(secondSplit[1]);
videoURL = firstSplit[0] + "embed/" + secondSplit[1];
console.log(videoURL);
test.src = videoURL;
  