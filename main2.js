/* ASYNC FUNCTION FETCH */

async function getCharacters() {
  try {
    let response = await fetch(
      "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=0ee555e9b5008511ef8e58ac7d1f57ac&hash=1781bb80c6b8c4e26356cf58de4bdb6c"
    );
    let data = await response.json();

    console.log("DATEN", data);
    const charactersList = data.data.results;
    createCard(charactersList);
    filterCharactersByName(charactersList);
  } catch (err) {
    console.error(err);
  }
}

// FILTER ARRAY //

let filterDiv = document.createElement("div");
filterDiv.setAttribute("id", "filter");

// create array alpahabet
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// create array numbers
const number = Array.from(Array(10).keys());

//combine array alphabet + numbers
const combinedArray = alphabet.concat(number);

console.log("combinedArray", combinedArray);
console.log("filterDiv", filterDiv);

for (let i = 0; i < combinedArray.length; i++) {
  let charLabel = document.createElement("label");
  charLabel.setAttribute("for", "checkChar");
  charLabel.innerHTML = combinedArray[i];
  console.log("charLabel", charLabel);
  filterDiv.appendChild(charLabel);

  let charInput = document.createElement("input");
  charInput.setAttribute("type", "checkbox");
  charInput.setAttribute("id", "checkChar");
  charInput.setAttribute("name", "checkChar");
  charInput.setAttribute("value", combinedArray[i]);
  charLabel.appendChild(charInput);

  const input = document.querySelector("#filter");
  console.log("input", input);
}

// FILTER ARRAY END //

function createCard(charactersList) {
  let divContainer = document.getElementById("api-data");
  divContainer.setAttribute("class", "container-fluid");

  let divContainerRow = document.createElement("div");
  divContainerRow.setAttribute("class", "row row-cols-2 row-cols-lg-4");

  for (let i = 0; i < charactersList.length; i++) {
    let card = document.createElement("div");
    card.setAttribute("class", "col");
    card.classList.add("card");

    let cardBody = document.createElement("div");
    cardBody.setAttribute(
      "class",
      "card-body d-flex flex-column justify-content-between"
    );

    let img = document.createElement("img");
    img.setAttribute(
      "src",
      charactersList[i].thumbnail.path +
        "." +
        charactersList[i].thumbnail.extension
    );
    img.classList.add("card-img-top");
    img.setAttribute("class", "img-fluid mb-2");

    let title = document.createElement("h5");
    title.innerHTML = charactersList[i].name;
    title.classList.add("card-title");

    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("id", "btn-" + i);
    button.addEventListener("click", toggle);
    button.setAttribute("class", "btn mt-4 text-light w-100");
    button.setAttribute("style", "background-color: #FF0000");
    button.innerHTML = "Show more";

    let id = document.createElement("p");
    id.innerHTML = "Character ID: " + charactersList[i].id;
    id.classList.add("card-text");

    let description = document.createElement("p");
    if (!charactersList[i].description) {
      description.innerHTML = "No description available!";
    } else {
      description.innerHTML = charactersList[i].description;
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
        btn.innerHTML = "Show less";
      } else {
        x.style.display = "none";
        btn.innerHTML = "Show more";
      }
    }

    cardBody.appendChild(img);
    cardBody.appendChild(title);
    cardBody.appendChild(button);
    toggleDiv.appendChild(id);
    toggleDiv.appendChild(description);
    cardBody.appendChild(toggleDiv);
    card.appendChild(cardBody);
    divContainerRow.appendChild(card);
    divContainer.appendChild(filterDiv);
    divContainer.appendChild(divContainerRow);
  }
}

// CONTROLLER FUNCTION

async function controller() {
  const charactersList = await getCharacters();
  createCard(charactersList);
}

controller();
