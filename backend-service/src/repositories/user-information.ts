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

export async function updateUserInfo(userId: number, fullName: string, email: string, phone: string){
    return prisma.userInformation.update({
        data:{
            fullName,
            email,
            phone
        },
        where: {
            id: userId
        }
    })
}

export async function updatePhoto(userId:number, path: string){
    return prisma.userInformation.update({
        data: {
            picture: path
        },
        where: {
            id: userId
        }
    })
}

export async function updateUserAndIdentifier(userId: number, identifier: string, fullName: string, email: string, phone: string){
    return prisma.userInformation.update({
        data:{
            fullName,
            email,
            phone,
            identifier
        },
        where: {
            id: userId
        }
    })
}

export async function deleteUser(userId: number){
    return prisma.userInformation.delete({
        where:{
            id: userId
        }
    })
}