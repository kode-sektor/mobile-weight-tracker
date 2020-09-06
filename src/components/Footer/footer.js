import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';


import clock from '../../images/icons/clock.svg';
import gear from '../../images/icons/gear.svg';
import plusCircle from '../../images/icons/plus-circle.png';

const Footer = (props) => (

    <footer className="app-footer">

        <button id="preferences" className="preferences"
            onClick = {props.showPreferences}>
            <img src={gear} alt={gear}/>
        </button>
        <button className="add-entry">
            <img src={plusCircle} alt={plusCircle}/>
        </button>
        <button id="history" className="history"
            onClick = {props.showPreferences}>
            <img src={clock} alt={clock}/>
        </button>
        
    </footer>
)

export default Footer;

