import {queryWithData, queryWithoutData} from '../sql/sqlConnection.js'
import * as sqlQueries from '../sql/sqlQueries.js'
import * as tables from '../sql/sqlTables/sqlUserTables.js'

const verifyUser=async()=>{

}
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
    const sql=sqlQueries.getItemsByConditions(
        'u.*, s.Status',
        `${tables.statusTable} s , ${tables.userTable} u`,
        `u.ID = ? AND u.IdStatus=s.ID`)
    return await queryWithData(sql, id)
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
    let sql = sqlQueries.deleteItem(tables.passwordTable, 'IdUser= ?')
    await queryWithData(sql, id)
    sql = sqlQueries.deleteItem(tables.mailTable, 'IdUser= ?')
    await queryWithData(sql, id)
    sql = sqlQueries.deleteItem(tables.chatTable, 'IdUser= ?')
    await queryWithData(sql, id)
    sql = sqlQueries.deleteItem(tables.authTable, 'IdUser= ?')
    await queryWithData(sql, id)
    sql = sqlQueries.deleteItem(tables.orderUserTable, 'IdUser= ?')
    await queryWithData(sql, id)
    sql = sqlQueries.deleteItem(tables.adressTable, 'IdUser= ?')
    await queryWithData(sql, id)
    sql=sqlQueries.deleteItem(tables.userTable,'ID = ?')
    return await queryWithData(sql, id)
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
    getUserByPhoneNumber, getUserIdByEmail, checkEmail,
    checkID, checAdminkID, getAdressesOfUserAsync, getPlacesAsync}