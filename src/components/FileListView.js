import React from 'react';
import styled from 'styled-components';

const FileListViewWrapper = styled.div`
	height: 70%;
	left: 0px;
	position: relative;
	padding: 10px 10px 10px 10px;
	overflow: scroll;
`
const SelectedLi = styled.li`
	background: #353B40;
	color: #fff;
padding-left: 1em;
  text-indent: -1em;
&:before {
  content: "▶";
  padding-right: 5px;
}
`

const UnSelectedLi = styled.li`
	background: white;
padding-left: 1em;
  text-indent: -1em;
&:before {
  content: ">";
  padding-right: 5px;
}
`
const CustomUl = styled.ul`
	list-style: none;
  margin-left: 0;
  padding-left: 0;
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
			<h5>파일 목록</h5>
			<CustomUl>{showFileList()}</CustomUl>
		</FileListViewWrapper>
	);
};

export default FileListView;