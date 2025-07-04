const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const User = require('./User');

const Session = sequelize.define('Session', {
  session_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  created_at: { type: DataTypes.DATE, allowNull: false },
  expires_at: { type: DataTypes.DATE, allowNull: false }
}, {
  tableName: 'sessions',
  timestamps: false
});

Session.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Session;
