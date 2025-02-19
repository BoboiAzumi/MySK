import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid"
import { ErrorHandler } from "./error-handler";
import { Request } from "express";

export const diskStorage = multer.diskStorage({
    destination: (req: Express.Request, file: Express.Multer.File, callback: Function) => {
        callback(null, "./public/files/")
    },
    filename: (req: Express.Request, file: Express.Multer.File, callback: Function) => {
        const ext = path.extname(<string>file.originalname)
        callback(null, `${uuid()}${ext}`)
    }
})

export function FileValidator(req: Request, file: Express.Multer.File, callback: Function){
    const allowedTypes = /.pdf|.doc|.docx|.xls|.xlsx|.csv/
    const extension = allowedTypes.test(path.extname(file.originalname).toLowerCase())

    if(extension){
        callback(null, true)
        return
    }
    else {
        callback(new ErrorHandler(400, "WRONG_FILE_EXTENSION", "Only allowed pdf, doc, docx, xls, xlsx, and csv"))
        return
    }
}

export const imageStorage = multer.diskStorage({
    destination: (req: Express.Request, file: Express.Multer.File, callback: Function) => {
        callback(null, "./public/img/")
    },
    filename: (req: Express.Request, file: Express.Multer.File, callback: Function) => {
        const ext = path.extname(<string>file.originalname)
        callback(null, `${uuid()}${ext}`)
    }
})

export function ImgValidator(req: Request, file: Express.Multer.File, callback: Function){
    const allowedTypes = /.jpg|.jpeg|.png|.webp|.avif|.tiff/
    const extension = allowedTypes.test(path.extname(file.originalname).toLowerCase())

    if(extension){
        callback(null, true)
        return
    }
    else {
        callback(new ErrorHandler(400, "WRONG_FILE_EXTENSION", "Only allowed jpg, jpeg, png, webp, avif, and tiff"))
        return
    }
}