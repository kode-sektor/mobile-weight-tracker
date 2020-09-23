import React from 'react';

// Parent file: home.js

import styles from './RateUs.module.css';


const RateUs = (props) => {

    console.log(props)

	return (
        <section className={`${styles.rateUs} ${props.showRateUs} module`}>
            
            <h2 class="title">{props.rated}</h2>

            <ul className={styles.rateUsList}>
                <li>
                    <button className='rateBtn' id="rate-excellent"
                        onClick={props.rateApp}>
                        <span className={styles.smiley}>😍</span>
                    </button>
                </li>
                <li>
                    <button className='rateBtn' id="rate-okay"
                        onClick={props.rateApp}>
                        <span className={styles.smiley}>🤔</span>
                    </button>
                </li>
                <li>
                    <button className='rateBtn' id="rate-poor"
                        onClick={props.rateApp}>
                        <span className={styles.smiley}>😡</span>
                    </button>
                </li>
            </ul>
        </section>
	)
}

export default RateUs;