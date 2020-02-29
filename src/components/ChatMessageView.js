import React, { useEffect } from 'react';
import styled from 'styled-components';

const TextOuterWrapper = styled.div`
	height: 90%;
	left: 0px;
	position: relative;
	padding: 90px 0px 0px 0px;
	overflow: hidden;
`;

const TextMiddleWrapper = styled.div`
	height: 100%;
	width: 100%;
	left: 0px;
	border: 0.5px solid #808080;
	position: relative;
	overflow: scroll;
`;

const TextInnerWrapper = styled.div`
	position: absolute;
	height: -webkit-fill-available;
	bottom: 0;
	padding: 10px;
`;

const TextWrapper = styled.div`padding: 10px;`;

const UserName = styled.span`font-weight: bold;`;

const ChatMessageView = props => {
	useEffect(() => {
		var objDiv = document.getElementById('messageScroll');
		objDiv.scrollTop = objDiv.scrollHeight;
	});

	const showMessageView = () => {
		if (props.selectedRoom === 'All') {
			return props.text.map((message, idx) => {
				return (
					<TextWrapper key={message + idx}>
						<UserName>{message.name} </UserName> {message.message}
					</TextWrapper>
				);
			});
		}else {
			const data = props.whisperMessage.filter((whisper) => whisper.email === props.selectedRoom.email);

			if(data[0]){
				return data[0].messageData.map((message,idx) => {
					return (
					<TextWrapper key={message + idx}>
						<UserName>{message.name} </UserName> {message.message}
					</TextWrapper>
				);
				})
			}else {
				return null;
			}
		}
	};

	return (
		<TextOuterWrapper>
			<TextMiddleWrapper id="messageScroll">
				<TextInnerWrapper>{showMessageView()}</TextInnerWrapper>
			</TextMiddleWrapper>
		</TextOuterWrapper>
	);
};

export default ChatMessageView;