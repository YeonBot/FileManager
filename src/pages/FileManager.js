import React from 'react';
import * as FileService from 'services/fileService';

class FileManager extends React.Component {
	
	componentDidMount() {
		console.log('componentDidMount');
		FileService.getFileList();
	}
	
	render() {
		return (
			<div>
				<h2>FileManager</h2>
				<form action="/api/file" method="post" encType="multipart/form-data">
					<input type="file" name="imgFile" />
					<input type="submit" value="파일 업로드하기" />
				</form>
				<ul>{}</ul>
			</div>
		);
	}
}

export default FileManager;