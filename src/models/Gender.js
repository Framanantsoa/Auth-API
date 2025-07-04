const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Gender = sequelize.define('Gender', {
  gender_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  gender_name: { type: DataTypes.STRING(25), allowNull: false }
}, {
  tableName: 'genders',
  timestamps: false
});

module.exports = Gender;
