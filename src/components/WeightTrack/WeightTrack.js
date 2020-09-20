import React, {Component} from 'react';

import styles from './WeightTrack.module.css';
import FontAwesome from 'react-fontawesome';

// DB
import {firebaseTarget, firebaseWeight, firebaseLoop} from '../../firebase';

class WeightTrack extends Component {

    state = {
        entries : [],
        target : '',
        weight : '',
        kgOrIb : 'kg'
    }
      
    componentWillMount = () => {
        
        firebaseTarget.once('value').then(snapshot => {
            let targetSnapshot = snapshot;
            let kgOrIb = snapshot.val().kgOrIb;

            firebaseWeight.once('value').then(snapshot => {
                let data = firebaseLoop(snapshot);
                let currentWeight = data[0].weight[`${kgOrIb}`];

                this.setState({
                    kgOrIb, // 'kg' or 'ib'
                    target : Number(targetSnapshot.val().weight[`${kgOrIb}`]),   // Target (180)
                    entries : data,
                    weight : Number(currentWeight)
                });
            })
        })
    }

    computeData = (mode) => {

        switch (mode) {

            case ('target') :   // User's set target weight
            
                if (this.state.entries.length > 0) {

                    let kgOrIb = this.state.kgOrIb;
                    return (
                        <>{this.props.target.weight[`${kgOrIb}`]} {kgOrIb}</>
                    )
                }
                
            break;

            case ('month') :    // Maximum in a month - Minimum in a month

                /* entries
                {
                    0: {date: 1600497040971, weight: {…}, id: "-MH_2l1XXgC5n1fkzin8"}
                    1: {date: 1600211902000, weight: {…}, id: "-MHcfWcSLIVO-hFSCXUl"}
                    2: {date: 1600039455000, weight: {…}, id: "-MHcflgEEP5n0E7C833q"}
                }
                */
                let entries = this.state.entries;

                if (entries.length > 0) {
                    
                    const weightData = [];
                    let kgOrIb = this.state.kgOrIb;

                    // Get current month
                    let month = new Date().getMonth();

                    for (let i=0; i < entries.length; i++) {
                        if (new Date(entries[i].date).getMonth() === month) {  // Filter only for current month
                            // alert (new Date(item.date).getMonth());
                            weightData.push(Number(entries[i].weight[`${kgOrIb}`]));
                        }
                    }
                    
                    let maxWeight = (Math.max(...weightData));
                    let minWeight = (Math.min(...weightData));

                    let result =  (maxWeight - minWeight).toFixed(1);

                    let maxWeightOrder = (weightData.indexOf(maxWeight));
                    let minWeightOrder = (weightData.indexOf(minWeight));

                    // If maximum weight is the most recent, insert caret-up change
                    let deltaChange = (maxWeightOrder < minWeightOrder) ? <FontAwesome name="caret-up" /> : <FontAwesome name="caret-down" /> ;

                    return(
                        <>
                            <span>{deltaChange} &nbsp;</span> 
                            (<span>{result} {this.state.kgOrIb}</span>)
                        </>
                    )
                }

            break;

            case ('current') :  // Most recent weight 

                if (this.state.entries.length > 0) {

                    let entries = this.state.entries;
                    let kgOrIb = this.state.kgOrIb;

                    let weight = entries[0].weight[`${kgOrIb}`];

                    return <>{weight} {kgOrIb}</>
                }

            break;

            case ('targetChange') :     // current / target expressed in %

                if (this.state.entries.length > 0) {

                    let target = (this.state.target);
                    let currentWeight = (this.state.weight);

                    let sign = (target > currentWeight) ? '-' : '+' ;
                    let targetChange = Math.abs(((target - currentWeight) / target) * 100).toFixed(1);

                    return (
                        <>{targetChange}%{sign}</>
                    )                    
                }

            break;

            case ('week') :    // Maximum in a week - Minimum in a week

                if ((this.state.entries).length > 0) {

                    let entries = this.state.entries;
                    
                    const weightData = [];
                    let kgOrIb = this.state.kgOrIb;
                    
                    let now = new Date().getTime(); // Get current day
                    let week = 1000 * 60 * 60 * 24 * 7; // Get UNIX time for 1 week

                    let oneWeekBehind = (now - week);   

                    for (let i=0; i < entries.length; i++) {
                        if ((entries[i].date < now) && (entries[i].date > oneWeekBehind)) {  // Filter for 1 week
                            weightData.push(Number(entries[i].weight[`${kgOrIb}`]));
                        }
                    }

                    let maxWeight = (Math.max(...weightData));
                    let minWeight = (Math.min(...weightData));

                    let result =  (maxWeight - minWeight).toFixed(1);

                    let maxWeightOrder = (weightData.indexOf(maxWeight));
                    let minWeightOrder = (weightData.indexOf(minWeight));

                    // If maximum weight is the most recent, insert caret-up change
                    let deltaChange = (maxWeightOrder < minWeightOrder) ? <FontAwesome name="caret-up" /> : <FontAwesome name="caret-down" /> ;

                    return(
                        <>
                            <span>{deltaChange} &nbsp;</span> 
                            (<span>{result} {this.state.kgOrIb}</span>)
                        </>
                    )
                }

            break;

            case ('total') :    // Last record - First record

            if ((this.state.entries).length > 0) {
                
                let entries = this.state.entries;
                let kgOrIb = this.state.kgOrIb;

                let lastRecord = entries[0].weight[`${kgOrIb}`];
                let firstRecord = entries[entries.length - 1].weight[`${kgOrIb}`];

                let total = (lastRecord - firstRecord).toFixed(1);

                return(
                    <>(<span>{total} {this.state.kgOrIb}</span>)</>
                )
            }
            break;
        }
    }
    
    render () {

        // console.log(this.state);
        // console.log(this.props.target.weight.kg);

        return (
            <section className={`${styles.weight_track} weight-data-overview`}>
    
                <div className={styles.tab}>
                    <h2 className={styles.heading}>Target</h2>
                    <span className={styles.computed}>({this.computeData('target')})</span>
                </div>
                <div className={styles.tab}>
                    <h2 className={styles.heading}>Change (Month)</h2>
                    <span className={styles.computed}>{this.computeData('month')}</span>
                </div>
                <div className={styles.tab}>
                    <h2 className={styles.heading}>Current</h2>
                    <span className={styles.computed}>({this.computeData('current')})</span>
                </div>
                <div className={styles.tab}>
                    <h2 className={styles.heading}>Target Change</h2>
                    <span className={styles.computed}>({this.computeData('targetChange')})</span>
                </div>
                <div className={styles.tab}>
                    <h2 className={styles.heading}>Change (Week)</h2>
                    <span className={styles.computed}>{this.computeData('week')}</span>
                </div>
                <div className={styles.tab}>
                    <h2 className={styles.heading}>Total Change</h2>
                    <span className={styles.computed}>{this.computeData('total')}</span>
                </div>
    
            </section>
        )
    

    }
}

export default WeightTrack; 