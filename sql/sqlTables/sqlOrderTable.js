import cfg from '../../config.js'

const orderTable=`${cfg.db.schemaName}.${cfg.db.tables.order.orderTable}`
const orderStatusTable=`${cfg.db.schemaName}.${cfg.db.tables.order.orderStatusTable}`
const orderAdressTable=`${cfg.db.schemaName}.${cfg.db.tables.order.orderAdressTable}`

export {orderTable, orderStatusTable, orderAdressTable}