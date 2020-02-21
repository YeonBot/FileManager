import React from 'react';
import * as FileService from 'services/fileService';

class FileManager extends React.Component {
	state = {
		postFile: null,
		selectedFile: null,
		fileContent: '',
		allFileData: []
	};

	componentDidMount() {
		console.log('componentDidMount');
		this.initFileList();
	}

	initFileList = () => {
		FileService.getFileList(this.props).then(result => {
			if (typeof result == 'object')
				this.setState({
					allFileData: result
				});
		});
	};

	handleTextAreaChange = e => {
		this.setState({ fileContent: e.target.value });
	};

	handleSave = async () => {
		console.log('put axios data');
		FileService.editFile(this.state.fileContent,this.state.selectedFile,this.props);
	};

	handleFileInput = e => {
		this.setState({
			postFile: e.target.files[0]
		});
	};

	handlePost = async () => {
		if (!this.state.postFile) {
			return alert('파일을 선택해주세요.');
		}

		const formData = new FormData();
		formData.append('file', this.state.postFile);

		await FileService.postFile(formData, this.props);
		this.initFileList();
	};

	clickFileList = async fileId => {
		console.log(fileId);
		const file = await FileService.getFile(fileId, this.props);

		this.setState({
			fileContent: file.fileContent,
			selectedFile: file
		});
	};

	showFileList = () => {
		if (this.state.allFileData.length === 0) return;
		return this.state.allFileData.map(fileData => {
			return (
				<li onClick={() => this.clickFileList(fileData._id)}>
					{fileData.originalname}
				</li>
			);
		});
	};

	render() {
		return (
			<div>
				<h2>FileManager</h2>

				<label>
					upload file :
					<input type="file" name="file" onChange={e => this.handleFileInput(e)} />
				</label>
				<br />
				<button onClick={() => this.handlePost()}>Submit</button>

				<ul>{this.showFileList()}</ul>

				<textarea value={this.state.fileContent} onChange={this.handleTextAreaChange} />
				<button onClick={() => this.handleSave()}>Save</button>
			</div>
		);
	}
}

export default FileManager;