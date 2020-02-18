import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Route } from 'react-router-dom';
import { default as AuthRouter } from './AuthRouter';
import { Home, Login, Register, FileManager,ChattingManager} from 'pages';

import Header from 'components/Header';

class App extends Component {
	render() {
		return (
			<div className="App">

				<Route path="/" component={Header} />
					<Route exact path="/" component={Home} />
					<Route path="/Login" component={Login} />
					<Route path="/Register" component={Register} />
					<AuthRouter path="/FileManager" component={FileManager} />
					<AuthRouter path="/ChattingManager" component={ChattingManager} />				
			</div>
		);
	}
}

export default App;