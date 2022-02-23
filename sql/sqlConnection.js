import mySql from 'mysql'
import cfg from '../config.js'
import util from 'util'

const dbConnection= mySql.createConnection({
    host: cfg.db.localhost,
    port: cfg.db.port,
    user: cfg.db.user,
    password: cfg.db.password
})
dbConnection.connect(err=>{
    if(err) throw err
    console.log("MySql connected!")
})

const queryWithData= (sql, data)=>{
    return new Promise((resolve, reject)=>{ 
        dbConnection.query(sql, data, (err, res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        });
    });
}

const queryWithoutData=(sql)=>{
    return new Promise((resolve, reject)=>{ 
        dbConnection.query(sql, (err,result)=>{
            if(err){
                return reject(err);
            }
            return resolve(result);
        });
    });
}

export {queryWithData , queryWithoutData}