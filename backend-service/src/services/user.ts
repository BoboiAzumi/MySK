import { Role } from "@prisma/client";
import { deleteUser, findAllUser, findAllUserByRole, findUserById, updatePassword, updatePhoto, updateUserAndIdentifier, updateUserInfo } from "../repositories/user-information";
import { ResponseBuilder } from "../utils/response-builder";
import { unlinkSync } from "fs";
import { ErrorHandler } from "../utils/error-handler";
import { deleteDocument, deleteDocumentRelatedByUserId, findDocumentRelatedByUserId } from "../repositories/document";
import { deleteFile } from "../repositories/file";
import { deleteAccountByUserId } from "../repositories/account";

export async function GetUserService(role: Role){
    const user = await findAllUserByRole(role)

    return ResponseBuilder(
        200,
        "SUCCESS",
        "Successfuly fetch all data",
        user
    )
}

export async function GetAllUserService(){
    const user = await findAllUser()

    return ResponseBuilder(
        200,
        "SUCCESS",
        "Successfuly fetch all data",
        user
    )
}

export async function UpdatePasswordService(userId: number, password: string){
    await updatePassword(userId, password)

    return ResponseBuilder(
        200,
        "SUCCESS",
        "Successfuly update password",
        {}
    )
}

export async function GetUserByIdService(userId: number){
    const user = await findUserById(userId)

    return ResponseBuilder(
        200,
        "SUCCESS",
        "Successfuly get user id",
        <object>user
    )
}

export async function UpdateUserService(userId: number, fullName: string, email: string, phone: string){
    await updateUserInfo(userId, fullName, email, phone)

    return ResponseBuilder(
        200,
        "SUCCESS",
        "Succesfuly update user information",
        {}
    )
}

export async function UpdatePhotoService(userId: number, path: string){
    const user = await findUserById(userId)

    if(user?.picture != "/uploads/img/person.png"){
        unlinkSync(<string>user?.picture.replace("/uploads", "./public"))
    }

    await updatePhoto(userId, path)

    return ResponseBuilder(
        200,
        "SUCCESS",
        "Success update profile photo",
        {}
    )
}

export async function UpdateUserByAdminService(userId: number, identifier: string, fullName: string, email: string, phone: string, password: string){
    await updateUserAndIdentifier(userId, identifier, fullName, email, phone)

    if(password != ""){
        await updatePassword(userId, password)
    }

    return ResponseBuilder(
        200,
        "SUCCESS",
        "Succesfuly update user information",
        {}
    )
}

export async function DeleteUserService(userId: number){
    const user = await findUserById(userId)

    if(!user){
        throw new ErrorHandler(404, "NOT_FOUND", "Couldn't find user")
    }

    if(user.picture != "/uploads/img/person.png"){
        unlinkSync(user.picture.replace("/uploads", "./public"))
    }

    const documents = await findDocumentRelatedByUserId(userId)
    const fileIds: number[] = []

    documents.map((v) => {
        v.File.map((w) => {
            unlinkSync(w.location.replace("/uploads", "./public"))
            fileIds.push(w.id)
        })
    })

    await deleteFile(fileIds)
    await deleteDocumentRelatedByUserId(userId)
    await deleteAccountByUserId(userId)
    await deleteUser(userId)

    return ResponseBuilder(
        200,
        "SUCCESS",
        "Succesfuly delete user",
        {}
    )
}