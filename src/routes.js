import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from './Layout/layout';

class Routes extends Component {
	render () {
		return (
			<Layout>
				<Switch>
				</Switch>
			</Layout>
		) 
	}
}

export default Routes;