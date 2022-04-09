import cfg from '../../config.js'

const visitTable=`${cfg.db.schemaName}.${cfg.db.tables.visit.visitTable}`
const ordersTable=`${cfg.db.schemaName}.${cfg.db.tables.visit.ordersTable}`
const addresssTable=`${cfg.db.schemaName}.${cfg.db.tables.user.addressTable}`
const placeTable=`${cfg.db.schemaName}.${cfg.db.tables.placeTable}`

export {addresssTable, placeTable, visitTable, ordersTable}