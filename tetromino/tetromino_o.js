import { Tetromino } from "./tetromino.js";
import { Grid } from "../grid.js";

export class TetrominoO extends Tetromino{
    constructor() {
        super();
        let posPair = [[4, 0], [5, 0], [4, 1], [5, 1]]
        for (let i = 0; i < this.numGrids; i++) {
            let grid = new Grid();
            grid.fillStyle = 'yellow';
            [grid.idxX, grid.idxY]  = posPair[i];
            this.grids.push(grid);
        }
        this.axisGrid = this.grids[2];
    }
}