//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
// Variables

const input = document.querySelector("input");
const drinks = document.querySelector(".drinks");
const submitBtn = document.querySelector("button");

let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let imgPosition = 0;

submitBtn.addEventListener("click", run);

// Event Listeners
next.addEventListener("click", nextImg);
prev.addEventListener("click", prevImg);

// Update Position
function updatePosition() {
  let imgs = document.querySelectorAll(".carousel-img");
  let dots = document.querySelectorAll(".dot");
  let captions = document.querySelectorAll(".carousel-caption");

  //   Images
  for (let img of imgs) {
    img.classList.remove("visible");
    img.classList.add("hidden");
  }
  console.log(imgs);
  imgs[imgPosition].classList.remove("hidden");
  imgs[imgPosition].classList.add("visible");
  //   Dots
  for (let dot of dots) {
    dot.className = dot.className.replace(" active", "");
  }
  dots[imgPosition].classList.add("active");
  //   Captions
  for (let caption of captions) {
    caption.classList.remove("visible");
    caption.classList.add("hidden");
  }
  captions[imgPosition].classList.remove("hidden");
  captions[imgPosition].classList.add("visible");
}

// Next Img
function nextImg() {
    let imgs = document.querySelectorAll(".carousel-img");
  let totalImgs = imgs.length;
  if (imgPosition === totalImgs - 1) {
    imgPosition = 0;
  } else {
    imgPosition++;
  }
  updatePosition();
}
//Previous Image
function prevImg() {
    let imgs = document.querySelectorAll(".carousel-img");
    let totalImgs = imgs.length;
  if (imgPosition === 0) {
    imgPosition = totalImgs - 1;
  } else {
    imgPosition--;
  }
  updatePosition();
}

// Dot Position
// dots.forEach((dot, dotPosition) => {
//   dot.addEventListener("click", () => {
//     imgPosition = dotPosition;
//     updatePosition(dotPosition);
//   });
// });

function makeDrinkCard(drink) {
  const newCard = document.createElement("div");
  newCard.classList.add("item");
  newCard.style = `background-image: url(${drink.strDrinkThumb})`;

  const cardDesc = document.createElement("div");
  const drinkName = document.createElement("h3");
  const drinkInstructions = document.createElement("p");

  cardDesc.classList.add("item-desc");
  drinkName.innerText = drink.strDrink;
  drinkInstructions.innerText = drink.strInstructions;

  cardDesc.appendChild(drinkName);
  cardDesc.appendChild(drinkInstructions);

  newCard.appendChild(cardDesc);

  drinks.appendChild(newCard);
}

function addToCarousel(drink) {
  const carouselImgs = document.querySelector(".carousel-imgs");
  const dotSlideIndicator = document.querySelector(".slide-numbers");
  const carouselCaptions = document.querySelector(".carousel-captions");

  const newImg = document.createElement("img");
  const newDesc = document.createElement("div");
  const newDescHeading = document.createElement("h3");
  const newDescParagraph = document.createElement("p");
  const newDot = document.createElement("span");

  newImg.classList.add("carousel-img");
  newImg.classList.add("hidden");
  newDesc.classList.add("carousel-caption");
  newDesc.classList.add("hidden");
  newDot.classList.add("dot");

  newImg.src = drink.strDrinkThumb;
  newDescHeading.innerText = drink.strDrink;
  newDescParagraph.innerText = drink.strInstructions;

  newDesc.appendChild(newDescHeading);
  newDesc.appendChild(newDescParagraph);
  carouselImgs.appendChild(newImg);
  dotSlideIndicator.appendChild(newDot);
  carouselCaptions.appendChild(newDesc);
}

function resetDrinksContainer() {
  drinks.innerHTML = "";
}

function makeDrinkActive() {
  const firstSlideImg = document.querySelectorAll(".carousel-img")[0];
  const slideDescrip = document.querySelectorAll(".carousel-caption")[0];
  const dotSlide = document.querySelectorAll(".dot")[0];
  firstSlideImg.classList.remove("hidden");
  firstSlideImg.classList.add("visible");
  slideDescrip.classList.remove(".hidden");
  slideDescrip.classList.add("visible");
  dotSlide.classList.add(".active");
}

function isEmpty(element) {
  return element.innerHTML === "";
}

function resetCarousel() {
    const carouselImgs = document.querySelector(".carousel-imgs");
  const dotSlideIndicator = document.querySelector(".slide-numbers");
  const carouselCaptions = document.querySelector(".carousel-captions");
    if (!isEmpty(carouselImgs)) carouselImgs.innerHTML = '';
    if (!isEmpty(dotSlideIndicator)) dotSlideIndicator.innerHTML = '';
    if (!isEmpty(carouselCaptions)) carouselCaptions.innerHTML = '';
}

function run() {
  const drinkSearch = input.value.split(" ").filter((word) => word != "");
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkSearch}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      resetCarousel()
      data.drinks.forEach((drink) => {
        addToCarousel(drink);

        // makeDrinkCard(drink);
      });
      makeDrinkActive();
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}



// document.addEventListener('DOMContentLoaded', function () {

//     drinks.addEventListener('click', function (event) {
//       if (event.target.classList.contains('item')) {
//         var items = drinks.querySelectorAll('.item');
//         items.forEach(function (item) {
//           if (item !== event.target) {
//             item.classList.remove('active');
//           }
//         });
//         event.target.classList.toggle('active');
//       }
//     });
//   });
