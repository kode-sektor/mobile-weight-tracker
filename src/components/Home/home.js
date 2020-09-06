import React, {Component} from 'react';

import Header from '../Header/header';
import Footer from '../Footer/footer';

import styles from './home.module.css';

class Layout extends Component {

	state = {
		showNav : false,
		showPreferences : "no_slide"
	}

	toggleSidenav = (action) => {

		// If user clicks on menu button, hide Preferences if its been opened
		let preferences = (action === true) ? "no_slide" : this.state.showPreferences;
		
		this.setState({
			showNav : action,
			showPreferences : preferences
        })
	}

	togglePreferences = () => {
		let action = (this.state.showPreferences === "no_slide") ? "slide" : "no_slide";

		this.setState({
			showPreferences : action
		})
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
						showPreferences={()=> this.togglePreferences()}
					/>

				</div>

			</div>
		)
	}
}

export default Layout;


