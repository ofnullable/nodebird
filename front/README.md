# 1일차
* 프로젝트 기본 설정
  * react, react-dom, next, antd
  * nodemon, webpack, eslint - [.eslintrc](./.eslintrc)
  * eslint-plugin-import eslint-plugin-react eslint-plugin-reack-hooks
  * 사실 eslint는 아직 설치 안함.. ~~귀찮게 할거같아~~
* 페이지 만들어보기
  * Pages 안에 파일 만드는것만으로 페이지가 생성된다.
  * Custom Hooks! [signup.js:9](./pages/signup.js)
  * component tag 사이에 component 또는 html tag를 넣으면 `{ children }`으로 받을 수 있다.  
<br/>

# 2일차
* 공통부분 추출
  * `_app.js`로 공통부분 추출할 수 있음
  * `{ Component }`를 props로 받는다 ( 공통 레이아웃 외 component들 )
  * `_document.js, _app.js, pages`
    * `_document.js` => `<html>, <head>, <body>` 설정할 수 있음
    * `_app.js` => 공통 레이아웃을 작성할 수 있음
    * `_error.js` => 에러페이지 작성
* 컴포넌트 최적화
  * 함수를 props로 전달하는 경우에는 useCallback 꼭 써라
    * 지금은 알겠는데 나중엔 까먹을듯..
    * Event Handler등을 전달할 때 주의할것
  * `<Form/>`은 꼭 분리해주는것이 좋다.
  * 어차피 `<input/>`에 Custom hooks 적용할거면 인풋단위 최적화가 가능하긴.. 할거같다~~ㅠ~~
* `PropTypes`
  * PropTypes를 활용해서 부모 component를 통해 받는 props의 타입을 지정할 수 있다.
  * PropTypes의 종류 및 사용법은 [npm - prop-types](https://www.npmjs.com/package/prop-types)참조  
<br/>

# 3일차
* `Redux`
  * Why?
    * 여러 Component에 흩어져있는 같은 state들의 관리가 어려움
    * 흩어져있는 state들을 한곳에서 관리한다면?
    * 안정성의 증가 및 state의 관리 및 통제가 용이해진다!
  <!-- * 기본 구조 ( initialState ) -->
  * Store => 모아놓은 state들, action을 통해서만 변경할 수 있다.
  * Action => state를 바꾸는 행동 자체를 말한다.
  * Dispatch => action을 실행시키는것
    * `Action을 Dispatch해야 state가 변경된다`
  * Reducer => Action의 결과로 state를 어떻게 바꿀지 정의해놓은것
    * () => `foo`라는 state의 값을 `bar`로 변경해라! 
  * Redux의 hooks를 사용하려면 `v7.1.0` 이상을 사용해야 한다!!
  * Redux가 관리할 state를 group으로 나눠서 관리하면 관리 및 사용이 용이하다!
* 일단 Hooks로 사용하는 예제? 정도 배워봤는데 기존 class component에서는 어떻게 썼었지..
<br/>

# 4일차
* `Redux`의 Action에서 동적인 data 처리
  * Action을 함수로 만들어 parameter를 통해 data를 만든다.
* `Generator`
  * 무한을 control (?)
  * iterator를 control 한다..?
  * 코드 실행을 제어한다고 생각하면 되는건가..
* `Redux-saga`
  * Why?
    * `Redux`는 Action을 동기적으로 처리한다.
    * 하지만, server와 통신할때에는 비동기 처리가 훨씬 많이 필요함
    * 따라서 `Redux-saga`라는 Middleware를 활용해서 비동기 동작을 처리한다..
  * `Redux`의 특정 Action이 실행되는걸 `watch`하게 해놓는다.
  * `watch`하고 있는 Action이 실행될 때 비동기 요청을 실행한다.
