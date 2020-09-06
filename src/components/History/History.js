import React from 'react';
import { Link } from 'react-router-dom';

// Parent file: header.js

import FontAwesome from 'react-fontawesome';

import styles from './History.module.css';

const HistoryList = (props) => {
    
	return (

        <section className={`${styles.historyList} ${props.history}`}>

            <ul>
                <li className="">
                    <span className="">
                        8/5/20
                    </span>
                    <span className="">
                        183.0Ib
                    </span>
                    <strong className="">
                        <span><FontAwesome name="caret-up" /> </span>
                        <span className="">2.0</span>Ib
                    </strong>
                    <span className={styles.amend_entry}>
                        <button id="edit">
                            <FontAwesome name="pen"/>
                        </button>
                        <button id="delete">
                            <FontAwesome name="trash-alt"/>
                        </button>
                    </span>
                </li>

            </ul>
                
        </section>
            
	)
}

export default HistoryList;