import bcrypt from "bcrypt"

export function comparePassword(password: string, encryptedPassword: string){
    return bcrypt.compare(password, encryptedPassword)
}

export function hashPassword(plainTextPassword: string){
    return bcrypt.hash(plainTextPassword, 10)
}