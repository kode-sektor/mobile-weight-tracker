import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from "./components/Home/home";

class Routes extends Component {
	render () {
		return (
            <Switch>
                <Route path={["/", "home"]} exact component={Home}></Route>
            </Switch>
		) 
	}
}

export default Routes;