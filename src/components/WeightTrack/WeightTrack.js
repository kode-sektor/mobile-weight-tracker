import React from 'react';

import styles from './WeightTrack.module.css';

const WeightTrack = (props) => {

    return (
        <section className={styles.weight_track}>

            <div className={styles.tab}>
                <h2 className={styles.heading}>Target</h2>
                <span className={styles.computed}>()</span>
            </div>
            <div className={styles.tab}>
                <h2 className={styles.heading}>Change (Month)</h2>
                <span className={styles.computed}>()</span>
            </div>
            <div className={styles.tab}>
                <h2 className={styles.heading}>Current</h2>
                <span className={styles.computed}>()</span>
            </div>
            <div className={styles.tab}>
                <h2 className={styles.heading}>Target Change</h2>
                <span className={styles.computed}>()</span>
            </div>
            <div className={styles.tab}>
                <h2 className={styles.heading}>Change (Week)</h2>
                <span className={styles.computed}>()</span>
            </div>
            <div className={styles.tab}>
                <h2 className={styles.heading}>Total Change</h2>
                <span className={styles.computed}>()</span>
            </div>

        </section>
    )

}

export default WeightTrack; 