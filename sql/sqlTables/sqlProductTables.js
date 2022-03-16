import cfg from '../../config.js'

const productTable=`${cfg.db.schemaName}.${cfg.db.tables.product.productTable}`
const sizeTable=`${cfg.db.schemaName}.${cfg.db.tables.product.sizeTable}`
const pictureTable=`${cfg.db.schemaName}.${cfg.db.tables.product.pictureTable}`
const productAdditionTable=`${cfg.db.schemaName}.${cfg.db.tables.product.productAdditionTable}`
const productSizeTable=`${cfg.db.schemaName}.${cfg.db.tables.product.productSizeTable}`
const additionTable=`${cfg.db.schemaName}.${cfg.db.tables.additionTable}`

export {productTable, sizeTable, pictureTable, productAdditionTable, additionTable, productSizeTable}