import React from 'react';
import styled from 'styled-components';

import { Controlled as CodeMirror } from 'react-codemirror2';
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material-darker.css');
require('codemirror/theme/dracula.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/cmake/cmake');
require('codemirror/mode/markdown/markdown');

const FileTextAreaWrapper = styled.div`
	height: 100%;
	left: 0px;
	position: relative;
	padding: 80px 10px 10px 10px;
	overflow: scroll;
	border-left: 1px solid #808080;
`;

const Mirror = styled(CodeMirror)`
	.CodeMirror {
	height: 76vh;
}
`;

const FileTextArea = props => {
	const showSelectedFileName = () => {
		if (props.selectedFile && props.selectedFile.path) {
			const fileLocation = props.selectedFile.path.split('-');
			return <h5>Curret Path : {fileLocation[0].replace('server/upload', '')}</h5>;
		}
		return <h5>Curret Path : /</h5>;
	};

	var options = {
		lineNumbers: true,
		theme: 'dracula'
	};

	return (
		<FileTextAreaWrapper>
			{showSelectedFileName()}
			<Mirror
				value={props.fileContent}
				options={options}
				onBeforeChange={(editor, data, value) => props.handleTextAreaChange(value)}
				onChange={(editor, data, value) => {}}
				scroll={{
					x: 50,
					y: 50
				}}
			/>
			<hr/>
			<button className="btn btn-outline-dark" onClick={() => props.handleSave()}>
				Save
			</button>
			<span> </span>
			<button className="btn btn-outline-dark" onClick={() => props.handleDelete()}>
				Delete
			</button>
		</FileTextAreaWrapper>
	);
};

export default FileTextArea;