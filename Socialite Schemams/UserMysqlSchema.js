const { DataTypes } = require('sequelize');

const sequelize = require('../config');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    gender: {
        type: DataTypes.ENUM('MALE', 'FEMALE', ""),
        defaultValue: "",
        allowNull: false
    },
    college: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false
    },
    school: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false
    }
}, { tableName: 'users' });

module.exports = User;