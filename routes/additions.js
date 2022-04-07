import express from 'express'
import * as additionRepo from '../dataRepos/additionRepo.js'
import * as auth from '../middleware/authorizationMiddleware.js'
import * as validationSchema from '../middleware/validationSchema.js'

const router = express.Router()

router.get('/:id', async(req,res)=>{
    const result=await additionRepo.getAddition(req.params.id)
    return res.status(200).send(result[0])
})

router.get('/', async(req,res)=>{
    const result=await additionRepo.getAdditions()
    return res.status(200).send(result)
})

//NO AUTH
router.post('/', validationSchema.postAddition, auth.validateInput, async(req,res)=>{
    await additionRepo.postAddition(req.body)
    return res.status(200).send('Created')
})

router.post('/multi', validationSchema.postAdditions, auth.validateInput, async(req,res)=>{
    await additionRepo.postAdditions(req.body)
    return res.status(200).send('Created')
})

router.put('/:id', validationSchema.postAddition, auth.validateInput, async(req,res)=>{
    await additionRepo.putAddition(req.body,req.params.id)
    return res.sendStatus(200)
})

export default router