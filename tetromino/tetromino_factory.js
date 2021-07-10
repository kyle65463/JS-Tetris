import { TetrominoS } from "./tetromino_s.js";
import { TetrominoN } from "./tetromino_n.js";
import { TetrominoT } from "./tetromino_T.js";
import { TetrominoI } from "./tetromino_i.js";
import { TetrominoO } from "./tetromino_o.js";
import { TetrominoL } from "./tetromino_l.js";
import { TetrominoR } from "./tetromino_r.js";

export class TetrominoFactory {
    static tetrominos = [
        TetrominoS,
        TetrominoN,
        TetrominoL,
        TetrominoR,
        TetrominoT,
        TetrominoO,
        TetrominoI,
    ];

    static randomCreate() {
        return new TetrominoFactory.tetrominos[6]//Math.floor(Math.random() * TetrominoFactory.tetrominos.length)];
    }
}