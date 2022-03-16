import {queryWithData, queryWithoutData} from '../sql/sqlConnection.js'
import * as sqlQueries from '../sql/sqlQueries.js'
import * as visitTables from '../sql/sqlTables/sqlVisitTables.js'
import * as itemTables from '../sql/sqlTables/sqlItemTables.js'
import * as orderTables from '../sql/sqlTables/sqlOrderTable.js'
import * as userTables from '../sql/sqlTables/sqlUserTables.js'
import * as productTables from '../sql/sqlTables/sqlProductTables.js'

const getOrder=async(id)=>{
    let sql=sqlQueries.getItemsByConditions('o.ID, os.Name, o.Price, o.Description, a.StreetAndNumber, a.GpsLocation, p.PlaceName, p.AreaCode, p.Active',
    `${orderTables.orderTable} o, ${orderTables.orderStatusTable} os, ${orderTables.orderAddressTable} oa, ${userTables.addressTable} a, ${userTables.placeTable} p`,
    'o.ID=? AND o.IdOrderStatus=os.ID AND o.ID =oa.IdOrder AND oa.IdAddress=a.ID AND a.IdPlace=p.ID')
    let result=await queryWithData(sql, id)
    let order=Object
    order=result[0]
    sql=sqlQueries.getItemsByConditions('i.ID, i.Price, i.Comments, p.Name, p.Available, p.Description, pi.File_Path, ps.Price, s.Size',
    `${itemTables.itemTable} i, ${productTables.productTable} p, ${productTables.pictureTable} pi, ${productTables.productSizeTable} ps, ${productTables.sizeTable} s`,
    'i.IdOrder=? AND i.IdProduct=p.ID AND p.IdPicture=pi.ID AND i.IdSize=ps.ID AND ps.IdSize=s.ID')
   order.Items=await queryWithData(sql, id)

    for(let item of order.Items)
    {
        sql=sqlQueries.getItemsByConditions('a.ID, a.Name, a.Price',
        `${itemTables.additionsTable} ad, ${productTables.additionTable} a`,
        'ad.IdItem=? AND ad.IdAddition=a.ID')
        item.Additions=await queryWithData(sql, item.ID)
    }
    
    return order
}
const postAddress=async(address)=>{
    let sql=sqlQueries.setItem(orderTables.orderAddressTable)
    return await queryWithData(sql, address)
}

// const getOrders=async()=>{
//     let sql=sqlQueries.getItemsByConditions('v.ID, v.Date, v.SlotsNumber, v.Price, p.PlaceName, p.AreaCode, p.Active',
//     `${visitTables.placeTable} p, ${visitTables.visitTable} v`,
//     'v.IdPlace=p.ID')
//     let result= await queryWithoutData(sql)
//     for(let res of result)
//     {
//         sql=sqlQueries.getItemsByConditions('o.ID, o.Price, o.Description, os.Name, u.FirstName, u.LastName, u.PhoneNumber, u.Email',
//         `${visitTables.ordersTable} vo, ${itemTables.orderTable} o, ${itemTables.orderUserTable} ou, ${itemTables.userTable} u, ${itemTables.orderStatusTable} os`,
//         'vo.IdVisit=? AND vo.IdOrder=o.ID AND o.IdOrderStatus=os.ID AND o.ID=ou.IdOrder AND ou.IdUser=u.ID')
//         res.Orders=await queryWithData(sql, res.ID)
//     }
//     return result
// }

const postOrder=async(order)=>{
    let sql=sqlQueries.setItem(orderTables.orderTable)
    return await queryWithData(sql, order)
}

const postItem=async(item)=>{
    let sql=sqlQueries.setItem(itemTables.itemTable)
    return await queryWithData(sql, item)
}

const postAddition=async(addition)=>{
    let sql=sqlQueries.setItem(itemTables.additionsTable)
    return await queryWithData(sql, addition)
}

const postAdditions=async(additions)=>{
    const keys=Object.keys(additions[0])
    const values=additions.map(obj=> keys.map(key=> obj[key]))
    let sql=sqlQueries.setItems(itemTables.additionsTable, keys)
    return await queryWithData(sql, [values])
}

const postOrders=async(orders)=>{
    const keys=Object.keys(orders[0])
    const values=orders.map(obj=> keys.map(key=> obj[key]))
    let sql=sqlQueries.setItems(orderTables.orderTable, keys)
    return await queryWithData(sql, [values])
}
const putVisit=async(idPlace, price)=>{
    return await queryWithData(`UPDATE ${visitTables.visitTable} SET SlotsNumber = SlotsNumber - ?, Price = Price + ? WHERE ID=?`, [1 , price, idPlace])
}
const getVisitByAddress=async(idAddress)=>{
    const sql=sqlQueries.getItemsByConditions('v.ID', `${visitTables.visitTable} v, ${userTables.addressTable} a`,'a.ID=? AND a.IdPlace=v.IdPlace')
    return queryWithData(sql, idAddress)
}

const putOrder=async(order, id)=>{
    let sql=sqlQueries.updateItem(orderTables.orderTable, 'ID=?')
    return await queryWithData(sql, [order, id])
}

const postOrdersTable=async(orders)=>{
    let sql=sqlQueries.setItem(visitTables.ordersTable)
    return await queryWithData(sql, orders)
}

const postUsersTable=async(orderUser)=>{
    let sql=sqlQueries.setItem(orderTables.orderUserTable)
    return await queryWithData(sql, orderUser)
}

export {postUsersTable, postOrdersTable, getVisitByAddress, putVisit, postAddress, postAddition, postItem, postAdditions, getOrder, postOrder, putOrder, postOrders}
