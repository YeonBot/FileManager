import React from 'react';
import styled from 'styled-components';

const FileListViewWrapper = styled.div`
	padding : 80px 0 0 0 0;
`

const SelectedLi = styled.li`
	background: white;
`

const UnSelectedLi = styled.li`
	background: #353B40;
	color: #fff;
`

const FileListView = (props) => {
	
	const showFileList = () => {
		if (props.allFileData.length === 0) return;
		return props.allFileData.map(fileData => {
			const fileLocation = fileData.path.split('-');
			const viewLocation = fileLocation[0].replace('server/upload','');
			return (props.selectedFile && fileData.path === props.selectedFile.path)
			? <SelectedLi key={fileLocation[1]} onClick={() => props.clickFileList(fileData._id)}>{viewLocation}</SelectedLi>
			: <UnSelectedLi key={fileLocation[1]} onClick={() => props.clickFileList(fileData._id)}>{viewLocation}</UnSelectedLi>
		});
	};
	
	return (
		<FileListViewWrapper>
			<ul>{showFileList()}</ul>
		</FileListViewWrapper>
	);
};

export default FileListView;