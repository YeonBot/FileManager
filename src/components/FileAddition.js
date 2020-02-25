import React from 'react';
import styled from 'styled-components';

const FileAdditionWrapper = styled.div`
	height: 25%;
	left: 0px;
	position: relative;
	padding: 90px 10px 10px 10px;
	border-bottom: 1px solid #E8E8E8;
`

const Blank = styled.div`padding: 5px;`;

const FileAddition = props => {
	return (
		<FileAdditionWrapper>
			<h5>파일 올리기</h5>
			<div className="custom-file">
				<input
					name="file"
					type="file"
					className="custom-file-input "
					id="customFileLang"
					onChange={e => props.handleFileInput(e)}
				/>
				<label className="custom-file-label" htmlFor="customFileLang" data-browse="찾기">
					{props.postFile ? props.postFile.name : 'Input File'}
				</label>
			</div>
			<Blank />
			<button
				type="button"
				className="btn btn-outline-dark"
				onClick={() => props.handlePost()}
			>
				올리기
			</button>
		</FileAdditionWrapper>
	);
};

export default FileAddition;