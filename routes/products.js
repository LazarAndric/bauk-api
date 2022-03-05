import express from 'express'
import * as productRepo from './../dataRepos/productRepo.js'

const router = express.Router()

router.get('/:id', async(req,res)=>{
    const result=await productRepo.getProduct(req.params.id)
    return res.status(200).send(result)
})

router.get('/', async(req,res)=>{
    const result=await productRepo.getProducts()
    return res.status(200).send(result)
})

router.post('/', async(req,res)=>{
    let result=await productRepo.postPicture(req.body.Picture)
    result=await productRepo.postProduct({
        IdPicture: result.insertId,
        Name: req.body.Name,
        Available: req.body.Available? 1 : 0,
        Description: req.body.Description
    })
    for(const size of req.body.Sizes)
        size.IdProduct=result.insertId
    await productRepo.postSizes(req.body.Sizes)

    const additionResult=await productRepo.postAdditions(req.body.Additions)

    let additions=[]
    for(let i=0;i<additionResult.affectedRows;i++)
    {
        additions.push({
            IdProduct: result.insertId,
            IdAddition: additionResult.insertId+i
        })
    }

    await productRepo.postProductAddition(additions)
    return res.status(200).send('Created')
})
export default router