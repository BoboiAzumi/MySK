import { prisma } from "../utils/database";

export async function storeFile(location: string, type: string, fileName: string, documentId: number){
    return await prisma.file.create({
        data: {
            location,
            type,
            documentId,
            fileName
        }
    })
}

export async function deleteFile(id: number[]){
    return await prisma.file.deleteMany({
        where: {
            id: {
                in: id
            }
        }
    })
}