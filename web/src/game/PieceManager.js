
export class PieceManager {

    static checkForCollisions(board, pieceMap, row, column) {
        for(let r = 0; r < 4; r ++) {
            for(let c = 0; c < 4; c ++) {
                if(pieceMap[r][c]) {
                    if(board[row - r][column + c]) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    static fillBoardWithMap(board, pieceMap, color, row, column) {
        for(let r = 0; r < 4; r ++) {
            for(let c = 0; c < 4; c ++) {
                if(pieceMap[r][c]) {
                    board[row - r][column + c] = color;
                }
            }
        }
    }
};
