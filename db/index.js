const connection = require('./connection');
const inquirer = require('inquirer');
const db = require('../db/connection');
const { default: Choice } = require('inquirer/lib/objects/choice');



class DB {
    constructor(connection) {
        this.connection = connection;
    }};

module.exports = new DB(connection);