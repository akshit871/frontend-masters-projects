const LIST_DOG_BREEDS = "https://dog.ceo/api/breeds/list/all";
const RANDOM_DOG_IMAGE = "https://dog.ceo/api/breeds/image/random";
const LIST_BREED_IMAGES = "https://dog.ceo/api/breeds/image/random";

let dogBreeds = null;

String.prototype.toTitleCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

function subBreedSelect() {
  selectedBreed = document
    .querySelector(".dog-breed-select")
    .addEventListener("change", function (event) {
      // remove existing element if any
      if (document.querySelector(".dog-sub-breed-select")) {
        document.querySelector(".dog-sub-breed-label").remove();
        document.querySelector(".dog-sub-breed-select").remove();
      }

      let selectedBreed = event.target.value;
      dogSubBreeds = dogBreeds[selectedBreed];

      if (dogSubBreeds.length) {
        newSelect = createSelectElement(dogSubBreeds);
        const newLabel = document.createElement("label");
        newLabel.innerText = "Sub-Breed:";
        newLabel.className = "dog-sub-breed-label";
        newLabel.htmlFor = "dog-sub-breed-select";
        newSelect.name = "dog-breeds";
        newSelect.name = "dog-sub-breeds";
        newSelect.className = "dog-sub-breed-select";
        newSelect.id = "dog-sub-breed-select";
        document
          .querySelector(".doggos")
          .appendChild(newLabel)
          .appendChild(newSelect);
      }
    });
}

function createSelectElement(elements) {
  const newSelect = document.createElement("select");

  if (!Array.isArray(elements)) elements = Object.keys(elements);

  elements.forEach((element) => {
    let option = document.createElement("option");
    option.value = element;
    option.innerText = element.toTitleCase();
    newSelect.appendChild(option);
  });

  return newSelect;
}

function fetchDoggos() {
  let [dogBreed, dogSubBreed, RANDOM_DOG_IMAGE_URL] = [null, null, null];

  if (document.querySelector(".dog-breed-select"))
    dogBreed = document.querySelector(".dog-breed-select").value;

  if (document.querySelector(".dog-sub-breed-select"))
    dogSubBreed = document.querySelector(".dog-sub-breed-select").value;

  if (dogSubBreed)
    RANDOM_DOG_IMAGE_URL = `https://dog.ceo/api/breed/${dogBreed}/${dogSubBreed}/images/random`;
  else
    RANDOM_DOG_IMAGE_URL = `https://dog.ceo/api/breed/${dogBreed}/images/random`;

  fetch(RANDOM_DOG_IMAGE_URL)
    .then(function (response) {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(function (processedResponse) {
      const img = document.createElement("img");
      img.src = processedResponse.message;
      if (dogSubBreed) img.alt = `A cute ${dogSubBreed} ${dogBreed}`;
      else img.alt = `A cute ${dogBreed}`;
      document.querySelector(".img-container").appendChild(img);
    });
}

fetch(LIST_DOG_BREEDS)
  .then(function (response) {
    const processingPromise = response.json();
    return processingPromise;
  })
  .then(function (processedResponse) {
    dogBreeds = processedResponse.message;
    newSelect = createSelectElement(dogBreeds);
    const newLabel = document.createElement("label");
    newLabel.innerText = "Dog-Breed:";
    newLabel.className = "dog-breed-label";
    newLabel.htmlFor = "dog-breed-select";
    newSelect.name = "dog-breeds";
    newSelect.className = "dog-breed-select";
    newSelect.id = "dog-breed-select";
    document
      .querySelector(".doggos")
      .appendChild(newLabel)
      .appendChild(newSelect);

    subBreedSelect();
  });

document
  .querySelector(".add-doggos")
  .addEventListener("click", function (event) {
    fetchDoggos();
  });
