import { Input } from "./input.js";
import { Board } from "./board.js";
import { Grid } from "./grid.js";

export class Tetromino {
    constructor() {
        this.numGrids = 4;
        this.grids = []; // 4 grids compose a tetromino
        this.axisGrid;
        this.movable = true;
        this.shadows = [];
    }

    update(timer) {
        if (timer) {
            if (this.movable) {
                if (!this.canMoveDown()) {
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
            if (this.canRotateRight() && Input.available && Input.events.up) {
                Input.events.up = false;
                this.rotateRight();
            }
            if (Input.available && Input.events.space) {
                this.moveStrikeDown();
                Input.events.space = false;
                this.updateMovable();
            }
        }
        this.updateShadow();
    }

    updateMovable() {
        this.movable = this.canMoveDown();
    }

    updateShadow() {
        this.shadows = [];
        if (this.movable) {
            for (let grid of this.grids) {
                let shadow = new Grid();
                [shadow.idxX, shadow.idxY] = [grid.idxX, grid.idxY];
                shadow.fillStyle = 'rgb(60, 60, 60)';
                this.shadows.push(shadow);
            }
            while (this.shadowCanMoveDown()) {
                this.shadowMoveDown();
            }
        }
    }

    shadowCanMoveDown() {
        for (let grid of this.shadows) {
            let idxY = grid.idxY + 1;
            if (!Board.isGridValid(grid.idxX, idxY))
                return false;
        }
        return true;
    }

    shadowMoveDown() {
        for (let grid of this.shadows) {
            grid.moveDown();
        }
    }

    canMoveRight() {
        for (let grid of this.grids) {
            let idxX = grid.idxX + 1;
            if (!Board.isGridValid(idxX, grid.idxY))
                return false;
        }
        return true;
    }

    canMoveLeft() {
        for (let grid of this.grids) {
            let idxX = grid.idxX - 1;
            if (!Board.isGridValid(idxX, grid.idxY))
                return false;
        }
        return true;
    }

    canMoveDown() {
        for (let grid of this.grids) {
            let idxY = grid.idxY + 1;
            if (!Board.isGridValid(grid.idxX, idxY))
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

    moveStrikeDown() {
        while (this.canMoveDown()) {
            this.moveDown();
        }
    }

    canRotateRight() {
        for (let grid of this.grids) {
            let disX = grid.idxX - this.axisGrid.idxX;
            let disY = grid.idxY - this.axisGrid.idxY;
            let idxX = this.axisGrid.idxX - disY;
            let idxY = this.axisGrid.idxY + disX;
            if (!Board.isGridValid(idxX, idxY))
                return false;
        }
        return true;
    }

    rotateRight() {
        for (let grid of this.grids) {
            let disX = grid.idxX - this.axisGrid.idxX;
            let disY = grid.idxY - this.axisGrid.idxY;
            grid.idxX = this.axisGrid.idxX - disY;
            grid.idxY = this.axisGrid.idxY + disX;
        }
    }

    render(ctx) {
        for (let grid of this.shadows) {
            grid.render(ctx);
        }
        for (let grid of this.grids) {
            grid.render(ctx);
        }
    }
}