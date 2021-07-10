import { Tetromino } from "./tetromino.js";
import { Grid } from "../grid.js";

export class TetrominoT extends Tetromino{
    constructor() {
        super();
        let posPair = [[3, 1], [4, 0], [4, 1], [5, 1]]
        for (let i = 0; i < this.numGrids; i++) {
            let grid = new Grid();
            grid.fillStyle = 'purple';
            [grid.idxX, grid.idxY]  = posPair[i];
            this.grids.push(grid);
        }
        this.rotationOffsets = [[0, 0], [0, 0], [0, 0], [0, 0]];
        this.axisGrid = this.grids[2];
    }
}