import React from 'react';

// Parent file: header.js

import FontAwesome from 'react-fontawesome';

import styles from './History.module.css';

const HistoryList = (props) => {

    const entryList = () => {

        let date = '', day = '', month = '', year = '', deltaChange = 'caret-up',
            formattedDate = '', weight = '', weightDiff = 0, id = '';

        const entryHTML = props.paginate.entries.map((item, index) => {

            id = item.id;
            date = item.date;
            date = new Date(date);
            day = date.getDate();
            month = date.getMonth();
            year = (date.getFullYear()).toString().substr(-2);

            formattedDate = day + '/' + month + '/' + year;
            weight = item.weight[`${props.kgOrIb}`];

            // Calculate difference in weight between subsequent records
            if (index < props.paginate.entries.length - 1) {    // Avoid throwing error for last entry
                weightDiff = Number(props.paginate.entries[index].weight[`${props.kgOrIb}`]) - Number(props.paginate.entries[index + 1].weight[`${props.kgOrIb}`]);
                weightDiff = weightDiff.toFixed(1);
                
                deltaChange = (weightDiff.indexOf('-') ? 'caret-up' : 'caret-down');

                weightDiff = weightDiff.replace('-', '') + props.kgOrIb;  // -2.0kg to 2.0kg
            } else {
                weightDiff = '';    // Override with empty value for last record
            }

            return (
                <li key={index} className={styles.history_row}>
                    <span className={styles.history_date}>
                        {formattedDate}
                    </span>
                    <span className={styles.history_weight}>
                        {weight + props.kgOrIb}
                    </span>
                    <strong className={styles.history_weight_diff}>
                        {(weightDiff === '') ? '' : <span><FontAwesome name={deltaChange} /> </span> }  {/*Last record*/}
                        <span className="">{weightDiff}</span>
                    </strong>
                    <span className={styles.amend_entry}>
                        <button id={`edit${id}`}
                            onClick={props.showComponent}>
                            <FontAwesome name="pen"/>
                        </button>
                        <button id={`del${id}`}
                            onClick={props.showComponent}>
                            <FontAwesome name="trash-alt"/>
                        </button>
                    </span>
                </li>
            )
        }) 

        return entryHTML;
    }

    console.log(props)

	return (

        <section className={`${styles.historyList} ${props.history} module out`}>
            <ul>{entryList()}</ul>
            <section className={`${styles.navPane} buttonset`}>
                <button type="button" id="paginate-prev" className={`${styles.navbtn}`} disabled={props.paginate.state}
                    onClick = {props.showComponent}>
                    PREV
                </button>
                <button type="button" id="paginate-next" className={`${styles.navbtn}`} disabled={props.paginate.state}
                    onClick = {props.showComponent}>
                    NEXT
                </button>
            </section>
        </section>
            
	)
}

export default HistoryList;