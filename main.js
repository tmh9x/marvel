// ASYNC FUNCTION FETCH //

async function getCharacters() {
  try {
    let response = await fetch(
      "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=0ee555e9b5008511ef8e58ac7d1f57ac&hash=1781bb80c6b8c4e26356cf58de4bdb6c"
    );
    let data = await response.json();

    console.log("DATEN", data);
    const charactersList = data.data.results;
    createCard(charactersList);
    setEventListeners(charactersList);
  } catch (err) {
    console.error(err);
  }
}

// ASYNC FUNCTION FETCH LIVE SEARCH //

async function getCharacter(name) {
  try {
    let response = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?name=${name}&ts=1&apikey=0ee555e9b5008511ef8e58ac7d1f57ac&hash=1781bb80c6b8c4e26356cf58de4bdb6c`
    );
    let data = await response.json();

    const charactersList = data.data.results;
    createCard(charactersList);
    setEventListeners(charactersList);
  } catch (err) {
    console.error(err);
  }
}

// FILTER BY CHECKBOX //

let filterDiv = document.createElement("div");
filterDiv.setAttribute(
  "class",
  "d-flex flex-row flex-wrap justify-content-center p-2"
);
filterDiv.setAttribute("id", "filter");

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

const number = Array.from(Array(10).keys());
const combinedArray = alphabet.concat(number);
console.log("combinedArray", combinedArray);
console.log("filterDiv", filterDiv);

for (let i = 0; i < combinedArray.length; i++) {
  let charDiv = document.createElement("div");
  charDiv.setAttribute("class", "my-1 px-2 py-2 border rounded");
  filterDiv.appendChild(charDiv);

  let charLabel = document.createElement("label");
  charLabel.setAttribute("for", "checkChar");
  charLabel.innerHTML = combinedArray[i];
  charDiv.appendChild(charLabel);

  let char = document.createElement("input");
  char.setAttribute("type", "checkbox");
  char.setAttribute("class", "checkbox");
  char.setAttribute("name", "checkChar");
  char.setAttribute("value", combinedArray[i]);
  char.innerHTML = combinedArray[i];
  charDiv.appendChild(char);
}

function setEventListeners(charactersList) {
  /* const checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
      filtersCombined(charactersList);
    });
  }); */
  /* filterByCheckbox(charactersList); */ /* let checkbox = document.querySelectorAll('input[type="checkbox"]');
  console.log("checkbox", checkbox); */

  document
    .querySelector('input[type="search"]')
    .addEventListener("change", (event) => {
      filterByLiveSearch(charactersList);
    });
}

// FILTER BY CHECKBOX (SEPERATELY)

/* const filterByCheckbox = (charactersList) => {
  const checkedCheckboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  console.log("checkedCheckboxes", checkedCheckboxes);
  const checkedCheckboxesArray = Array.from(checkedCheckboxes).map((box) =>
    box.value.toLowerCase()
  );
  console.log("checkedCheckboxesArray", checkedCheckboxesArray);

  const filteredCharacters = charactersList.filter((character) => {
    return character.name.toLowerCase().startsWith(checkedCheckboxesArray);
  });
  console.log("filteredCharacters", filteredCharacters);
  createCard(filteredCharacters);
}; */

// CREATE A CHARACTER CARD //

function createCard(charactersList) {
  let divContainer = document.getElementById("api-data");
  divContainer.setAttribute("class", "container-fluid");
  // clears the list (container)
  divContainer.innerHTML = "";

  let divContainerRow = document.createElement("div");
  divContainerRow.setAttribute("class", "row row-cols-2 row-cols-lg-4");
  /*  console.log("charactersList.length", charactersList); */

  for (let i = 0; i < charactersList.length; i++) {
    let card = document.createElement("div");
    card.setAttribute("class", "col");
    card.classList.add("card");
    divContainerRow.appendChild(card);

    let cardBody = document.createElement("div");
    cardBody.setAttribute(
      "class",
      "card-body d-flex flex-column justify-content-between"
    );
    card.appendChild(cardBody);

    let img = document.createElement("img");
    img.setAttribute(
      "src",
      charactersList[i].thumbnail.path +
        "." +
        charactersList[i].thumbnail.extension
    );
    img.classList.add("card-img-top");
    img.setAttribute("class", "img-fluid mb-2");
    cardBody.appendChild(img);

    let title = document.createElement("h5");
    title.innerHTML = charactersList[i].name;
    title.classList.add("card-title");
    cardBody.appendChild(title);

    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("id", "btn-" + i);
    button.addEventListener("click", toggle);
    button.setAttribute("class", "btn mt-4 text-light w-100");
    button.setAttribute("style", "background-color: #FF0000");
    button.innerHTML = "Show more";
    cardBody.appendChild(button);

    let toggleDiv = document.createElement("div");
    toggleDiv.setAttribute("id", "toggleDiv-" + i);
    toggleDiv.setAttribute("style", "display:none");
    toggleDiv.classList.add("pt-4");
    cardBody.appendChild(toggleDiv);

    let id = document.createElement("p");
    id.innerHTML = "Character ID: " + charactersList[i].id;
    id.classList.add("card-text");
    toggleDiv.appendChild(id);

    let description = document.createElement("p");
    if (!charactersList[i].description) {
      description.innerHTML = "No description available!";
    } else {
      description.innerHTML = charactersList[i].description;
    }
    toggleDiv.appendChild(description);

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
    divContainer.appendChild(filterDiv);
    divContainer.appendChild(divContainerRow);
  }
}

// FILTERS COMBINED

function filtersCombined(charactersList) {
  const checkedCheckboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  const searchValue = document.getElementById("search").value.toUpperCase();
  // console.log("searchValue", searchValue);

  const checkedCheckboxesArray = Array.from(checkedCheckboxes).map((box) => {
    return box.value;
  });
  // console.log("checkedCheckboxesArray>>>>", checkedCheckboxesArray);
  // console.log("typeof()", typeof checkedCheckboxesArray);

  const filteredCombinedCharacters = charactersList.filter((character) => {
    // console.log("character", character);
    const char = character.name;
    const charUpperCase = char.toUpperCase();
    // console.log(typeof char);
    console.log("character.name", charUpperCase);

    return (
      (charUpperCase.includes(checkedCheckboxesArray) ||
        checkedCheckboxesArray.length === 0) &&
      (charUpperCase.includes(searchValue) || !searchValue)
    );
    // char.includes(searchValue)
    // && char.includes(checkedCheckboxesArray);
  });
  console.log("checkedCheckboxesArray", checkedCheckboxesArray);
  console.log("filteredCombinedCharacters", filteredCombinedCharacters);
  createCard(filteredCombinedCharacters);
}

// FILTER BY LIVE SEARCH

function filterByLiveSearch() {
  const searchLiveValue = document
    .getElementById("searchLive")
    .value.toUpperCase();
  searchLiveValue ? getCharacter(searchLiveValue) : false;
}

// CONTROLLER FUNCTION

function controller() {
  const charactersList = getCharacters();
  createCard(charactersList);
  setEventListeners(charactersList);
}

controller();
