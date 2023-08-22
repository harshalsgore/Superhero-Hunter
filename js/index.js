var xhrRequest = new XMLHttpRequest();
xhrRequest.open(
  "get",
  "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=0379077787230252fbcaed4ed716b1ef&hash=6e097f0671b3553bf9feb5c67be7e240",
  true
);
xhrRequest.send();
xhrRequest.onload = function () {
  var allCharacters = JSON.parse(xhrRequest.responseText);
  // console.log(allCharacters.data.results);
  getAllCharactersList(allCharacters.data.results);
};

document.getElementById("search-form").addEventListener("keyup", function () {
  var url = getUrl();
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.open("get", url, true);
  xhrRequest.send();
  xhrRequest.onload = function () {
    var data = JSON.parse(xhrRequest.responseText);
    display(data);
  };
});

function getAllCharactersList(results) {
  let canvas = document.getElementById("canvas");

  let searchHero = document.getElementById("search-string").value;
  var superHeroList = document.getElementById("superhero-list");
  superHeroList.innerHTML = "";

  for (let result of results) {
    var templateCanvas = canvas.content.cloneNode(true);

    templateCanvas.getElementById(
      "my-img"
    ).src = `${result.thumbnail.path}.${result.thumbnail.extension}`;
    templateCanvas.getElementById("name").innerHTML = result.name;
    templateCanvas
      .getElementById("about")
      .addEventListener("click", function () {
        localStorage.setItem("id", result.id);
        window.location.assign("./about.html");
      });

    templateCanvas.getElementById("fav").addEventListener("click", function () {
      var index = localStorage.length;
      var data = JSON.stringify(result);
      localStorage.setItem(result.id, data);
    });
    superHeroList.appendChild(templateCanvas);
  }
}

function getUrl() {
  var searchQuery = document.getElementById("search-string").value;

  //  If search query matches the results then it will redirect to searched hero otherwise moved to home page.
  if (!searchQuery) {
    return "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=0379077787230252fbcaed4ed716b1ef&hash=6e097f0671b3553bf9feb5c67be7e240";
  } else {
    return `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchQuery}&ts=1&apikey=0379077787230252fbcaed4ed716b1ef&hash=6e097f0671b3553bf9feb5c67be7e240`;
  }
}

let canvas = document.getElementById("canvas");
let searchHero = document.getElementById("search-string").value;

function display(data) {
  var superHeroList = document.getElementById("superhero-list");
  var results = data.data.results;

  if (results.length === 0) {
    superHeroList.innerHTML =
      "<b style='color: white;'>No Super Hero To Display</b>";
  } else {
    superHeroList.innerHTML = "";

    for (let result of results) {
      var templateCanvas = canvas.content.cloneNode(true);

      templateCanvas.getElementById(
        "my-img"
      ).src = `${result.thumbnail.path}.${result.thumbnail.extension}`;
      templateCanvas.getElementById("name").innerHTML = result.name;

      templateCanvas
        .getElementById("about")
        .addEventListener("click", function () {
          localStorage.setItem("id", result.id);
          window.location.assign("./about.html");
        });

      templateCanvas
        .getElementById("fav")
        .addEventListener("click", function () {
          var index = localStorage.length;
          var data = JSON.stringify(result);
          localStorage.setItem(result.id, data);
        });
      superHeroList.appendChild(templateCanvas);
    }
  }
}

function addFunction() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
