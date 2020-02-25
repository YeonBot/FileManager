import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import * as UserService from 'services/userService';

const StyledLink = styled(NavLink)`
	color: black;
	margin: 1vw;
	font-weight: bold;
	&:hover {
		color: #fff;
		-webkit-text-stroke: 0.5px #000;
		text-decoration: none;
	}
	&.active {
		color: #fff;
		-webkit-text-stroke: 0.5px #000;
	}
`;

const StyledLogoutButton = styled.button`
	color: black;
	margin: 1vw;
	font-weight: bold;
	background-color: transparent !important;
	border: none;
	&:hover {
		color: #fff;
		-webkit-text-stroke: 0.5px #000;
	}
`;

function Header(props) {
	const logout = () => {
		UserService.logout(props);
	};

	const authHeader = () => {
		const userInfo = localStorage.getItem('user');
		return !userInfo ? (
			<React.Fragment>
				<StyledLink activeClassName="active" to={'/login'}>
					로그인
				</StyledLink>
				<StyledLink activeClassName="active" to={'/register'}>
					회원가입
				</StyledLink>
			</React.Fragment>
		) : (
			<React.Fragment>
				<StyledLogoutButton onClick={() => logout()}>
					{' '}
					{JSON.parse(userInfo).name} 님{' '}
				</StyledLogoutButton>
				<StyledLogoutButton onClick={() => logout()}> 로그아웃 </StyledLogoutButton>
			</React.Fragment>
		);
	};

	return (
		<header className="App-header">
			<div className="container h-100">
				<div className="row h-100">
					<div className="col text-left align-self-center">
						<StyledLink activeClassName="active" exact to={'/'}>
							홈
						</StyledLink>
						<StyledLink activeClassName="active" to={'/fileManager'}>
							파일
						</StyledLink>
						<StyledLink activeClassName="active" to={'/chattingManager'}>
							채팅
						</StyledLink>
					</div>
					<div className="col text-right align-self-center">{authHeader()}</div>
				</div>
			</div>
		</header>
	);
}

export default Header;