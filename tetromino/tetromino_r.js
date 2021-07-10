import { Tetromino } from "./tetromino.js";
import { Grid } from "../grid.js";

export class TetrominoR extends Tetromino{
    constructor() {
        super();
        let posPair = [[5, 1], [4, 1], [3, 0], [3, 1]]
        for (let i = 0; i < this.numGrids; i++) {
            let grid = new Grid();
            grid.fillStyle = 'blue';
            [grid.idxX, grid.idxY]  = posPair[i];
            this.grids.push(grid);
        }
        this.axisGrid = this.grids[2];
    }
}