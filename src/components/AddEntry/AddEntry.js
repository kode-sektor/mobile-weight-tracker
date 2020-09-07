import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from './AddEntry.module.css';

class AddEntry extends React.Component {
    state = {
        weight: 180,
        startDate: new Date()
    };
   
    handleChange = (date) => {
        this.setState({
          startDate: date
        });
    };

    saveEntry = () => {

    }
   
    render() {
        return (

            <section className={`${styles.frmEntry} module ${this.props.addEntry}`}>

                <form id="frmEntry" method="POST" onSubmit={e => this.saveEntry()}>

                    <legend className="legTitle">Add A Record</legend>

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
                        <button type="button" className="enter main">
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