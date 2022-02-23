import * as jwt from '../utility/jwtHandler.js'
import {validationResult} from 'express-validator'

export async function verifyUserToken(req,res, next) {
    const acessToken= req.headers['authorization']
    const audience=req.headers['user-agent']
    const jwtToken=acessToken.split(' ')[1]
    if(!jwtToken) return res.sendStatus(401)
    const user=jwt.verifyToken(jwtToken, audience)
    if(!user.ID)
        return res.sendStatus(401)
    req.user=user
    next()
}
export function verifyUserToken2(req,res, next) {
    const acessToken= req.headers['authorization']
    const audience=req.headers['user-agent']
    const jwtToken=acessToken.split(' ')[1]
    if(!jwtToken) return res.sendStatus(401)
    const user=jwt.verifyToken(jwtToken, audience)
    if(!user.ID){
        req.isTokenVerify=false
        next()
        return
    }
    req.isTokenVerify=true
    req.user=user
    next()
}

export function verifyTempToken(req,res, next){
    const token= req.headers['tempauth']
    if(!token) return res.sendStatus(401)
    const auth=jwt.verifyTempToken(token)
    return auth ? next() : res.status(401).send('Token is not valid') 
}

export function validateInput(req, res, next){
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({Errors: errors.array()})
    }
    next()
}

const validateUserAsync = async (req,res) => {
    const data = await PromiseBasedDataRequest()
    req.data = data.json()
}

export {validateUserAsync}