const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Role = require('./Role');
const Gender = require('./Gender');

const User = sequelize.define('User', {
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_first_name: { type: DataTypes.STRING(50), allowNull: false },
  user_name: { type: DataTypes.STRING(50), allowNull: false },
  user_email: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  user_password: { type: DataTypes.STRING(255), allowNull: false },
  birthday: { type: DataTypes.DATEONLY },
  role_id: { type: DataTypes.INTEGER },
  gender_id: { type: DataTypes.INTEGER }
}, {
  tableName: 'users',
  timestamps: false
});

User.belongsTo(Role, { foreignKey: 'role_id' });
User.belongsTo(Gender, { foreignKey: 'gender_id' });

module.exports = User;
