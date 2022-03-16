import cfg from '../../config.js'

const orderTable=`${cfg.db.schemaName}.${cfg.db.tables.order.orderTable}`
const orderStatusTable=`${cfg.db.schemaName}.${cfg.db.tables.order.orderStatusTable}`
const orderAddressTable=`${cfg.db.schemaName}.${cfg.db.tables.order.orderAddressTable}`
const orderUserTable=`${cfg.db.schemaName}.${cfg.db.tables.user.orderUserTable}`
const userTable=`${cfg.db.schemaName}.${cfg.db.tables.user.userTable}`

export {userTable, orderUserTable, orderTable, orderStatusTable, orderAddressTable}