import {queryWithData, queryWithoutData} from '../sql/sqlConnection.js'
import * as sqlQueries from '../sql/sqlQueries.js'
import * as tables from '../sql/sqlTables/sqlUserTables.js'
import * as orderTable from '../sql/sqlTables/sqlOrderTable.js'

const getUsersAsync=async()=>{
    let sql=sqlQueries.getItemsByConditions('u.ID, u.FirstName, u.LastName, u.PhoneNumber, u.Email, s.Status',
        `${tables.statusTable} s , ${tables.userTable} u`,
        `u.IdStatus=s.ID`)
    const result=await queryWithoutData(sql)
    for(const res of result){
        sql=sqlQueries.getItemsByConditions('a.StreetAndNumber, a.GpsLocation, p.PlaceName, p.Active',
        `${tables.adressTable} a, ${tables.placeTable} p`,
        `a.IdUser= ? AND a.IdPlace=p.ID`)
        res.Adresses=await queryWithData(sql, res.ID)
    }
    return result
}

const getUserById=async(id)=>{
    let sql=sqlQueries.getItemsByConditions(
        'u.*, s.Status',
        `${tables.statusTable} s , ${tables.userTable} u`,
        `u.ID = ? AND u.IdStatus=s.ID`)
    const result= await queryWithData(sql, id)
    if(result.length==0) return {IsDone: false, Message: 'User is not authorize'}

    sql=sqlQueries.getItemsByConditions('a.StreetAndNumber, a.GpsLocation, p.PlaceName, p.Active',
        `${tables.adressTable} a, ${tables.placeTable} p`,
        `a.IdUser= ? AND a.IdPlace=p.ID`)
    result[0].Adresses=await queryWithData(sql, result[0].ID)

    //TODO: PROBLEM WITH THIS REQUEST
    sql=sqlQueries.getItemsByConditions('o.ID, a.StreetAndNumber, a.GpsLocation, p.PlaceName, p.AreaCode, os.Name, o.Price',
        `${tables.orderUserTable} ou, ${orderTable.orderTable} o, ${tables.adressTable} a, ${orderTable.orderAdressTable} oa, ${tables.placeTable} p, ${orderTable.orderStatusTable} os`,
        `ou.IdUser=? AND ou.IdOrder=o.ID AND o.ID=oa.IdOrder AND oa.IdAdress=a.ID AND a.IdPlace=p.ID AND o.IdOrderStatus=os.ID`)
    result[0].Orders=await queryWithData(sql, result[0].ID)
    return result
}

const getAdressesOfUserAsync=async(id)=>{
    const sql=sqlQueries.getItemsByConditions(
        'a.StreetAndNumber, a.GpsLocation, p.PlaceName, p.Active',
        `${tables.adressTable} a , ${tables.placeTable} p`,
        `a.IdUser = ? AND a.IdPlace=p.ID`
    )
    return await queryWithData(sql, id)
}

const getPlacesAsync=async(id)=>{
    const sql=sqlQueries.getItems('*',tables.placeTable)
    return await queryWithData(sql, id)
}

const setUserAsync=async(user)=>{
    const sql= sqlQueries.setItem(tables.userTable)
    return await queryWithData(sql, user)
}

const deleteUserAsync=async(id)=>{
    const sql = sqlQueries.deleteItem(tables.userTable, 'ID=?')
    return await queryWithData(sql, id)
}

const postAdressAsync=async(adresses)=>{

    let keys=Object.keys(adresses[0])
    const sql =sqlQueries.setItems(tables.adressTable, keys)
    let value=adresses.map(obj=> keys.map(key=> obj[key]))
    return await queryWithData(sql, [value])
}

const putUserAsync=async(id, user)=>{
    const sql= sqlQueries.updateItem(tables.userTable, 'ID=?')
    const result= await queryWithData(sql, [user, id])
    return result
}

const getUserIdByEmail=async (email)=>{
    const sql= sqlQueries.getItemsByConditions('ID, IdRole', tables.userTable, 'Email = ?')
    const result=await queryWithData(sql, email)
    return result
}

const checkEmail=async(email)=>{
    const sql=sqlQueries.checkItem(tables.userTable, 'Email= ?')
    const result=await queryWithData(sql, email)
    return Object.values(result[0]).at(0)==1
}

const checkID=async(id)=>{
    const sql=sqlQueries.checkItem(`${tables.userTable} u, ${tables.roleTable} r`, `u.ID= ? AND u.IdRole= r.ID`)
    const result=await queryWithData(sql, id)
    return Object.values(result[0]).at(0)==1
}

const checAdminkID=async(id)=>{
    const sql=sqlQueries.checkItem(`${tables.userTable} u, ${tables.roleTable} r`, `u.ID= ? AND u.IdRole= r.ID AND r.RoleName='admin'`)
    const result=await queryWithData(sql, id)
    return Object.values(result[0]).at(0)==1
}

const getUserByPhoneNumber=(phoneNumber)=>{
    
}

export {getUsersAsync, setUserAsync, getUserById, deleteUserAsync, putUserAsync,
    getUserByPhoneNumber, getUserIdByEmail, checkEmail, postAdressAsync,
    checkID, checAdminkID, getAdressesOfUserAsync, getPlacesAsync}