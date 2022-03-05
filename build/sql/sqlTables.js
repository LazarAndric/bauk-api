import cfg from '../config.js'

const userTable=`${cfg.db.schemaName}.${cfg.db.tables.user.userTable}`
const statusTable=`${cfg.db.schemaName}.${cfg.db.tables.user.statusTable}`
const adressTable=`${cfg.db.schemaName}.${cfg.db.tables.user.adressTable}`
const placeTable=`${cfg.db.schemaName}.${cfg.db.tables.placeTable}`
const chatTable=`${cfg.db.schemaName}.${cfg.db.tables.user.chatTable}`
const passwordTable=`${cfg.db.schemaName}.${cfg.db.tables.user.passwordTable}`
const roleTable=`${cfg.db.schemaName}.${cfg.db.tables.user.roleTable}`
const authTable= `${cfg.db.schemaName}.${cfg.db.tables.user.authTable}`

export {userTable, statusTable, adressTable, placeTable, chatTable, passwordTable, roleTable, authTable}