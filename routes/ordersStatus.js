import express from 'express'
import * as orderRepo from '../dataRepos/orderRepo.js'
import * as productRepo from '../dataRepos/productRepo.js'
import * as userRepo from '../dataRepos/userRepo.js'
import * as auth from '../middleware/authorizationMiddleware.js'
import * as validationSchema from '../middleware/validationSchema.js'

const router = express.Router()

router.post('/', auth.verifyUserToken, auth.verifyUserAdminAsync, async(req,res)=>{
    const result=await orderRepo.postStatus(req.body)
    return res.sendStatus(201)
})

router.get('/', auth.verifyUserToken, auth.verifyUserAdminAsync, async(req,res)=>{
    const result=await orderRepo.getStatus()
    return res.status(200).send(result)
})

export default router