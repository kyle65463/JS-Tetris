import { BackgroundGrid } from "./background_grid.js";

export class Board{
    constructor() {
        this.numGridX = 10;
        this.numGridY = 20;
        this.sizeX = 30;
        this.sizeY = 30;
        this.grids = [];
        for(let i = 0; i < this.numGridY; i++) {
            this.grids.push([]);
            for(let j = 0; j < this.numGridX; j++) {
                this.grids[i].push(new BackgroundGrid());
            }
        }
    }

    render(ctx) {
        let posCenterX = window.innerWidth / 2;
        let posCenterY = window.innerHeight / 2;
        
        let startPosX = posCenterX - (this.numGridX * this.sizeX / 2);
        let posY = posCenterY - (this.numGridY * this.sizeY / 2);
        
        let posX = startPosX;
        for(let i = 0; i < this.numGridY; i++) {
            for(let j = 0; j < this.numGridX; j++) {
                let grid = this.grids[i][j];
                grid.setPos(posX, posY);
                grid.render(ctx);
                posX += this.sizeX;
            }
            posX = startPosX;
            posY += this.sizeY;
        }
    }
};