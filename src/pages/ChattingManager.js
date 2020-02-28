import React from 'react';
import io from 'socket.io-client';

import { ChatRoomList, ChatMessageInput, ChatMessageView } from 'components';

let socket = null;
let userInfo = null;

class ChattingManager extends React.Component {
	state = {
		text: [],
		whisperText: [],
		
		message: '',
		channelList: ['All'],
		connectList: [],
		unConnectList: [],

		selectedRoom: 'All',
		chatlist: []
	};

	//시작 되면 채팅방에 들어온다.
	componentDidMount() {
		console.log('componentDidMount()');
		userInfo = JSON.parse(localStorage.user);
		socket = io('https://nodeserver-keknq.run.goorm.io', {
			path: '/api/socket'
		});

		socket.on('chat message', data => {
			this.setState({ text: this.state.text.concat(data) });
		});

		socket.on('user list', data => {
			console.log(data);
			this.setState({ connectList: data });
		});

		socket.on('chat list', data => {
			console.log(data);
			this.setState({ chatlist: data });
		});
		
		socket.emit('chat login', userInfo);
	}

	componentWillUnmount() {
		console.log('componentWillUnmount()');
		socket.disconnect();
	}

	handlePostMessage = () => {
		socket.emit('All message', { name: userInfo.name, message: this.state.message });
	};

	handleWhisperMessage = () => {
		socket.emit('whisper message', {
			name: userInfo.name,
			email: userInfo.email,
			message: this.state.message,
			socketId: this.state.selectedRoom
		});
	};

	handleMassageChange = e => {
		this.setState({
			message: e.target.value
		});
	};

	// Enter Key 눌릴때
	handleKeyPress = e => {
		if (e.key === 'Enter') {
			if (this.state.selectedRoom === 'All') {
				this.handlePostMessage();
			} else {
				this.handleWhisperMessage();
			}

			this.setState({
				message: ''
			});
		}
	};

	handleClickRoom = socketId => {
		console.log(socketId);
		this.setState({
			selectedRoom: socketId
		});
	};

	render() {
		return (
			<div className="row fullscrean">
				<div className="col-2">
					<ChatRoomList
						channelList={this.state.channelList}
						connectList={this.state.connectList}
						unConnectList={this.state.unConnectList}
						selectedRoom={this.state.selectedRoom}
						handleClickRoom={this.handleClickRoom}
					/>
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