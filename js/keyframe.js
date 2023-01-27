const welcomeScreen = document.querySelector('.welcome-screen');
const gameScreen = document.querySelector('.game-screen');
const testGameBtn = document.querySelector('.start-game');

testGameBtn.addEventListener('click', startGame);

function startGame() {
	welcomeScreen.classList.add('inactive');
	gameScreen.classList.remove('inactive');
}

//const myModal = document.getElementById('myModal');
//const myInput = document.getElementById('myInput');

//myModal.addEventListener('shown.bs.modal', () => {
//	myInput.focus();
//});
