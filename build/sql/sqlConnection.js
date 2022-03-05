import mySql from 'mysql2'
import cfg from '../config.js'

const pool= mySql.createPool({
    host: cfg.db.localhost,
    port: cfg.db.port,
    user: cfg.db.user,
    password: cfg.db.password,
    //database: cfg.db.schemaName,
    connectionLimit:5,
    queueLimit:0
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



export {queryWithData , queryWithoutData}