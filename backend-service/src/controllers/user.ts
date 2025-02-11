import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/error-handler";
import { GetAllUserService, GetUserService } from "../services/user";
import { Role } from "@prisma/client";

export async function GetUserList(req: Request, res: Response, next: NextFunction){
    try{
        const { role } = req.query
        if(role){
            res.json(await GetUserService(role as Role))
            return
        }
        res.json(await GetAllUserService())
        return
    }
    catch (err: unknown){
        if((err as Error).name != "ErrorHandler"){
            next(new ErrorHandler(400, "ERROR_REQUEST", (err as Error).message))
        }

        next(err)
    }
}