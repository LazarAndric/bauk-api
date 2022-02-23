import cfg from '../../config.js'

const itemTable=`${cfg.db.schemaName}.${cfg.db.tables.item.itemTable}`
const additionsTable=`${cfg.db.schemaName}.${cfg.db.tables.item.additionsTable}`

export {itemTable, additionsTable}