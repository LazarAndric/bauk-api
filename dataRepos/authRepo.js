import {queryWithData, queryWithoutData} from '../sql/sqlConnection.js'
import * as sqlQueries from '../sql/sqlQueries.js'
import * as tables from '../sql/sqlTables/sqlUserTables.js'
import stringMaker from '../utility/stringCreator.js'
import mailer from '../utility/nodeMailer.js'

const generateMailCodeAsync=async(result, email)=>{
    const mailCode=stringMaker(5)
    let date= new Date()
    date.setMinutes(date.getMinutes()+2)
    if(await checkId(result.ID))
        await putMailCodeAsync(result.ID, mailCode, date)
    else await postMailCode(result.ID, mailCode, date)

    mailer('lazarandric97@gmail.com', email, 'Verification mail', `Your veification code is: ${mailCode}`,'')
    return {Code: mailCode, ExpireDate: date}
}

const verifyMailCodeAsync=async(res, code)=>{
    const result=await getMailCodeAsync(res.ID, code)
    if(result.length==0) return {IsVerify: false}
    return {IsVerify: true, ExpireDate: result[0].ExpireDate}
}

const postMailCode=async(id,mailCode, expriteDate)=>{
    const query= sqlQueries.setItem(tables.mailTable)
    const result= await queryWithData(query, {IdUser: id, Code: mailCode, ExpireDate: expriteDate})
    return result
}

const checkId=async(id)=>{
    const sql=sqlQueries.checkItem(tables.mailTable, 'IdUser= ?')
    const result=await queryWithData(sql, id)
    return Object.values(result[0]).at(0)==1
}

const putMailCodeAsync=async(id, mailCode, expriteDate)=>{
    const sql= sqlQueries.updateItem(tables.mailTable, 'IdUser= ?')
    const result= await queryWithData(sql, [{Code: mailCode, ExpireDate: expriteDate}, id])
    return result
}

const getMailCodeAsync=async(id, mailCode)=>{
    const sql= sqlQueries.getItemsByConditions('*', tables.mailTable, 'Code= ? AND IdUser= ?')
    const result= await queryWithData(sql, [mailCode, id])
    return result
}
const checkUserTokenAsync=async(id)=>{
    const sql= sqlQueries.checkItem(tables.authTable, 'IdUser=?')
    const result= await queryWithData(sql, id)
    return result
}
const postAuthTokenAsync=async(authTable)=>{
    const sql= sqlQueries.setItem(tables.authTable)
    const result= await queryWithData(sql, authTable)
    return result
}

const putAuthTokenAsync=async(id, refreshToken)=>{
    const sql= sqlQueries.updateItem(tables.authTable, 'IdUser=?')
    const result= await queryWithData(sql, [refreshToken, id])
    return result
}

const getUserByToken=async(refreshToken)=>{
    const sql= sqlQueries.getItemsByConditions('IdUser', tables.authTable, 'RefreshToken= ?')
    const result= await queryWithData(sql, refreshToken)
    return result[0]
}

const getMailTokenByEmailAsync=async(refreshToken)=>{
    const sql= sqlQueries.getItemsByConditions('a.MailToken', `${tables.userTable} u, ${tables.authTable} a`, 'u.Email= ? AND u.ID=a.IdUser')
    const result= await queryWithData(sql, refreshToken)
    return result[0]
}
const putMailTokenAsync=async(email, mailToken)=>{
    const sql= sqlQueries.updateItem(`${tables.userTable} u, ${tables.authTable} a`, 'u.Email= ? AND u.ID=a.IdUser')
    const result= await queryWithData(sql, [mailToken, email])
    return result[0]
}

export {postMailCode, verifyMailCodeAsync, checkId, putMailCodeAsync, getMailCodeAsync,
    generateMailCodeAsync, postAuthTokenAsync,
    checkUserTokenAsync, getUserByToken, putAuthTokenAsync, getMailTokenByEmailAsync, putMailTokenAsync}