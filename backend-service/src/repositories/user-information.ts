import { Role } from "@prisma/client";
import { User } from "../types/user";
import { prisma } from "../utils/database";

export async function createUserInformation(user: User){
    return prisma.userInformation.create({
        data: {
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            picture: user.picture,
            role: user.role
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