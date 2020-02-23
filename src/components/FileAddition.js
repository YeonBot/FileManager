import React from 'react';
import styled from 'styled-components';

const FileAddition = props => {
	return (
		<div>
			<label>
				<input
					type="file"
					class="form-control btn btn-dark"
					name="file"
					onChange={e => props.handleFileInput(e)}
				/>
			</label>
			<br />
			<button type="button" class="btn btn-dark" onClick={() => props.handlePost()}>
				파일 추가 하기
			</button>
		</div>
	);
};

export default FileAddition;