import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/error-handler";
import { CountDocumentService, CreateDocumentService, DeleteDocumentByNonAdminService, DeleteDocumentService, GetDocumentService } from "../services/document";
import { jwtVerify } from "../utils/jwt";

export async function CreateNewDocument(req: Request, res: Response, next: NextFunction){
    try{
        const token = req.headers["authorization"]?.split(" ")[1]
        const parse = jwtVerify(token? token : "")
        const { title, to } = req.body
        const by = parse.id

        if(parse.role != "ADMIN" && to != by){
            console.log(`To ${to} && by ${by}`)
            next(new ErrorHandler(403, "FORBIDDEN", "Couldn't upload to another user"))
            return
        }

        const documentCreated = await CreateDocumentService(title, by, to)
        res.json(documentCreated)
        return
    }
    catch (err: unknown){
        if((err as Error).name != "ErrorHandler"){
            next(new ErrorHandler(400, "ERROR_REQUEST", (err as Error).message))
        }

        next(err)
    }
}

export async function GetDocument(req: Request, res: Response, next: NextFunction){
    try{
        const { limit, page } = req.query
        const token = jwtVerify(<string>req.headers["authorization"]?.split(" ")[1])
        const response = await GetDocumentService(limit ? parseInt(<string>limit) : 2, page ? parseInt(<string>page) : 1, token.role, token.id)
        res.json(response)
        return
    }
    catch (err: unknown){
        if((err as Error).name != "ErrorHandler"){
            next(new ErrorHandler(400, "ERROR_REQUEST", (err as Error).message))
        }

        next(err)
    }
}

export async function DeleteDocument(req: Request, res: Response, next: NextFunction){
    try{
        const { id } = req.body
        const token = req.headers["authorization"]?.split(" ")[1]

        const UserInfo = jwtVerify(<string>token)

        if(UserInfo.role == "ADMIN"){
            res.json(await DeleteDocumentService(id))
        }
        else {
            res.json(await DeleteDocumentByNonAdminService(id, UserInfo.id))
        }

        return
    }
    catch (err: unknown){
        if((err as Error).name != "ErrorHandler"){
            next(new ErrorHandler(400, "ERROR_REQUEST", (err as Error).message))
        }

        next(err)
    }
}

export async function CountDocument(req: Request, res: Response, next: NextFunction){
    try{
        const response = await CountDocumentService()
        res.json(response)
        return
    }
    catch (err: unknown){
        if((err as Error).name != "ErrorHandler"){
            next(new ErrorHandler(400, "ERROR_REQUEST", (err as Error).message))
        }

        next(err)
    }
}
