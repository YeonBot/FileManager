import React from 'react';

const FileAddition = props => {
	return (
		<div>
			<label>
				<input
					type="file"
					className="form-control btn btn-dark"
					name="file"
					onChange={e => props.handleFileInput(e)}
				/>
			</label>
			<br />
			<button type="button" className="btn btn-dark" onClick={() => props.handlePost()}>
				파일 추가 하기
			</button>
		</div>
	);
};

export default FileAddition;