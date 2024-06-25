// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Data = sequelize.define('Data', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  phValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ppmValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  suhuValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date:{
    type: DataTypes.DATEONLY,
    allowNull:false,
    defaultValue: DataTypes.NOW, // Mengisi kolom date dengan tanggal saat ini secara otomatis
  },
  time:{
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Data;
