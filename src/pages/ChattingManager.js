import React from 'react';
import io from 'socket.io-client';

import { ChatRoomList, ChatMessageInput, ChatMessageView } from 'components';

let socket = null;

class ChattingManager extends React.Component {
	state = {
		text: '',
		message: '',
		friendList: []
	};

	componentDidMount() {
		socket = io('https://nodeserver-keknq.run.goorm.io', {
			path: '/api/socket'
		});
		socket.on('chat message', data => this.setState({ text: this.state.text + data }));
	}

	handlePostMessage = () => {
		socket.emit('Add message', this.state.message);
	};

	handleMassageChange = e => {
		if (e.keyCode == 13) {
			console.log('pressed enter ');
			return;
		}

		this.setState({
			message: e.target.value
		});
	};

	handleKeyPress = e => {
		if (e.key === 'Enter') {
			this.handlePostMessage();
			
			this.setState({
				message: ""
			})
		}
	};

	render() {
		return (
			<div className="row fullscrean">
				<div className="col-2">
					<ChatRoomList />
					<h2>{this.state.friendList}</h2>
				</div>
				<div className="col-10">
					<ChatMessageView text={this.state.text} />

					<ChatMessageInput
						message={this.state.message}
						handleKeyPress={this.handleKeyPress}
						handleMassageChange={this.handleMassageChange}
					/>
				</div>
			</div>
		);
	}
}
export default ChattingManager;