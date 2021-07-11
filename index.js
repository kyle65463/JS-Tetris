import { Board } from "./board.js";
import { Input } from "./input.js";
import { TetrominoO } from "./tetromino/tetromino_o.js";
import { TetrominoFactory } from "./tetromino/tetromino_factory.js";


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const board = new Board();

let timer = false;
let movingTetromino = TetrominoFactory.randomCreate();
let tetrominos = [];

function gameLoop() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Update
    movingTetromino.update(timer);
    if (!movingTetromino.movable) {
        for (let grid of movingTetromino.grids) {
            tetrominos.push(grid);
        }
        movingTetromino = TetrominoFactory.randomCreate();
    }
    board.update(tetrominos);

    // Render
    board.render(ctx);
    for (let grid of tetrominos) {
        grid.render(ctx);
    }
    movingTetromino.render(ctx);

    // End
    timer = false;
    Input.available = false;

    // setTimeout(()=>{
        window.requestAnimationFrame(gameLoop.bind(this));
    // }, 200)
    
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