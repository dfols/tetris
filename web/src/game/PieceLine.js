import { PieceManager } from "./PieceManager";

export class PieceLine {
    constructor(color) {
        this.column = 4;
        this.row = 19;
        this.vertical = false;
        this.color = color;

        //Pivot point is 2, 2 (-2, 2 in board coordinates)
        this.horizontalMap = [
            [0,0,0,0],
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0],
        ];
        this.verticalMap = [
            [0,0,1,0],
            [0,0,1,0],
            [0,0,1,0],
            [0,0,1,0],
        ];
        this.swingMap = [
            [0,1,1,0],
            [1,1,1,0],
            [1,1,1,1],
            [0,0,1,0],
        ];
    }

    //These translate the offsets from map coordinates to board coordinates
    get bRow() {
        return this.row + 2;
    }

    get bCol() {
        return this.column - 2;
    }

    //Called when the user presses R
    //Return true and do the rotation internally if possible
    onRotateRequested(board) {
        if(this.vertical) {
            if(this.column < 2 || this.column === 9) {
                return false;
            }
        }
        else {
            if(this.row < 1) {
                return false;
            }
        }

        if(PieceManager.checkForCollisions(board, this.swingMap, this.bRow, this.bCol)) {
            return false;
        }
        else {
            this.vertical = !this.vertical;
            return true;
        }
    }

    //Called when the user wants to go left
    //Return true if this is possible
    canGoLeft(board) {
        if(this.vertical) {
            if(this.column === 0) {
                return false;
            }
        }
        else {
            if(this.column === 2) {
                return false;
            }
        }

        return !PieceManager.checkForCollisions(board, this.vertical ? this.verticalMap : this.horizontalMap, 
            this.bRow, this.bCol - 1);
    }

    //Called when the user wants to go right
    //Return true if this is possible
    canGoRight(board) {
        if(this.vertical) {
            if(this.column === 9) {
                return false;
            }
        }
        else {
            if(this.column === 8) {
                return false;
            }
        }

        return !PieceManager.checkForCollisions(board, this.vertical ? this.verticalMap : this.horizontalMap, 
            this.bRow, this.bCol + 1);
    }

    //Called when the piece wants to drop down a row (from gravity or sped up by the user)
    //Return true if this is possible
    canDrop(board) {
        if(this.vertical && this.row === 1) {
            return false;
        }

        if(!this.vertical && this.row === 0) {
            return false;
        }

        return !PieceManager.checkForCollisions(board, this.vertical ? this.verticalMap : this.horizontalMap, 
            this.bRow - 1, this.bCol);
    }

    //Called when the piece is first dropped on the board
    //Return true if the piece is not overlapping squares (false = the game is over)
    canFit(board) {
        return !PieceManager.checkForCollisions(board, this.horizontalMap, 
            this.bRow, this.bCol);
    }

    //Called when the game manager wants to transfer the piece to a static board (for drawing or it became fixed)
    fillBlocks(board) {
        PieceManager.fillBoardWithMap(board, this.vertical ? this.verticalMap : this.horizontalMap, this.color,
            this.bRow, this.bCol);
    }

    //Called when the piece is coming up next and needs to draw itself at the origin for the next piece display
    fillBlocksOrigin(board) {
        PieceManager.fillBoardWithMap(board, this.horizontalMap, this.color,
            0 + 2, 2 - 2);
    }
}