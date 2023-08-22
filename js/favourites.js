var canvas = document.getElementById("canvas");

for (let i = 0; i < localStorage.length; i++) {
  if (localStorage.key(i) == "id") {
    continue;
  }
  let myStorage = JSON.parse(localStorage.getItem(localStorage.key(i)));

  var templateCanvas = canvas.content.cloneNode(true);

  templateCanvas.getElementById(
    "my-img"
  ).src = `${myStorage.thumbnail.path}.${myStorage.thumbnail.extension}`;
  templateCanvas.getElementById("name").innerHTML =
    "<b>Name: </b> " + myStorage.name;
  templateCanvas.getElementById("about").addEventListener("click", function () {
    localStorage.setItem("id", myStorage.id);
    window.location.assign("./about.html");
  });

  templateCanvas.getElementById("fav").addEventListener("click", function () {
    myStorage.innerHTML = null;
    localStorage.removeItem(localStorage.key(i));
    window.location.assign("./favourites.html");
  });

  document.getElementById("superhero-list").appendChild(templateCanvas);
}
