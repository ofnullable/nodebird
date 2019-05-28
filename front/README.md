# 1일차

- 프로젝트 기본 설정
  - react, react-dom, next, antd
  - nodemon, webpack, eslint - [.eslintrc](./.eslintrc)
  - eslint-plugin-import eslint-plugin-react eslint-plugin-reack-hooks
  - 사실 eslint는 아직 설치 안함.. ~~귀찮게 할거같아~~
- 페이지 만들어보기
  - Pages 안에 파일 만드는것만으로 페이지가 생성된다.
  - Custom Hooks! [signup.js:9](./pages/signup.js)
  - component tag 사이에 component 또는 html tag를 넣으면 `{ children }`으로 받을 수 있다.  
    <br/>

# 2일차

- 공통부분 추출
  - `_app.js`로 공통부분 추출할 수 있음
  - `{ Component }`를 props로 받는다 ( 공통 레이아웃 외 component들 )
  - `_document.js, _app.js, pages`
    - `_document.js` => `<html>, <head>, <body>` 설정할 수 있음
    - `_app.js` => 공통 레이아웃을 작성할 수 있음
    - `_error.js` => 에러페이지 작성
- 컴포넌트 최적화
  - 함수를 props로 전달하는 경우에는 useCallback 꼭 써라
    - 지금은 알겠는데 나중엔 까먹을듯..
    - Event Handler등을 전달할 때 주의할것
  - `<Form/>`은 꼭 component로 분리해주는것이 좋다.
  - 어차피 `<input/>`에 Custom hooks 적용할거면 인풋단위 최적화가 가능하긴.. 할거같다~~ㅠ~~
