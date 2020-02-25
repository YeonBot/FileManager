import React from 'react';
import styled from 'styled-components';

const ChatRoomListFrame = styled.div`
	height: 100%;
	border-right: 1px solid #808080;
	padding: 80px 0 0 0; 
`

const ChatRoomList = (props) => {
	
	return (
		<ChatRoomListFrame>
			<div className="row">
				<h5>Channels</h5>
			</div>
			<div className="row">
				<h5>Direct Messages</h5>
			</div>
		</ChatRoomListFrame>
	);
};

export default ChatRoomList;