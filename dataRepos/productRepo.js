import {queryWithData, queryWithoutData} from '../sql/sqlConnection.js'
import * as sqlQueries from '../sql/sqlQueries.js'
import * as productTables from '../sql/sqlTables/sqlProductTables.js'

const getProduct=async(id)=>{
    let sql=sqlQueries.getItemsByConditions('p.ID, p.Name, p.Available, p.Description, pi.File_Path',
    `${productTables.productTable} p, ${productTables.pictureTable} pi`, 'p.ID=? AND p.IdPicture=pi.ID')
    const data=await queryWithData(sql, id)
    let product=data[0]
    product.Available= product.Available==1 ? true : false
    sql=sqlQueries.getItemsByConditions('s.ID, s.Size, ps.Price',
    `${productTables.sizeTable} s, ${productTables.productSizeTable} ps`, 'ps.IdProduct= ? AND ps.IdSize=s.ID')
    product.Size = await queryWithData(sql, id)
    sql=sqlQueries.getItemsByConditions('a.ID, a.Name, a.Price',
    `${productTables.additionTable} a, ${productTables.productAdditionTable} pa`,
    'pa.IdProduct=? AND pa.IdAddition=a.ID')
    product.Additions =await queryWithData(sql, id)
    return product
}

const getProducts=async()=>{
    let sql=sqlQueries.getItemsByConditions('p.ID, p.Name, p.Available, p.Description, pi.File_Path',
    `${productTables.productTable} p, ${productTables.pictureTable} pi`, 'p.IdPicture=pi.ID')
    const data=await queryWithoutData(sql)
    for(const product of data){
        product.Available= product.Available==1 ? true : false
        sql=sqlQueries.getItemsByConditions('s.ID, s.Size, ps.Price',
        `${productTables.sizeTable} s, ${productTables.productSizeTable} ps`, 'ps.IdProduct= ? AND ps.IdSize=s.ID')
        product.Size = await queryWithData(sql, product.ID)
        sql=sqlQueries.getItemsByConditions('a.ID, a.Name, a.Price', `${productTables.additionTable} a, ${productTables.productAdditionTable} pa`,
        'pa.IdProduct=? AND pa.IdAddition=a.ID')
        product.Additions =await queryWithData(sql, product.ID)
    }
    return data
}

const postProduct=async(product)=>{
    let sql=sqlQueries.setItem(productTables.productTable)
    return await queryWithData(sql, product)
}

const postSizes=async(sizes)=>{
    const keys=Object.keys(sizes[0])
    const values=sizes.map(obj=> keys.map(key=> obj[key]))
    let sql=sqlQueries.setItems(productTables.productSizeTable, keys)
    return await queryWithData(sql, [values])
}

const postAdditions=async(additions)=>{
    const keys=Object.keys(additions[0])
    const values=additions.map(obj=> keys.map(key=> obj[key]))
    let sql=sqlQueries.setItems(productTables.productAdditionTable, keys)
    return await queryWithData(sql, [values])
}

export { getProduct, postProduct, postSizes, postAdditions, getProducts}
