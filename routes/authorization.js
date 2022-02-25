import express from 'express'
import * as auth from '../middleware/authorizationMiddleware.js'
import * as jwtHandler from '../utility/jwtHandler.js'
import hashPassword from '../utility/passwordHandler.js'
import { v4 as uuidv4 } from 'uuid'
import * as passwordRepo from './../dataRepos/passwordRepo.js'
import errorEventHandler from './../sql/sqlErrorHandler.js'
import * as userRepo from './../dataRepos/userRepo.js'
import * as authRepo from './../dataRepos/authRepo.js'
import * as userSchema from '../middleware/validationSchema.js'
import * as jwt from '../utility/jwtHandler.js'

const router = express.Router()

router.post('/loginEmail', userSchema.loginSchema, auth.validateInput,
    async (req,res)=>{
        const user=await userRepo.getUserIdByEmail(req.body.Email)
        if(user.length===0) return res.sendStatus(403)

        const dbPass= await passwordRepo.getPasswordById(user[0].ID)
        if(dbPass.length===0) return res.sendStatus(403)
        
        let password=req.body.Password
        password=hashPassword(password, dbPass[0].Salt)
        if(password.Hash!==dbPass[0].Hash) return res.sendStatus(403)

        const userToken= jwtHandler.generateToken(req.headers, user[0])
        const result=await authRepo.checkUserTokenAsync(user[0].ID)
        if(Object.values(result[0]).at(0)==1)
            await authRepo.putAuthTokenAsync(user[0].ID, {RefreshToken: userToken.Refresh})
        else await authRepo.postAuthTokenAsync({IdUser: user[0].ID, RefreshToken: userToken.Refresh})

        res.header(userToken).sendStatus(200)
})

router.post('/loginPhone', userSchema.changePassword, auth.validateInput, auth.verifyTempToken, async(req,res)=>{

})

router.post('/forgotPassword', userSchema.emailSchema, auth.validateInput,
    async (req,res)=>{
        if(!await userRepo.checkEmail(req.body.Email))
            return res.status(403).send({Message:'Email is not exist'})
        const result=await userRepo.getUserIdByEmail(req.body.Email)
        const emailModel=await authRepo.verifyUserByEmailCode(result[0])
        return res.status(200).json({ExpireDate: emailModel.ExpireDate, Message: 'Code is sent too e-mail'})
})

router.post('/verifyCode', userSchema.emailVerifyCodeSchema, auth.validateInput,
    async (req,res)=>{
        if(!await userRepo.checkEmail(req.body.Email))
            return res.status(403).send({Message:'Email is not exist'})
        const result=await userRepo.getUserIdByEmail(req.body.Email)
        const emailModel=await authRepo.checkEmailCodeAsync(result[0], req.body.Code)
        if(!emailModel.IsVerify) return res.status(401).send('Bad code')
        if(emailModel.ExpireDate<new Date()) return res.status(401).send('Token is expire')
        const tmpToken=jwt.generateTempToken()
        return res.header(tmpToken).sendStatus(200)
})

router.post('/changePassword', userSchema.changePassword, auth.validateInput, auth.verifyTempToken,
    async(req,res)=>{
        const salt=uuidv4()
        let email=req.body.Email
        let password=req.body.Password
        const result=await userRepo.getUserIdByEmail(email)
        if(result.length==0) return res.status(402).send('User does not exist')
        password=hashPassword(password, salt)
        const passwordResult= await passwordRepo.putPassword(
            result[0].ID,
            {Hash: password.Hash, Salt: password.Salt})
        if(passwordResult.affectedRows==0) return res.sendStatus(403)
        return res.status(200).send('Password changed')
})

router.post('/register', userSchema.userSchema, auth.validateInput,
    async (req,res)=>{
        const password=hashPassword(req.body.Password, uuidv4())
        const ID=uuidv4()
        let user=await userRepo.setUserAsync(
        {
            ID: ID,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            PhoneNumber: req.body.PhoneNumber,
            IdStatus: req.body.IdStatus,
            IdRole: req.body.IdRole
        })
        if(errorEventHandler(user).bool) return res.status(403).send('User already exist')
        const passwordResult= await passwordRepo.postPassword({
            IdUser: ID,
            Hash: password.Hash,
            Salt: password.Salt
        })
        if(passwordResult.affectedRows==0) return res.sendStatus(403)
        res.status(201).send('User is created')
})

router.post('/generateToken', userSchema.generatetokenSchema, auth.validateInput, auth.verifyUserToken2,async (req, res)=>{
    if(req.isTokenVerify) return res.status(200).send('Your token is valid')
    const userId=await authRepo.getUserByToken(req.headers['refresh'])
    const user = await userRepo.getUserById(userId)
    const token=jwtHandler.generateToken(req.headers, user[0])
    return res.header(token).sendStatus(200)
})

router.post('/log', userSchema.auhorizedUserSchema, auth.validateInput, auth.verifyUserToken, (req,res)=>{
    if(req.user) return res.status(200).json(req.user)
    res.sendStatus(403)
})

export default router