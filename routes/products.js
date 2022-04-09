import express from 'express'
import * as productRepo from './../dataRepos/productRepo.js'
import * as auth from '../middleware/authorizationMiddleware.js'
import * as userSchema from '../middleware/validationSchema.js'

const router = express.Router()

router.get('/:id',
async(req,res)=>{
    const result=await productRepo.getProduct(req.params.id)
    if(result==null) return res.sendStatus(204)
    return res.status(200).send(result)
})

router.get('/',
async(req,res)=>{
    const result=await productRepo.getProducts()
    return res.status(200).send(result)
})

//NO AUTH
//router.post('/', userSchema.postProduct, auth.validateInput,
router.post('/', userSchema.postProduct, auth.validateInput, auth.verifyUserToken, auth.verifyUserAdminAsync,
async(req,res)=>{
    const result=await productRepo.postProduct({
        IdPicture: req.body.IdPicture,
        Name: req.body.Name,
        Available: req.body.Available ? 1:0,
        Description: req.body.Description
    })
    for(const size of req.body.Sizes)
    {
        size.IdProduct=result.insertId
    }
    let value=await productRepo.postSizes(req.body.Sizes)
    
    for(const addition of req.body.Additions)
    {
        addition.IdProduct=result.insertId
    }
    
    value=await productRepo.postAdditions(req.body.Additions)

    return res.status(200).send('Created')
})

export default router