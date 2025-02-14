import { Role } from "@prisma/client";
import { User } from "../types/user";
import { prisma } from "../utils/database";
import { hashPassword } from "../utils/bcrypt";

export async function createUserInformation(user: User){
    return prisma.userInformation.create({
        data: {
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            picture: user.picture,
            role: user.role,
            identifier: user.identifier
        }
    })
}

export async function findUserById(id: number){
    return prisma.userInformation.findFirst({
        where: {
            id
        }
    })
}

export async function findAllUserByRole(role: Role){
    return prisma.userInformation.findMany({
        where: {
            role
        }
    })
}

export async function findAllUser(){
    return prisma.userInformation.findMany()
}

export async function updatePassword(userId: number, password: string){
    return prisma.userInformation.update({
        data: {
            Account: {
                update: {
                    password: await hashPassword(password)
                }
            }
        },
        where: {
            id: userId
        }
    })
}