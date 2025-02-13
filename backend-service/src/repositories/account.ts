import { hashPassword } from "../utils/bcrypt";
import { prisma } from "../utils/database";

export async function findByUsernameAndPassword(username: string, password: string){
    return await prisma.account.findFirst({
        where: {
            username,
            password
        },
        include: {
            UserInformation: true
        }
    })
}

export async function createAccount(username: string, password: string, userId: number){
    return await prisma.account.upsert({
        where: {
            userId,
        },
        update: {
            username,
            password: await hashPassword(password),
        },
        create: {
            username,
            password: await hashPassword(password),
            userId
        }
    })
}

export async function findByUsername(username: string){
    return await prisma.account.findFirst({
        where: {
            username
        },
        include: {
            UserInformation: true
        }
    })
}

export async function updatePassword(userId: number, password: string){
    return await prisma.account.update({
        data: {
            password: await hashPassword(password)
        },
        where: {
            userId
        }
    })
}