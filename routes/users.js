import express from 'express'
import * as userRepo from '../dataRepos/userRepo.js'
import errorEventHandler from '../sql/sqlErrorHandler.js'
import * as auth from '../middleware/authorizationMiddleware.js'
import * as userSchema from '../middleware/validationSchema.js'

const router = express.Router()

router.get('/all', userSchema.auhorizedUserSchema, auth.validateInput, auth.verifyUserToken, auth.verifyUserAdminAsync,
    async (req,res)=>{
        const result=await userRepo.getUsersAsync()
        return result.length!==0 ? res.status(200).send(result) : res.sendStatus(204)
    }
)

router.get('/', userSchema.auhorizedUserSchema, auth.validateInput, auth.verifyUserToken, auth.verifyUserAsync,
    async (req,res)=>{
        let result=await userRepo.getUserById(req.user.ID)
        return result.length!==0 ? res.status(200).send(result[0]) : res.sendStatus(204)
})

router.get('/addresses', userSchema.auhorizedUserSchema, auth.validateInput, auth.verifyUserToken, auth.verifyUserAsync,
    async (req,res)=>{
        let result=await userRepo.getAddressesOfUserAsync(req.user.ID)
        return res.status(200).send(result)
})

router.get('/places', userSchema.auhorizedUserSchema, auth.validateInput, auth.verifyUserToken, auth.verifyUserAsync,
    async (req,res)=>{
        let result=await userRepo.getPlacesAsync(req.user.ID)
        return res.status(200).send(result)
})

router.delete('/', userSchema.auhorizedUserSchema, auth.validateInput, auth.verifyUserToken,
    async (req,res)=>{
        const result=await userRepo.deleteUserAsync(req.user.ID)
        return result.affectedRows!==0 ? res.sendStatus(202) : res.sendStatus(204)
})

router.delete('/auth', userSchema.auhorizedUserSchema, auth.validateInput, auth.verifyUserToken, auth.verifyUserAdminAsync,
    async (req,res)=>{
        const result=await userRepo.deleteUserAsync(req.body.ID)
        return result.affectedRows!==0 ? res.sendStatus(202) : res.sendStatus(204)
})

router.put('/', userSchema.userEditSchema, auth.validateInput, auth.verifyUserToken,
    async (req,res)=>{
        const id=req.params.id
        const result=await userRepo.putUserAsync(id, req.body)
        return res.status(200).send(result)
})

export default router