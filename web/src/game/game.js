import { PieceLine } from "./PieceLine";
import { PieceTriangle } from "./PieceTriangle";
import { PieceL } from "./PieceL";
import { PieceJ } from "./PieceJ";
import { PieceS } from "./PieceS";
import { PieceZ } from "./PieceZ";
import { PieceSquare } from "./PieceSquare";

export const keyEvents = {
    LEFT: 0,
    LEFT_UP: 1,
    RIGHT: 2,
    RIGHT_UP: 3,
    DOWN: 4,
    DOWN_UP: 5,
    ROTATE: 6,
};

export default class Game {

    constructor() {
        this.redrawCallback = null;
        this.scoreChangedCallback = null;
        this.difficultyChangedCallback = null;
        this.gameStateChangeCallback = null;
        this.nextPieceCallback = null;
        this.onGameCompleteCallback = null;

        this.tickTimeoutID = 0;
        this.movementTimeoutID = 0;
        this.gameRunning = false;

        this.rowsPerDifficultyLevel = 10;
        this.maxDifficulty = 8;
        this.maxColors = 8;
        this.difficulty = 1;
        this.rowsClearedAtLevel = 0;
        this.score = 0;
        this.gravityFactor = -0.0875;

        this.board = [];
        this.piece = null;
        this.nextPiece = null;

        this.leftHeld = false;
        this.rightHeld = false;
        this.downHeld = false;
    }

    getScore(rows) {
        return 50 * (2 * this.difficulty) * (2 * rows);
    }

    setScore(score) {
        this.score = score;
        this.scoreChangedCallback?.(this.score);
    }

    setDifficulty(difficulty) {
        this.difficulty = difficulty;
        this.difficultyChangedCallback?.(this.difficulty);
    }

    checkCompleteRows() {
        let fullRowsCount = 0;

        for(let i = 0; i < 20; i ++) {
            let rowFull = true;

            for (let j = 0; j < 10; j ++) {
                if(!this.board[i][j]) {
                    rowFull = false;
                    break;
                }
            }

            if(rowFull === true) {
                fullRowsCount ++;

                for(let r = i; r < 19; r ++) {
                    for(let c = 0; c < 10; c ++) {
                        this.board[r][c] = this.board[r + 1][c];
                    }
                }

                for(let c = 0; c < 10; c ++) {
                    this.board[19][c] = 0;
                }

                i --;
            }
        }

        return fullRowsCount;
    }

    getDropHoldTime() {
        let scale = 1;

        if(this.downHeld) {
            scale = 8;
        }

        return (this.gravityFactor * (this.difficulty - 1) + 
            Math.abs(this.gravityFactor * this.maxDifficulty)) / scale;
    }

    getRandomPiece() {
        let newColor = Math.floor(Math.random() * this.maxColors) + 1;

        switch (Math.floor(Math.random() * 7)) {
            case 0:
                return new PieceLine(newColor);
            case 1:
                return new PieceSquare(newColor);
            case 2:
                return new PieceJ(newColor);
            case 3:
                return new PieceL(newColor);
            case 4:
                return new PieceS(newColor);
            case 5:
                return new PieceTriangle(newColor);
            case 6:
                return new PieceZ(newColor);
        
            default:
                throw new Error();
        }   
    }

    dropNewPiece() {
        if(!this.nextPiece) {
            this.piece = this.getRandomPiece();
            this.nextPiece = this.getRandomPiece();
        }
        else {
            this.piece = this.nextPiece;
            this.nextPiece = this.getRandomPiece();
        }

        if(this.nextPieceCallback) {
            let tempBoard = [];

            for(let i = 0; i < 23; i ++) {
                tempBoard[i] = new Array(10);

                for(let j = 0; j < 10; j ++) {
                    tempBoard[i][j] = 0;
                }
            }

            this.nextPiece.fillBlocksOrigin(tempBoard);
            this.nextPieceCallback(tempBoard);
        }
    }

    invalidateBoard() {
        if(this.redrawCallback) {
            let tempBoard = [];

            for(let i = 0; i < 23; i ++) {
                tempBoard[i] = new Array(10);

                for(let j = 0; j < 10; j ++) {
                    tempBoard[i][j] = this.board[i][j];
                }
            }

            this.piece?.fillBlocks(tempBoard);
            this.redrawCallback(tempBoard);
        }
    }

