import express from 'express'
import * as userRepo from './../dataRepos/userRepo.js'
import { v4 as uuidv4 } from 'uuid';
import { body, check, validationResult } from 'express-validator'
import errorEventHandler from './../sql/sqlErrorHandler.js'
import * as auth from '../middleware/authorizationMiddleware.js'
import * as userSchema from '../middleware/validationSchema.js'

const router = express.Router()

//Routes
/**
 * @openapi
 * /users/all:
 *   get:
 *     description: Get all users
 *     responses:
 *       '200': description: Return all users
 *       '401': description: Not authorize
 */
router.get('/all', userSchema.auhorizedUserSchema, auth.validateInput, auth.verifyUserToken, 
    async (req,res)=>{
        if(!(await userRepo.checAdminkID(req.user.ID)))
            return res.status(401).send('Not authorize')
        const result=await userRepo.getUsersAsync()
        return result.length!==0 ? res.status(200).send(result) : res.sendStatus(204)
    }
)

router.get('/', userSchema.auhorizedUserSchema, auth.validateInput, auth.verifyUserToken,
    async (req,res)=>{
        if(!(await userRepo.checkID(req.user.ID)))
            return res.status(401).send('You are not authorize')
        let result=await userRepo.getUserById(req.user.ID)
        return result.length!==0 ? res.status(200).send(result[0]) : res.sendStatus(204)
})

router.get('/adresses', userSchema.auhorizedUserSchema, auth.validateInput, auth.verifyUserToken,
    async (req,res)=>{
        let result=await userRepo.getAdressesOfUserAsync(req.user.ID)
        res.status(200).json(result)
})

router.get('/places', userSchema.auhorizedUserSchema, auth.validateInput, auth.verifyUserToken,
    async (req,res)=>{
        let result=await userRepo.getPlacesAsync()
        res.status(200).json(result)
})

router.delete('/', userSchema.auhorizedUserSchema, auth.validateInput, auth.verifyUserToken,
    async (req,res)=>{
        if(!(await userRepo.checkID(req.user.ID)))
            return res.status(401).send('You are not authorize')
        const result=await userRepo.deleteUserAsync(req.user.ID)
        return result.affectedRows!==0 ? res.status(202).send({message: 'Account deleted'}) : res.sendStatus(204)
})

router.put('/', userSchema.userEditSchema, auth.validateInput, auth.verifyUserToken,
    async (req,res)=>{
        const id=req.params.id
        const result=await userRepo.putUserAsync(id, req.body)
        return res.status(200).send(result)
})

export default router

// router.post('/',
// async (req,res)=>{
//     const errors=validationResult(req)
//     if(!errors.isEmpty())
//         return res.status(400).json({err: errors.array()})
//     const id=uuidv4()
//     let user={ID: id, ...req.body}
//     let result=await userRepo.setUserAsync(user)
//     result=errorEventHandler(result)
//     return (result.bool ? res.status(403) : res.status(201)).send(result.res.messsage)
// })
