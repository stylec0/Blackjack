/*----------------------------------- constants -----------------------------------*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const masterDeck = newDeck();

/*--------------------------- app's state (variables) ---------------------------*/
let shuffledDeck = shuffleDeck();
let dealerHand = [];
let playerHand = [];
let playerTotal = 0;
let dealerTotal = 0;

// /*-------------------------- cached element references -------------------*/
const startGameBtn = document.getElementById('start');
const standBtn = document.getElementById('stand');
const hitBtn = document.getElementById('hit');
const gameResults = document.getElementById('game-results');
const playerCardTotal = document.getElementById('player-total')
const dealerCardTotal = document.getElementById('dealer-total')
const playButtons = document.getElementById('play-buttons');
let playerDeckHand = document.getElementById('player-hand');
let dealerDeckHand = document.getElementById('dealer-hand');


/*--------------------------------- event listeners ---------------------------------*/
startGameBtn.addEventListener('click', init);
hitBtn.addEventListener('click', playerHit);
standBtn.addEventListener('click', stand);

/*------------------ Once Start Game is pressed. The init function is called ----------------*/

function init() {
  playerHand = [];
  dealerHand = [];
  playerTotal = 0;
  dealerTotal = 0;
  newDeck();
  shuffleDeck();
  dealPlayerCards();
  dealDealerCards();
  render();
  playerCardValues();
  dealerCardValues();
  updateScores();
  checkPlayerTotal();
  // buttonChange();
}

/*---------------------------- Deal and Show card functions----------------------------*/

function dealPlayerCards () {
    for (let i = 0; i < 2; i++){
        let card = shuffledDeck.pop();
        playerHand.push(card); 
    }
}

function dealDealerCards () {
    for (let i = 0; i < 2; i++){
        let card = shuffledDeck.pop();
        dealerHand.push(card);
    }
}

function showPlayerHand() {
    playerDeckHand.innerHTML = '';
    playerHand.forEach(function(card) {
      let cards = `<div class = "card ${card.face}"></div>`
      playerDeckHand.innerHTML += cards;
    })
  }

function showDealerHand() {
    dealerDeckHand.innerHTML = '';
    dealerHand.forEach(function(card, idx) {
      let cards = `<div class = "card ${card.face}"></div>`
      if (idx === 0) {
        cards = `<div class = "card back-blue"></div>`
      }
      dealerDeckHand.innerHTML += cards;
})
}

/*--------------------------  Player/Dealer Hit, Stand and end turn functions----------------------*/


function playerHit() {
    let card = shuffledDeck.pop();
        playerHand.push(card); 
        let cards = `<div class = "card ${card.face}"></div>`
        playerDeckHand.innerHTML += cards;
        playerHasAce(card);
        playerCardValues();
        updateScores();
        checkPlayerTotal();
  }

function dealerTurn() {
    if (dealerTotal < 17) {
        dealerHit(); 
  }else if (dealerTotal >= 17) {
    compareValues();
  }
  }

function dealerHit() {
    let card = shuffledDeck.pop();
        dealerHand.push(card); 
        let cards = `<div class = "card ${card.face}"></div>`
        dealerDeckHand.innerHTML += cards;
        dealerHasAce(card)
        dealerCardValues();
        updateScores();
        dealerTurn();
  }

// When stand button is pressed, end player turn and go to dealer turn
function stand() {
  dealerTurn();
}

/*------------------------  Master deck and Shuffled deck functions----------------------*/

