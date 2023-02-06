import React, { useEffect, useState } from 'react';
import style from "./HighScoresPage.module.scss";
import API from "../api";

function HighScorePage() {
    const [highScores, setHighScores] = useState();

    useEffect(() => {
        API.getTop10().then((newScores) => {
            setHighScores(newScores);
        }).catch((err) => {
            
        });
    },
    []
    );

    const highScoreRows = highScores?.highscores?.map((score, index) => 
        <tr key={index.toString()}>
            <td>{index + 1}</td>
            <td>{score.displayName}</td>
            <td>{score.score.toString()}</td>
        </tr>
    );

    return (
        <div className="text-center">
            <h1>High Scores</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Place</th>
                            <th>User</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {highScoreRows}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default HighScorePage;