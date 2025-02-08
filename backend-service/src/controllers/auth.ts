import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/error-handler";
import { AuthenticationService, MeService, RegisterAccountService } from "../services/auth";

export async function Authentication(req: Request, res: Response, next: NextFunction){
    try{
        const { username, password } = req.body
        const response = await AuthenticationService(username, password)
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

export async function Register(req: Request, res: Response, next: NextFunction){
    try{
        const user = req.body
        const response = await RegisterAccountService(user)
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

export async function Me(req: Request, res: Response, next: NextFunction){
    try{
        const token = <string>req.headers["authorization"]?.split(" ")[1]
        const response = await MeService(token)
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