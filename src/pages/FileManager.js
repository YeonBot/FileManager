import React from 'react';
import * as FileService from 'services/fileService';

import { FileTextArea, FileAddition, FileListView } from 'components';

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

	handleTextAreaChange = value => {
		this.setState({ fileContent: value });
	};

	handleSave = async () => {
		FileService.editFile(this.state.fileContent, this.state.selectedFile, this.props);
	};

	handleDelete = async () => {
		await FileService.deleteFile(this.state.selectedFile, this.props);
		this.initFileList();
	};

	handleFileInput = e => {
		console.log(e.target.files[0]);
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

		if (!file) {
			this.initFileList();
		} else {
			this.setState({
				fileContent: file.fileContent,
				selectedFile: file
			});
		}
	};

	render() {
		return (
			<div className="row fullscrean">
				<div className="col-3">
					<FileAddition
						handleFileInput={this.handleFileInput}
						handlePost={this.handlePost}
						postFile={this.state.postFile}
					/>
					<FileListView
						selectedFile={this.state.selectedFile}
						allFileData={this.state.allFileData}
						clickFileList={this.clickFileList}
					/>
				</div>
				<div className="col-9">
					<FileTextArea
						selectedFile={this.state.selectedFile}
						fileContent={this.state.fileContent}
						handleTextAreaChange={this.handleTextAreaChange}
						handleSave={this.handleSave}
						handleDelete={this.handleDelete}
					/>
				</div>
			</div>
		);
	}
}

export default FileManager;