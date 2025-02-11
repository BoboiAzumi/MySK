import { prisma } from "../utils/database";

export async function createNewDocument(title: string, by: number, to: number){
    return await prisma.document.create({
        data: {
            title,
            by,
            to
        }
    })
}

export async function getAllDocument(take: number, skip: number){
    return await prisma.document.findMany({
        take,
        skip,
        include: {
            File: true,
            ByUser: true,
            ToUser: true
        },
        orderBy: [
            {
                createdAt: 'desc'
            }
        ]
    })
}

export async function getAllDocumentByTo(take: number, skip: number, to: number){
    return await prisma.document.findMany({
        take,
        skip,
        include: {
            File: true,
            ByUser: true,
            ToUser: true
        },
        where: {
            to
        },
        orderBy: [
            {
                createdAt: 'desc'
            }
        ]
    })
}

export async function countDocument(){
    return await prisma.document.count()
}

export async function findDocumentById(id: number){
    return await prisma.document.findFirst({
        where: {
            id
        },
        include: {
            File: true,
            ByUser: true
        }
    })
}

export async function deleteDocument(id: number){
    return await prisma.document.delete({
        where: {
            id
        }
    })
}