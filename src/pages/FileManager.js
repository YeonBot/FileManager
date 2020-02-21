import React from 'react';
import * as FileService from 'services/fileService';

class FileManager extends React.Component {
	state = {
		selectedFile: null,
		allFileData: []
	};

	componentDidMount() {
		console.log('componentDidMount');
		FileService.getFileList(this.props).then(result => {
			if (typeof result == 'object')
				this.setState({
					allFileData: result
				});
		});
	}

	handleFileInput = (e) => {
		this.setState({
			selectedFile: e.target.files[0]
		});
	}

	handlePost = () => {
		if(!this.state.selectedFile){
			return alert('파일을 선택해주세요.');
		}
			
		const formData = new FormData();
		formData.append('file', this.state.selectedFile);

		FileService.postFile(formData,this.props);
		
		// return axios
		// 	.post('/api/upload', formData)
		// 	.then(res => {
		// 		alert('성공');
		// 	})
		// 	.catch(err => {
		// 		alert('실패');
		// 	});
	}

	showFileList = () => {
		if (this.state.allFileData.length === 0) return;
		return this.state.allFileData.map(fileData => {
			return <li>{fileData.originalname}</li>;
		});
	};

	render() {
		return (
			<div>
				<h2>FileManager</h2>

				<form onSubmit={this.handleSubmit}>
					<label>
						upload file :
						<input type="file" name="file" onChange={e => this.handleFileInput(e)} />
					</label>
					<br />
					<button type="submit" onClick={() => this.handlePost()}>
						Submit
					</button>
				</form>

				<ul>{this.showFileList()}</ul>
			</div>
		);
	}
}

export default FileManager;