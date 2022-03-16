import cfg from '../../config.js'

const visitTable=`${cfg.db.schemaName}.${cfg.db.tables.visit.visitTable}`
const ordersTable=`${cfg.db.schemaName}.${cfg.db.tables.visit.ordersTable}`
const placeTable=`${cfg.db.schemaName}.${cfg.db.tables.placeTable}`

export {placeTable, visitTable, ordersTable}