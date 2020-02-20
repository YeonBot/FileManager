import React from 'react';
import * as FileService from 'services/fileService';

class FileManager extends React.Component {
	state = {
		allFileData: []
	};

	componentDidMount() {
		console.log('componentDidMount');
		FileService.getFileList().then(result => {
			if (typeof result == "object")
				this.setState({
					allFileData: result
				});
		});
	}

	showFileList = () => {
		// console.log(this.state.allFileData);
		// console.log(typeof this.state.allFileData);
		// console.log(typeof this.state.allFileData.length);
		if(this.state.allFileData.length === 0)
			return;
		return this.state.allFileData.map(fileData => {
			return <li>{fileData.originalname}</li>;
		});
	};

	render() {
		return (
			<div>
				<h2>FileManager</h2>
				<form action="/api/file" method="post" encType="multipart/form-data">
					<input type="file" name="imgFile" />
					<input type="submit" value="파일 업로드하기" />
				</form>
				<ul>{this.showFileList()}</ul>
			</div>
		);
	}
}

export default FileManager;