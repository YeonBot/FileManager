import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
	height: 10%;
	left: 0px;
	bottom: 20px;
	text-align: center;
	padding: 0 15px 15px 0;
`;

const InputMessage  = styled.input`
	width: 100%;
	height: 100%;
	padding: 15px;
	border-radius: 5px;
`

const ChatRoomList = props => {
	return (
		<InputWrapper>
			<InputMessage
				value={props.message}
				placeholder="Message"
				onChange={props.handleMassageChange}
				onKeyPress={props.handleKeyPress}
			/>
		</InputWrapper>
	);
};

export default ChatRoomList;