import { NextFunction, Request, Response } from "express";

export function DownloadMiddleware(req: Request, res: Response, next: NextFunction){
    res.setHeader("Content-Disposition", "attachment")
    next()
}