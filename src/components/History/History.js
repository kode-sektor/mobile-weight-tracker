import React from 'react';

// Parent file: header.js

import FontAwesome from 'react-fontawesome';

import styles from './History.module.css';

const HistoryList = (props) => {

    const entryList = () => {

        console.log(props.entries);

        let date = '', day = '', month = '', year = '', deltaChange = 'caret-up',
            formattedDate = '', weight = '', weightDiff = 0;

        const entryHTML = props.entries.map((item, index) => {
            console.log(item);
            date = item.date;
            date = new Date(date);
            day = date.getDate();
            month = date.getMonth();
            year = (date.getFullYear()).toString().substr(-2);

            formattedDate = day + '/' + month + '/' + year;
            weight = item.weight[`${props.kgOrIb}`];

            // Calculate difference in weight between subsequent records
            if (index < props.entries.length - 1) {    // Avoid throwing error for last entry
                weightDiff = Number(props.entries[index].weight[`${props.kgOrIb}`]) - Number(props.entries[index + 1].weight[`${props.kgOrIb}`]);
                weightDiff = weightDiff.toFixed(1);
                
                deltaChange = (weightDiff.indexOf('-') ? 'caret-up' : 'caret-down');

                weightDiff = weightDiff.replace('-', '') + props.kgOrIb;  // 2.0kg
            } else {
                weightDiff = '';    // Override with empty value for last record
            }
            // console.log(props.entries[index].weight[`${props.kgOrIb}`], props.entries[index + 1].weight[`${props.kgOrIb}`])

            return (
                <li key={index} className="">
                    <span className="">
                        {formattedDate}
                    </span>
                    <span className="">
                        {weight + props.kgOrIb}
                    </span>
                    <strong className="">
                        {(weightDiff === '') ? '' : <span><FontAwesome name={deltaChange} /></span> }
                        <span className="">{weightDiff}</span>
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