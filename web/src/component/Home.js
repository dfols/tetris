import React from "react";
import style from "./Home.module.scss";


function Home() {
  return (
    <div>
      <div className="row">
          <div className="col"></div>
          <div className="col-6 text-center">
              <h1 id={style.titleText}>SQUARE DISTURB</h1>
          </div>
          <div className="col"></div>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col-6 text-center">
            <h2>Objective and Game Information</h2>
            <span>The objective is to score as many points as
              possible by clearing horizontal rows of blocks.
              To do this you can rotate, move, and drop the falling
              blocks inside the game. Rows are cleared when they are
              completely filled with blocks and have no empty spaces.
              If a block piece reaches the top of the game board
              the game is over.</span>
              <br/>
            <span>The top ten scores will be posted on
              the <a href="./highscores">High Scores</a> page for all to see!
              Try your best to join this list, but you first need to signup for an account.</span>
              <br/>
            <span>Don't forget to have fun!</span>
            </div>
          <div className="col"></div>
        </div>
      <div className="row">
        <div className="col"></div>
        <div className="col-8 text-center">
            <h2>Game Controls</h2>
            <span>Use the <b>Left Arrow</b> to move the block left</span>
            <br/>
            <span>Use the <b>Right Arrow</b> to move the block right</span>
            <br/>
            <span>Use the <b>Down Arrow</b> to increase the speed of the block fall</span>
            <br/>
            <span>Use the <b>Letter R</b> to rotate the block left</span>
        </div>
        <div className="col"></div>
        </div>
    </div>
  );
}

export default Home;
