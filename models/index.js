import { Sequelize } from "sequelize";
// 이미 생성되어있는 기본 코드는 모두 삭제!
import dotenv from "dotenv";
dotenv.config();
// json 포맷을 node.js에서 불러올때는 assert {type: 'json'}을 삽입해야 한다.
import config from "../config/config.json" assert { type: "json" };
const env = process.env.NODE_ENV || "development";
const configEnv = config[env]; // username, database, password, host..

import User from "./User.js"; // User 모델 불러오기
import Memo from "./Memo.js"; // Memo 모델 불러오기

const sequelize = new Sequelize(configEnv.database, configEnv.username, configEnv.password, {
  host: configEnv.host,
  dialect: configEnv.dialect,
  port: 3306,
  logging: (msg) => console.log(msg)
});
// DB 정의
const db = {}; // 여러 객체(모델)를 한번에 저장해서 db라는 이름으로 내보내기 위한 용도

User.init(sequelize); // User 모델의 컬럼, 자료형 --> MariaDB에 생성

Memo.init(sequelize); // Memo 모델의 컬럼, 자료형 --> MariaDB에 생성


// DB 연결 테스트
// try {
  //   await sequelize.authenticate();
  //   console.log('Connection has been established successfully.');
  // } catch (error) {
    //   console.error('Unable to connect to the database:', error);
    // }
    
    // Model - Table 동기화(Synchronization) ==> Promises 객체를 반환 : 비동기
    // Development 단계에서만 Sync 명령을 사용하길 권장, Production 단계에서는 
    await sequelize.sync({ force: false }).then(() => {
      console.log('============ 모델과 데이터베이스가 매핑되었습니다 ==========='); // 메세지는 출력되었으나 users 테이블은 아직 생성 전
    }).catch((error) => {
      console.log("============ 에러내용 : " + error);
    });
    
    // 객체.속성 = "값"
    db.sequelize = sequelize; // 시퀄라이즈 인스턴스(DB 접속정보)
    db.User = User;
    db.Memo = Memo;
    
    User.associate(db);
    Memo.associate(db);

    export default db;
