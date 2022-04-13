import mySql from 'mysql2'
import cfg from '../config.js'
import env from 'dotenv'

env.config()

const pool= mySql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    //database: cfg.db.schemaName,
    connectionLimit:5,
    queueLimit:5
})

const promisePool = pool.promise();

const queryWithData= async (sql, data)=>{
    try{
        const [rows, fields]=await promisePool.query(sql, data)
        return rows
    }
    catch(ex){
        return ex
    }
}

const queryWithoutData=async (sql)=>{
    try{
        const [rows, fields]=await promisePool.query(sql)
        return rows
    }
    catch(ex){
        return ex
    }
}

export { queryWithData , queryWithoutData}