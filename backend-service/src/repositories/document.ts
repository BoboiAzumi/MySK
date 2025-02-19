import { DocumentType } from "@prisma/client";
import { prisma } from "../utils/database";

export async function createNewDocument(title: string, by: number, to: number, documentType: DocumentType){
    return await prisma.document.create({
        data: {
            title,
            by,
            to,
            documentType
        }
    })
}

export async function getAllDocument(take: number, skip: number, q: string){
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
        ],
        where: {
            title: {
                contains: q,
                mode: "insensitive"
            }
        }
    })
}

export async function getAllDocumentByTo(take: number, skip: number, to: number, q: string){
    return await prisma.document.findMany({
        take,
        skip,
        include: {
            File: true,
            ByUser: true,
            ToUser: true
        },
        where: {
            to,
            title: {
                contains: q,
                mode: "insensitive"
            }
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

export async function findDocumentRelatedByUserId(userId: number){
    return await prisma.document.findMany({
        where: {
            OR: [
                {
                    ByUser: {
                        id: userId
                    }
                },
                {
                    ToUser: {
                        id: userId
                    }
                }
            ]
        },
        include: {
            File: true
        }
    })
}

export async function deleteDocumentRelatedByUserId(userId: number){
    return await prisma.document.deleteMany({
        where: {
            OR: [
                {
                    ByUser: {
                        id: userId
                    }
                },
                {
                    ToUser: {
                        id: userId
                    }
                }
            ]
        }
    })
}