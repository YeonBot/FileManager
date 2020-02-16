import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
	return (
		<header className="App-header">
			<Link to={'/'}>홈</Link>
			<Link to={'/login'}>로그인</Link>
			<Link to={'/register'}>회원가입</Link>
		</header>
	);
}

export default Header;