//const { Sequelize, DataTypes, Model } = require('sequelize'); // CommonJS
import { Sequelize, DataTypes, Model } from "sequelize";
// Sequelize의 defaultValue는 NULL
class Contact extends Model {
  static init(sequelize) {
    return super.init(
      {
        // Model attributes are defined here : 시퀄라이즈는 기본적으로 id 컬럼을 생성하고 pk로 정의함.
        name: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING(11),
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING(100),
          // allowNull is true : default (NULL)
        },
        address: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        // Other model options go here
        sequelize, // DB 연결을 위한 시퀄라이즈 인스턴스
        timestamps: false,
        underscored: true,
        modelName: "Contact", // 시퀄라이즈 모델 이름
        tableName: "contacts", // 데이터베이스 테이블 이름 (기본값: 모델이름을 s | 복수형)
        paranoid: false, // 테이블 삭제 후 복구를 원하면 true, 아니라면 false (삭제날짜를 기록)
        charset: "utf8mb4", // 이모지 삽입을 위해서는 utf8mb4 형식
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Contact.hasMany(db.Note, { foreignKey: "contact_id", sourceKey: "id" });
  }
}

// 모델 외부에서 User 정보를 생성할때 참조
export default Contact;
