import { PieceManager } from "./PieceManager";

export class PieceS {
    constructor(color) {
        this.column = 4;
        this.row = 19;
        this.angle = 0;
        this.color = color;

        //Pivot point is 1, 1 (-1, 1 in board coordinates)
        this.angleMaps = [[
            [0,0,0,0],
            [0,1,1,0],
            [1,1,0,0],
            [0,0,0,0],
        ],[
            [0,1,0,0],
            [0,1,1,0],
            [0,0,1,0],
            [0,0,0,0],
        ],
        ];
    }

    get bRow() {
        return this.row + 1;
    }

    get bCol() {
        return this.column - 1;
    }

    onRotateRequested(board) {
        switch (this.angle) {
            case 1:
                if(this.column === 0)
                    return false;

                break;
        
            default:
                break;
        }

        let newAngle = (this.angle + 1) % 2;

        if(PieceManager.checkForCollisions(board, this.angleMaps[newAngle], this.bRow, this.bCol)) {
            return false;
        }
        else {
            this.angle = newAngle;
            return true;
        }
    }

    canGoLeft(board) {
        switch (this.angle) {
            case 0:
                if(this.column === 1)
                    return false;
                
                break;

            case 1:
                if(this.column === 0)
                    return false;
                
                break;
        
            default:
                break;
        }

        return !PieceManager.checkForCollisions(board, this.angleMaps[this.angle], this.bRow, this.bCol - 1);
    }

    canGoRight(board) {
        switch (this.angle) {
            case 0:
            case 1:
                if(this.column === 8)
                    return false;
                
                break;
        
            default:
                break;
        }

        return !PieceManager.checkForCollisions(board, this.angleMaps[this.angle], this.bRow, this.bCol + 1);
    }

    canDrop(board) {
        switch (this.angle) {
            case 0:
            case 1:
                if(this.row === 1)
                    return false;
                
                break;
        
            default:
                break;
        }

        return !PieceManager.checkForCollisions(board, this.angleMaps[this.angle], 
            this.bRow - 1, this.bCol);
    }

    canFit(board) {
        return !PieceManager.checkForCollisions(board, this.angleMaps[this.angle], 
            this.bRow, this.bCol);
    }

    fillBlocks(board) {
        PieceManager.fillBoardWithMap(board, this.angleMaps[this.angle], this.color,
            this.bRow, this.bCol);
    }

    fillBlocksOrigin(board) {
        PieceManager.fillBoardWithMap(board, this.angleMaps[this.angle], this.color,
            1 + 1, 1 - 1);
    }
}