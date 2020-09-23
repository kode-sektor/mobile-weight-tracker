import React, {Component} from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Particle from '../Particles/Particles';

import Preferences from '../Preferences/Preferences';
import History from '../History/History';
import AddEntry from '../AddEntry/AddEntry';
import WeightTrack from '../WeightTrack/WeightTrack';
import WeightGraph from '../WeightGraph/WeightGraph';
import EditEntry from '../EditEntry/EditEntry';

// DB
import {firebaseDB, firebaseTarget, firebaseWeight, firebaseKgOrIb, firebaseLoop} from '../../firebase';

import styles from './home.module.css';

class Layout extends Component {

	constructor(props) {
		super(props);
		this.escFunction = this.escFunction.bind(this);
	}

	state = {
		initial : true,
		showNav : false,
		showPreferences : 'no_slide',
		showHistory : 'no_slide',
		showAddEntry : 'no_slide', 

		editEntry : {
			showEditEntry : 'no_slide',
			record : {	// Record for single 
				weight : {
					kg : '',
					ib : '',
					recordID : ''
				},
				date : ''
			}
		},

		target : {
			weight : {
				kg : '',
				ib : ''
			}
		},
		kgOrIb : "kg",
		entries : []
	}

	componentWillMount() {

		firebaseTarget.once('value').then((snapshot) => {
			let initial = (snapshot.val()).initial;

			firebaseKgOrIb.once('value').then((snapshot) => {	// Fetch weight unit
				let kgOrIb = snapshot.val();

				// Initial is a check whether user is just beginning to use this application
				// A new user has no weight entries yet. Check that before looping
				if (!initial) {
					firebaseTarget.once('value').then((snapshot) => {
						let target = snapshot.val();

						let data = [];
						firebaseWeight.once('value').then((snapshot) => {
							if (snapshot.val()) {   // Avoid error if user has entered target but not entered weight
								data = firebaseLoop(snapshot);
								// console.log(data);
							}

							if (data.length) {
								this.setState({
									initial,
									target,
									kgOrIb,
									entries : data
								});
							}
						})
					})
				}
			})
		})
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

	// Why this is important: 
	// This whole app runs on just one route, meaning all other routes are fake and merely hidden by CSS.
	// Since page reload is out of it, only change of state is what is left to refresh the app. This is 
	// exactly the reason a state 'initial' was created to refresh and will be toggled when user first
	// sets a weight target in 'AddEntry.js' component
	setInitial = (bool=false) => {
		this.setState({initial : bool})
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
			showPreferences : 'no_slide',
			showHistory : 'no_slide',
			showAddEntry : 'no_slide',
			editEntry : {
				showEditEntry : 'no_slide',
				record : {	// Record for single 
					weight : {
						kg : '',
						ib : '',
						recordID : ''
					},
					date : ''
				}
			},
		}

		if (module) {
			modules = {...modules, ...module};	// Toggle "slide"/"no_slide"
		}

		// If no module is passed, all defaults of 'no_slide' will be passed 
		// which will close all the slides
		// console.log(module, modules);	
		this.setState(modules);	
	}

	toggleComponent = (evt) => {

		let element = '', action = '';

		let edit = '', recordID='';	// For handling 'edit' and 'del' actions

		// Check for class names of return. Class (and not ID) of "return" is used because
		// there could be multiple return buttons in the application. Class "return" would 
		// override the ID because it is dedicated to close all panels

		if ((evt === 'home') || (evt.currentTarget.className).indexOf("return") !== -1) {
			element = 'return';
		} else {
			if (evt.currentTarget.id) {
				if ((evt.currentTarget.id).substring(0,5) === 'edit-') {
					element = 'edit';
					recordID = (evt.currentTarget.id).split('edit-')[1];	// edit-MHdBmBUtWWM4A7qo3At to 'MHdBmBUtWWM4A7qo3At'
				} else if ((evt.currentTarget.id).substring(0,4) === 'del-') {
					element = 'del';
					recordID = (evt.currentTarget.id).split('del-')[1];	// del-MHdBmBUtWWM4A7qo3At to 'MHdBmBUtWWM4A7qo3At'
				} else {
					element = evt.currentTarget.id;	// preferences, history
				}
			} else if (evt.target.id) {
				element = evt.currentTarget.id;	// preferences, history
			}
		}

		// Handle toggle functionality of each widget. Only one must show 
		// while others remain hidden from view
		switch (element) {
			
			case 'nav' : 
				action = (this.state.showNav === false) ? true : false;
				this.showComponent({showPreferences : action});
			break;

			case 'preferences' : 
				action = (this.state.showPreferences === 'no_slide') ? 'slide' : 'no_slide';
				this.showComponent({showPreferences : action});
			break;

			case 'history' : 
				action = (this.state.showHistory === 'no_slide') ? 'slide' : 'no_slide';
				this.showComponent({showHistory : action});
			break;
			
			case 'addEntry' : 
				action = (this.state.showAddEntry === 'no_slide') ? 'slide' : 'no_slide';
				this.showComponent({showAddEntry : action});
			break;
			
			case 'del' : 

				// Fetch record for particular 
				const delRecord = () => {

					firebaseDB.ref('user/0/weight/-' + recordID).remove().catch((e) => {
						console.log(e)
					})
				}

				delRecord();
			break;

			case 'edit' : 

				action = (this.state.editEntry.showEditEntry === 'no_slide') ? 'slide' : 'no_slide';

				// Fetch record for particular 
				const fetchRecord = () => {

					let val = '', unit = this.state.kgOrIb;
					console.log(recordID);
					firebaseDB.ref('user/0/weight/-' + recordID).once('value').then((snapshot) => {
						val = snapshot.val();
						console.log(val);
						
						let weightKG = val.weight.kg;	// 178.2
						let weightIB = val.weight.ib;
						let date = val.date;	// 1598933775000
						
						// console.log(weightKG, weightIB, date);

						this.showComponent({
							editEntry : {
								showEditEntry : action,
								record : {
									weight : {
										kg : weightKG,
										ib : weightIB,
										id : recordID
									},
									date : date
								}
							} 
						});
					})
				}

				fetchRecord();
			break;

			case 'return' : 
				this.showComponent();	// Hide all other components. Home is always underneath, so it shows
			break;

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

					<WeightTrack 
						target={this.state.target}
						kgOrIb={this.state.kgOrIb}
						entries={this.state.entries}/>

					<WeightGraph 
						entries={this.state.entries}
						kgOrIb={this.state.kgOrIb}/>

					<Preferences 
						preferences={this.state.showPreferences}/>

					<History 
						history={this.state.showHistory}
						entries={this.state.entries}
						kgOrIb={this.state.kgOrIb}
						showComponent={(evt) => this.toggleComponent(evt)}/>

					<AddEntry 
						addEntry={this.state.showAddEntry}
						entries={(this.state.entries).length}
						showComponent={(evt) => this.toggleComponent(evt)}
						showHome={() => this.toggleComponent('home')}
						setInitial={()=>this.setInitial()}
						entries={this.state.entries}
						history={this.props.history}
						kgOrIb={this.state.kgOrIb}/>

					<EditEntry 
						initial={this.state.initial}
						editEntry={this.state.editEntry}
						showComponent={(evt) => this.toggleComponent(evt)}
						kgOrIb={this.state.kgOrIb}/>

					<Footer
						showComponent={(evt) => this.toggleComponent(evt)}/>

				</div>

			</div>

			</>
		)
	}
}

export default Layout;


