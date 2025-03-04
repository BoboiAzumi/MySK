import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/error-handler"
import { GetConfigService, SetConfigService } from "../services/config";

export async function GetConfig(req: Request, res: Response, next: NextFunction){
    try{
        const response = await GetConfigService()

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

export async function SetConfig(req: Request, res: Response, next: NextFunction){
    try{
        const { academicYear, semester } = req.body
        const response = await SetConfigService(academicYear, semester)

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