function newDeck() {
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

function shuffleDeck() {
    // Create a copy of the masterDeck (leave masterDeck untouched!)
    const tempDeck = [...masterDeck];
    const shuffledDeck = [];
    while (tempDeck.length) {
      // Get a random index for a card still in the tempDeck
      const rndIdx = Math.floor(Math.random() * tempDeck.length);
      // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
      shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }
    return shuffledDeck;
  }
  
  function renderNewShuffledDeck() {
    // Create a copy of the masterDeck (leave masterDeck untouched!)
    shuffledDeck = shuffleDeck();
    showPlayerHand(shuffledDeck);
  }


  // Render function for cards
  function render() {
    renderNewShuffledDeck();
    showPlayerHand();
    showDealerHand();
  }
  

/*----------------------------  Game Logic ----------------------------*/

function checkPlayerTotal() {
  if (playerTotal === 21) {
    stand(); 
  } else if (playerTotal > 21) {
    compareValues();
  } else { (playerTotal < 21)
    gameResults.innerText = "Hit or Stand?";
  }
}

function playerCardValues() {
  playerTotal = 0;
  for (let i = 0; i < playerHand.length; i++) {
    playerTotal += playerHand[i].value;
  }
  checkPlayerTotal();
}

function dealerCardValues() {
  dealerTotal = 0;
  for (let i = 0; i < dealerHand.length; i++) {
    dealerTotal += dealerHand[i].value;
  }
}

function updateScores() {
  playerCardTotal.innerText = (`Player has ${playerTotal}`);
  dealerCardTotal.innerText = (" ");
}

function playerHasAce(card) {
  for (let i = 0; i < playerHand.length; i++) {
    if (playerHand[i].face.includes('A') && playerTotal + card.value > 21) {
      playerHand[i].value = 1; }
      playerTotal += playerHand[i].value
    }
}

function dealerHasAce(card) {
  for (let i = 0; i < dealerHand.length; i++) {
    if (dealerHand[i].face.includes('A') && dealerTotal + card.value > 21) {
      dealerHand[i].value = 1; }
      dealerTotal += dealerHand[i].value
    }
}


/*--------------------  Compare values and update HTML functions  ----------------------*/

function compareValues() {
  if (playerTotal === dealerTotal){
    gameResults.innerText = (`It is a Tie! Player has ${playerTotal} and Dealer has ${dealerTotal}!`)
    playerCardTotal.innerText = (' ');
    dealerCardTotal.innerText = (`Dealer has ${dealerTotal}`);
    startGameBtn.innerText = ("Play Again?");
  }
  else if (playerTotal > 21) {
    gameResults.innerText = (`Player Bust with ${playerTotal}! Dealer wins!`);
    playerCardTotal.innerText = (' ');
    dealerCardTotal.innerText = (`Dealer has ${dealerTotal}`);
    startGameBtn.innerText = ("Play Again?");
  }
  else if(dealerTotal > 21) {
    gameResults.innerText = (`Dealer Busts with ${dealerTotal}! Player Wins!`);
    playerCardTotal.innerText = (' ');
    dealerCardTotal.innerText = (`Dealer has ${dealerTotal}`);
    startGameBtn.innerText = ("Play Again?");
  }
  else if (playerTotal > dealerTotal) {
    gameResults.innerText = (`Player has won! Player has ${playerTotal} and Dealer has ${dealerTotal}!`)
    playerCardTotal.innerText = (' ');
    dealerCardTotal.innerText = (`Dealer has ${dealerTotal}`);
    startGameBtn.innerText = ("Play Again?");
  }else {
    gameResults.innerText = (`Dealer has won! Dealer has ${dealerTotal} and player has ${playerTotal}!`)
    playerCardTotal.innerText = (' ');
    dealerCardTotal.innerText = (`Dealer has ${dealerTotal}`);
    startGameBtn.innerText = ("Play Again?");
  }
}



//////////////////////////////////////////// Test Functions! ////////////////////////////////////////////

  
// Test Functions for adding new buttons
// function addButtons() {
//   const standBtn = document.createElement('#stand');
// }



// function buttonChange() {
//   playButtons.classList.remove('hidden');
//   hitBtn.classList.add('show-hit');
//   standBtn.classList.add('show-stand');
//   startGameBtn.classList.add('hidden');
//   console.log("button change works")
// }



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
