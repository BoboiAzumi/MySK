import { Role } from "@prisma/client";
import { createUserInformation, findAllUser, findAllUserByRole } from "../repositories/user-information";
import { ResponseBuilder } from "../utils/response-builder";
import { User } from "../types/user";

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