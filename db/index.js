const connection = require('./connection')

class DB {
    constructor (connection) {
        this.connection = connection;
    }
    

    findAllEmployee(){
        return this.connection.promise().query("SELECT * FROM employee")
    }

}

module.exports = new DB(connection);