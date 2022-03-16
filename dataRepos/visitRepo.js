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

const getVisits=async()=>{
    let sql=sqlQueries.getItemsByConditions('v.ID, v.Date, v.SlotsNumber, v.Price, p.PlaceName, p.AreaCode, p.Active',
    `${visitTables.placeTable} p, ${visitTables.visitTable} v`,
    'v.IdPlace=p.ID')
    let result= await queryWithoutData(sql)
    for(let res of result)
    {
        sql=sqlQueries.getItemsByConditions('o.ID, o.Price, o.Description, os.Name, u.FirstName, u.LastName, u.PhoneNumber, u.Email',
        `${visitTables.ordersTable} vo, ${orderTables.orderTable} o, ${orderTables.orderUserTable} ou, ${orderTables.userTable} u, ${orderTables.orderStatusTable} os`,
        'vo.IdVisit=? AND vo.IdOrder=o.ID AND o.IdOrderStatus=os.ID AND o.ID=ou.IdOrder AND ou.IdUser=u.ID')
        res.Orders=await queryWithData(sql, res.ID)
    }
    return result
}

const postVisit=async(visit)=>{
    let sql=sqlQueries.updateItem(visitTables.placeTable, 'ID=?')
    await queryWithData(sql, [{Active: true}, visit.PlaceId])
    sql=sqlQueries.setItem(visitTables.visitTable)
    return await queryWithData(sql, {Date: visit.Date, IdPlace: visit.Place, SlotsNumber: visit.SlotsNumber, Price: 0})
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

export { getVisit, postVisit, putVisit, postVisits, getVisits}
