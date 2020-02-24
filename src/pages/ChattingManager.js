import React from 'react';
import io from 'socket.io-client';

class ChattingManager extends React.Component {
	
	componentDidMount() {
		console.log("componentDidMount");
		const socket = io("https://nodeserver-keknq.run.goorm.io",{
			path: "/api/socket"
		});
		console.log(socket);
		socket.emit('initial_data');
		socket.on('get_data', this.getData);
	}

	render() {
		return (
			<div>
				<h2>ChattingManager</h2>
			</div>
		);
	}
}
export default ChattingManager;