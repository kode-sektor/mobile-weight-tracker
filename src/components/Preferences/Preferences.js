import React from 'react';
import { Link } from 'react-router-dom';

// Parent file: header.js

import FontAwesome from 'react-fontawesome';

import styles from './Preferences.module.css';

const PreferenceList = (props) => {
    
	return (

        <section className={`${styles.preferenceList} ${props.preferences}`}>

            <ul>
                <li className="profile">
                    <Link to="" className="">
                        Profile
                    </Link>
                </li>
                <li>
                    <Link to="" className="">
                        Graph Settings
                    </Link>
                </li>
                <li>
                    <Link to="" className="">
                        Data Settings
                    </Link>
                </li>
                <li>
                    <Link to="" className="">
                        Reminder
                    </Link>
                </li>
                <li>
                    <Link to="" className="">
                        Backup &amp; Restore
                    </Link>
                </li>
                <li>
                    <Link to="" className="">
                        Delete Records
                    </Link>
                </li>
                <li>
                    <Link to="" className="">
                        Send Feedback
                    </Link>
                </li>
                <li className="premium">
                    <Link to="" className="">
                        Premium <FontAwesome name="star" />
                    </Link>
                </li>

            </ul>
                
        </section>
            
	)
}

export default PreferenceList;