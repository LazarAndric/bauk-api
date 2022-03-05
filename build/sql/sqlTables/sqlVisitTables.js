import cfg from '../../config.js'

const visitTable=`${cfg.db.schemaName}.${cfg.db.tables.visit.visitTable}`
const ordersTable=`${cfg.db.schemaName}.${cfg.db.tables.visit.ordersTable}`

export {visitTable, ordersTable}