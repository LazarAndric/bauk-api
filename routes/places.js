import express from 'express'
import errorEventHandler from '../sql/sqlErrorHandler.js'
import  * as placeRepo from '../dataRepos/placeRepo.js'
import * as auth from '../middleware/authorizationMiddleware.js'
import * as userSchema from '../middleware/validationSchema.js'

const router = express.Router()

router.get('/', async (req,res)=>{
        const result=await placeRepo.getPlacesAsync();
        return result.length!==0 ? res.status(200).send(result) : res.sendStatus(204)
    }
)

router.get('/:id', async (req,res)=>{
        let result=await placeRepo.getPlaceAsync(req.params.id)
        return result.length!==0 ? res.status(200).send(result[0]) : res.sendStatus(204)
})

router.post('/', userSchema.postPlace, auth.validateInput, async (req,res)=>{
        let result=await placeRepo.postPlaceAsync({
                PlaceName:req.body.PlaceName,
                AreaCode:req.body.AreaCode,
                Active: 0
        })
        return errorEventHandler(result).bool ? res.sendStatus(404) : res.sendStatus(201)
})

router.delete('/:id', auth.verifyUserToken, auth.verifyUserAdminAsync, async (req,res)=>{
        const result=await placeRepo.deletePlaceAsync(req.params.id)
        return result.affectedRows!==0 ? res.status(202).send({message: 'Place is deleted'}) : res.sendStatus(204)
})

router.put('/:id', userSchema.putPlaces, auth.validateInput, auth.verifyUserToken, auth.verifyUserAdminAsync,
    async (req,res)=>{
        const id=req.params.id
        const result=await userRepo.putUserAsync(id, req.body)
        return res.status(200).send(result)
})

export default router