import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Route } from 'react-router-dom';
import { Home, Login, Register } from 'pages';

import Header from 'components/Header';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />

					<Route exact path="/" component={Home} />
					<Route path="/Login" component={Login} />
					<Route path="/Register" component={Register} />
			</div>
		);
	}
}

export default App;