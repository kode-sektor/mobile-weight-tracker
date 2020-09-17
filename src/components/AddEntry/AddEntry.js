import React from 'react';

import FontAwesome from 'react-fontawesome';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from './AddEntry.module.css';

import {ibToKg} from '../../config';

class AddEntry extends React.Component {
    state = {
        processForm : false,
        kgOrIb: "kg",
        weight: 180,
        target: 180,
        startDate: new Date()
    };
   
    selectDate = (date) => {
        this.setState({
          startDate: date
        });
    };

    saveEntry = () => {
        let errorMsg = "Please set weight ";

        const validate = (course) => {  // course of action: set weight or add entry
            if (this.state.kgOrIb === "kg") {
                if (course < 0 || course === "") {
                    alert(errorMsg + "above 0kg")
                } else if (this.state.target > 500 ) {
                    alert (errorMsg + "under 500kg")
                } else {
                    this.setState({processForm : true});
                }
            } else {    // Ib
                if (course < 0 || course === "") {
                    alert(errorMsg + "above 0Ib")
                } else if (course > (500/ibToKg).toFixed(2)) {
                    alert (errorMsg + "under " + (500/ibToKg).toFixed(2))
                } else {
                    this.setState({processForm : true});
                }
            }
        }

        // Check whether user is setting weight target or adding weight entry
        let setTargetOrAddRecord = this.props.entries < 1 ? "setTarget" : "addRecord";

        if (setTargetOrAddRecord === "setTarget") {
            validate(this.state.target)
        }
        else {
            validate(this.state.weight)
        }
        
    }
   
    render() {

        return (

            <section className={`${styles.frmEntry} module ${this.props.addEntry}`}>

                <form id="frmEntry" method="POST" onSubmit={e => this.saveEntry()}>

                    {/*this.props.entries is to check whether to EDIT or ADD an entry to database*/}
                    <legend className="legTitle">{this.props.entries < 1 ? "Set Target" : "Add A Record"}</legend>

                    <section className="target" className={this.props.entries < 1 ? "" : "hidden" }>
                        <div className="form-group">
                            <input type="number" className="target-entry" id="weight" autoComplete="off" placeholder="Target" max="1000" min="1" name="weight" autoFocus    
                                defaultValue="180"
                                onChange={({ target: { value } }) => this.setState({target : value})}
                            />
                            <select className={styles.weight_unit}
                                onChange={({ target: { value } }) => this.setState({kgOrIb : value})}> 
                                <option value="kg">(Kg)</option>
                                <option value="ib">(Ib)</option>
                            </select>
                        </div>
                    </section>

                    <section className="weight" className={this.props.entries < 1 ? "hidden" : "" }>
                        <div className="form-group">
                            <input type="number" className="weight-entry" id="weight" autoComplete="off" placeholder="Weight" max="1000" min="1" name="weight" autoFocus    
                                defaultValue="180"
                                onChange={({ target: { value } }) => this.setState({weight : value})}
                            />
                            <select className={styles.weight_unit}
                                onChange={({ target: { value } }) => this.setState({kgOrIb : value})}> 
                                <option value="kg">(Kg)</option>
                                <option value="ib">(Ib)</option>
                            </select>
                            onChange={({ target: { value } }) => this.setState({weight : value})}
                        </div>
                            
                        <div className="form-group">
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.selectDate}
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
                            onClick={ e => this.saveEntry()}>
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