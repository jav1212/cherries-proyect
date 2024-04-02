import mysql from "mysql"

const pool = mysql.createConnection({
    host: 'localhost',
    database: 'cerezas',
    user: 'root',
    password: '29577769'
})

export default pool