## 웹 페이지 개발 일지

## 목차
- [React 와 Node Proxy 설정](#React 와 Node Express Proxy 설정)
- [react-router사용 하기](#react-router사용 하기)
- [회원가입 화면 부트스트랩으로 꾸미기](#회원가입 화면 부트스트랩으로 꾸미기)
- [회원가입 화면 에서 Hook 이용해서 값 받기](#R회원가입 화면 에서 Hook 이용해서 값 받기)

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

## 회원가입 화면 에서 Hook 이용해서 값 받기

react,react-dom 16.8 이상. -> Hook 사용하는데 에러나서 react 업데이트
package.json 전체적으로 업그레이드 하기 :: npm-check-updates  
https://ux.stories.pe.kr/58

useReducer 를 이용해 여러 parameter 를 입력 받음

### Hook 이란 ?
상태와 생명주기를 관리 하는 새로운 방법

#### `장단점`
장점
- 응집성과 조립성, 코드의 양이 적다 (class 보다)
- 라이프 사이클 메서드 보다 단순  

단점
- 클래스에서 사용 불가,  

##### `규칙`
- Top Level 에서만 Hook 을 호출 해야 한다. 반복문 조건문, 중첩된 함수 내에서 Hook 호출 금지  
- 오직 React 함수 내에서 Hook 을 호출


아직은 잘모르겠다 . 써보고 다시 정리 하자  


## 하고 싶은거
- TypeScript 추가
- ESLint 추가
- 