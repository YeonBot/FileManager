import React from 'react';
import styled from 'styled-components';

const ChatRoomListFrame = styled.div`
	height: 100%;
	border-right: 1px solid #808080;
	padding: 90px 0 0 10px;
`;

const Ul = styled.ul`list-style: none;`;

const Connectli = styled.li`
	&:before {
		content: '●';
		color: #2bac76;
		font-weight: lighter;
		display: inline-block;
		width: 1em;
		margin-left: -1em;
	}
`;

const Roomli = styled.li`
	&:before {
		content: '○';
		color: #080808;
		font-weight: lighter;
		display: inline-block;
		width: 1em;
		margin-left: -1em;
	}
`;

const UnConnectli = styled.li`
	&:before {
		content: '○';
		color: #080808;
		font-weight: lighter;
		display: inline-block;
		width: 1em;
		margin-left: -1em;
	}
`;

const SelectedLi = styled.li`
	border-bottom : 1px solid #808080;
	&:before {
		content: '●';
		font-weight: lighter;
		display: inline-block;
		width: 1em;
		margin-left: -1em;
	}
`;

const ChatRoomList = props => {
	const showChannelList = () => {
		return props.channelList.map((channel, idx) => {
			if (channel === props.selectedRoom) {
				return <SelectedLi key={channel + idx}>{channel}</SelectedLi>;
			}
			return (
				<Roomli key={channel + idx} onClick={() => props.handleClickRoom(channel)}>
					{channel}
				</Roomli>
			);
		});
	};

	const showConnectList = () => {
		return props.connectList.map((user, idx) => {
			if (user.socketId === props.selectedRoom) {
				return <SelectedLi key={user + idx}>{user.name}</SelectedLi>;
			}
			return (
				<Connectli key={user + idx} onClick={() => props.handleClickRoom(user.socketId)}>
					{user.name}
				</Connectli>
			);
		});
	};

	const showUnConnectList = () => {
		return props.unConnectList.map((user, idx) => {
			return <UnConnectli key={user + idx}>{user}</UnConnectli>;
		});
	};

	return (
		<ChatRoomListFrame>
			<div className="row">
				<h5>Channels</h5>
			</div>
			<div className="row">
				<Ul>{showChannelList()}</Ul>
			</div>
			<div className="row">
				<h5>Direct Messages</h5>
			</div>
			<div className="row">
				<Ul>{showConnectList()}</Ul>
			</div>
			<div className="row">
				<Ul>{showUnConnectList()}</Ul>
			</div>
		</ChatRoomListFrame>
	);
};

export default ChatRoomList;