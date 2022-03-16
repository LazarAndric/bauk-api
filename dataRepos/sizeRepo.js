import {queryWithData, queryWithoutData} from '../sql/sqlConnection.js'
import * as sqlQueries from '../sql/sqlQueries.js'
import * as productTables from '../sql/sqlTables/sqlProductTables.js'

const getSize=async(id)=>{
    let sql=sqlQueries.getItemsByConditions('*',productTables.sizeTable, 'ID=?')
    return await queryWithData(sql, id)
}

const getSizes=async()=>{
    let sql=sqlQueries.getItems('*', productTables.sizeTable)
    return await queryWithoutData(sql)
}

const postSize=async(size)=>{
    let sql=sqlQueries.setItem(productTables.sizeTable)
    return await queryWithData(sql, size)
}

const postSizes=async(sizes)=>{
    const keys=Object.keys(sizes[0])
    const values=sizes.map(obj=> keys.map(key=> obj[key]))
    let sql=sqlQueries.setItems(productTables.sizeTable, keys)
    return await queryWithData(sql, [values])
}

const putSize=async(size, id)=>{
    let sql=sqlQueries.updateItem(productTables.sizeTable, 'ID=?')
    return await queryWithData(sql, [size, id])
}

export { getSize, postSize, putSize, postSizes, getSizes}
