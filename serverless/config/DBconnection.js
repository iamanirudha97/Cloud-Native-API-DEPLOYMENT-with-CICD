require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.PGUSER,
    process.env.PASSWORD,{
        host: process.env.HOST,
        dialect: 'postgres',
        port: process.env.DBPORT
    });

module.exports = sequelize;