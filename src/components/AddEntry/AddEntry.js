import React from 'react';

import FontAwesome from 'react-fontawesome';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from './AddEntry.module.css';

import {ibToKg} from '../../config';

// DB
import {firebaseDB, firebaseTarget, firebaseWeight} from '../../firebase';

class AddEntry extends React.Component {

    state = {
        initial : false,
        processForm : false,
        kgOrIb: "kg",
        weight: 180,
        target: 180,
        startDate: (new Date()).getTime()
    };

    componentWillMount = () => {
        firebaseDB.ref('user/0/target/0').once('value').then((snapshot) => {
            let initial = (snapshot.val()).initial;
            this.setState({initial});
        });
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
        let setTargetOrAddRecord = this.state.initial === true ? "setTarget" : "addRecord";

        const validate = (course) => {  // course of action: set weight or add entry
            if (this.state.kgOrIb === "kg") {
                if (course < 1 || course === "") {  // Error for less than 1kg
                    alert(errorMsg + "above 0kg")
                } else if (this.state.target > 500 ) {  // Error for greater than 500kg
                    alert (errorMsg + "under 500kg")
                } else {
                    this.setState({processForm : true});    // Upload form data if no error
                    upload();
                }
            } else {    // Ib
                if (course < 1 || course === "") {  // Error for less than 1kg
                    alert(errorMsg + "above 0Ib")
                } else if (course > (500/ibToKg).toFixed(2)) {  // Error for greater than 500kg
                    alert (errorMsg + "under " + (500/ibToKg).toFixed(2))
                } else {
                    this.setState({processForm : true});    // Upload form data if no error
                    upload();
                }
            }
        }

        // Upload to firebase 
        const upload = () => {

            if (setTargetOrAddRecord === "setTarget") { // Set Target
                firebaseTarget.update({
                    '0/initial' : false,
                    '0/value' : (Number(this.state.target)).toFixed(1),
                    '/0/unit' : this.state.kgOrIb
                });
            } else {
                const entry = { // Upload new weight entry
                    'date' : this.state.startDate,
                    'value' : (Number(this.state.weight)).toFixed(1),
                    'unit' : this.state.kgOrIb
                }

                // Ensure user's uploaded entries do not exceed 50
                if ((this.props.entries).length === 50) { 
                    firebaseWeight.limitToLast(1).once('value').then((snapshot)=> { // First fetch
                        let delRecord = Object.keys(snapshot.val())[0]; // Get record key: MHXzP0KO9FrXMhNQ6UP
                        firebaseDB.ref(`user/0/weight/${delRecord}`).remove().catch((e)=>{  // Delete
                            console.log(e)
                        })
                    })
                }

                firebaseWeight.push(entry);
            }

            this.props.showHome() // Return to home after form submission
        }

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
                    <legend className="legTitle">{this.state.initial === true ? "Set Target" : "Add A Record"}</legend>

                    <section className="target" className={this.state.initial === true ? "" : "hidden" }>
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

                    <section className="weight" className={this.state.initial === true ? "hidden" : "" }>
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
                        </div>
                            
                        <div className="form-group">
                            <DatePicker
                                selected={this.state.startDate}
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