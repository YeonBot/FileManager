import React from 'react';
import styled from 'styled-components';

import { Controlled as CodeMirror } from 'react-codemirror2';
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material-darker.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/cmake/cmake');
require('codemirror/mode/markdown/markdown');

const FileTextAreaWrapper = styled.div`
	height: 100%;
	left: 0px;
	position: relative;
	padding: 80px 10px 10px 10px;
	overflow: scroll;
`;

const Mirror = styled(CodeMirror)`

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
		theme: 'material-darker'
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
			<button className="btn btn-dark" onClick={() => props.handleSave()}>
				Save
			</button>
			<button className="btn btn-dark" onClick={() => props.handleDelete()}>
				Delete
			</button>
		</FileTextAreaWrapper>
	);
};

export default FileTextArea;