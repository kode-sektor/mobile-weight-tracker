import React from 'react';

// Parent file: home.js

import styles from './RateUs.module.css';


const RateUs = (props) => {

	return (
        <section className={`${styles.rateUs} ${props.showRateUs} module`}>
            
            <h2 className="title">{props.rated}</h2>

            <ul className={styles.rateUsList}>
                <li>
                    <button className='rateBtn' id="rate-excellent"
                        onClick={props.rateApp}>
                        <span className={styles.smiley} role="img" aria-label="love the app">😍</span>
                    </button>
                </li>
                <li>
                    <button className='rateBtn' id="rate-okay"
                        onClick={props.rateApp}>
                        <span className={styles.smiley} role="img" aria-label="okay with app">🤔</span>
                    </button>
                </li>
                <li>
                    <button className='rateBtn' id="rate-poor"
                        onClick={props.rateApp}>
                        <span className={styles.smiley} role="img" aria-label="will not use again">😡</span>
                    </button>
                </li>
            </ul>
            
            <button className="return secondary"
                onClick={props.showComponent}>
                Return
            </button>
        </section>
	)
}

export default RateUs;