import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';

import SideNav from '../SideNav/SideNav';
import Preferences from '../Preferences/Preferences';

import styles from './header.module.css';

const Header = (props) => {

    return (

        <header className="app-header">

            <SideNav {...props}/>

            <Preferences {...props}/>

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
                <FontAwesome name={(props.showNav) ? "arrow-left" : "bars" }
                    onClick = {(props.showNav) ? props.onHideNav : props.onOpenNav }/>
            </button>

            <h1 className={styles.app_title}>{props.title}</h1>

        </header>
    )

}

export default Header; 