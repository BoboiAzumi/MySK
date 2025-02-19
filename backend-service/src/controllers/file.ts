import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/error-handler";
import path from "path";
import { StoreFileService } from "../services/file";
import { unlinkSync } from "fs";

export async function FileUpload(req: Request, res: Response, next: NextFunction){
    try{
        const documentId = req.body.documentId

        if(!documentId){
            unlinkSync(`./public/files/${req.file?.filename}`)
            next(new ErrorHandler(400, "BAD_REQUEST", "documentId not include in your request"))
            return
        }

        const location = `/uploads/files/${req.file?.filename}`
        const type = path.extname(<string>req.file?.filename).toLowerCase()
        const fileName = <string>req.file?.originalname
        const response = await StoreFileService(location, type, fileName, parseInt(documentId))

        res.json(response)
        return
    }
    catch (err: unknown){
        unlinkSync(`./public/files/${req.file?.filename}`)
        if((err as Error).name != "ErrorHandler"){
            next(new ErrorHandler(400, "ERROR_REQUEST", (err as Error).message))
        }

        next(err)
    }
}