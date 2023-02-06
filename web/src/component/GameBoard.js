import React, { useEffect, useRef } from 'react';
import loadColorBlocks from './CanvasLoader';

export default function Board(props) {
    const {
        onReadyStateChange,
        gameLogic,
    } = props;

    const boardRef = useRef(null);
    const colorBlocks = useRef(null);

    useEffect(() => {
        loadColorBlocks(boardRef.current.getContext("2d")).then(
            (newColorBlocks) => {
                console.log(`Board image loaded`);
                colorBlocks.current = newColorBlocks;
                onReadyStateChange?.(true);
            }
        ).catch((err) => {
            console.log("Board image loading failed");
        });

        gameLogic.redrawCallback = function (board) {
            let ctx = boardRef.current.getContext("2d");
            ctx.fillStyle = "dimgray";
            ctx.fillRect(0, 0, 350, 700);

            for(let i = 0; i < 20; i ++) {
                for(let j = 0; j < 10; j ++) {
                    if(board[i][j]) {
                        ctx.putImageData(colorBlocks.current[board[i][j] - 1], j * 35, 665 - (i*35));
                    }
                }
            }
        };

        console.log("Board mounted");

        //Run when dismounted
        return () => {
            gameLogic.redrawCallback = null;
            onReadyStateChange?.(false);
            console.log("Board dismounted");
        };
    });

    return (
        <canvas ref={boardRef}  width="350" height="700"></canvas>
    );
}