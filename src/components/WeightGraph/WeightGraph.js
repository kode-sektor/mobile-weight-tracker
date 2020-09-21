import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';

import {Bar, Line, Pie} from 'react-chartjs-2';

import styles from './WeightGraph.module.css';

// DB
import {firebaseDB, firebaseWeight} from '../../firebase';

class WeightGraph extends Component {

    state = {

        chartData : {
            labels : [],
            datasets : [
                {
                    label : 'Weight',
                    data : [],
                    backgroundColor : 'transparent',
                    pointBackgroundColor: '#ff0000',
                    pointBorderColor: '#ff0000',
                    borderColor: '#ff0000',
                }
            ]
        }
    }

    componentWillMount = () => {
    }

    chartData = () => {

        let chartData = {
            labels : [], 
            datasets : [
                {
                    data : [],
                    backgroundColor : 'transparent',
                    pointBackgroundColor: '#ff0000',
                    pointBorderColor: '#ff0000',
                    borderColor: '#ff0000'
                 }
            ]
        }

        const labels = [], datasets = [];

        const entries = this.props.entries.map((item, i) => {

            let date = item.date;   // 1594179272000
            date = new Date(date);
            let day = date.getDate();   // 18
            let month = (date.getMonth() + 1);  // 9

            let dayMonth = month + '/' + day;   // '18/9', '16/9'...
            
            let weight = item.weight[`${this.props.kgOrIb}`];   // 182.0, 181.5...

            labels.push(dayMonth);
            datasets.push(weight);
        })

        chartData.labels = labels;
        chartData.datasets[0].data = datasets;

        console.log(chartData);

        return chartData;
    }

    render () {

       // {console.log(this.props)}

        return (
        
            <section className={styles.no_data}>
               {/*this.props.entries.length === 0 ? "No Data" : "Data"*/}
               <Line
                    data={((this.props.entries).length > 0) ? this.chartData() : null}
                    width={100}
                    height={50}
                    options={{ 
                        title : {
                            display : false,
                            text: 'Weight Graphical Data',
                            fontSize : 25,
                            labels : {
                                fontColor: '#000'
                            }
                        },
                        legend : {
                            display : true,
                            //position : right,
                            labels : {
                                fontColor : '#000'
                            }
                        },
                        layout : {
                            padding : {
                                //left : 50,
                                right : 0,
                                bottom : 0,
                                top : 0, 
                            }
                        },
                        tooltips : {
                            enabled : true
                        },
                        /*scales : {
                            yAxes : [
                                {
                                    ticks : {
                                        min : 0,
                                        max : 6,
                                        stepSize : 1
                                    }
                                }
                            ]
                        },*/
                        maintainAspectRatio: false 
                    }}
                /> 
            </section>
        )

    }

}

export default WeightGraph; 