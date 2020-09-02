import React, {Component} from 'react';

import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

class Layout extends Component {

	state = {
		showNav: false,
	};

	toggleSidenav = (action) => {
		this.setState({
			showNav : action
		});
	}

	render () {
		return (
			<div>
				{/*Call header and pass in props argument*/}
				<Header
					showNav={this.state.showNav}
					onHideNav={() => this.toggleSidenav(false)}
					onOpenNav={() => this.toggleSidenav(true)}
				/>

				{this.props.children}	{/*body children like Handlebars*/}

				<Footer/>
			</div>
		)
	}

}

export default Layout;


