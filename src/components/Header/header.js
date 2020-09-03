import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';

import './header.module.css';

import signal from '../../images/icons/wifi.svg';

class Header extends Component {

    render () {

        return (

            <header className="app-header">
                
                <section className="indicators">
                    <span className="time">
                        3:42PM
                    </span>
                    <div className="primary-indicators">
                        <span className="signal">
                            <FontAwesome name="signal"/>
                        </span>
                        <span className="wi-fi">
                            <FontAwesome name="wifi"/>
                        </span>
                        <span className="battery">
                            <FontAwesome name="battery-three-quarters"/>
                        </span>
                    </div>
                </section>
    
                <button className="nav-control">
                    <FontAwesome name="bars"/>
                </button>

                <h1>Weight Over</h1>
                
            </header>
        )
    }

}

export default Header; 