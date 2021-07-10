import { Board } from "./board.js";


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const board = new Board();


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    board.render(ctx);
    window.requestAnimationFrame(gameLoop);
}

gameLoop();