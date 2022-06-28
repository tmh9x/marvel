/* ASYNC FUNCTION FETCH */

async function getCharacters() {
  try {
    let response = await fetch(
      "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=0ee555e9b5008511ef8e58ac7d1f57ac&hash=1781bb80c6b8c4e26356cf58de4bdb6c"
    );
    let data = await response.json();

    console.log("DATEN", data);
    const myData = data.data.results;
    createCard(myData);
  } catch (err) {
    console.error(err);
  }
}

getCharacters();
// const myData = getCharacters();
// console.log(myData);
function createCard(data) {
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
    img.setAttribute("class", "img-fluid mb-2");

    let title = document.createElement("h5");
    title.innerHTML = data[i].name;
    title.classList.add("card-title");

    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("id", "btn-" + i);
    button.addEventListener("click", toggle);
    button.setAttribute("class", "btn mt-4 text-light");
    button.setAttribute("style", "background-color: #FF0000");
    button.innerHTML = "Show more";

    let id = document.createElement("p");
    id.innerHTML = "Character ID: " + data[i].id;
    id.classList.add("card-text");

    let description = document.createElement("p");
    if (!data[i].description) {
      description.innerHTML = "No description available!";
    } else {
      description.innerHTML = data[i].description;
    }

    let toggleDiv = document.createElement("div");
    toggleDiv.setAttribute("id", "toggleDiv-" + i);
    toggleDiv.setAttribute("style", "display:none");
    toggleDiv.classList.add("pt-4");

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
    toggleDiv.appendChild(id);
    toggleDiv.appendChild(description);
    cardBody.appendChild(toggleDiv);
    card.appendChild(cardBody);
    divContainerCol.appendChild(card);
    divContainer.appendChild(divContainerCol);
  }
}

createCard();
