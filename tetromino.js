import { Input } from "./input.js";
import { Board } from "./board.js";

export class Tetromino {
    constructor() {
        this.numGrids = 4;
        this.idxLeft = 0;
        this.idxRight = 0;
        this.idxTop = 0;
        this.idxBottom = 0;
        this.grids = []; // 4 grids compose a tetromino
        this.movable = true;
    }

    update() {
        if (this.movable) {
            if (this.idxRight < Board.getRightBounds() && Input.events.right) {
                this.moveRight();
            }
            if (this.idxBottom < Board.getBottomBounds() && Input.events.down) {
                this.moveDown();
            }
            if (this.idxLeft > Board.getLeftBounds() && Input.events.left) {
                this.moveLeft();
            }
            if (this.idxTop > Board.getTopBounds() && Input.events.up) {
                this.moveUp();
            }
            this.updateIdx();
        }
    }

    updateIdx() {
        let [idxLeft, idxRight, idxTop, idxBottom] = [100, -100, 100, -100];
        for (let grid of this.grids) {
            idxLeft = Math.min(idxLeft, grid.idxX);
            idxRight = Math.max(idxRight, grid.idxX);
            idxTop = Math.min(idxTop, grid.idxY);
            idxBottom = Math.max(idxBottom, grid.idxY);
        }
        this.idxLeft = idxLeft;
        this.idxTop = idxTop;
        this.idxRight = idxRight;
        this.idxBottom = idxBottom;
    }

    moveRight() {
        for (let grid of this.grids) {
            grid.moveRight();
        }
    }

    moveLeft() {
        for (let grid of this.grids) {
            grid.moveLeft();
        }
    }

    moveUp() {
        for (let grid of this.grids) {
            grid.moveUp();
        }
    }

    moveDown() {
        for (let grid of this.grids) {
            grid.moveDown();
        }
    }

    render(ctx) {
        for (let grid of this.grids) {
            grid.render(ctx);
        }
    }
}