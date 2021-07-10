import { Input } from "../input.js";
import { Board } from "../board.js";
import { Grid } from "../grid.js";

export class Tetromino {
    constructor() {
        this.numGrids = 4;
        this.grids = []; // 4 grids compose a tetromino
        this.axisGrid;
        this.movable = true;
        this.rotationPhase = 0;
        this.rotationOffsets = [];
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
            if (Input.available && Input.events.up) {
                Input.events.up = false;
                this.tryRotateRight();
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

    tryRotateRight() {
        let rotated = false;

        if (this.canRotateRight()) {
            this.rotateRight();
            rotated = true;
        }
        else {
            if (!rotated) {
                this.moveRight();
                if (this.canRotateRight()) {
                    this.rotateRight();
                    rotated = true;
                }
                else {
                    this.moveLeft();
                }
            }
            if (!rotated) {
                this.moveLeft();
                if (this.canRotateRight()) {
                    this.rotateRight();
                    rotated = true;
                }
                else {
                    this.moveRight();
                }
            }
            if (!rotated) {
                this.moveDown();
                if (this.canRotateRight()) {
                    this.rotateRight();
                    rotated = true;
                }
                else {
                    this.moveUp();
                }
            }
            if (!rotated) {
                this.moveUp();
                if (this.canRotateRight()) {
                    this.rotateRight();
                    rotated = true;
                }
                else {
                    this.moveDown();
                }
            }
        }
        return rotated;
    }

    canRotateLeft() {
        let [axisIdxX, axisIdxY] = [this.axisGrid.idxX, this.axisGrid.idxY];
        let [rotationOffsetX, rotationOffsetY] = this.rotationOffsets[this.rotationPhase];
        for (let grid of this.grids) {
            let disX = grid.idxX - axisIdxX;
            let disY = grid.idxY - axisIdxY;
            let idxX = axisIdxX + disY + rotationOffsetX
            let idxY = axisIdxY - disX + rotationOffsetY
            if (!Board.isGridValid(idxX, idxY))
                return false;
        }
        return true;
    }

    canRotateRight() {
        let [axisIdxX, axisIdxY] = [this.axisGrid.idxX, this.axisGrid.idxY];
        let [rotationOffsetX, rotationOffsetY] = this.rotationOffsets[this.rotationPhase];
        for (let grid of this.grids) {
            let disX = grid.idxX - axisIdxX;
            let disY = grid.idxY - axisIdxY;
            let idxX = axisIdxX - disY + rotationOffsetX
            let idxY = axisIdxY + disX + rotationOffsetY
            if (!Board.isGridValid(idxX, idxY))
                return false;
        }
        return true;
    }

    rotateRight() {
        let [axisIdxX, axisIdxY] = [this.axisGrid.idxX, this.axisGrid.idxY];
        let [rotationOffsetX, rotationOffsetY] = this.rotationOffsets[this.rotationPhase];
        for (let grid of this.grids) {
            let disX = grid.idxX - axisIdxX;
            let disY = grid.idxY - axisIdxY;
            grid.idxX = axisIdxX - disY + rotationOffsetX
            grid.idxY = axisIdxY + disX + rotationOffsetY
        }
        this.rotationPhase++;
        this.rotationPhase %= 4;
    }

    rotateLeft() {
        let [axisIdxX, axisIdxY] = [this.axisGrid.idxX, this.axisGrid.idxY];
        let [rotationOffsetX, rotationOffsetY] = this.rotationOffsets[this.rotationPhase];
        for (let grid of this.grids) {
            let disX = grid.idxX - axisIdxX;
            let disY = grid.idxY - axisIdxY;
            grid.idxX = axisIdxX + disY + rotationOffsetX
            grid.idxY = axisIdxY - disX + rotationOffsetY
        }
        this.rotationPhase++;
        this.rotationPhase %= 4;
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