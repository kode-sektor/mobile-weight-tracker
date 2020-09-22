import React from 'react';

import FontAwesome from 'react-fontawesome';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from '../AddEntry/AddEntry.module.css';

import {ibToKg} from '../../config';    // Kg-to-Ib factor

// DB
import {firebaseDB, firebaseTarget, firebaseWeight} from '../../firebase';

class AddEntry extends React.Component {

    state = {
        initial : false,
        processForm : false,
        kgOrIb: "kg",
        weight : {
            "kg" : 180,
            "ib" : 396.8
        },
        startDate: (new Date()).getTime()
    }
   
    render() {

        return (

            <section className={`${styles.frmEntry} module ${this.props.editEntry}`}>

                <form id="frmEntry" method="POST" onSubmit={e => this.saveEntry()}>

                    {/*this.props.entries is to check whether to EDIT or ADD an entry to database*/}
                    <legend className="legTitle">Edit A Record</legend>

                    <section className="weight">

                        <div className="form-group">
                            <input type="number" className="target-entry" id="weight" autoComplete="off" placeholder="Target" max="1000" min="1" name="weight" autoFocus    
                                defaultValue={this.state.kgOrIb === 'kg' ? 180 : 396.8}
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