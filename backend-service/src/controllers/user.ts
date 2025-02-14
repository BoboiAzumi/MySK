import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/error-handler";
import { GetAllUserService, GetUserByIdService, GetUserService, UpdatePasswordService } from "../services/user";
import { Role } from "@prisma/client";
import { jwtVerify } from "../utils/jwt";

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

export async function GetUserById(req: Request, res: Response, next: NextFunction){
    try{
        const { id } = req.params

        res.json(await GetUserByIdService(parseInt(id)))
        return
    }
    catch (err: unknown){
        if((err as Error).name != "ErrorHandler"){
            next(new ErrorHandler(400, "ERROR_REQUEST", (err as Error).message))
        }

        next(err)
    }
}

export async function UpdatePassword(req: Request, res: Response, next: NextFunction){
    try{
        const { password, newPassword } = req.body
        if(password != newPassword){
            next(new ErrorHandler(400, "BAD_REQUEST", "Password and new password doesn't match"))
            return
        }
        const user = jwtVerify(req.headers["authorization"]?.split(" ")[1] as string)
        const response = await UpdatePasswordService(user.id, password)
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