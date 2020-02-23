import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import * as UserService from 'services/userService';

const StyledLink = styled(NavLink)`
	color: white;
	margin: 1vw;
	font-weight: bold;
	&:hover {
		color:#007BFF;
		text-decoration: none;
	}
	&.active {
		color: #007BFF;
	}
`;

const StyledLogoutButton = styled.button`
	color: white;
	margin: 1vw;
	font-weight: bold;
	background-color:  transparent !important;;
	border:none;
	&:hover {
		color:#007BFF;
	}
	
`

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
				<StyledLogoutButton onClick={() => logout()}> {JSON.parse(userInfo).name} 님 </StyledLogoutButton>
				<StyledLogoutButton onClick={() => logout()}> 로그아웃 </StyledLogoutButton>
			</React.Fragment>
		);
	};

	return (
		<header className="App-header">
			<div className="container">
				<div className="row">
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
					<div className="col text-right">{authHeader()}</div>
				</div>
			</div>
		</header>
	);
}

export default Header;