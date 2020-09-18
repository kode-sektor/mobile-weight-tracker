import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter} from 'react-router-dom';
import Routes from './routes';

import {firebase} from './firebase';

const App = () => {

	  return (
		    <BrowserRouter>
			    <Routes/>
		    </BrowserRouter>
	  )
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
