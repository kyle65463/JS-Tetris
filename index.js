import { Board } from "./board.js";
import { Input } from "./input.js";
import { TetrominoFactory } from "./tetromino/tetromino_factory.js";
import { HoldArea } from "./hold_area.js";
import { NextArea } from "./next_area.js";

const canvas = document.querySelector("canvas");
const pauseMenu = document.getElementById("pause-menu");
const restartButton = document.getElementById("restart-button");
const continueButton = document.getElementById("continue-button");
const startButton = document.getElementById("start-button");
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

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// Update
	if (isStarted && !isPaused) {
		movingTetromino.update(timer);
		if (!movingTetromino.movable) {
			for (let grid of movingTetromino.grids) {
				grids.push(grid);
			}
			movingTetromino = nextArea.getNextTetromino();
			movingTetromino.setInBoard();
		}
		board.update(grids);
		movingTetromino = holdArea.update(movingTetromino);
		if (!movingTetromino) {
			movingTetromino = nextArea.getNextTetromino();
			movingTetromino.setInBoard();
		}
		nextArea.update();
	}

	// Render
	board.render(ctx);
	holdArea.render(ctx);
	nextArea.render(ctx);
	if (isStarted) {
		for (let grid of grids) grid.render(ctx);
		movingTetromino.render(ctx);
		if (isPaused) {
			ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
			ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
		}
	}

	// End
	timer = false;
	Input.available = false;
	window.requestAnimationFrame(gameLoop.bind(this));
}

let interval1 = null;
let interval2 = null;
function gameStart() {
	if (!isStarted) {
		startButton.onclick = null;
		startButton.classList.add("invisible");
		movingTetromino = TetrominoFactory.randomCreate();
		movingTetromino.setInBoard();
		isStarted = true;

		nextArea.intialize();
		interval1 = setInterval(() => {
			Input.available = true;
		}, 70);

		interval2 = setInterval(() => {
			timer = true;
		}, 1000);
	}
}

function gameReset() {
	if (isStarted) {
		startButton.onclick = gameStart;
		startButton.classList.remove("invisible");
		movingTetromino = null;
		isStarted = false;
		isPaused = false;
		timer = false;
		grids = [];
		nextArea.reset();
		holdArea.reset();
		clearInterval(interval1);
		clearInterval(interval2);
		pauseMenu.classList.add("invisible");
		continueButton.onclick = null;
		restartButton.onclick = null;
	}
}

function gamePause() {
	isPaused = !isPaused;
	if (isPaused) {
		pauseMenu.classList.remove("invisible");
		continueButton.onclick = gamePause;
		restartButton.onclick = gameReset;
	} else {
		pauseMenu.classList.add("invisible");
		continueButton.onclick = null;
		restartButton.onclick = null;
	}
}

document.addEventListener("keydown", function (event) {
	if (isStarted && !isPaused) {
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
		if (event.key === "Escape") {
			event.preventDefault();
			gamePause();
		}
	}
	if (event.key === "Escape") {
		event.preventDefault();
	}
	if (event.key === "a") {
		gameStart();
	}
	if (event.key === "b") {
		gameReset();
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
