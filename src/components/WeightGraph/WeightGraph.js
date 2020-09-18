import React from 'react';
import FontAwesome from 'react-fontawesome';

import styles from './WeightGraph.module.css';

const WeightGraph = (props) => {



    return (
        <section className={styles.no_data}>
           {props.entries.length === 0 ? "No Data" : "Data" } 
        </section>
    )

}

export default WeightGraph; 