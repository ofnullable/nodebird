# 1일차

- server setup
  - `express, axios, sequelize...`등 설치
  - router 생성 및 회원가입 로직 작성
- `sequelize`
  - ORM?
    - Database table과 Javascript의 객체간 매핑을 지원
    - 코드를 통해 RDBMS를 활용한다.
    - ~~JPA를 먼저 했었어야되는데..~~
  - Naming
    - `User`로 모델을 생성하면 테이블명은 자동으로 `users`가 된다.
    - 테이블명을 Fix하는 옵션이 있는거같지만 복수가 더 나은것같다.
  - 관계설정
    - RDBMS의 핵심이 관계이기 때문에 코드로 작성한다고 할 때 역시 관계 설정이 중요하다.
    - `hasMany` - 1:N 관계를 설정한다. 소유하고 있음을 의미`(?)`
    - `belongsTo` - 1:1 관계를 설정한다. 귀속되어 있음을 의미`(?)`
    - `belongsToMany` - N:M 관계를 설정한다.
      - 해당 관계는 필연적으로 테이블이 생성된다
      - `through`옵션을 통해 조인테이블의 이름을 지정할 수 있다.
    - `as`옵션을 통해 property명을 지정할 수 있고, 같은 조건의 다른 컬럼과 구분지을 수 있다.
  - `Check Point!`
    - ```js
      Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
          db[modelName].associate(db);
        }
      });
      ```
    - 위 코드는 `/models/index.js`에서 model들의 association을 설정하는 코드다. \* 해당 코드를 model들을 불러오는 코드 아래에 작성해야 association이 정상 설정된다.
      <br/>

# 2일차

- `dotenv`
  - 설정 및 노출시키고 싶지 않은 데이터를 관리하기위한 모듈
  - DB정보 등 민감한 데이터를 `.env` 파일에서 관리한다.
  - `process.env.${VARIABLE}`의 형식으로 가져올 수 있다.
  - `.gitignore`에 첫번째로 추가해라!
- `passport`
  - `passport`는 인증을 위한 다양한 전략( strategy ) 를 지원하는 모듈
  - 내부적으로 `express-session`을 사용하기 때문에 `express-session`보다 아래에 실행시켜야 한다.
  - 로그인을 위한 router에서 strategy를 특정하여 메서드를 인증을 시도한다.
  - `done()` callback을 활용하여 인증 성공, 실패 또는 error를 결정한다.
    - `done()`의 첫번째 인자는 `error`를 대입한다.
    - 두번째 인자는 user정보 또는 실패( false를 대입하면 실패 )를 대입
    - 두번째 인자가 `false`일 경우 실패 사유를 세번째 인자로 넣을 수 있다.
  - 인증로직 수행 후 성공시 serializeUser 메서드를 통해 session에 사용자 정보를 저장한다.
  - 이후 모든 접근 시 deserializeUser가 실행되어 DB에서 해당 유저의 정보를 가져온다.
    - 하지만 모든 endpoint 접근마다 user정보를 위한 select문이 실행되는것은 비효율적이다.
    - 때문에 최초 실행 후 캐싱하거나, session에 필요한 필드를 포함하여 가지고있는다.
- `CORS` 및 로그인 유지
  - `CORS`?
    - Front와 Server의 분리 시 첫번째로 마주치는 문제
    - Browser가 Front와 Server의 주소가 다를경우 보안상의 이유로 요청을 제한한다.
    - 해당 문제를 해결하기 위한 모듈이 바로 `cors`다.
    - ```js
      // server codes...
      app.use(
        cors({
          origin: true,
          credentials: true, // 로그인 유지를 위한 설정
        })
      );
      ```
    - 간단 + 편-안
  - 로그인 유지
    - Front와 Server의 분리로 마주치는 두번째 문제
    - Server가 페이지를 랜더링 하지 않기 때문에, 새로고침 시 사용자 정보가 날아간다
    - ```js
      // redux-saga codes... ( front )
      function signInApi() {
        return axios.post('/path/to/sign-in', data, { withCredentials: true });
      }
      ```
    - 위 코드와 `CORS`에 작성한 코드 모두 작성하면, SESSION에 사용자 정보가 유지된다.
    - **But,** 위 코드만으로 완성은 아니고, 서버에 요청을 보내는 코드가 추가로 필요하다.
      <br/>

# 3일차

- 로그인 유지를 위한 `/api/user/` endpoint
  - ~~마지막에 `/` 되게 거슬림..~~
- 첫 접근에 main Posts 요청
  - 위 요청과 합쳐저서 페이지 로드 시 자동으로 User, Post list 데이터 받아옴
- Post 작성
  - `association`
    <br/>

# 4일차

- `middleware` 만들기
  - 공통 Logic이 필요한 경우 ( ex - 로그인 체크 ) `middleware`로 중복제거가 가능하다.
  - filter나 interceptor같은건가보다!
    <br/>

# 5일차

- Image upload
  - `multer`
