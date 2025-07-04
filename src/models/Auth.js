const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Session = require('./Session');

const Auth = sequelize.define('Auth', {
  auth_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  session_id: { type: DataTypes.INTEGER, allowNull: false },
  token_uuid: { type: DataTypes.STRING(100), allowNull: false }
}, {
  tableName: 'auths',
  timestamps: false
});

Auth.belongsTo(Session, { foreignKey: 'session_id' });

module.exports = Auth;
