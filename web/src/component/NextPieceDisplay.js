import React, { useState, useEffect, useRef } from 'react';
import loadColorBlocks from './CanvasLoader';

export default function NextPieceDisplay(props) {
    const {
        onReadyStateChange,
        gameLogic,
    } = props;

    const boardRef = useRef(null);
    const colorBlocks = useRef(null);

    const displayWidth = parseInt(35 * 4.5);
    const displayHeight = parseInt(35 * 2.5);

    const xOffset = parseInt((displayWidth - (35*4)) / 2);
    const yOffset = displayHeight - parseInt((displayHeight - (35*2)) / 2);

    useEffect(() => {
        loadColorBlocks(boardRef.current.getContext("2d")).then(
            (newColorBlocks) => {
                console.log(`Next image loaded:`);
                colorBlocks.current = newColorBlocks;
                onReadyStateChange?.(true);
            }
        ).catch((err) => {
            console.log("Next image loading failed");
        });

        gameLogic.nextPieceCallback = function (board) {
            let ctx = boardRef.current.getContext("2d");
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, displayWidth, displayHeight);

            for(let i = 0; i < 4; i ++) {
                for(let j = 0; j < 4; j ++) {
                    if(board[i][j]) {
                        ctx.putImageData(colorBlocks.current[board[i][j] - 1], 
                            xOffset + j * 35, yOffset - ((i+1)*35));
                    }
                }
            }
        };

        console.log("Next mounted");

        //Run when dismounted
        return () => {
            gameLogic.nextPieceCallback = null;
            onReadyStateChange?.(false);
            console.log(`Next dismounted:`);
        };
    });

    return (
        <canvas ref={boardRef} width={displayWidth} height={displayHeight}></canvas>
    );
}