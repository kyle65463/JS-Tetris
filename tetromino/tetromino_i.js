import { Tetromino } from "./tetromino.js";
import { Grid } from "../grid.js";

export class TetrominoI extends Tetromino{
    constructor() {
        super();
        let posPair = [[3, 0], [4, 0], [5, 0], [6, 0]]
        for (let i = 0; i < this.numGrids; i++) {
            let grid = new Grid();
            grid.fillStyle = 'cyan';
            [grid.idxX, grid.idxY]  = posPair[i];
            this.grids.push(grid);
        }
        this.axisGrid = this.grids[2];
    }
}