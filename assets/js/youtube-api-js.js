function displayVideo() {
    var test = $("#test");
    var fetchedURL = data.meals[0].strYoutube;
    var firstSplit = fetchedURL.split("watch");
    var secondSplit = firstSplit[1].split("=");
    videoURL = firstSplit[0] + "embed/" + secondSplit[1];
    test.attr("src", videoURL);
  }