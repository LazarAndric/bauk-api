const errors=[
    {code: 1045, messsage: 'Access denied'},
    {code: 1062, messsage: 'Already exist in database'}
]
const errorEventHandler=(result)=>{
    if(!result.hasOwnProperty('errno'))
        return {bool:false, res: result}
    return {bool:true,res: errors.find(element=>element.code==result.errno)}
}
export default errorEventHandler