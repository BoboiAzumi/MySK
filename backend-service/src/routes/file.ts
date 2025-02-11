import { Router } from "express";
import multer from "multer";
import { FileUpload } from "../controllers/file";
import { diskStorage, FileValidator } from "../utils/multer";
import { isFileAvailable } from "../middlewares/is-file-available";
import { Authorization } from "../middlewares/authorization";
import { Role } from "@prisma/client";

const upload = multer({
    storage: diskStorage,
    fileFilter: FileValidator
})

export const FileRoute = Router()

FileRoute.post('/', Authorization([Role.ADMIN, Role.DOSEN]), upload.single("file_docs"), isFileAvailable, FileUpload)