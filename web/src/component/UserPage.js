import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from "../api";

function UserPage(props) {
    const [scores, setScores] = useState();
    const nav = useNavigate();

    useEffect(() => {
        if(props.userName) {
            API.getUserScores(props.userName).then((user) => {
                setScores(user?.scores?.reverse());
            }).catch((err) => {
                alert(err.toString());
            });
        }
    },
    [props.userName]
    );

    function onLogout() {
        props.onLogout?.();
        nav("/");
    }

    const scoreRows = scores?.map((score, index) => 
        <tr key={index.toString()}>
            <td>{score.date}</td>
            <td>{score.score.toString()}</td>
        </tr>
    );

    return (
        <div className="text-center">
            <button onClick={() => onLogout()}>Logout</button>
            <h1>Latest Scores</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scoreRows}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserPage;