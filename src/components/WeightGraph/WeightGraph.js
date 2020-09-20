import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';

import {Bar, Line, Pie} from 'react-chartjs-2';

import styles from './WeightGraph.module.css';

// DB
import {firebaseDB, firebaseWeight} from '../../firebase';

class WeightGraph extends Component {

    state = {

        chartData : {
            labels : ['08/11', '09/11', '14/11', '23/11'],
            datasets : [
                {
                    label : 'Weight',
                    data : [180.1, 180.3, 177.4, 179.0],
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
        const labels = [], datasets = [];
    }

    render () {

        {console.log(this.props)}

        return (
        
            <section className={styles.no_data}>
               {/*this.props.entries.length === 0 ? "No Data" : "Data"*/}
               <Line
                    data={this.state.chartData}
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