import React from 'react';

// Parent file: header.js

import FontAwesome from 'react-fontawesome';

import styles from './History.module.css';

const HistoryList = (props) => {

    const entryList = () => {

        let date = '', day = '', month = '', year = '', formattedDate = '', weight = '';

        const entryHTML = props.entries.map((item) => {
            console.log(item);
            date = item.date;
            date = new Date(date);
            day = date.getDate();
            month = date.getMonth();
            year = (date.getFullYear()).toString().substr(-2);

            formattedDate = day + '/' + month + '/' + year;
            weight = item.weight[`${props.kgOrIb}`] + props.kgOrIb
            

            return (
                <li key={item} className="">
                    <span className="">
                        {formattedDate}
                    </span>
                    <span className="">
                        {weight}
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
            )
        }) 

        return entryHTML;
    }
    
	return (

        <section className={`${styles.historyList} ${props.history} module out`}>

            <ul>{entryList()}</ul>
                
        </section>
            
	)
}

export default HistoryList;