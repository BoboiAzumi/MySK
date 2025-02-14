import { Role } from "@prisma/client";
import { findAllUser, findAllUserByRole, findUserById, updatePassword } from "../repositories/user-information";
import { ResponseBuilder } from "../utils/response-builder";

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