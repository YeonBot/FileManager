import React, { useReducer } from 'react';
import './Login.css';

function reducer(state, action) {
	return {
		...state,
		[action.name]: action.value
	};
}

const Register = () => {
	const [state, dispatch] = useReducer(reducer, {
		email: '',
		password: '',
		passwordCheck: '',
		name: ''
	});

	const { email, password, passwordCheck, name } = state;
	const onChange = e => {
		dispatch(e.target);
	};

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
					className="form-control"
					placeholder="이메일"
					name="email"
					value={state.email}
					onChange={onChange}
					required
					autoFocus
				/>
				<input
					type="password"
					className="form-control"
					placeholder="비밀번호"
					name="password"
					value={password}
					onChange={onChange}
					required
				/>
				<input
					type="password"
					className="form-control"
					placeholder="비밀번호 확인"
					name="passwordCheck"
					value={passwordCheck}
					onChange={onChange}
					required
				/>
				<input
					type="text"
					className="form-control"
					placeholder="이름"
					name="name"
					value={name}
					onChange={onChange}
					required
				/>
				<div className="checkbox mb-3">
					<label>
						<input type="checkbox" value="remember-me" /> Remember me 지워
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