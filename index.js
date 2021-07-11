import { Board } from "./board.js";
import { Input } from "./input.js";
import { TetrominoFactory } from "./tetromino/tetromino_factory.js";
import { HoldArea } from "./hold_area.js";
import { NextArea } from "./next_area.js";

const canvas = document.querySelector("canvas");
const pauseMenu = document.getElementById("pause-menu");
const gameOverMenu = document.getElementById("game-over-menu");
const scoreLabel = document.getElementById("score-label");
const levelLabel = document.getElementById("level-label");
const restartButton = document.getElementById("restart-button");
const homeButton = document.getElementById("home-button");
const continueButton = document.getElementById("continue-button");
const startButton = document.getElementById("start-button");
const gameOverRestartButton = document.getElementById("game-over-restart-button");
const gameOverHomeButton = document.getElementById("game-over-home-button");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const board = new Board();
const nextArea = new NextArea();
const holdArea = new HoldArea();

let timer = false;
let movingTetromino = null;
let grids = [];
let isPaused = false;
let isStarted = false;
let isGameOver = false;
let score = 0;
let numClearedLine = 0;
let level = 1;

function updateLevel() {
	let updated = false;
	if (level <= 5 && numClearedLine >= 5) {
		level++;
		numClearedLine -= 5;
		updated = true;
	}
	if (level <= 10 && numClearedLine >= 10) {
		level++;
		numClearedLine -= 10;
		updated = true;
	}
	if (level <= 15 && numClearedLine >= 15) {
		level++;
		numClearedLine -= 15;
		updated = true;
	}
	if (updated) {
		clearInterval(gameInterval);
		gameInterval = setInterval(() => {
			timer = true;
		}, 1000 - (level - 1) * 50);
		levelLabel.innerHTML = level.toString();
	}
}

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// Update
	if (isStarted && !isPaused && !isGameOver) {
		movingTetromino.update(timer);
		if (!movingTetromino.movable) {
			for (let grid of movingTetromino.grids) {
				grids.push(grid);
			}
			movingTetromino = nextArea.getNextTetromino();
			movingTetromino.setInBoard();
		}
		let [newScore, newNumClearedLine] = board.update(grids);
		score += newScore * level;
		numClearedLine += newNumClearedLine;
		updateLevel();
		movingTetromino = holdArea.update(movingTetromino);
		if (!movingTetromino) {
			movingTetromino = nextArea.getNextTetromino();
			movingTetromino.setInBoard();
		}
		nextArea.update();
		isGameOver = movingTetromino.checkGameOver();
		if (isGameOver) {
			gameOver();
		}
	}

	// Render
	board.render(ctx);
	holdArea.render(ctx);
	nextArea.render(ctx);
	if (isStarted) {
		movingTetromino.render(ctx);
		for (let grid of grids) grid.render(ctx);
	}
	scoreLabel.innerHTML = score.toString();

	if (isPaused || isGameOver) {
		ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
		ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
	}

	// End
	timer = false;
	Input.available = false;
	window.requestAnimationFrame(gameLoop.bind(this));
}

let inputInterval = null;
let gameInterval = null;
function gameStart() {
	if (!isStarted) {
		startButton.onclick = null;
		startButton.classList.add("invisible");
		movingTetromino = TetrominoFactory.randomCreate();
		movingTetromino.setInBoard();
		isStarted = true;

		nextArea.intialize();
		inputInterval = setInterval(() => {
			Input.available = true;
		}, 70);

		gameInterval = setInterval(() => {
			timer = true;
		}, 1000);
	}
}

function gameOver() {
	gameOverMenu.classList.remove("invisible");
	gameOverRestartButton.onclick = gameRestart;
	gameOverHomeButton.onclick = gameReset;
}

function gameRestart() {
	gameReset();
	gameStart();
}

function gameReset() {
	if (isStarted) {
		startButton.onclick = gameStart;
		startButton.classList.remove("invisible");
		score = 0;
		numClearedLine = 0;
		level = 1;
		movingTetromino = null;
		isStarted = false;
		isPaused = false;
		isGameOver = false;
		timer = false;
		grids = [];
		nextArea.reset();
		holdArea.reset();
		clearInterval(inputInterval);
		clearInterval(gameInterval);
		gameOverMenu.classList.add("invisible");
		pauseMenu.classList.add("invisible");
		gameOverHomeButton.onclick = null;
		gameOverRestartButton.onclick = null;
		continueButton.onclick = null;
		restartButton.onclick = null;
		homeButton.onclick = null;
	}
}

function gamePause() {
	isPaused = !isPaused;
	if (isPaused) {
		pauseMenu.classList.remove("invisible");
		continueButton.onclick = gamePause;
		restartButton.onclick = gameRestart;
		homeButton.onclick = gameReset;
	} else {
		pauseMenu.classList.add("invisible");
		homeButton.onclick = null;
		continueButton.onclick = null;
		restartButton.onclick = null;
	}
}

document.addEventListener("keydown", function (event) {
	if (isStarted && !isGameOver) {
		if (!isPaused) {
			if (event.key === "ArrowLeft") {
				Input.events.left = true;
			}
			if (event.key === "ArrowRight") {
				Input.events.right = true;
			}
			if (event.key === "ArrowDown") {
				Input.events.down = true;
			}
			if (event.key === "ArrowUp") {
				Input.events.up = true;
			}
			if (event.key === " ") {
				Input.events.space = true;
			}
			if (event.key === "c") {
				Input.events.c = true;
			}
		}
		
		if (event.key === "Escape") {
			event.preventDefault();
			gamePause();
		}
	}

	if (event.key === "Escape") {
		event.preventDefault();
	}

	if (event.key === "r") {
		if (isPaused || isGameOver){
			gameRestart();
		}
	}

	if (event.key === "Enter" || event.key === " ") {
		if (isPaused) {
			gamePause();
		}
		if(!isStarted) {
			gameStart();
		}
		if(isGameOver && event.key === "Enter") {
			gameReset();
		}
	}
});

document.addEventListener("keyup", function (event) {
	if (event.key === "ArrowLeft") {
		Input.events.left = false;
	}
	if (event.key === "ArrowRight") {
		Input.events.right = false;
	}
	if (event.key === "ArrowDown") {
		Input.events.down = false;
	}
	if (event.key === "ArrowUp") {
		Input.events.up = false;
	}
});

startButton.onclick = gameStart;
gameLoop();
