import React, {Component} from 'react';

import Header from '../Header/header';
import Footer from '../Footer/footer';

// Import Constants
import {Capitalise} from '../function';

import styles from './home.module.css';

class Layout extends Component {

	state = {
		showNav : false,
		showPreferences : "no_slide",
		showHistory : "no_slide"
	}

	toggleSidenav = (action) => {

		// If user clicks on menu button, hide Preferences if its been opened
		
		this.setState({
			showNav : action,
			showPreferences : "no_slide",
			showHistory : "no_slide"
        })
	}

	togglePreferences = (evt) => {
		
		let element = (evt.currentTarget.id);	// preferences
		let action = "";

		// Handle toggle functionality of each widget. Only one must show 
		// while others remain hidden from view
		switch (element) {

			case "preferences" : 
				action = (this.state.showPreferences === "no_slide") ? "slide" : "no_slide";
				this.setState({
					showPreferences : action,
					showHistory : "no_slide"
				})
			break;

			case "history" : 
				action = (this.state.showHistory === "no_slide") ? "slide" : "no_slide";
				this.setState({
					showHistory : action,
					showPreferences : "no_slide"
				})
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
						preferences={this.state.showPreferences}
						history={this.state.showHistory}
					/>

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

					<section className="weight-graph">

					</section>

					<Footer
						showNav={this.state.showNav}
						showPreferences={(evt) => this.togglePreferences(evt)}
					/>

				</div>

			</div>
		)
	}
}

export default Layout;


