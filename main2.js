async function getCharacters() {
  const promise = fetch(
    "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=0ee555e9b5008511ef8e58ac7d1f57ac&hash=1781bb80c6b8c4e26356cf58de4bdb6c"
  );
  const response = await promise;
  if (response.status === 404) {
    return [];
  }
  const data = await response.json();
  console.log("DATA", data.results);
  return data.results;
}

getCharacters();

async function getUserAsync() {
  try {
    let response = await fetch(
      "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=0ee555e9b5008511ef8e58ac7d1f57ac&hash=1781bb80c6b8c4e26356cf58de4bdb6c"
    );
    let data = await response.json();
    console.log(data.data.results);
    return data;
  } catch (err) {
    console.error(err);
    // Handle errors here
  }
}

getUserAsync();
// OLD //

console.log(marvel);

console.log(marvel.data.results);
let data = marvel.data.results;
console.log("data", data);

let divContainer = document.getElementById("api-data");
divContainer.setAttribute("class", "container-fluid");

let divContainerCol = document.createElement("div");
divContainerCol.setAttribute("class", "row justify-content-center");

for (let i = 0; i < data.length; i++) {
  let card = document.createElement("div");
  card.setAttribute("class", "col col-4 border border-2 w-25");
  card.classList.add("card");
  let cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  let img = document.createElement("img");
  img.setAttribute(
    "src",
    data[i].thumbnail.path + "." + data[i].thumbnail.extension
  );
  img.classList.add("card-img-top");
  img.setAttribute("class", "img-fluid");

  let title = document.createElement("h5");
  title.innerHTML = data[i].name;
  title.classList.add("card-title");

  let button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("id", "btn-" + i);
  button.addEventListener("click", toggle);
  button.setAttribute("class", "btn btn-outline-primary");
  /*button.setAttribute("data-bs-toggle", "collapse");
  button.setAttribute("data-bs-target", "#idDiv");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", "idDiv"); */
  button.innerHTML = "Show more";

  let description = document.createElement("p");
  if (!data[i].description) {
    description.innerHTML = "There is no description!";
  } else {
    description.innerHTML = data[i].description;
  }

  let id = document.createElement("p");
  id.innerHTML = data[i].id;
  id.classList.add("card-text");

  let aDiv = document.createElement("div");
  /*   aDiv.setAttribute("class", "collapse multi-collapse"); */
  aDiv.setAttribute("id", "toggleDiv-" + i);
  aDiv.setAttribute("style", "display:none");

  function toggle() {
    const btn = document.getElementById("btn-" + i);
    const x = document.getElementById("toggleDiv-" + i);
    console.log(x);
    if (x.style.display === "none") {
      x.style.display = "block";
      btn.textContent = "Show less";
    } else {
      x.style.display = "none";
      btn.textContent = "Show more";
    }
  }

  cardBody.appendChild(img);
  cardBody.appendChild(title);
  cardBody.appendChild(button);
  aDiv.appendChild(id);
  aDiv.appendChild(description);
  cardBody.appendChild(aDiv);
  card.appendChild(cardBody);
  divContainerCol.appendChild(card);
  divContainer.appendChild(divContainerCol);
}
