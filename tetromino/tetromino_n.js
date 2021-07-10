import { Tetromino } from "./tetromino.js";
import { Grid } from "../grid.js";

export class TetrominoN extends Tetromino{
    constructor() {
        super();
        let posPair = [[3, 0], [4, 0], [4, 1], [5, 1]]
        for (let i = 0; i < this.numGrids; i++) {
            let grid = new Grid();
            grid.fillStyle = 'red';
            [grid.idxX, grid.idxY]  = posPair[i];
            this.grids.push(grid);
        }
        this.axisGrid = this.grids[2];
    }
}