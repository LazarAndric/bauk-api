import express from 'express'
import * as orderRepo from '../dataRepos/orderRepo.js'
import * as productRepo from '../dataRepos/productRepo.js'
import * as userRepo from '../dataRepos/userRepo.js'
import * as auth from '../middleware/authorizationMiddleware.js'
import * as validationSchema from '../middleware/validationSchema.js'

const router = express.Router()

router.get('/:id', async(req,res)=>{
    const result=await orderRepo.getOrder(req.params.id)
    return res.status(200).send(result)
})

// router.get('/', async(req,res)=>{
//     const result=await orderRepo.getVisits()
//     return res.status(200).send(result)
// })

// //NO AUTH
router.post('/', validationSchema.orders, auth.validateInput, auth.verifyUserToken, async(req,res)=>{
    const product=await productRepo.getProduct(req.body.Items[0].IdProduct)
    req.body.Comments=product.Name + ", " + product.Description
    const idVisit=await orderRepo.getVisitByAddress(req.body.IdAddress)
    const result=await orderRepo.postOrder({
        IdOrderStatus:1,
        Price:req.body.Price,
        Description:req.body.Comments
    })
    await orderRepo.postUsersTable({IdUser:req.user.ID, IdOrder:result.insertId})
    let r=await orderRepo.postOrdersTable({
        IdVisit:idVisit[0].ID,
        IdOrder:result.insertId
    })
    //Update price
    r=await orderRepo.putVisit(idVisit[0].ID, req.body.Price)
    r=await orderRepo.postAddress({
        IdOrder: result.insertId,
        IdAddress: req.body.IdAddress
    })

    for(let item of req.body.Items)
    {
        let ite=await orderRepo.postItem({
            IdProduct: item.IdProduct,
            IdOrder: result.insertId,
            IdSize: item.IdSize,
            Price:item.Price,
            Comments: item.Comments
        })
        for(let addition of item.Additions){
            r=await orderRepo.postAddition({
                IdItem: ite.insertId,
                IdAddition: addition.ID
            })
        }
    }
    return res.status(200).send('Created')
})

// router.post('/multi', validationSchema.postSizes, auth.validateInput, async(req,res)=>{
//     const result=await orderRepo.postVisits(req.body)
//     return res.status(200).send('Created')
// })

// router.put('/:id', validationSchema.postSize, auth.validateInput, async(req,res)=>{
//     await orderRepo.putVisit(req.body, req.params.id)
//     return res.sendStatus(200)
// })

export default router