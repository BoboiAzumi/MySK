import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/error-handler";

export function isFileAvailable(req: Request, res: Response, next: NextFunction){
    if(!req.file){
        next(new ErrorHandler(
            400,
            "EMPTY_FILE",
            "File not include at request"
        ))
        return
    }

    next()
}