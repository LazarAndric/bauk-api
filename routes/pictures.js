import express from 'express'
import * as productRepo from '../dataRepos/productRepo.js'
import * as auth from '../middleware/authorizationMiddleware.js'
import * as userSchema from '../middleware/validationSchema.js'

const router = express.Router()

router.get('/',
async(req,res)=>{
    const result=await productRepo.getPictures()
    return res.status(200).send(result)
})

router.post('/', userSchema.pictures, auth.validateInput,
async(req,res)=>{
    const result=await productRepo.postPictures(req.body)
    return res.sendStatus(201)
})

export default router