import React, {Component} from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Preferences from '../Preferences/Preferences';
import History from '../History/History';
import AddEntry from '../AddEntry/AddEntry';

// Import Functions
import {Capitalise} from '../function';

import styles from './home.module.css';

class Layout extends Component {

	state = {
		showNav : false,
		showPreferences : "no_slide",
		showHistory : "no_slide",
		showAddEntry : "no_slide"
	}

	toggleSidenav = (action) => {

		// If user clicks on menu button, hide Preferences if its been opened
		
		this.setState({
			showNav : action,
			showPreferences : "no_slide",
			showHistory : "no_slide"
        })
	}

	showComponent = (module) => {
		let modules = {
			showPreferences : "no_slide",
			showHistory : "no_slide",
			showAddEntry : "no_slide"
		}
		modules = {...modules, ...module};

		this.setState(modules);
	}

	toggleComponent = (evt) => {
		
		let element = (evt.currentTarget.id);	// preferences
		let action = "";

		// Handle toggle functionality of each widget. Only one must show 
		// while others remain hidden from view
		switch (element) {

			case "preferences" : 
				action = (this.state.showPreferences === "no_slide") ? "slide" : "no_slide";
				this.showComponent({showPreferences : action});
			break;

			case "history" : 
				action = (this.state.showHistory === "no_slide") ? "slide" : "no_slide";
				this.showComponent({showHistory : action});
			break;

			case "addEntry" : 
				action = (this.state.showAddEntry === "no_slide") ? "slide" : "no_slide";
				this.showComponent({showAddEntry : action});
			break;

			default : ;

		}
	}

	render () {

		return (
			<div className="layout">

				<div className="app-wrap">

					<Header
						showNav={this.state.showNav}
						onHideNav={() => this.toggleSidenav(false)}
						onOpenNav={() => this.toggleSidenav(true)}
						title={"Weight Overview"}
					/>

					<Preferences preferences={this.state.showPreferences}/>

					<History history={this.state.showHistory}/>

					<AddEntry addEntry={this.state.showAddEntry}/>

					<section className={styles.weight_track}>

						<div className={styles.tab}>
							<h2 className={styles.heading}>Target</h2>
							<span className={styles.computed}>()</span>
						</div>
						<div className={styles.tab}>
							<h2 className={styles.heading}>Change (Month)</h2>
							<span className={styles.computed}>()</span>
						</div>
						<div className={styles.tab}>
							<h2 className={styles.heading}>Current</h2>
							<span className={styles.computed}>()</span>
						</div>
						<div className={styles.tab}>
							<h2 className={styles.heading}>Target Change</h2>
							<span className={styles.computed}>()</span>
						</div>
						<div className={styles.tab}>
							<h2 className={styles.heading}>Change (Week)</h2>
							<span className={styles.computed}>()</span>
						</div>
						<div className={styles.tab}>
							<h2 className={styles.heading}>Total Change</h2>
							<span className={styles.computed}>()</span>
						</div>

					</section>

					<WeightGraph />

					<Footer
						showNav={this.state.showNav}
						showComponent={(evt) => this.toggleComponent(evt)}
					/>

				</div>

			</div>
		)
	}
}

export default Layout;


