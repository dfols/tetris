import React, { useState, useEffect, useRef } from "react";
import Board from "./GameBoard";
import NumberDisplay from "./NumberDisplay";
import style from "./GamePage.module.scss";
import Game, {keyEvents} from "../game/game";
import NextPieceDisplay from "./NextPieceDisplay";
import API from "../api";

function InfoSection (props) {
    const [score, setScore] = useState("     0");
    const [difficulty, setDifficulty] = useState("1");
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        function onScoreChange(newScore) {
            setScore(newScore.toString().padStart(6, " "));
        };
    
        function onDifficultyChange(newDifficulty) {
            setDifficulty(newDifficulty.toString());
        };
    
        function onGameStateChange(started) {
            setGameOver(!started);
        };

        props.gameLogic.scoreChangedCallback = onScoreChange;
        props.gameLogic.difficultyChangedCallback = onDifficultyChange;
        props.gameLogic.gameStateChangeCallback = onGameStateChange;

        return () => {
            props.gameLogic.scoreChangedCallback = null;
            props.gameLogic.difficultyChangedCallback = null;
            props.gameLogic.gameStateChangeCallback = null;
        };
    });

    return (
        <div>
            <span>Score</span> <br/>
            <NumberDisplay number={score}/> <br/>
            <span>Difficulty</span> <br/>
            <NumberDisplay number={difficulty}/> <br/>
            <span id={style.gameOverContainer}>{gameOver ? "GAME OVER" : ""}</span>
        </div>
    );
}

function GamePage (props) {
    const gameLogic = useRef(new Game());
    const boardReady = useRef(false);
    const nextDispReady = useRef(0);

    function onKeyDown(event) {
        event.preventDefault();

        switch (event.code) {
            case "ArrowLeft":
                gameLogic.current.onInput(keyEvents.LEFT);
                break;

            case "ArrowRight":
                gameLogic.current.onInput(keyEvents.RIGHT);
                break;

            case "ArrowDown":
                gameLogic.current.onInput(keyEvents.DOWN);
                break;

            case "KeyR":
                gameLogic.current.onInput(keyEvents.ROTATE);
                break;
        
            default:
                break;
        }
    }

    function onKeyUp(event) {
        event.preventDefault();

        switch (event.code) {
            case "ArrowLeft":
                gameLogic.current.onInput(keyEvents.LEFT_UP);
                break;

            case "ArrowRight":
                gameLogic.current.onInput(keyEvents.RIGHT_UP);
                break;

            case "ArrowDown":
                gameLogic.current.onInput(keyEvents.DOWN_UP);
                break;
        
            default:
                break;
        }
    }

    function registerKeys() {
        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);
    }

    function unregisterKeys() {
        document.removeEventListener('keydown', onKeyDown, false);
        document.removeEventListener('keyup', onKeyUp, false);
    }

    function startGame() {
        if(!gameLogic.current.gameRunning) {
            gameLogic.current.startGame();
            gameLogic.current.onGameCompleteCallback = onGameComplete;
            console.log("game started");
        }
    }

    function onGameComplete(score) {
        if(props.userName && score > 0) {
            API.addScore(props.userName, score);
        }
    }

    function onBoardReadyStateChange(ready) {
        boardReady.current = ready;
        if(boardReady.current && nextDispReady.current) {
            startGame();
        }
    }

    function onNextReadyStateChange(ready) {
        nextDispReady.current = ready;
        if(boardReady.current && nextDispReady.current) {
            startGame();
        }
    }

    function onGameRestart(params) {
        gameLogic.current.startGame();
    }

    useEffect(() => {
        registerKeys();

        return () => {
            unregisterKeys();
        };
    });

	return (
        <div id={style.boardContainer} className="container">
            <div className="row">
                <div className="col">
                </div>
                <div className="col text-center">
                    <Board gameLogic={gameLogic.current} onReadyStateChange={onBoardReadyStateChange}/>
                </div>
                <div className="col">
                    <InfoSection gameLogic={gameLogic.current}/><br/>
                    <span>Next Piece</span><br/>
                    <NextPieceDisplay gameLogic={gameLogic.current} onReadyStateChange={onNextReadyStateChange}/><br/>
                    <button id={style.restartButton} onClick={onGameRestart}>Restart</button>
                </div>
            </div>
        </div>
    );
}
export default GamePage;