import React, { useState, useEffect, useRef } from 'react';
import style from "./NumberDisplay.module.scss";

export default function NumberDisplay(props) {

    return (
        <div>
            <pre className={style.number}>
                {props.number}
            </pre>
        </div>
    );
}