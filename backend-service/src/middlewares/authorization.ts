import { NextFunction, Request, Response } from "express";
import { jwtFileVerify, jwtVerify } from "../utils/jwt";
import { ErrorHandler } from "../utils/error-handler";
import { findUserById } from "../repositories/user-information";

export function Authorization(role: string[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers["authorization"];
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        const information = jwtVerify(token);

        const user = await findUserById(information.id)

        if (role.includes(information.role) && user) {
          next();
          return;
        }
        next(new ErrorHandler(403, "FORBIDDEN", "Can't access this endpoint"));
        return;
      }
      next(new ErrorHandler(403, "UNAUTHORIZED", "Can't access this endpoint"));
      return;
    } catch (err) {
        next(new ErrorHandler(400, "INVALID_TOKEN", "Invalid Token"));
    }
  };
}

export function FileAuthorization(role: string[]) {
  return async function (req: Request, _res: Response, next: NextFunction) {
    try {
      const path = req.url.toLowerCase().split("/")
      const fileType = path[path.length - 2]
      if(fileType === "img"){
        next();
        return
      }

      const { token } = req.query;
      if (token) {
        const fileInformation = jwtFileVerify(<string>token);
        if (role.includes(fileInformation.role)) {
          next();
          return;
        }
        next(new ErrorHandler(403, "FORBIDDEN", "Can't access this endpoint"));
        return;
      }
      next(new ErrorHandler(403, "FORBIDDEN", "Can't access this endpoint"));
      return;
    } catch (err) {
        next(new ErrorHandler(400, "INVALID_TOKEN", "Invalid Token"));
    }
  };
}