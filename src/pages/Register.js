import React, { useReducer } from 'react';
import axios from 'axios';
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

	const onClick = () => {
		console.log('onClick');
		//TODO: 데이터가 비진 않았는지 check
		//비밀번호가 같은지
		//이메일 형식인지
		
		register();
	};

	const register = () => {
		console.log('registeraaa');
		axios
			.post('/api/user/signup',{
			email:email,
			password:password,
			name:name
		})
			.then(response => {
				console.log(response);
			})
			.catch(response => {
				console.log(response);
			});
	};

	return (
		<div className="text-center">
			<div className="form-signin">
				<img
					className="mb-4"
					alt=""
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
					value={email}
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
				<button className="btn btn-lg btn-primary btn-block" onClick={onClick}>
					계정 만들기
				</button>
				<p className="mt-5 mb-3 text-muted">이미 계정이 있으신가요 ? 로그인</p>
			</div>
		</div>
	);
};

export default Register;