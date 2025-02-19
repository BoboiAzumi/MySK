import { Router } from "express";
import { Authorization } from "../middlewares/authorization";
import { Role } from "@prisma/client";
import { DeleteUser, GetUserById, GetUserList, UpdatePassword, UpdateUserById, UpdateUserInfo, UpdateUserPhoto } from "../controllers/user";
import { Register } from "../controllers/auth";
import multer from "multer";
import { imageStorage, ImgValidator } from "../utils/multer";

const upload = multer({
    storage: imageStorage,
    fileFilter: ImgValidator
})

export const UserRoute = Router()

UserRoute.post("/", Authorization([Role.ADMIN]), Register)
UserRoute.patch("/password", Authorization([Role.ADMIN, Role.DOSEN]), UpdatePassword)
UserRoute.patch("/info", Authorization([Role.ADMIN, Role.DOSEN]), UpdateUserInfo)
UserRoute.patch("/photo", Authorization([Role.ADMIN, Role.DOSEN]), upload.single("img"), UpdateUserPhoto)
UserRoute.get("/", Authorization([Role.ADMIN]), GetUserList)
UserRoute.get("/:id", Authorization([Role.ADMIN, Role.DOSEN]), GetUserById)
UserRoute.patch("/:id", Authorization([Role.ADMIN]), UpdateUserById)
UserRoute.delete("/:id", Authorization([Role.ADMIN]), DeleteUser)