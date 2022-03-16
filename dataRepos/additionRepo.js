import {queryWithData, queryWithoutData} from '../sql/sqlConnection.js'
import * as sqlQueries from '../sql/sqlQueries.js'
import * as productTables from '../sql/sqlTables/sqlProductTables.js'

const getAddition=async(id)=>{
    let sql=sqlQueries.getItemsByConditions('*',productTables.additionTable, 'ID=?')
    return await queryWithData(sql, id)
}

const getAdditions=async()=>{
    let sql=sqlQueries.getItems('*', productTables.additionTable)
    return await queryWithoutData(sql)
}

const postAddition=async(addition)=>{
    let sql=sqlQueries.setItem(productTables.additionTable)
    return await queryWithData(sql, addition)
}

const postAdditions=async(additions)=>{
    const keys=Object.keys(additions[0])
    const values=additions.map(obj=> keys.map(key=> obj[key]))
    let sql=sqlQueries.setItems(productTables.additionTable, keys)
    return await queryWithData(sql, [values])
}

const putAddition=async(addition, id)=>{
    let sql=sqlQueries.updateItem(productTables.additionTable, 'ID=?')
    return await queryWithData(sql, [addition, id])
}

export { getAddition, postAddition, putAddition, postAdditions, getAdditions}
