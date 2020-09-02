import React from 'react';
import ReactDOM from 'react-dom';
import './hoc/Layout/layout.css';

import {BrowserRouter} from 'react-router-dom';
import Routes from './routes';	

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
