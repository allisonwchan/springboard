const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// variables for state of game
let card1 = null;
let card2 = null;
let numFlippedCards = 0;
let clickDisabled = false;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv)
  }
}

// TODO: Implement this function!
function handleCardClick(event) {

  let card = event.target;

  // if (clickDisabled) return;

  // if (card.classList.contains("flipped")) return;

  // event.target.style.backgroundColor = event.target.className;
  
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);

  card.style.backgroundColor = card.classList[0];

  // 
  if (!card1 || !card2) {
    card.classList.add("flipped");
    card1 = card1 || card;
    // if card === card1, let card2 = null; else, card2 = card
    card2 = card === card1 ? null : card;
  }

  // if card1 matches card2
  if (card1 && card2) {

    // don't allow player to click matched cards
    clickDisabled = true;

    let gif1 = card1.className;
    let gif2 = card2.className;

    // if there is a match
    if (gif1 === gif2) {
      numFlippedCards += 2;

      // don't let user click on 2 matched cards
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);

      // wait for 2 new cards to be selected
      card1 = null;
      card2 = null;
      clickDisabled = false;
    } else {
      setTimeout(function() {

        // if 2 cards don't match, flip over and wait for 2 new cards to be selected
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        clickDisabled = false;
      }, 1000);
    }
  }

  if (numFlippedCards === COLORS.length) alert("game over!");

}

// when the DOM loads
createDivsForColors(shuffledColors);
