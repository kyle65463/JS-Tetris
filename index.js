import { Board } from "./board.js";
import { Input } from "./input.js";
import { TetrominoS } from "./tetromino_s.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const board = new Board();

let tetrominos = [new TetrominoS()];

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Update
    board.update();
    for(let tetromino of tetrominos) {
        tetromino.update();
    }

    // Render
    board.render(ctx);
    for(let tetromino of tetrominos) {
        tetromino.render(ctx);
    }
    
    // End
    window.requestAnimationFrame(gameLoop);
}



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