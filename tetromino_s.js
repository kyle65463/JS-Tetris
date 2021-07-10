import { Tetromino } from "./tetromino.js";
import { Grid } from "./grid.js";

export class TetrominoS extends Tetromino{
    constructor() {
        super();
        let posPair = [[0, 1], [1, 0], [1, 1], [2, 0]]
        for (let i = 0; i < this.numGrids; i++) {
            let grid = new Grid();
            grid.fillStyle = 'green';
            [grid.idxX, grid.idxY]  = posPair[i];
            this.grids.push(grid);
        }
        this.axisGrid = this.grids[2];
    }
}