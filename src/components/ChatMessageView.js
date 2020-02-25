import React, { useEffect } from 'react';
import styled from 'styled-components';

const TextOuterWrapper = styled.div`
	height: 90%;
	left: 0px;
	position: relative;
	padding: 80px 10px 10px 10px;
	overflow: scroll;
`;

const TextInnerWrapper = styled.div`
	position: absolute;
  	bottom: 0;
	padding: 10px;
`;

const TextWrapper = styled.div`padding: 10px;`;

const ChatMessageView = props => {
	
  useEffect(() => {
	  var objDiv = document.getElementById("messageScroll"); 
	  objDiv.scrollTop = objDiv.scrollHeight;
  });

	return (
		<TextOuterWrapper id="messageScroll">
			<TextInnerWrapper>
				<TextWrapper>{props.text}</TextWrapper>
			</TextInnerWrapper>
		</TextOuterWrapper>
	);
};

export default ChatMessageView;