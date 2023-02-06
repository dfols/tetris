import React from 'react';
import style from './About.module.scss';

function About () {
	return ( 
        <div>
            <h1 className={style.headerColor}>About page</h1>
            <h2 style={{color:" blue"}} >Content</h2>
        </div>
    );
}
export default About;
