import { Board } from "./board.js";
import { Input } from "./input.js";
import { TetrominoFactory } from "./tetromino/tetromino_factory.js";
import { HoldArea } from "./hold_area.js";
import { NextArea } from "./next_area.js";

const canvas = document.querySelector("canvas");
const pauseMenu = document.getElementById("pause-menu");
const ctx = canvas.getContext("2d");
pauseMenu.parentNode.removeChild(pauseMenu);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const board = new Board();
const nextArea = new NextArea();
const holdArea = new HoldArea();

let timer = false;
let movingTetromino = TetrominoFactory.randomCreate();
movingTetromino.setInBoard();
let grids = [];
let isPaused = false;

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// Update
	if (!isPaused) {
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
	for (let grid of grids) grid.render(ctx);
	movingTetromino.render(ctx);
	holdArea.render(ctx);
	nextArea.render(ctx);
	if (isPaused) {
		ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
		ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
	}

	// End
	timer = false;
	Input.available = false;
	window.requestAnimationFrame(gameLoop.bind(this));
}

setInterval(() => {
	Input.available = true;
}, 70);

setInterval(() => {
	timer = true;
}, 1000);

document.addEventListener("keydown", function (event) {
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
		isPaused = !isPaused;
		event.preventDefault();
		if (isPaused) {
			document.body.appendChild(pauseMenu);
		} else {
			pauseMenu.parentNode.removeChild(pauseMenu);
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

gameLoop();
