import { Tetromino } from "./tetromino.js";
import { Grid } from "../grid.js";

export class TetrominoS extends Tetromino{
    constructor() {
        super();
        let posPair = [[3, 1], [4, 0], [4, 1], [5, 0]];
        for (let i = 0; i < this.numGrids; i++) {
            let grid = new Grid();
            grid.fillStyle = 'green';
            [grid.idxX, grid.idxY]  = posPair[i];
            this.grids.push(grid);
        }
        this.rotationOffsets = [[0, 0], [0, 0], [0, 0], [0, 0]];
        this.axisGrid = this.grids[2];
    }
}