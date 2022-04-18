import jwt from'jsonwebtoken'
import env from 'dotenv'
import { v4 as uuidv4 } from 'uuid'

env.config()

const options={
    algorithm: 'RS256',
    issuer: 'Bauk_Ciz',
    encoding:'utf-8',
    expiresIn:'30m'
}

const generateToken=(headers, user)=>{
    const login= {ID: Buffer.from(user.ID).toString('base64'), IdRole: user.IdRole}
    const privateKey=process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
    const token = jwt.sign(login, privateKey, {...options, jwtid: login.ID, audience: headers['user-agent']})

    let secLogin=Buffer.from(token,'utf-8').toString('base64url')
    secLogin=jwt.sign(secLogin, process.env.SECURITY_TOKEN)
    secLogin=Buffer.from(secLogin,'utf-8').toString('base64url')
    const refresh = jwt.sign(uuidv4(), process.env.REFRESH_TOKEN)
    return {Token: secLogin, Refresh: refresh}
}

const generateMailToken=()=>{
    const token=jwt.sign({
        EmailTokenString: 'MailToken'}, process.env.VERIFY_MAIL_TOKEN,{expiresIn:'5m'})
    return {MailToken: token}
}
const verifyMailToken=(token)=>{
    try{
        const t= jwt.verify(token, process.env.VERIFY_MAIL_TOKEN,{expiresIn:'5m'})
        return t ? true : false
    }
    catch(ex){
        return false
    }
}

const verifyToken=(token, aud)=>{
    let dataToken=Buffer.from(token,'base64url').toString('utf8')
    dataToken=jwt.verify(dataToken, process.env.SECURITY_TOKEN)
    dataToken=Buffer.from(dataToken,'base64url').toString('utf8')
    const publicKey=process.env.PUBLIC_KEY.replace(/\\n/g, '\n')
    const user=jwt.verify(dataToken, publicKey, {...options, audience: aud},
    (err, user)=>{
        if(err) return err
        user.ID=Buffer.from(user.ID,'base64').toString('utf8')
        return user
    })
    return user
}

export {generateToken, verifyToken, generateMailToken, verifyMailToken}