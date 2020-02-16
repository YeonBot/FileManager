import React from 'react';
import './Login.css';

const Register = () => {
	return (
		<div className="text-center">
			<form className="form-signin">
				<img
					className="mb-4"
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQrhRq8OwKDpafPNc-6QTjaIwILBSCHqvfqnI_CVh2utdPh6QOZ"
					width="72"
					height="72"
				/>
				<h1 className="h3 mb-3 font-weight-normal">회원 가입 해주세요</h1>
				<input
					type="email"
					id="inputEmail"
					className="form-control"
					placeholder="이메일"
					required
					autoFocus
				/>
				<input
					type="password"
					id="inputPassword"
					className="form-control"
					placeholder="비밀번호"
					required
				/>
				<input
					type="password"
					id="inputPassword2"
					className="form-control"
					placeholder="비밀번호 확인"
					required
				/>
				<input
					type="text"
					id="inputNickname"
					className="form-control"
					placeholder="비밀번호"
					required
				/>
				<div className="checkbox mb-3">
					<label>
						<input type="checkbox" value="remember-me" /> Remember me
					</label>
				</div>
				<button className="btn btn-lg btn-primary btn-block" type="submit">
					계정 만들기
				</button>
				<p className="mt-5 mb-3 text-muted">
					이미 계정이 있으신가요 ? <a>로그인</a>
				</p>
			</form>
		</div>
	);
};

export default Register;