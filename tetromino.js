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

    update(timer) {
        if (timer) {
            if (this.movable) {
                if(!this.canMoveDown()) {
                    this.movable = false;
                }
                else {
                    this.moveDown();
                }
            }
        }
        if (this.movable) {
            if (this.canMoveRight() && Input.available && Input.events.right) {
                this.moveRight();
            }
            if (this.canMoveDown() && Input.available && Input.events.down) {
                this.moveDown();
            }
            if (this.canMoveLeft() && Input.available && Input.events.left) {
                this.moveLeft();
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

    canMoveRight() {
        for (let grid of this.grids) {
            let idxX = grid.idxX + 1;
            if(idxX > Board.getRightBounds() || Board.hasBlock[grid.idxY][idxX])
                return false;
        }
        return true;
    }

    canMoveLeft() {
        for (let grid of this.grids) {
            let idxX = grid.idxX - 1;
            if(idxX < Board.getLeftBounds() || Board.hasBlock[grid.idxY][idxX])
                return false;
        }
        return true;
    }
    
    canMoveDown() {
        for (let grid of this.grids) {
            let idxY = grid.idxY + 1;
            if(idxY > Board.getBottomBounds() || Board.hasBlock[idxY][grid.idxX])
                return false;
        }
        return true;
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