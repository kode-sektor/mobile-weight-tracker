import React, {Component} from 'react';

import {Line} from 'react-chartjs-2';
import styles from './WeightGraph.module.css';

class WeightGraph extends Component {

    state = {

        chartData : {
            labels : [],
            datasets : [
                {
                    data : [],
                    backgroundColor : 'transparent',
                    pointBackgroundColor: '#ff0000',
                    pointBorderColor: '#ff0000',
                    borderColor: '#ff0000',
                }
            ]
        },
        reloadChart : false,
    }

    chartData = () => {

        let chartData = this.state.chartData;  // ChartData schema

        const labels = [], datasets = [];

        this.props.entries.map((item, i) => {

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

        return chartData;
    }

    toggleGraphData = (e) => {

        let id = e.target.id;
        let interval = 0;

        const labels = [], datasets = [];

        let chartData = this.state.chartData;  // ChartData schema

        if (id === 'one-wk') {
            interval = 1000 * 60 * 60 * 24 * 7; // Get UNIX time for 1 week
        } else if (id === 'one-mth') {
            interval = 1000 * 60 * 60 * 24 * 28; // Get UNIX time for 1 month
        } else {
            interval = 1000 * 60 * 60 * 24 * 365; // Get UNIX time for 1 year
        }

        let entries = this.props.entries;

        let now = new Date().getTime(); // Get current day
        let intervalBehind = (now - interval);   

        let date = '', weightEntry = '';

        // Did not turn this into a function because the similar code (inside ChartData function)
        // although similar, uses a map loop and map returns every single item in the array
        // -- and that is not ideal for this case
        for (let i=0; i < entries.length; i++) {
            date = entries[i].date;
            weightEntry = entries[i].weight;

            if ((date < now) && (date > intervalBehind)) {  // Filter for right interval
                date = new Date(date);
                let day = date.getDate();   // 18
                let month = (date.getMonth() + 1);  // 9

                let dayMonth = month + '/' + day;   // '18/9', '16/9'...
                
                let weight = weightEntry[`${this.props.kgOrIb}`];   // 182.0, 181.5...

                labels.push(dayMonth);
                datasets.push(weight);
            }
        }
        chartData.labels = labels;
        chartData.datasets[0].data = datasets;

        this.setState({
            chartData,
            reloadChart : true  // 
        })

    }

    loadChart = () => {
        // Computer for 2 different possibilities: 
        // 1. Compute graph when button is clicked
        // 2. Compute graph for when page freshly loads 
        if (this.state.reloadChart === true) {
            return this.state.chartData;
        } else {
            if ((this.props.entries).length > 0) {
               return this.chartData();
            }
        }
        // If / else does not work in JSX which is why it was brought as a function
    }

    render () {

       // {console.log(this.props)}

        return (
        
            <section className={styles.graph_data}>

               <div className='buttonset graph-buttons'>
                    <button id="one-wk" onClick={(e)=> this.toggleGraphData(e)}>1W</button>
                    <button id="one-mth" onClick={(e)=> this.toggleGraphData(e)}>1M</button>
                    <button id="one-yr" onClick={(e)=> this.toggleGraphData(e)}>1Y</button>
               </div>
               
               <Line
                    data={this.loadChart()}
                    width={100}
                    height={70}
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
                            display : false,
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
                        // maintainAspectRatio: false 
                    }}
                /> 
            </section>
        )

    }

}

export default WeightGraph; 