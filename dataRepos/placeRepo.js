import {queryWithData, queryWithoutData} from '../sql/sqlConnection.js'
import * as sqlQueries from '../sql/sqlQueries.js'
import * as tables from '../sql/sqlTables/sqlUserTables.js'

const getPlacesAsync=async()=>{
    const sql=sqlQueries.getItems('*', tables.placeTable)
    return await queryWithoutData(sql)
}

const getPlaceAsync=async(id)=>{
    const sql=sqlQueries.getItemsByConditions('*', tables.placeTable, 'ID=?')
    return await queryWithData(sql, id)
}

const postPlaceAsync=async(place)=>{
    const sql=sqlQueries.setItem(tables.placeTable)
    return await queryWithData(sql, place)
}
const postPlacesAsync=async(places)=>{
    let keys=Object.keys(places[0])
    const sql=sqlQueries.setItems(tables.placeTable, keys)
    let value=places.map(obj=> keys.map(key=> obj[key]))
    return await queryWithData(sql, [value])
}

const putPlaceAsync=async(id)=>{
    const sql=sqlQueries.updateItem(tables.placeTable, 'ID=?')
    return await queryWithData(sql, id)
}

const deletePlaceAsync=async(id)=>{
    const sql=sqlQueries.deleteItem(tables.placeTable, 'ID=?')
    return await queryWithData(sql, id)
}


export {getPlacesAsync, postPlaceAsync, getPlaceAsync, postPlacesAsync, putPlaceAsync, deletePlaceAsync}