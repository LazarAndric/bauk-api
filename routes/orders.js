import express from 'express'
import * as orderRepo from '../dataRepos/orderRepo.js'
import * as productRepo from '../dataRepos/productRepo.js'
import * as visitRepo from '../dataRepos/visitRepo.js'
import * as auth from '../middleware/authorizationMiddleware.js'
import * as validationSchema from '../middleware/validationSchema.js'

const router = express.Router()

router.get('/:id', async(req,res)=>{
    const result=await orderRepo.getOrder(req.params.id)
    return res.status(200).send(result)
})

router.get('/', auth.verifyUserToken, auth.verifyUserAsync, async(req,res)=>{
    const result=await orderRepo.getOrders(req.user.ID)
    return res.status(200).send(result)
})

router.post('/', validationSchema.orders, auth.validateInput, auth.verifyUserToken, async(req,res)=>{
    const visit=await visitRepo.isAddressExist(req.body.IdVisit,req.body.IdAddress, req.user.ID)
    if(visit) return res.sendStatus(404)
    const product=await productRepo.getProduct(req.body.Items[0].IdProduct)
    req.body.Comments=product.Name + ", " + product.Description
    const idVisit=await orderRepo.getVisitByAddress(req.body.IdAddress)
    const result=await orderRepo.postOrder({
        IdOrderStatus:req.body.IdOrderStatus,
        Price:req.body.Price,
        Description:req.body.Comments
    })
    await orderRepo.postUsersTable({IdUser:req.user.ID, IdOrder:result.insertId})
    let r=await orderRepo.postOrdersTable({
        IdVisit:idVisit[0].ID,
        IdOrder:result.insertId
    })
    
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

export default router