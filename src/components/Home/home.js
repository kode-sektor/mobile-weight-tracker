import React, {Component} from 'react';

import Header from '../Header/header';
import Footer from '../Footer/footer';

import styles from './home.module.css';

class Layout extends Component {

	state = {
		showNav : false,
		showPreferences : false
	}

	toggleSidenav = (action) => {
		this.setState({
            showNav : action
        })
	}

	togglePreferences = () => {
		let action = this.state.showNav ? false : true;

		this.setState({
			showPreferences : action
		})
	}

	render () {

		return (
			<div className="layout">

				<Header
					showNav={this.state.showNav}
					onHideNav={() => this.toggleSidenav(false)}
					onOpenNav={() => this.toggleSidenav(true)}
					title={"Weight Overview"}
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
					showPreferences={()=> this.togglePreferences()}
				/>

			</div>
		)
	}
}

export default Layout;


