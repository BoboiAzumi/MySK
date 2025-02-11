import { Role } from "@prisma/client";
import { countDocument, createNewDocument, deleteDocument, findDocumentById, getAllDocument, getAllDocumentByTo } from "../repositories/document";
import { ResponseBuilder } from "../utils/response-builder";
import { ErrorHandler } from "../utils/error-handler";
import { unlinkSync } from "fs";
import { deleteFile } from "../repositories/file";

export async function CreateDocumentService(title: string, by: number, to: number){
    const newDocument = await createNewDocument(title, by, to)

    return ResponseBuilder(
        201,
        "CREATED",
        "Successfuly created new document",
        {
            id: newDocument.id
        }
    )
}

export async function GetDocumentService(limit: number, page: number, role: string, userId: number){
    const skip = limit * (page - 1 >= 0 ? page - 1 : 0)
    const take = limit

    const documentCount = await countDocument()

    return ResponseBuilder(
        200,
        "SUCCESS",
        "Successfuly fetch document",
        {
            pagination: {
                totalItems: documentCount,
                previous: page <= 1 ? false : true,
                next: skip + take >= documentCount ? false : true
            },
            documents: role == Role.ADMIN ? await getAllDocument(take, skip) : await getAllDocumentByTo(take, skip, userId)
        }
    )
}

export async function DeleteDocumentService(id: number){
    const document = await findDocumentById(id)
    if(!document){
        throw new ErrorHandler(404, "NOT_FOUND", "Document not found")
    }

    const fileIds: number[] = []
    document.File.map((v) => {
        const filename = v.location.replace("/uploads", "./public")
        unlinkSync(filename)
        fileIds.push(v.id)
    })

    await deleteFile(fileIds)
    await deleteDocument(id)

    return ResponseBuilder(
        200,
        "SUCCESS",
        "Documents has been deleted",
        {}
    )
}

export async function DeleteDocumentByNonAdminService(id: number, userId: number){
    const document = await findDocumentById(id)
    if(!document){
        throw new ErrorHandler(404, "NOT_FOUND", "Document not found")
    }

    if(document.ByUser.id == userId){
        return await DeleteDocumentService(id)
    }
    
    throw new ErrorHandler(403, "FORBIDDEN", "Forbidden access for this document")
}

export async function CountDocumentService(){
    const count = await countDocument()
    return ResponseBuilder(
        200,
        "SUCCESS",
        "Document has been count",
        {
            count
        }
    )
}