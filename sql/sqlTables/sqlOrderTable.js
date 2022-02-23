import cfg from '../../config.js'

const orderTable=`${cfg.db.schemaName}.${cfg.db.tables.order.orderTable}`
const orderStatusTable=`${cfg.db.schemaName}.${cfg.db.tables.order.orderStatusTable}`

export {orderTable, orderStatusTable}