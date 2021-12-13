///Charles Co's Blackjack JS///

/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();
renderDeckInContainer(masterDeck, document.getElementById('master-deck-container'));

// /*----- cached element references -----*/
const shuffledContainer = document.getElementById('shuffled-deck-container');

/*----- app's state (variables) -----*/
let shuffledDeck;

// cached element references //
let dealerHand = [];
let playerHand = [];
let dealerScore = 0;
let playerScore = 0;

/*----- event listeners -----*/
startGameButton.addEventListener('click', startGame);

/*----- functions -----*/

// Create function to deal player cards into player hand
function dealPlayerCards () {
    for (let i; i < 2; i++){
        let card = shuffledDeck.pop()
        playerHand.push(card); 
    }
}

function getNewShuffledDeck() {
    // Create a copy of the masterDeck (leave masterDeck untouched!)
    const tempDeck = [...masterDeck];
    const newShuffledDeck = [];
    while (tempDeck.length) {
      // Get a random index for a card still in the tempDeck
      const rndIdx = Math.floor(Math.random() * tempDeck.length);
      // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
      newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }
    return newShuffledDeck;
  }
  
  function renderNewShuffledDeck() {
    // Create a copy of the masterDeck (leave masterDeck untouched!)
    shuffledDeck = getNewShuffledDeck();
    renderDeckInContainer(shuffledDeck, shuffledContainer);
  }
  
  function renderDeckInContainer(deck, container) {
    container.innerHTML = '';
    // Let's build the cards as a string of HTML
    let cardsHtml = '';
    deck.forEach(function(card) {
      cardsHtml += `<div class="card ${card.face}"></div>`;
    });
    // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
    // const cardsHtml = deck.reduce(function(html, card) {
    //   return html + `<div class="card ${card.face}"></div>`;
    // }, '');
    container.innerHTML = cardsHtml;
  }
  
  function buildMasterDeck() {
    const deck = [];
    // Use nested forEach to generate card objects
    suits.forEach(function(suit) {
      ranks.forEach(function(rank) {
        deck.push({
          // The 'face' property maps to the library's CSS classes for cards
          face: `${suit}${rank}`,
          // Setting the 'value' property for game of blackjack, not war
          value: Number(rank) || (rank === 'A' ? 11 : 10)
        });
      });
    });
    return deck;
  }
  
  renderNewShuffledDeck();

  // We call init, because we want to initialize our state when the page loads

  function init() {
    let dealerHand = [];
    let playerHand = [];
    dealPlayerCards();
    getNewShuffledDeck() ;
    renderNewShuffledDeck() ;
    buildMasterDeck();
  }

  init();




// const handContainer = {
//     player: document.querySelector('playerHand'),
//     dealer: document.querySelector('dealerHand'),
// }

// const dealBtn = document.getElementById('deal');
// const standBtn = document.getElementById('stand');
// const hitBtn = document.getElementById('hit');
// const resultScreen = document.getElementById('')


// /*----- event listeners -----*/
// document.querySelector('button').addEventListener('click', renderNewShuffledDeck);
// startGameButton.addEventListener('click', startGame);
// standButton.addEventListener('click', stand);
// hitButton.addEventListener('click', hit);

// // /*----- functions -----*/










































//////////////////////////////Card Deck Starter Code below ////////////////////////////////////////////


// /*----- functions -----*/
// function getNewShuffledDeck() {
//   // Create a copy of the masterDeck (leave masterDeck untouched!)
//   const tempDeck = [...masterDeck];
//   const newShuffledDeck = [];
//   while (tempDeck.length) {
//     // Get a random index for a card still in the tempDeck
//     const rndIdx = Math.floor(Math.random() * tempDeck.length);
//     // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
//     newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
//   }
//   return newShuffledDeck;
// }

// // function renderNewShuffledDeck() {
// //   // Create a copy of the masterDeck (leave masterDeck untouched!)
// //   shuffledDeck = getNewShuffledDeck();
// //   renderDeckInContainer(shuffledDeck, shuffledContainer);
// // }

// // function renderDeckInContainer(deck, container) {
// //   container.innerHTML = '';
// //   // Let's build the cards as a string of HTML
// //   let cardsHtml = '';
// //   deck.forEach(function(card) {
// //     cardsHtml += `<div class="card ${card.face}"></div>`;
// //   });
// //   // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
// //   // const cardsHtml = deck.reduce(function(html, card) {
// //   //   return html + `<div class="card ${card.face}"></div>`;
// //   // }, '');
// //   container.innerHTML = cardsHtml;
// // }

// function buildMasterDeck() {
//   const deck = [];
//   // Use nested forEach to generate card objects
//   suits.forEach(function(suit) {
//     ranks.forEach(function(rank) {
//       deck.push({
//         // The 'face' property maps to the library's CSS classes for cards
//         face: `${suit}${rank}`,
//         // Setting the 'value' property for game of blackjack, not war
//         value: Number(rank) || (rank === 'A' ? 11 : 10)
//       });
//     });
//   });
//   return deck;
// }

// renderNewShuffledDeck();





// psuedocode

// Show start screen
// Player may select start game
// Once start game is clicked, Deck array will be shuffled/randomized and will be stored in current deck to be dealt out to players. 
// Players receive two cards each, with dealer showing one card face up. 

// 1.0 Player Scenarios

    //1.1.0 if player hits, draw card from randomized deck and place face up next to player cards
        //1.1.1 if player cards is below 21, offer player to either stay or hit again
        //1.1.2 if player cards is over 21, dealer automatically wins and display winner message and game over. Option to start new game
        //1.1.3 if player cards equals 21, show blackjack message and end turn, move immediately to dealer turn
    //1.2.0 if player stays, end player turn and move to dealer's turn function


 //2.0 Dealer(Computer) Scenarios
    //2.1.0. dealer reveals face down card, compare total of two cards
    //2.2.0. if dealer is below 17...
        //2.2.1 dealer hits and draw card from randomized deck and place face up next to dealer cards
    //2.3.0. if dealer is <= 17...
        //2.3.1 Dealer will stay, move to compare function
    //2.4.0. if dealer has 21
        //Show blackjack message and end turn, Show Dealer wins and game over, option to start new game  




 // Compare function
    // Compare dealer and player card values which are the deck variables   
        //define constants

        //define variables

        //define methods

        //define classes

        //define callbacks

        //store elements on the page

        //store player objects