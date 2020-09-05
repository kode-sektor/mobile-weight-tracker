import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';

import clock from '../../images/icons/clock.svg';
import gear from '../../images/icons/gear.svg';
import plusCircle from '../../images/icons/plus-circle.png';

const Footer = () => (

    <footer className="app-footer">

        <button className="preferences">
            <img src={gear} alt={gear}/>
        </button>
        <button className="add-entry">
            <img src={plusCircle} alt={plusCircle}/>
        </button>
        <button className="history">
            <img src={clock} alt={clock}/>
        </button>
        
    </footer>
)

export default Footer;

