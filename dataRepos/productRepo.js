import {queryWithData, queryWithoutData} from '../sql/sqlConnection.js'
import * as sqlQueries from '../sql/sqlQueries.js'
import * as productTables from '../sql/sqlTables/sqlProductTables.js'

const getProduct=async(id)=>{
    let sql=sqlQueries.getItemsByConditions('p.ID, p.Name, p.Available, p.Description, pi.Name, pi.File_Path',
    `${productTables.productTable} p, ${productTables.pictureTable} pi`, 'p.ID=? AND p.IdPicture=pi.ID')
    const data=await queryWithData(sql, id)
    let product=data[0]
    product.Available= product.Available==1 ? true : false
    sql=sqlQueries.getItemsByConditions('ID, Size, Price, IdProduct', productTables.sizeTable, 'IdProduct=?')
    product.Size = await queryWithData(sql, id)
    sql=sqlQueries.getItemsByConditions('a.ID, a.Name, a.Price', `${productTables.additionTable} a, ${productTables.productAdditionTable} pa`,
    'pa.IdProduct=? AND pa.IdAddition=a.ID')
    product.Additions =await queryWithData(sql, id)
    return product
}

const getProducts=async()=>{
    let sql=sqlQueries.getItemsByConditions('p.ID, p.Name, p.Available, p.Description, pi.Name, pi.File_Path',
    `${productTables.productTable} p, ${productTables.pictureTable} pi`, 'p.IdPicture=pi.ID')
    const data=await queryWithoutData(sql)
    for(const product of data){
        product.Available= product.Available==1 ? true : false
        sql=sqlQueries.getItemsByConditions('ID, Size, Price, IdProduct', productTables.sizeTable, 'IdProduct=?')
        product.Size = await queryWithData(sql, product.ID)
        sql=sqlQueries.getItemsByConditions('a.ID, a.Name, a.Price', `${productTables.additionTable} a, ${productTables.productAdditionTable} pa`,
        'pa.IdProduct=? AND pa.IdAddition=a.ID')
        product.Additions =await queryWithData(sql, product.ID)
    }
    return data
}

const putProductAsync=async(id, product)=>{
    const sql= sqlQueries.updateItem(productTables.productTable, 'ID=?')
    const result= await queryWithData(sql, [product, id])
    return result
}

const postProduct=async(product)=>{
    let sql=sqlQueries.setItem(productTables.productTable)
    return await queryWithData(sql, product)
}

const postPicture=async(picture)=>{
    let sql=sqlQueries.setItem(productTables.pictureTable)
    return await queryWithData(sql, picture)
}

const postSizes=async(sizes)=>{
    const keys=Object.keys(sizes[0])
    const values=sizes.map(obj=> keys.map(key=> obj[key]))
    let sql=sqlQueries.setItems(productTables.sizeTable, keys)
    return await queryWithData(sql, [values])
}

const postAdditions=async(additions)=>{
    const keys=Object.keys(additions[0])
    const values=additions.map(obj=> keys.map(key=> obj[key]))
    let sql=sqlQueries.setItems(productTables.additionTable, keys)
    return await queryWithData(sql, [values])
}

const postProductAddition=async(additions)=>{
    const keys=Object.keys(additions[0])
    const values=additions.map(obj=> keys.map(key=> obj[key]))
    let sql=sqlQueries.setItems(productTables.productAdditionTable, keys)
    return await queryWithData(sql, [values])
}
const getIdfromPicture=async(pictureId)=>{
    const sql=sqlQueries.getItemsByConditions('ID', productTables.productTable, 'pictureId=?')
    const id=queryWithData(sql, pictureId)
    return id[0]
}
const getIdForSize=async(pictureId)=>{
    const sql=sqlQueries.getItemsByConditions('ID', productTables.productTable, 'pictureId=?')
    const id=queryWithData(sql, pictureId)
    return id[0]
}


export {getProduct, postProduct, postPicture, postSizes, postAdditions,
    postProductAddition, getIdfromPicture, getIdForSize, getProducts, putProductAsync}
