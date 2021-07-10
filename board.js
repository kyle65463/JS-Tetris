import { BackgroundGrid } from "./background_grid.js";
import { Grid } from "./grid.js";

export class Board{
    constructor() {
        this.grids = [];
        for(let i = 0; i < Board.getNumGridY(); i++) {
            this.grids.push([]);
            Board.pos.push([]);
            Board.hasBlock.push([]);
            for(let j = 0; j < Board.getNumGridX(); j++) {
                this.grids[i].push(new BackgroundGrid());
                Board.hasBlock[i].push(false);
            }
        }
        this.updatePos();
    }

    static pos = [];
    static hasBlock = [];

    static getPos(idxX, idxY) {
        return Board.pos[idxY][idxX];
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

    static canMoveDown() {

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
        for(let i = 0; i < Board.getNumGridY(); i++) {
            for(let j = 0; j < Board.getNumGridX(); j++) {
                Board.pos[i][j] = [posX, posY];
                posX += Grid.getSize();
            }
            posX = posStartX;
            posY += Grid.getSize();
        }
    }   

    updateHasBlock(tetrominos) {
        for(let tetromino of tetrominos) {
            if(!tetromino.movable) {
                for(let grid of tetromino.grids) { 
                    Board.hasBlock[grid.idxY][grid.idxX] = true; 
                }
            }
        }
    }

    update(tetrominos) {
        this.updatePos();
        this.updateHasBlock(tetrominos);
    }

    render(ctx) {
        for(let i = 0; i < Board.getNumGridY(); i++) {
            for(let j = 0; j < Board.getNumGridX(); j++) {
                let grid = this.grids[i][j];
                grid.idxX = j;
                grid.idxY = i;
                grid.render(ctx);
            }
        }
    }
};