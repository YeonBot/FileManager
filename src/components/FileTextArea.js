import React from 'react';

import { Controlled as CodeMirror } from 'react-codemirror2';
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material-darker.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/cmake/cmake');
require('codemirror/mode/markdown/markdown');


const FileTextArea = (props) => {
	const showSelectedFileName =() => {
		if(props.selectedFile && props.selectedFile.path){
			const fileLocation = props.selectedFile.path.split('-');
			return (<h5>Curret Path : {fileLocation[0].replace('server/upload','')}</h5>)
		}
		return (<h5>Curret Path : /</h5>)
	}
	
	var options = {
			lineNumbers: true,
			theme: 'material-darker'
		};
	
	return (
		<div>
			{showSelectedFileName()}
			<CodeMirror
				value={props.fileContent}
				options={options}
				onBeforeChange={(editor, data, value) => props.handleTextAreaChange(value)}
				onChange={(editor, data, value) => {}}
			/>
			<button class="btn btn-dark" onClick={() => props.handleSave()}>Save</button>
		</div>
	);
};

export default FileTextArea;