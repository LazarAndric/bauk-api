import express from 'express'
import * as sizeRepo from '../dataRepos/sizeRepo.js'
import * as auth from '../middleware/authorizationMiddleware.js'
import * as validationSchema from '../middleware/validationSchema.js'

const router = express.Router()

router.get('/:id', async(req,res)=>{
    const result=await sizeRepo.getSize(req.params.id)
    return res.status(200).send(result[0])
})

router.get('/', async(req,res)=>{
    const result=await sizeRepo.getSizes()
    return res.status(200).send(result)
})

//NO AUTH
//router.post('/', userSchema.postProduct, auth.validateInput,
router.post('/', validationSchema.postSize, auth.validateInput, async(req,res)=>{
    await sizeRepo.postSize(req.body)
    return res.status(200).send('Created')
})

router.post('/multi', validationSchema.postSizes, auth.validateInput, async(req,res)=>{
    const result=await sizeRepo.postSizes(req.body)
    return res.status(200).send('Created')
})

router.put('/:id', validationSchema.postSize, auth.validateInput, async(req,res)=>{
    await sizeRepo.putSize(req.body, req.params.id)
    return res.sendStatus(200)
})

export default router