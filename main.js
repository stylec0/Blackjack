///Charles Co's Blackjack JS//
/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = newDeck();

/*----- app's state (variables) -----*/
let shuffledDeck = shuffleDeck();
let dealerHand = [];
let playerHand = [];
let playerTotal = 0;
let dealerTotal = 0;

// /*----- cached element references -----*/
const startGameBtn = document.getElementById('start');
const standBtn = document.getElementById('stand');
const hitBtn = document.getElementById('hit');
let playerDeckHand = document.getElementById('player-hand')
let dealerDeckHand = document.getElementById('dealer-hand')


/*----- event listeners -----*/
startGameBtn.addEventListener('click', init);
hitBtn.addEventListener('click', playerHit);
standBtn.addEventListener('click', stand);

/*----- functions -----*/

function dealPlayerCards () {
    for (let i = 0; i < 2; i++){
        let card = shuffledDeck.pop();
        playerHand.push(card); 
    }
    showPlayerHand();
}

function dealDealerCards () {
    for (let i = 0; i < 2; i++){
        let card = shuffledDeck.pop();
        dealerHand.push(card);
    }
    showDealerHand();
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

function playerHit() {
    let card = shuffledDeck.pop();
        playerHand.push(card); 
        let cards = `<div class = "card ${card.face}"></div>`
        playerDeckHand.innerHTML += cards;
        // playerHasAce()
        playerHasAce(card);
        playerCardValues();
  }

  function dealerHit() {
    let card = shuffledDeck.pop();
        dealerHand.push(card); 
        let cards = `<div class = "card ${card.face}"></div>`
        dealerDeckHand.innerHTML += cards;
        dealerHasAce(card)
        dealerCardValues();
        dealerTurn();
        // dealerHasAce() 
  }

function dealerTurn() {
  if (dealerTotal < 17) {
      dealerHit(); 
}else if (dealerTotal >= 17) {
  compareValues();
}
}


// Stand Function

function stand() {
  dealerTurn();
}

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


  // Create Render function
  function render() {
    renderNewShuffledDeck();
    showPlayerHand();
    showDealerHand();
  }
  

  // We call init, because we want to initialize our state when the page loads

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
  }

// Game Logic


function playerCardValues() {
  playerTotal = 0;
  for (let i = 0; i < playerHand.length; i++) {
    playerTotal += playerHand[i].value;
  }
  gameLogic()
}

function dealerCardValues() {
  dealerTotal = 0;
  for (let i = 0; i < dealerHand.length; i++) {
    dealerTotal += dealerHand[i].value;
  }
}

// function checkAce() {
//   for (let i = 0; i < playerHand.length; i++)
//   if (playerHand[i].face.includes('A')) {
//     aceValue(i);
//   console.log("Check Ace function working")
// }
// }

// function aceValue(idx) {
//   if (playerTotal > 21) {
//     playerHand[idx].value = 1;
//     console.log("ace Value function working")
//   }
// }


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

function gameLogic() {
  if (playerTotal < 21) {
    console.log("Hit or Stand?");
  } else if (playerTotal > 21) {
    console.log("Player Bust! Dealer wins!");
  }else if (playerTotal === 21) {
    console.log("Blackjack! Player wins!");
  }else if (dealerTotal >= 17) {
    console.log("Dealer stands");
  }else if (dealerTotal === 21) {
    console.log("Black Jack! Dealer Wins");
  }else { (dealerTotal > 21) 
    console.log("Dealer Busts! Player Wins!");
}
}

// Compare Values

function compareValues() {
  if (playerTotal === dealerTotal){
    console.log(`"It is a Tie! Player has ${playerTotal} and Dealer has ${dealerTotal}!"`)
  }
  else if (playerTotal > 21) {
    console.log("Player Bust! Dealer wins!");
  }
  else if(dealerTotal > 21) {
    console.log("Dealer Busts! Player Wins!");
  }
  else if (playerTotal > dealerTotal) {
    console.log(`"Player has won! Player has ${playerTotal} and Dealer has ${dealerTotal}!"`)
  }else {
    console.log(`"Dealer has won! Dealer has ${dealerTotal} and player has ${playerTotal}!"`)
  }
}


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
