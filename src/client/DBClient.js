import mysql from 'mysql2/promise'

export default class DBClient {
    constructor(connection){
        this.users = new DBUserController(connection)
    }

   static async connect(){
       const connection = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            database: 'testDb',
            user: 'root',
            password: 'root'
        })

       return new DBClient(connection)
    }
}



class DBUserController {
    _tableName = 'users'
    constructor(connection){
        this.connection = connection
    }

    async getUsers(){
        return this.connection.query(`SELECT * FROM ${this._tableName} order by id desc`)
    }

    async getUserById(id){
        return this.connection.query(`SELECT * FROM ${this._tableName} WHERE id = ?`, [id])
    }
}