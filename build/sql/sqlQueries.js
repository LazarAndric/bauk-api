
const getItems=(propArrayString,table) => 
    `SELECT ${propArrayString} FROM ${table}`

const getItemsByConditions=(propArrayString,table, conditions) => 
    `SELECT ${propArrayString} FROM ${table} WHERE ${conditions}`

const setItem=(table) => 
    `INSERT INTO ${table} SET ?`

const deleteItem=(table, conditions) => 
    `DELETE FROM ${table} WHERE ${conditions}`

const deleteItemWithOption=(table, conditions, moreOption) => 
    `DELETE ${moreOption} FROM ${table} WHERE ${conditions}`

const updateItem=(table, conditions) => 
    `UPDATE ${table} SET ? WHERE ${conditions}`

const checkItem=(tables, condition)=>
    `SELECT EXISTS(SELECT * FROM ${tables} WHERE ${condition})`

export {getItems, getItemsByConditions, setItem, deleteItem, deleteItemWithOption, updateItem, checkItem}