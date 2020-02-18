import React from 'react';
import { Link } from 'react-router-dom';
import * as userService from 'services/userService';

function Header(props) {
	
	const logout = () => {
		userService.logout(props);
	}
	
	const authHeader = () => {
		return !localStorage.getItem('user') ? (
			<div>
				<Link to={'/login'}>로그인</Link>
				<Link to={'/register'}>회원가입</Link>
			</div>
		) : (
			<div>
				<button onClick={() =>logout()}>로그아웃</button>
			</div>
		);
	};

	return (
		<header className="App-header">
			<Link to={'/'}>홈</Link>
			{authHeader()}
			<Link to={'/fileManager'}>파일 매니저</Link>
			<Link to={'/chattingManager'}>채팅</Link>
		</header>
	);
}

export default Header;