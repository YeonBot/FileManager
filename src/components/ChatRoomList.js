import React from 'react';
import styled from 'styled-components';

const ChatRoomListFrame = styled.div`
	height: 100%;
	border-right: 1px solid #808080;
	padding: 90px 0 0 10px;
`;

const Ul = styled.ul`list-style: none;
`;

const Connectli = styled.li`
	&:before {
		content: "●";
		color: #2BAC76;
		font-weight: lighter;
		display: inline-block;
		width: 1em;
		margin-left: -1em;
	}
`;

const UnConnectli = styled.li`
	&:before {
		content: "○";
		color: #080808;
		font-weight: lighter;
		display: inline-block;
		width: 1em;
		margin-left: -1em;
	}
`;

const ChatRoomList = props => {
	const showChannelList = () => {
		return props.channelList.map((channel, idx) => {
			return <li key={channel+idx}>{channel}</li>;
		});
	};

	const showConnectList = () => {
		return props.connectList.map((user, idx) => {
			return <Connectli key={user+idx}>{user}</Connectli>;
		});
	};

	const showUnConnectList = () => {
		return props.unConnectList.map((user, idx) => {
			return <UnConnectli key={user+idx}>{user}</UnConnectli>;
		});
	};

	return (
		<ChatRoomListFrame>
			<div className="row">
				<h5>Channels</h5>
			</div>
			<div className="row">
				<ul>{showChannelList()}</ul>
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