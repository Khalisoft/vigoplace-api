import * as bcrypt from 'bcrypt'

export const encryptPassword = async(payload: any)=>{
    return await bcrypt.hash(payload, 12)
}

export const decryptPassword = async(payload:any)=>{
    const {password, databasePassword} = payload
    return await bcrypt.compare(password, databasePassword)
}