- `PropTypes`
  - PropTypes를 활용해서 부모 component를 통해 받는 props의 타입을 지정할 수 있다.
  - PropTypes의 종류 및 사용법은 [npm - prop-types](https://www.npmjs.com/package/prop-types)참조  
    <br/>

# 3일차

- `Redux`
  - Why?
    - 여러 Component에 흩어져있는 같은 state들의 관리가 어려움
    - 흩어져있는 state들을 한곳에서 관리한다면?
    - 안정성의 증가 및 state의 관리 및 통제가 용이해진다!
      <!-- * 기본 구조 ( initialState ) -->
  - `Store` => 모아놓은 state들, action을 통해서만 변경할 수 있다.
  - `Action` => state를 바꾸는 행동 자체를 말한다.
  - `Dispatch` => action을 실행시키는것
    - `Action`을 `Dispatch`해야 state가 변경된다
  - `Reducer` => Action의 결과로 state를 어떻게 바꿀지 정의해놓은것
    - () => `foo`라는 state의 값을 `bar`로 변경해라!
  - Redux의 hooks를 사용하려면 `v7.1.0` 이상을 사용해야 한다!!
  - Redux가 관리할 state를 group으로 나눠서 관리하면 관리 및 사용이 용이하다.
- 일단 Hooks로 사용하는 예제? 정도 배워봤는데 기존 class component에서는 어떻게 썼었지..  
  <br/>

# 4일차

- `Redux`의 Action에서 동적인 data 처리
  - Action을 함수로 만들어 parameter를 통해 data를 만든다.
- `Generator`
  - 무한을 control(?)
  - iterator를 control 한다..?
  - 코드 실행을 제어한다고 생각하면 되는건가..
- `Redux-saga`
  - Why?
    - `Redux`는 Action을 동기적으로 처리한다.
    - 하지만, server와 통신할때에는 비동기 처리가 훨씬 많이 필요함
    - 따라서 `Redux-saga`라는 Middleware를 활용해서 비동기 동작을 처리한다..
  - `Redux`의 특정 Action이 Dispatch되는걸 `watch`하게 해놓는다.
  - `watch`하고 있는 Action이 Dispatch 될 때 비동기 요청을 실행한다.  
    <br/>

# 5일차

- `Generator`
  - `코드의 실행 제어기` 라고 생각하면 될거같다.
  - `yield` 키워드가 중단점 역할을 한다.
  - `yield*`은 뒤에 오는 값을 iterable로 처리하겠다는 의미이다.
  - ```js
    function* gen() {
      yield 1;
      yield 2;
      yield 3;
      yield* [1, 2, 3]; // 위 세 라인과 같은 의미
    }

    const generator = gen();
    generator.next(); // {value: 1, done: false} ...
    ```
- `Redux-saga`
  - `take()`
    - 인자로 받는 Action이 Dispatch 되길 기다린다고 명시하는것
    - `while (true) {}`안에 `take()`를 넣어줘야 여러번 수행할 수 있다.
    - Action이 Dispatch되는 횟수를 제한하고 싶으면 for loop를 통해 제어할 수 있다.
    - But, `Redux`와 `Redux-saga`는 별개로 동작한다..
    - => `Redux-saga`의 `take()`가 수행되지 않더라도 `Redux`의 Action은 Dispatch된다는 의미
  - `put()`
    - `Redux`의 Dispatch와 같은 역할
  - `takeLatest()`, `takeEvery()`
    - `while (true) {}`를 생략시킬 수 있게한다?
    - `takeEvery()`는 모든 요청을 수행하는것을 의미한다.
    - `takeLatest()`는 동시에 여러 요청이 발생했을 때 마지막 하나의 요청만 처리하는것을 의미한다.
  - `fork()`, `call()`
    - 둘 다 함수를 실행하는 역할을 한다.
    - `call()`은 동기 호출, `fork()`는 비동기 호출  
      <br/>

# 6일차

- DummyData를 활용하여 `Redux, Redux-saga`적용
  - `Redux, Redux-saga`의 흐름 정리
    - `Redux`를 통해 initial state 및 Action들과 reducer들을 정의
    - `Redux-saga`에서 특정 Action을 watch하게 한다. ( `EventListener`와 비슷한 느낌 )
    - Action이 Dispatch될 때 특정 api호출을 시도하고, 결과에 따른 Action을 수행한다.
  - 사용 방법은?
    - component가 mount될 때, 이벤트 발생시 `Redux-saga`가 watch하고있는 Action을 Dispatch한다.
    - 작성해놓은 코드에 따라 `Redux, Redux-saga`가 state를 변경한다.
    - 이후 변경된 state를 활용해 화면을 그린다.
  - ~~아니.. 해야될게 너무 많아..~~  
    <br/>

# 7일차

- `axios`를 활용한 Server와 통신
  - `Redux-saga`에서 특정 Action이 실행 될 때 `axios`를 활용하여 Server에 xhr 요청을 보낸다.  
    <br/>

# 8일차

- Hashtag 추출 후 next/link로 만들기
  - 정규식을 활용해 Hashtag 추출
  - server에서는 Hashtag들을 db에 저장
  - front에서는 Post의 content에서 다시 Hashtag를 추출하여 Link로 변환
  - 위 코드의 정규식에서 # => @ 로 변경하면 인용tag로 사용할 수 있겠다
- `Redux, Redux-saga` 노가다
  - 상태관리 해주는건 좋은데 작성할 코드가 너무 많아...
- SSR 적용을 위한 setup
  - `express, morgan, cookie-parser...`
  - next가 express를 품고있는 모양?  
    <br/>

# 9일차

- `getInitialProps`
  - `CopmonentDidMount`보다 먼저 실행되는 Component의 Life cycle
- `SSR + Link`의 올바른 사용법
  1. 동적인 URL을 처리할 수 있도록 [`server.js`](./server.js) mapping 해준다.
  2. next의 `Link` component의 속성을 변경한다.
     - ex) href={{ pathname: \`/path\`, query: { param } }} as={\`/path/\${param}\`}
- 이쯤에서 정리하는 주의점
  - `Form - submit`
    - `event.prevenDefault()` 절대 까먹지 말것!
  - Hooks의 두번째 인자
    - 함수가 업데이트 되어야할 때를 잘 판단하자
  - `Redux, Redux-saga`에서 변수 이름 주의하기
    - ~~나중에 오타인거 확인하면 너무 화나니까..~~  
      <br/>

# 10일차

- Image Upload
  - react의 file upload처리
  - 그냥 html에서 하던것처럼 FormData만들어서 보내면 됌!
- Like, Unlike
  - Click할때마다 Post의 Liker check하고 아이콘 toggle 및 request 전송  
    <br/>

# 11일차

- retweet
  - PostCard가 너무 더러워졌다... 수정해볼것
- nickname 수정 및 profile page
  - 계속 하던거..  
    <br/>

# 12일차

- `SSR`
  - page로딩 전 Data를 미리 받아서 render
  - search bot 및 ux적 측면에서 필수적
  - `Component.getInitialProps`는 **/pages 의 Component들에서만 사용한다**
  - SSR설정을 위한 설정이 next에서는 간편하다!
  - ```js
    // next-redux-saga package 필요
    // pages/_app.js
    import withReduxSaga from 'next-redux-saga';

    // Component code

    Component.getInitailProps = async context => {
      // ... do something before page laod
    };

    // next-redux middleware config
    const configureStore = (initialState, options) => {
      // something apply middlewares
      const store = createStore(reducer, initialState, enhancer);
      store.sagaTask = sagaMiddleware.run(rootSaga);
      return store;
    };

    export default withRedux(configureStore)(withReduxSaga(Component));
    ```
  - 약간 긴느낌이 있긴 하지만 위 코드가 SSR + Redux-saga ( 비동기 서버요청 ) 를 위한 설정
  - next없이 SSR도전해봐야 얼마나 편한건지 알려나..  
    <br/>

# 13일차

- 더보기 - Load more
  - `offset`
    - `ex) SELECT * FROM TABLE LIMIT 0 (offset), 10`
  - 현재 data 기준으로 이후 ( 또는 이전 ) data를 가져오는 방식
  - 현재 data가 현재 '화면에 보이는' data이기 때문에 업데이트가 잦은 data에는 어울리지 않음
    - 화면에 data가 새로 로딩되는 방식이라면 감안할 수 있음
    - 하지만 data를 append하는 모양이라면 중복이 발생 수 있기 때문에 좋은 방법은 아니다.
  - 또한 성능 issue가 존재하기 때문에 지양하는것이 좋다.
  - ~~근데 지금까지 이 방식만 해왔...ㅎ~~
- 무한 스크롤 - Infinite scrolling
  - `Scroll event` + `Last id`를 활용한 방식
  - `last id?`
    - `ex) SELECT * FROM TABLE WHERE ID < ( 또는 > ) 10 LIMIT 10`
  - 현재 dataList중 가장 큰 ( 또는 가장 작은 ) id를 기준으로 data를 가져오는 방식
  - 현재 프로젝트에는 Scroll event와 조합하여 사용했지만 Click event와도 조합이 가능하다.
  - 실시간 데이터를 제외한 pagination이 가능하기 때문에 data가 append되는 화면에도 가능
- [`immer`](https://github.com/immerjs/immer)
  - state의 불변성 유지를 위한 노력을 `덜`하게 도와주는 Library
  - ```js
    // 이전 코드
    case SOME_ACTION:
      return {
        ...state,
        array: [...state.array, action.arrayData],
      }

    // immer 적용 후
    import produce from 'immer'

    // export default ...
    return produce(state, draft => {
      case SOME_ACTION:
        draft.array.push(action.arrayData);
        break;
    });
    ```
  - 잔 코드들이 붙어서 크게 편해보이지 않을 수 있지만 확실히 생각을 덜 할 수 있게 된다.
    <br/>