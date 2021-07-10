import { Board } from "./board.js";
import { Input } from "./input.js";
import { TetrominoS } from "./tetromino_s.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const board = new Board();

let timer = false;
let movingTetromino = new TetrominoS();
let tetrominos = [];

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Update
    board.update(tetrominos);
    for(let tetromino of tetrominos) {
        tetromino.update(timer);
    }
    movingTetromino.update(timer);

    // Render
    board.render(ctx);
    for(let tetromino of tetrominos) {
        tetromino.render(ctx);
    }
    movingTetromino.render(ctx);

    if (!movingTetromino.movable) {
        tetrominos.push(movingTetromino);
        movingTetromino = new TetrominoS();
    }
    
    // End
    timer = false;
    Input.available = false;
    window.requestAnimationFrame(gameLoop);
}

setInterval(()=> {
    Input.available = true;
}, 50)

setInterval(()=> {
    timer = true;
}, 1000)

document.addEventListener('keydown', function(event) {
    if(event.key === "ArrowLeft") {
        Input.events.left = true;
    }
    if(event.key === "ArrowRight") {
        Input.events.right = true;
    }
    if(event.key === "ArrowDown") {
        Input.events.down = true;
    }
    if(event.key === "ArrowUp") {
        Input.events.up = true;
    }
});

document.addEventListener('keyup', function(event) {
    if(event.key === "ArrowLeft") {
        Input.events.left = false;
    }
    if(event.key === "ArrowRight") {
        Input.events.right = false;
    }
    if(event.key === "ArrowDown") {
        Input.events.down = false;
    }
    if(event.key === "ArrowUp") {
        Input.events.up = false;
    }
});

gameLoop();