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
