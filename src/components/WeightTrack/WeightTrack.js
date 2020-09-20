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
            this.setState({kgOrIb : snapshot.val().kgOrIb})
            console.log(snapshot.val())
        })
        firebaseWeight.once('value').then(snapshot => {
            this.setState({entries : firebaseLoop(snapshot)});
        })
    }

    computeData = (mode) => {

        switch (mode) {

            case ('target') :
            
                if (this.state.entries.length > 0) {
                    let kgOrIb = this.state.kgOrIb;
                    
                    return (
                        <> {this.props.target.weight[`${kgOrIb}`]} {kgOrIb} </>
                    )
                }
                
            break;

            case ('month') : 

                /* entries
                {
                    0: {date: 1600497040971, weight: {…}, id: "-MH_2l1XXgC5n1fkzin8"}
                    1: {date: 1600211902000, weight: {…}, id: "-MHcfWcSLIVO-hFSCXUl"}
                    2: {date: 1600039455000, weight: {…}, id: "-MHcflgEEP5n0E7C833q"}
                }
                */

                if (this.state.entries.length > 0) {
                    
                    let kgOrIb = this.state.kgOrIb;
                    // Get current month
                    let month = new Date().getMonth();

                    const weightData = this.state.entries.map((item) => {
                        if (new Date(item.date).getMonth() === month) {  // Filter only for current month
                            return Number(item.weight[`${kgOrIb}`])
                        }
                    })
                    
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

            case ('current') : 

                if (this.state.entries.length > 0) {

                    let entries = this.state.entries;
                    let kgOrIb = this.state.kgOrIb;

                    return <> {entries[0].weight[`${kgOrIb}`]} {kgOrIb} </>
                }

            break;
        }
    }
    
    render () {

        console.log(this.state);
        // console.log(this.props.target.weight.kg);

        return (
            <section className={styles.weight_track}>
    
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
}

export default WeightTrack; 