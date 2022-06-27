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
  card.setAttribute("class", "col col-4 border border-2 rounded w-25");
  card.classList.add("card");

  let cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  let img = document.createElement("img");
  img.setAttribute(
    "src",
    data[i].thumbnail.path + "." + data[i].thumbnail.extension
  );
  img.classList.add("card-img-top");

  let title = document.createElement("h5");
  title.innerHTML = data[i].name;
  title.classList.add("card-title");

  let button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("class", "btn btn-outline-primary");
  button.setAttribute("data-bs-toggle", "collapse");
  button.setAttribute("data-bs-target", "#idDiv");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", "idDiv");
  button.innerHTML = "Show more";

  let description = document.createElement("p");
  description.innerHTML = data[i].description;

  let id = document.createElement("p");
  id.innerHTML = data[i].id;
  id.classList.add("card-text");

  let imgDiv = document.createElement("div");
  imgDiv.setAttribute("id", "imgDiv");

  let aDiv = document.createElement("div");
  aDiv.setAttribute("class", "collapse multi-collapse");
  aDiv.setAttribute("id", "idDiv");

  imgDiv.appendChild(img);
  cardBody.appendChild(imgDiv);
  cardBody.appendChild(title);
  cardBody.appendChild(button);
  aDiv.appendChild(id);
  aDiv.appendChild(description);
  cardBody.appendChild(aDiv);
  card.appendChild(cardBody);
  divContainerCol.appendChild(card);
}

divContainer.appendChild(divContainerCol);
