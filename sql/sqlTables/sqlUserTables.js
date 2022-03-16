import cfg from '../../config.js'

const placeTable=`${cfg.db.schemaName}.${cfg.db.tables.placeTable}`

const userTable=`${cfg.db.schemaName}.${cfg.db.tables.user.userTable}`
const addressTable=`${cfg.db.schemaName}.${cfg.db.tables.user.addressTable}`
const statusTable=`${cfg.db.schemaName}.${cfg.db.tables.user.statusTable}`
const chatTable=`${cfg.db.schemaName}.${cfg.db.tables.user.chatTable}`
const passwordTable=`${cfg.db.schemaName}.${cfg.db.tables.user.passwordTable}`
const roleTable=`${cfg.db.schemaName}.${cfg.db.tables.user.roleTable}`
const authTable= `${cfg.db.schemaName}.${cfg.db.tables.user.authTable}`
const mailTable= `${cfg.db.schemaName}.${cfg.db.tables.user.mailTable}`
const orderUserTable= `${cfg.db.schemaName}.${cfg.db.tables.user.orderUserTable}`

export {placeTable, userTable, addressTable, statusTable, chatTable, passwordTable,
    roleTable, authTable, mailTable, orderUserTable}