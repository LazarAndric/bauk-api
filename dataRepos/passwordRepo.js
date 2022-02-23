import {queryWithData, queryWithoutData} from '../sql/sqlConnection.js'
import * as sqlQueries from '../sql/sqlQueries.js'
import * as tables from '../sql/sqlTables.js'

const postPassword=async(password)=>{
    const sql=sqlQueries.setItem(tables.passwordTable)
    const result= await queryWithData(sql, password)
    return result
}

const putPassword=async(id, password)=>{
    const sql=sqlQueries.updateItem(tables.passwordTable, 'IdUser= ?')
    const result= await queryWithData(sql, [{Hash: password.Hash, Salt: password.Salt}, id])
    return result
}

const getPassword=async(password)=>{
    const sql=sqlQueries.getItems('ID, Hash, Salt ', tables.passwordTable)
    const result= await queryWithData(sql, password)
    return result
}

export {postPassword, getPassword, putPassword}