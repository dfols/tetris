import { PieceManager } from "./PieceManager";

export class PieceSquare {
    constructor(color) {
        this.column = 4;
        this.row = 19;
        this.color = color;

        //Pivot point is 1, 1 (-1, 1 in board coordinates)
        this.map = [
            [0,0,0,0],
            [0,1,1,0],
            [0,1,1,0],
            [0,0,0,0],
        ];
    }

    get bRow() {
        return this.row + 1;
    }

    get bCol() {
        return this.column - 1;
    }

    onRotateRequested(board) {
        return true;
    }

    canGoLeft(board) {
        if(this.column === 0)
            return false;

        return !PieceManager.checkForCollisions(board, this.map, this.bRow, this.bCol - 1);
    }

    canGoRight(board) {
        if(this.column === 8)
            return false;

        return !PieceManager.checkForCollisions(board, this.map, this.bRow, this.bCol + 1);
    }

    canDrop(board) {
        if(this.row === 1)
            return false;

        return !PieceManager.checkForCollisions(board, this.map, 
            this.bRow - 1, this.bCol);
    }

    canFit(board) {
        return !PieceManager.checkForCollisions(board, this.map, 
            this.bRow, this.bCol);
    }

    fillBlocks(board) {
        PieceManager.fillBoardWithMap(board, this.map, this.color,
            this.bRow, this.bCol);
    }

    fillBlocksOrigin(board) {
        PieceManager.fillBoardWithMap(board, this.map, this.color,
            1 + 1, 1 - 1);
    }
}