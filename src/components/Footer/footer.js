import React, {Component} from 'react';

import clock from '../../images/icons/clock.svg';
import gear from '../../images/icons/gear.svg';
import plusCircle from '../../images/icons/plus-circle.png';

const Footer = (props) => (

    <footer className="app-footer">

        <button id="preferences" className="preferences-btn"
            onClick = {props.showComponent}>
            <img src={gear} alt={gear}/>
        </button>
        <button id="addEntry" className="add-entry-btn"
            onClick = {props.showComponent}>
            <img src={plusCircle} alt={plusCircle}/>
        </button>
        <button id="history" className="history-btn"
            onClick = {props.showComponent}>
            <img src={clock} alt={clock}/>
        </button>
        
    </footer>
)

export default Footer;

