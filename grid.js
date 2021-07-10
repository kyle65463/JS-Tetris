import { Board } from "./board.js";

export class Grid{
    constructor() {
        this.fillStyle = 'white';
        this.strokeStyle = 'black';
        this.posX = 0;
        this.posY = 0;
    }

    static getSize() {
        return 30;
    }

    moveRight() {
        this.idxX += 1;
    }

    moveLeft() {
        this.idxX -= 1;
    }

    moveDown() {
        this.idxY += 1;
    }

    moveUp() {
        this.idxY -= 1;
    }

    render(ctx) {
        let [posX, posY] = Board.getPos(this.idxX, this.idxY)
        ctx.fillStyle = this.fillStyle;
        ctx.fillRect(posX, posY, Grid.getSize(), Grid.getSize());
        ctx.strokeStyle = this.strokeStyle;
        ctx.strokeRect(posX, posY, Grid.getSize(), Grid.getSize());
    }
};