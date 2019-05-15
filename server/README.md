# 1일차
* server setup
  * `express, axios, sequelize...`등 설치
  * router 생성 및 회원가입 로직 작성
* `sequelize`
  * ORM?
    * Database table과 Javascript의 객체간 매핑을 지원
    * 코드를 통해 RDBMS를 활용한다.
    * ~~JPA를 먼저 했었어야되는데..~~
  * Naming
    * `User`로 모델을 생성하면 테이블명은 자동으로 `users`가 된다.
    * 테이블명을 Fix하는 옵션이 있는거같지만 복수가 더 맞는거같다.
  * 관계설정
    * RDBMS의 핵심이 관계이기 때문에 코드로 작성한다고 할 때 역시 관계 설정이 중요하다.
    * `hasMany` - 1:N 관계를 설정한다. 소유하고 있음을 의미`(?)`
    * `belongsTo` - 1:1 관계를 설정한다. 귀속되어 있음을 의미`(?)`
    * `belongsToMany` - N:M 관계를 설정한다.
      * 해당 관계는 필연적으로 테이블이 생성된다 
      * `through`옵션을 통해 조인테이블의 이름을 지정할 수 있다.
    * `as`옵션을 통해 property명을 지정할 수 있고, 같은 조건의 다른 컬럼과 구분지을 수 있다.