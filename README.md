## 웹 페이지 개발 일지

## 목차
- [React 와 Node Proxy 설정](#React 와 Node Express Proxy 설정)
- [react-router사용 하기](#react-router사용 하기)
- [회원가입 화면 부트스트랩으로 꾸미기](#회원가입 화면 부트스트랩으로 꾸미기)

## React 와 Node Proxy 설정

create-react-app v2에서 새롭게 추가된 기능 중 하나인 proxy 설정 커스터 마이징을 이용

Http-Proxy-middleware, npm-run-all 모듈을 이용해서 명령어 하나로 client와 server를 동시에 띄우기

~~~javascript
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        proxy('/api', {
            target: 'http://localhost:3001/'
        })
    );
};
~~~
react app에서 localhost/api/* 경로로 요청을 보내면 프록시가 동작하여 127.0.0.1:3001로 요청을 보내게 하기

출처 : https://basketdeveloper.tistory.com/52

## react-router사용 하기

 react-router 는, 써드파티 라이브러리로서, 비록 공식은 아니지만 (페이스북 공식 라우팅 라이브러리는 존재하지 않습니다) 가장 많이 사용되고 있는 라이브러리
 
 로그인, 회원가입, 홈 화면을 나누어 react-router-dom을 이용해 웹 페이지 변경 해줌
 
동적 라우팅으로 어디에나 사용 가능

react-router-dom 은 웹 페이지 , react-router-native 는 모바일에서 사용 


출처 : https://velopert.com/3417

## 회원가입 화면 부트스트랩으로 꾸미기

![회원가입 페이지](https://user-images.githubusercontent.com/39260395/74606564-d56b5b80-5114-11ea-88b2-734ad8cbeb71.png)
부트스트랩을 이용해서 만들고 css를 직접 변경 했다.  
css 가 금방 더러워 질거 같아서 scss 또는 componentstyled 를 얼른 도입 해야 할거 같다 
