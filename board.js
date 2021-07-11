import { BackgroundGrid } from "./background_grid.js";
import { Grid } from "./grid.js";

export class Board {
    constructor() {
        this.grids = [];
        for (let i = 0; i < Board.getNumGridY(); i++) {
            this.grids.push([]);
            Board.pos.push([]);
            Board.hasGrid.push([]);
            for (let j = 0; j < Board.getNumGridX(); j++) {
                this.grids[i].push(new BackgroundGrid());
                Board.hasGrid[i].push(false);
            }
        }
        this.updatePos();
    }

    static pos = [];
    static hasGrid = [];

    static getPos(idxX, idxY) {
        return Board.pos[idxY][idxX];
    }

    static isGridValid(idxX, idxY) {
        let horizInBound = idxX >= Board.getLeftBounds() && idxX <= Board.getRightBounds();
        let vertInBound = idxY >= Board.getTopBounds() && idxY <= Board.getBottomBounds();
        if (!horizInBound || !vertInBound) return false;
        if (Board.hasGrid[idxY][idxX]) return false;
        return true;
    }

    static getNumGridX() {
        return 10;
    }

    static getNumGridY() {
        return 20;
    }

    static getTopBounds() {
        return 0;
    }

    static getBottomBounds() {
        return Board.getNumGridY() - 1;
    }

    static getRightBounds() {
        return Board.getNumGridX() - 1;
    }

    static getLeftBounds() {
        return 0;
    }

    updatePos() {
        let posCenterX = window.innerWidth / 2;
        let posCenterY = window.innerHeight / 2;
        let posStartX = posCenterX - (Board.getNumGridX() * Grid.getSize() / 2);

        let posX = posStartX;
        let posY = posCenterY - (Board.getNumGridY() * Grid.getSize() / 2);
        for (let i = 0; i < Board.getNumGridY(); i++) {
            for (let j = 0; j < Board.getNumGridX(); j++) {
                Board.pos[i][j] = [posX, posY];
                posX += Grid.getSize();
            }
            posX = posStartX;
            posY += Grid.getSize();
        }
    }

    updateHasGrid(tetrominos) {
        // Clear first
        for (let i = 0; i < Board.getNumGridY(); i++)
            for (let j = 0; j < Board.getNumGridX(); j++)
                Board.hasGrid[i][j] = false;

        for (let grid of tetrominos) {
            Board.hasGrid[grid.idxY][grid.idxX] = true;
        }
    }

    clearLine() {
        let clearedLineIds = []
        for (let i = 0; i < Board.getNumGridY(); i++) {
            let numGrids = 0;
            for (let j = 0; j < Board.getNumGridX(); j++) {
                if (Board.hasGrid[i][j])
                    numGrids++;
            }

            if (numGrids >= Board.getNumGridX()) {
                console.log('clear ' + i)
                clearedLineIds.push(i);
            }
        }
        return clearedLineIds;
    }

    dropAllGrids(grids, clearedLineIds) {
        let deletedGrids = [];
        for (let grid of grids) {
            for (let clearedLineId of clearedLineIds) {
                if (grid.idxY < clearedLineId)
                    grid.moveDown();
                else if (grid.idxY == clearedLineId)
                    deletedGrids.push(grid);
            }
        }
        this.updateHasGrid(grids);
        for (let grid of deletedGrids) {
            let index = grids.indexOf(grid);
            if (index > -1) {
                grids.splice(index, 1);
            }
        }
    }

    update(grids) {
        this.updatePos();
        this.updateHasGrid(grids);
        let clearedLineIds = this.clearLine();
        this.dropAllGrids(grids, clearedLineIds);
    }

    render(ctx) {
        for (let i = 0; i < Board.getNumGridY(); i++) {
            for (let j = 0; j < Board.getNumGridX(); j++) {
                let grid = this.grids[i][j];
                grid.idxX = j;
                grid.idxY = i;
                grid.render(ctx);
            }
        }
    }
};