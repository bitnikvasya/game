var start = document.querySelector('#start');
var game = document.querySelector('#game');
var time = document.querySelector('#time');
var result = document.querySelector('#result');
var score = 0;
var isGameStarted = false;
var timeHeader = document.querySelector('#time-header');
var resultHeader = document.querySelector('#result-header');
var gameTime = document.querySelector('#game-time');

start.addEventListener('click', startGame);
game.addEventListener('click', handleBoxClick);
gameTime.addEventListener('input', setGameTime);

function startGame() {
	score = 0;
	setGameTime();
	gameTime.setAttribute('disabled', 'true');
	isGameStarted = true;
	game.style.backgroundColor = '#fff';
	start.classList.add('hide');
	//Устанавливаем таймер
	var interval = setInterval(function() {
		//Преобразуем строку в число
		var intervalTime = Number(time.textContent);
		if (intervalTime > 0) {
			//Один символ после точки
			time.textContent = (intervalTime - 0.1).toFixed(1);
		} else {
			//Останавливаем таймер
			clearInterval(interval);
			endGame();
		};
	}, 100);
	renderBox();
};

function setGameScore() {
	//Преобразуем число в строку
	result.textContent = String(score);
};

function setGameTime() {
	var setTime = Number(gameTime.value);
	time.textContent = setTime.toFixed(1);
	timeHeader.classList.remove('hide');
	resultHeader.classList.add('hide');
};

function endGame() {
	isGameStarted = false;
	setGameScore();
	gameTime.removeAttribute('disabled');
	start.classList.remove('hide');
	//Очищаем элемент от кода внутри
	game.innerHTML = '';
	game.style.backgroundColor = 'rgba(0,0,0,0.3)';
	timeHeader.classList.add('hide');
	resultHeader.classList.remove('hide');
};

function handleBoxClick(event) {
	if (!isGameStarted) {
		return;
	//Выбираем элементы с атрибутом data-box
	} else if (event.target.dataset.box) {
		score++;
		renderBox();
	};
};

function renderBox() {
	game.innerHTML = '';
	var box = document.createElement('div');
	var boxSize = getRandom(30, 100);
	//Получаем параметры элемента (координаты, размеры...)
	var gameSize = game.getBoundingClientRect();
	var maxTop = gameSize.height - boxSize;
	var maxLeft = gameSize.width - boxSize;
	box.style.height = box.style.width = boxSize + 'px';
	box.style.backgroundColor = 'rgba(' + getRandom(0, 255) + ',' + getRandom(0, 255) + ',' + getRandom(0, 255) + ',1)';
	box.style.position = 'absolute';
	box.style.top = getRandom(0, maxTop) + 'px';
	box.style.left = getRandom(0, maxLeft) + 'px';
	box.style.cursor = 'pointer';
	box.setAttribute('data-box', 'true');
	game.insertAdjacentElement('afterbegin', box);
};

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
};