    startMoveTick() {
        if(this.movementTimeoutID === 0) {
            this.onMoveTick();
        }
    }

    stopMoveTick() {
        clearTimeout(this.movementTimeoutID);
        this.movementTimeoutID = 0;
    }

    onMoveTick() {
        if(!this.leftHeld && !this.rightHeld) {
            this.movementTimeoutID = 0;
            return;
        }

        if(this.leftHeld && this.rightHeld) {
            this.movementTimeoutID = setTimeout(this.onMoveTick.bind(this), 100);
            return;
        }

        if(this.leftHeld) {
            if(this.piece.canGoLeft(this.board)) {
                this.piece.column --;
                this.invalidateBoard();
            }
        }

        if(this.rightHeld) {
            if(this.piece.canGoRight(this.board)) {
                this.piece.column ++;
                this.invalidateBoard();
            }
        }

        this.movementTimeoutID = setTimeout(this.onMoveTick.bind(this), 100);
        return;
    }

    scheduleTick() {
        this.tickTimeoutID = setTimeout(this.onTick.bind(this), this.getDropHoldTime()*1000);
    }

    cancelTick() {
        clearTimeout(this.tickTimeoutID);
        this.tickTimeoutID = 0;
    }

    onTick() {
        if(this.piece.canDrop(this.board)) {
            this.piece.row --;
            this.invalidateBoard();
            this.scheduleTick();
        }
        else {
            this.piece.fillBlocks(this.board);
            let rows = this.checkCompleteRows();

            if(rows > 0) {
                this.setScore(this.score + this.getScore(rows));
                
                this.rowsClearedAtLevel += rows;

                if(this.rowsClearedAtLevel >= this.rowsPerDifficultyLevel) {
                    if(this.difficulty < this.maxDifficulty) {
                        this.setDifficulty(this.difficulty + 1);
                        this.rowsClearedAtLevel = 0;
                    }
                }
            }

            this.dropNewPiece();
            
            if(this.piece.canFit(this.board)) {
                this.invalidateBoard();
                this.scheduleTick();
            }
            else {
                this.invalidateBoard();
                this.stopGame();
                this.gameStateChangeCallback?.(false);
                this.onGameCompleteCallback?.(this.score);
            }
        }
    }

    onInput(keyEvent) {
        if(!this.gameRunning) {
            return;
        }

        switch (keyEvent) {
            case keyEvents.LEFT:
                if(this.leftHeld === false &&
                    this.rightHeld === false) {
                    this.leftHeld = true;
                    this.startMoveTick();
                }

                break;

            case keyEvents.LEFT_UP:
                this.leftHeld = false;
                this.stopMoveTick();
                break;

            case keyEvents.RIGHT:
                if(this.rightHeld === false &&
                    this.leftHeld === false) {
                    this.rightHeld = true;
                    this.startMoveTick();
                }

                break;

            case keyEvents.RIGHT_UP:
                this.rightHeld = false;
                this.stopMoveTick();
                break;

            case keyEvents.DOWN:
                if(!this.downHeld) {
                    this.downHeld = true;
                    this.cancelTick();
                    this.onTick();
                }

                break;

            case keyEvents.DOWN_UP:
                this.downHeld = false;
                break;

            case keyEvents.ROTATE:
                const redraw = this.piece.onRotateRequested(this.board);
                if(redraw) {
                    this.invalidateBoard();
                }

                break;

            default:
                break;
        }
    }

    resetGame() {
        for(let i = 0; i < 23; i ++) {
            this.board[i] = [];

            for(let j = 0; j < 10; j ++) {
                this.board[i][j] = 0;
            }
        }

        this.leftHeld = false;
        this.rightHeld = false;
        this.downHeld = false;

        this.setScore(0);
        this.setDifficulty(1);

        this.piece = null;
        this.gameRunning = true;
        this.gameStateChangeCallback?.(true);
    }

    stopGame() {
        this.stopMoveTick();
        this.cancelTick();
        this.gameRunning = false;
    }

    startGame() {
        this.stopGame();
        this.resetGame();
        this.dropNewPiece();
        this.invalidateBoard();
        this.scheduleTick();
    }
}