import * as jwt from '../utility/jwtHandler.js'
import {validationResult} from 'express-validator'
import * as authRepo from '../dataRepos/authRepo.js'
import * as userRepo from '../dataRepos/userRepo.js'

export async function verifyUserAsync(req, res, next){
    if(await userRepo.checkID(req.user.ID))
        return next()
    return res.status(401).send('Not authorize')
}

export async function verifyUserAdminAsync(req, res, next){
    if(await userRepo.checAdminkID(req.user.ID))
        return next()
    return res.status(401).send('Not authorize')
}

//Return 401 if user does not exist
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

//Without 401 status if user does not exist
export function verifyUserToken2(req,res, next) {
    const acessToken= req.headers['authorization']
    const audience=req.headers['user-agent']
    const jwtToken=acessToken.split(' ')[1]
    if(!jwtToken) return res.sendStatus(401)
    const user=jwt.verifyToken(jwtToken, audience)
    if(!user.ID){
        req.isTokenVerify=false
        return next()
    }
    req.isTokenVerify=true
    req.user=user
    return next()
}

const verifyTempToken=async (req,res, next)=>{
    const token= req.headers['tempauth']
    if(!token) return res.sendStatus(401)
    const auth=jwt.verifyTempToken(token)
    if(!auth) return res.status(401).send('Token is expired') 
    const tempToken= await authRepo.getTempTokenByEmailAsync(req.body.Email)
    if(tempToken==undefined) return res.status(401).send('Email is not valid')
    return tempToken.TempToken===token ? next() : res.status(401).send('Token is not valid')
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

export {validateUserAsync, verifyTempToken}