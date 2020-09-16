import React, {Component} from 'react';
import axios from 'axios';

import FontAwesome from 'react-fontawesome';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from './AddEntry.module.css';

import {URL} from '../../config';

class AddEntry extends React.Component {
    state = {
        weight: 180,
        target: 180,
        startDate: new Date()
    };
   
    handleChange = (date) => {
        this.setState({
          startDate: date
        });
    };

    setTarget = () => {
        const obj = {
            name: "Fred",
            surname: "Flinstone"
        }
        let data = JSON.stringify({
            target : this.state.target
        });

        axios.post('http://localhost:3001/target', {
            obj
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    addEntries = () => {

    }
   
    render() {

        return (

            <section className={`${styles.frmEntry} module ${this.props.addEntry}`}>

                <form id="frmEntry" method="POST" onSubmit={e => this.saveEntry()}>

                    <legend className="legTitle">{this.props.entries < 1 ? "Set Target" : "Add A Record"}</legend>

                    <section className="target" className={this.props.entries < 1 ? "" : "hidden" }>
                        <div className="form-group">
                            <input type="number" className="target-entry" id="weight" autoComplete="off" placeholder="Target (Ib)" max="1000" min="1" name="weight" autoFocus    
                                value={this.state.weight}
                                onChange={({ target: { value } }) => this.setState({target : value})}
                            />
                            <span className={styles.unit}>(Ib)</span>
                        </div>
                    </section>

                    <section className="weight" className={this.props.entries < 1 ? "hidden" : "" }>
                        <div className="form-group">
                            <input type="number" className="weight-entry" id="weight" autoComplete="off" placeholder="Weight (Ib)" max="1000" min="1" name="weight" autoFocus    
                                value={this.state.weight}
                                onChange={({ target: { value } }) => this.setState({weight : value})}
                            />
                            <span className={styles.unit}>(Ib)</span>
                        </div>
                            
                        <div className="form-group">
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                dateFormat="yyyy/MM/dd"
                                maxDate={new Date()}
                                // minDate={new Date()}
                                // filterDate={date => date.getDay() !== 6 && date.getDay() !==0} // filter Weekends
                                // isClearable  // button to clear field
                                // showYearDropdown
                                // scrollableMonthYearDropDown
                            />
                            <FontAwesome className={styles.calendar_icon} name="calendar" />
                        </div>

                    </section>

                    <div className="form-group buttonset">
                        <button type="button" id="" className="return main"
                            onClick = {this.props.showComponent}>
                            <span className="icon-part">
                                <FontAwesome name="angle-left" />
                            </span>
                            <span className="text">
                                Cancel
                            </span>
                        </button>
                        <button type="button" className="enter main"
                            onClick={ e => this.props.entries < 1 ? this.setTarget(e) : this.addEntries(e)}>
                            <span className="icon-part">
                                <FontAwesome name="check" />
                            </span>
                            <span className="text">
                                OK
                            </span>
                        </button>
                    </div>

                </form>

            </section>
        );
    }
  }

export default AddEntry; 