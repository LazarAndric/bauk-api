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
import env from 'dotenv'

env.config()

const router = express.Router()

router.post('/loginEmail', userSchema.loginSchema, auth.validateInput, auth.verifyMailToken,
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

router.post('/loginPhone', userSchema.changePassword, auth.validateInput, async(req,res)=>{
    //Currently not implemented
})

router.post('/sendCode', userSchema.emailSchema, auth.validateInput,
    async (req,res)=>{
        if(!await userRepo.checkEmail(req.body.Email))
            return res.status(403).send({Message:'Email is not exist'})
        const result=await userRepo.getUserIdByEmail(req.body.Email)
        const emailModel=await authRepo.generateMailCodeAsync(result[0], req.body.Email)
        return res.status(200).json({ExpireDate: emailModel.ExpireDate, Message: 'Code is sent too e-mail'})
})

router.post('/verifyMailCode', userSchema.verifyMailCodeSchema, auth.validateInput,
    async (req,res)=>{
        if(!await userRepo.checkEmail(req.body.Email))
            return res.sendStatus(403)
        const result=await userRepo.getUserIdByEmail(req.body.Email)
        const mailModel=await authRepo.verifyMailCodeAsync(result[0], req.body.Code)
        if(!mailModel.IsVerify) return res.sendStatus(401)
        if(mailModel.ExpireDate<new Date()) return res.sendStatus(401)
        const mailToken=jwt.generateMailToken()
        await authRepo.putMailTokenAsync(req.body.Email, {MailToken: mailToken.MailToken})
        return res.header(mailToken).sendStatus(200)
})

router.post('/changePassword', auth.verifyMailToken,
    async(req,res)=>{
        const salt=uuidv4()
        let email=req.body.Email
        let password=req.body.Password
        const result=await userRepo.getUserIdByEmail(email)
        if(result.length==0) return res.sendStatus(403)
        password=hashPassword(password, salt)
        const passwordResult= await passwordRepo.putPassword(
            result[0].ID,
            {Hash: password.Hash, Salt: password.Salt}
        )
        if(passwordResult.affectedRows==0) return res.sendStatus(403)
        return res.status(200).send('Password changed')
})

router.post('/register', userSchema.userSchema, auth.validateInput,
    async (req,res)=>{
        let role=await userRepo.getRoles()
        role=role.find(r=>r.RoleName===process.env.DEFAULT_ROLE)

        let status=await userRepo.getStatus()
        status=status.find(r=>r.Status===process.env.DEFAULT_STATUS)
        
        const password=hashPassword(req.body.Password, uuidv4())
        const ID=uuidv4()
        let user=await userRepo.setUserAsync(
        {
            ID: ID,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            PhoneNumber: req.body.PhoneNumber,
            IdStatus: status.ID,
            IdRole: role.ID
        })
        if(errorEventHandler(user).bool) return res.sendStatus(403)
        if(user.affectedRows==0) return res.sendStatus(403)
        const passwordResult= await passwordRepo.postPassword({
            IdUser: ID,
            Hash: password.Hash,
            Salt: password.Salt
        })
        if(errorEventHandler(user).bool) return res.sendStatus(403)
        if(passwordResult.affectedRows==0) return res.sendStatus(403)

        for(const address of req.body.Addresses) address.IdUser=ID
        const addressResult= await userRepo.postAddressAsync(req.body.Addresses)
        if(addressResult.affectedRows==0) return res.sendStatus(403)
        res.sendStatus(201)
})

router.post('/generateToken', userSchema.generatetokenSchema, auth.validateInput, auth.verifyUserToken2,async (req, res)=>{
    if(req.isTokenVerify) return res.status(200).send('Your token is valid')
    const userId=await authRepo.getUserByToken(req.headers['refresh'])
    if(userId==undefined) return res.sendStatus(403)
    const user = await userRepo.getUserById(userId.IdUser)
    const token=jwtHandler.generateToken(req.headers, user[0])
    return res.header(token).sendStatus(205)
})

export default router