import {queryWithData, queryWithoutData} from '../sql/sqlConnection.js'
import * as sqlQueries from '../sql/sqlQueries.js'
import * as visitTables from '../sql/sqlTables/sqlVisitTables.js'
import * as orderTables from '../sql/sqlTables/sqlOrderTable.js'

const getVisit=async(id)=>{
    let sql=sqlQueries.getItemsByConditions('v.ID, v.Date, v.SlotsNumber, v.Price, p.PlaceName, p.AreaCode, p.Active',
    `${visitTables.placeTable} p, ${visitTables.visitTable} v`, 'v.ID=? AND v.IdPlace=p.ID')
    let result=new Object()
    const res=await queryWithData(sql, id)
    res[0].Active= res[0].Active==1?true:false
    result.Visit=res[0]
    sql=sqlQueries.getItemsByConditions('o.ID, o.Price, o.Description, os.Name, u.FirstName, u.LastName, u.PhoneNumber, u.Email',
    `${visitTables.ordersTable} vo, ${orderTables.orderTable} o, ${orderTables.orderUserTable} ou, ${orderTables.userTable} u, ${orderTables.orderStatusTable} os`,
    'vo.IdVisit=? AND vo.IdOrder=o.ID AND o.IdOrderStatus=os.ID AND o.ID=ou.IdOrder AND ou.IdUser=u.ID')
    result.Orders=await queryWithData(sql, id)
    return result
}

const isAddressExist=async(visitId, addressId, userId)=>{
    let sql=sqlQueries.checkItem(`${orderTables.orderAddressTable} oa, ${visitTables.ordersTable} os,  ${orderTables.orderUserTable} ou`, 'os.IdVisit=? AND ((os.IdOrder=oa.IdOrder AND oa.IdAddress=?) OR (os.IdOrder=ou.IdOrder AND ou.IdUser=?))')
    const result= await queryWithData(sql,[visitId, addressId, userId])
    return Object.values(result[0]).at(0)==1
}

const getVisits=async()=>{
    let sql=sqlQueries.getItemsByConditions('v.ID, v.Date, v.SlotsNumber, v.Price, p.PlaceName, p.AreaCode, p.Active',
    `${visitTables.placeTable} p, ${visitTables.visitTable} v`,
    'v.IdPlace=p.ID')
    let result= await queryWithoutData(sql)
    for(let res of result)
    {
        sql=sqlQueries.getItemsByConditions('o.ID, o.Price, o.Description, os.Name, u.FirstName, u.LastName, u.PhoneNumber, u.Email, a.StreetAndNumber, a.GpsLocation',
        `${visitTables.ordersTable} vo, ${orderTables.orderTable} o, ${orderTables.orderUserTable} ou, ${orderTables.userTable} u, ${orderTables.orderStatusTable} os,  ${orderTables.orderAddressTable} oa,  ${visitTables.addresssTable} a`,
        'vo.IdVisit=? AND vo.IdOrder=o.ID AND o.IdOrderStatus=os.ID AND o.ID=ou.IdOrder AND ou.IdUser=u.ID AND o.ID=oa.IdOrder AND oa.IdAddress=a.ID')
        res.Orders=await queryWithData(sql, res.ID)
    }
    return result
}

const postVisit=async(visit)=>{
    let sql=sqlQueries.updateItem(visitTables.placeTable, 'ID=?')
    await queryWithData(sql, [{Active: true}, visit.IdPlace])
    sql=sqlQueries.setItem(visitTables.visitTable)
    return await queryWithData(sql, {Date: visit.Date, IdPlace: visit.IdPlace, SlotsNumber: visit.SlotsNumber, Price: 0})
}

const postVisits=async(visits)=>{
    const keys=Object.keys(visits[0])
    const values=visits.map(obj=> keys.map(key=> obj[key]))
    let sql=sqlQueries.setItems(visitTables.visitTable, keys)
    return await queryWithData(sql, [values])
}

const putVisit=async(visit, id)=>{
    let sql=sqlQueries.updateItem(visitTables.visitTable, 'ID=?')
    return await queryWithData(sql, [visit, id])
}

export {isAddressExist, getVisit, postVisit, putVisit, postVisits, getVisits}
