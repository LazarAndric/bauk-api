import crypto from 'crypto'

const hashPassword=(password, salt)=>{
    let hash= crypto.createHmac('sha512', salt)
    hash.update(password)
    const value= hash.digest('hex')
    return {
        Hash: value,
        Salt: salt
    }
}

export default hashPassword