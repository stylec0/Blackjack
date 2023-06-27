const welcomeScreen = document.querySelector('.welcome-screen');
const welcomeContainer = document.querySelector('.welcome-container');
//const gameScreen = document.querySelector('.game-screen');
//const startGameBtn = document.querySelector('.start-game');
const betValue = document.querySelector('.bet-value')
const bettingBtn = document.querySelector('.bet-buttons');
const fiveChip = bettingBtn.querySelector('#five');
const tenChip = bettingBtn.querySelector('#ten');
const twentyFiveChip = bettingBtn.querySelector('#twenty-five');
const fiftyChip = bettingBtn.querySelector('#fifty');
const hundredChip = bettingBtn.querySelector('#hundred');
const clearWagerBtn = bettingBtn.querySelector('#clear-bet');
const wallet = document.querySelector('.wallet');
//const gameResults = document.getElementById('game-results');

let currentWager = 0;
let currentFunds = 500;
let bettingPool = 0;

//startGameBtn.addEventListener('click', init);
fiveChip.addEventListener('click', betFive);
tenChip.addEventListener('click', betTen);
twentyFiveChip.addEventListener('click', betTwentyFive);
fiftyChip.addEventListener('click', betFifty);
hundredChip.addEventListener('click', betHundred);
clearWagerBtn.addEventListener('click', clearWager);

function wageScreenRemove() {
	welcomeScreen.classList.add('inactive');
	gameScreen.classList.remove('inactive');
}

function wageScreenAppear() {
    gameScreen.classList.add('inactive');
	welcomeScreen.classList.remove('inactive');
}

function betFive() {
    currentWager += 5
    currentFunds -= 5
    bettingPool += 5
    betValue.innerHTML = `Bet: ${currentWager}`
    wallet.innerHTML = `Chip Total: ${currentFunds}`
}

function betTen() {
    currentWager += 10
    currentFunds -= 10
    bettingPool += 10
    betValue.innerHTML = `Bet: ${currentWager}`
    wallet.innerHTML = `Chip Total: ${currentFunds}`
}

function betTwentyFive() {
    currentWager += 25
    currentFunds -= 25
    bettingPool += 25
    betValue.innerHTML = `Bet: ${currentWager}`
    wallet.innerHTML = `Chip Total: ${currentFunds}`
}

function betFifty() {
    currentWager += 50
    currentFunds -= 50
    bettingPool += 50
    betValue.innerHTML = `Bet: ${currentWager}`
    wallet.innerHTML = `Chip Total: ${currentFunds}`
}

function betHundred() {
    currentWager += 100
    currentFunds -= 100
    bettingPool += 100
    betValue.innerHTML = `Bet: ${currentWager}`
    wallet.innerHTML = `Chip Total: ${currentFunds}`
}

function clearWager() {
    currentWager = 0
    betValue.innerHTML = `Bet: ${currentWager}`
    currentFunds += bettingPool
    bettingPool = 0
    wallet.innerHTML = `Chip Total: ${currentFunds}`
}


//const myModal = document.getElementById('myModal');
//const myInput = document.getElementById('myInput');

//myModal.addEventListener('shown.bs.modal', () => {
//	myInput.focus();
//});