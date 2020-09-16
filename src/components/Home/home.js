import React, {Component} from 'react';
import axios from 'axios';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Particle from '../Particles/Particles';

import Preferences from '../Preferences/Preferences';
import History from '../History/History';
import AddEntry from '../AddEntry/AddEntry';
import WeightTrack from '../WeightTrack/WeightTrack';
import WeightGraph from '../WeightGraph/WeightGraph';

// Import Functions and Config Vars
import {Capitalise} from '../function';
import {URL} from '../../config';

import styles from './home.module.css';

class Layout extends Component {

	constructor(props) {
		super(props);
		this.escFunction = this.escFunction.bind(this);
	}

	state = {
		showNav : false,
		showPreferences : "no_slide",
		showHistory : "no_slide",
		showAddEntry : "no_slide", 

		target : "",
		entries : []
	}

	componentWillMount() {
		// Fetch from db
		if (this.state.entries.length < 1) {	
			axios.all([
				axios.get(`${URL}/target`),	// Fetch from team db
				axios.get(`${URL}/entries`)	
			]).then(axios.spread((res1, res2) => {
				console.log(res1.data, res2.data);
				this.setState({
					// teams : response.data
				})
			}))
		}
	}

	componentDidMount() {
		document.addEventListener("keydown", this.escFunction, false);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.escFunction, false);
	}

	escFunction(event) {
		if(event.keyCode === 27) {
		    this.showComponent();	// Escape to close all open components
		}
	}

	toggleSidenav = (action) => {		
		this.setState({
			showNav : action
		})
	}

	showComponent = (module) => {

		// Close all slides
		let modules = {
			showNav : false,
			showPreferences : "no_slide",
			showHistory : "no_slide",
			showAddEntry : "no_slide"
		}

		if (module) {
			modules = {...modules, ...module};	// Toggle "slide"/"no_slide"
		}
		
		this.setState(modules);
	}

	toggleComponent = (evt) => {
		
		let element = (evt.currentTarget.id);	// preferences, history

		// Check for class names of return. Class (and not ID) of "return" is used because
		// there could be multiple return buttons in the application. Class "return" would 
		// override the ID because it is dedicated to close all panels
		element = ((evt.currentTarget.className).indexOf("return") !== -1) ? "return" : element;	

		let action = "";

		// Handle toggle functionality of each widget. Only one must show 
		// while others remain hidden from view
		switch (element) {
			
			case "nav" : 
				action = (this.state.showNav === false) ? true : false;
				this.showComponent({showPreferences : action});

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

			case "return" : 
				this.showComponent();

			default : ;
		}
	}

	render () {

		return (

			<>
			
			<Particle/>

			<div className="layout">

				<div className="app-wrap">

					<Header
						showNav={this.state.showNav}
						onHideNav={() => this.toggleSidenav(false)}
						onOpenNav={() => this.toggleSidenav(true)}
						title="Weight Overview"
					/>

					<Preferences preferences={this.state.showPreferences}/>

					<History history={this.state.showHistory}/>

					<AddEntry addEntry={this.state.showAddEntry}
						entries={(this.state.entries).length}
						showComponent={(evt) => this.toggleComponent(evt)}/>

					<WeightTrack />

					<WeightGraph />

					<Footer
						showComponent={(evt) => this.toggleComponent(evt)}
					/>

				</div>

			</div>

			</>
		)
	}
}

export default Layout;


