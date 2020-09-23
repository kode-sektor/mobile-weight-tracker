import React from 'react';

import FontAwesome from 'react-fontawesome';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from '../AddEntry/AddEntry.module.css';

import {ibToKg} from '../../config';    // Kg-to-Ib factor

// DB
import {firebaseDB, firebaseTarget, firebaseWeight, firebaseKgOrIb} from '../../firebase';

class AddEntry extends React.Component {

    state = {
        initial : false,
        kgOrIb: "kg",
        weight : {
            "kg" : this.props.editEntry.record.weight.kg,
            "ib" : this.props.editEntry.record.weight.ib
        },
        startDate : this.props.editEntry.record.date
    }

    selectDate = (date) => {
        // date uses the exact JAVASCRIPT DATE object.
        let time = date.getTime();
        
        this.setState({
          startDate: time
        });
    };

    saveEntry = () => {

        let errorMsg = "Please set weight ";

        // Check whether user is setting weight target or adding weight entry
        let setTargetOrAddRecord = this.props.initial === true ? "setTarget" : "addRecord";
        let id = this.props.editEntry.record.weight.id;

        // weight and date 
        // weight and startDate have values from props but props is empty on first load. But props cant be used directly
        // because onChange/onKeyup event on each of the fields inserts the field's value into the state. 
        // Thus use the props if user makes no change in the fields but if he does, then the dynamic state values 
        // can safely and must be used because it tracks the changes.
        
        let weightKG = (this.state.weight.kg|| this.props.editEntry.record.weight.kg);
        let weightIB = (this.state.weight.ib || this.props.editEntry.record.weight.ib);
        let date = (this.state.startDate || this.props.editEntry.record.date);

        // Upload to firebase 
        const upload = () => {          
            
            if (setTargetOrAddRecord === "setTarget") { // Set Target
                firebaseTarget.update({
                    'initial' : false,
                    'weight' : {
                        kg : Number(weightKG),
                        ib : Number(weightIB)
                    }
                }).then(() => {
                    this.props.setInitial();    // Set initial for home page
                    this.setState({initial: false});    // Do the same but for this page
                    window.location.reload();
                });
            } else {
                const entry = { // Upload new weight entry
                    'date' : (this.state.startDate || this.props.editEntry.record.date),
                    'weight' : {
                        kg : Number(weightKG),
                        ib : Number(weightIB)
                    }
                }

                firebaseDB.ref('user/0/weight/-' + id).update(entry);
            }

            // this.props.showHome() // Return to home after form submission
           window.location.reload();
        }

        const validate = (course) => {  // course of action: set weight or add entry

            if (this.props.kgOrIb === "kg") {
                if (course < 1 || course === "") {  // Error for less than 1kg
                    alert(errorMsg + "above 0kg")
                } else if (course.kg > 500 ) {  // Error for greater than 500kg
                    alert (errorMsg + "under 500kg")
                } else {
                    this.setState({processForm : true});    // Upload form data if no error
                    upload();
                }
            } else {    // Ib
                if (course < 1 || course === "") {  // Error for less than 1kg
                    alert(errorMsg + "above 0Ib")
                } else if (course > (500/course.ib).toFixed(1)) {  // Error for greater than 500kg
                    alert (errorMsg + "under " + (500/ibToKg).toFixed(1))
                } else {
                    this.setState({processForm : true});    // Upload form data if no error
                    upload();
                }
            }
        }
        
        if (this.props.editEntry.record.weight) {
            validate(this.state.weight[`${this.state.kgOrIb}`]);
        }    
    }
   
    render () {

        // console.log(this.props, this.state);

        return (

            <section className={`${styles.frmEntry} module ${this.props.editEntry.showEditEntry}`}>

                <form id="frmEntry" method="POST" onSubmit={e => this.saveEntry()}>

                    {/*this.props.entries is to check whether to EDIT or ADD an entry to database*/}
                    <legend className="legTitle">Edit A Record</legend>

                    <section className="weight">

                        <div className="form-group">
                            <input type="number" className="target-entry" id="weight" autoComplete="off" placeholder="Target" max="1000" min="1" name="weight" autoFocus    
                                defaultValue={this.props.editEntry.record.weight[`${this.props.kgOrIb}`]}
                                onChange={({ target: { value } }) => { 
                                    if (this.state.kgOrIb === 'kg') {
                                        this.setState({weight : {
                                                kg : (Number(value)).toFixed(1),
                                                ib : (Number(value) / ibToKg).toFixed(1)
                                            }
                                        })
                                    } else {
                                        this.setState({weight : {
                                                kg : (Number(value) * ibToKg).toFixed(1),
                                                ib : (Number(value)).toFixed(1)
                                            }
                                        })
                                    }
                                }}
                            />
                            <select className={styles.weight_unit}
                                onChange={({ target: { value } }) => {
                                    if (this.state.kgOrIb === 'kg') {
                                        this.setState({kgOrIb : 'kg'})
                                    } else {
                                        this.setState({kgOrIb : 'ib'})}
                                    }
                            }> 
                                <option value="kg">(Kg)</option>
                                <option value="ib">(Ib)</option>
                            </select>
                        </div>
                            
                        <div className={this.state.initial === true ? 'hidden form-group' : 'form-group'}>
                            <DatePicker
                                selected={this.props.editEntry.record.date}
                                onChange={this.selectDate}
                                maxDate={new Date()}
                                // dateFormat="yyyy-mm-dd"
                                // minDate={new Date()}
                                // filterDate={date => date.getDay() !== 6 && date.getDay() !==0} // filter Weekends
                                // isClearable  // button to clear field
                                // showYearDropdown
                                // scrollableMonthYearDropDown
                            ><div style={{ color: "red", padding: "0 20px" }}>Enter date weight was recorded !</div></DatePicker>
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
                            onClick={ e => this.saveEntry() }>
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