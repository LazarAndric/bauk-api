import express from 'express'
import * as visitRepo from '../dataRepos/visitRepo.js'
import * as auth from '../middleware/authorizationMiddleware.js'
import * as validationSchema from '../middleware/validationSchema.js'

const router = express.Router()

router.get('/:id', async(req,res)=>{
    const result=await visitRepo.getVisit(req.params.id)
    return res.status(200).send(result)
})

router.get('/', async(req,res)=>{
    const result=await visitRepo.getVisits()
    return res.status(200).send(result)
})

//router.post('/', userSchema.postProduct, auth.validateInput,
router.post('/', validationSchema.postVisit, auth.validateInput, async(req,res)=>{
    await visitRepo.postVisit(req.body)
    return res.sendStatus(201)
})

router.post('/multi', validationSchema.postVisits, auth.validateInput, async(req,res)=>{
    const result=await visitRepo.postVisits(req.body)
    return res.sendStatus(201)
})

router.put('/:id', async(req,res)=>{
    await visitRepo.putVisit(req.body, req.params.id)
    return res.sendStatus(200)
})

export default router