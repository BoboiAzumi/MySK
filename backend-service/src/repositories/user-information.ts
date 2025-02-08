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