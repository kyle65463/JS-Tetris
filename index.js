import { Board } from "./board.js";
import { Input } from "./input.js";
import { DisplayBox } from "./display_box.js"
import { TetrominoFactory } from "./tetromino/tetromino_factory.js";
import { HoldArea } from "./hold_area.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const board = new Board();


let timer = false;
let movingTetromino = TetrominoFactory.randomCreate();
movingTetromino.setInBoard();

// Next area
let nextTetrominos = []
let nextTetrominoBoxes = [];
let posStartY = 200;
for (let i = 0; i < 3; i++) {
    let tetromino = TetrominoFactory.randomCreate();
    let [posX, posY] = [1000, posStartY + i * DisplayBox.getHeight()]
    tetromino.setNotInBoard(posX, posY);
    nextTetrominos.push(tetromino);
    nextTetrominoBoxes.push(new DisplayBox(posX, posY));
}
let grids = [];

// Hold area
let holdArea = new HoldArea();

function setNextTetrominos(nextTetrominos) {
    let i = 0;
    for (let tetromino of nextTetrominos) {
        let [posX, posY] = [1000, posStartY + i * DisplayBox.getHeight()]
        tetromino.setNotInBoard(posX, posY);
        i++;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Update
    movingTetromino.update(timer);
    if (!movingTetromino.movable) {
        for (let grid of movingTetromino.grids) {
            grids.push(grid);
        }
        movingTetromino = nextTetrominos[0];
        movingTetromino.setInBoard();

        let newTetromino = TetrominoFactory.randomCreate();
        nextTetrominos.splice(0, 1);
        nextTetrominos.push(newTetromino);
        setNextTetrominos(nextTetrominos);
    }
    board.update(grids);
    movingTetromino = holdArea.update(movingTetromino);
    if (!movingTetromino) {
        movingTetromino = nextTetrominos[0];
        movingTetromino.setInBoard();

        let newTetromino = TetrominoFactory.randomCreate();
        nextTetrominos.splice(0, 1);
        nextTetrominos.push(newTetromino);
        setNextTetrominos(nextTetrominos);
    }

    // Render
    board.render(ctx);
    for (let grid of grids) {
        grid.render(ctx);
    }
    movingTetromino.render(ctx);

    for (let displayBox of nextTetrominoBoxes) {
        displayBox.render(ctx);
    }
    for (let tetromino of nextTetrominos) {
        tetromino.render(ctx);
    }
    holdArea.render(ctx);

    // End
    timer = false;
    Input.available = false;
    window.requestAnimationFrame(gameLoop.bind(this));
}

setInterval(() => {
    Input.available = true;
}, 70)

setInterval(() => {
    timer = true;
}, 1000)

document.addEventListener('keydown', function (event) {
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
});

document.addEventListener('keyup', function (event) {
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