import { ResponseBuilder } from "../utils/response-builder";
import { jwtSign, jwtVerify } from "../utils/jwt";
import { createAccount, findByUsername, findByUsernameAndPassword } from "../repositories/account";
import { ErrorHandler } from "../utils/error-handler";
import { User } from "../types/user"
import { createUserInformation } from "../repositories/user-information";
import { comparePassword } from "../utils/bcrypt";

export async function AuthenticationService(username: string, password: string){
    const user = await findByUsername(username);

    if(!user){
        throw new ErrorHandler(
            404,
            "USER_NOT_FOUND",
            "Couldn't find user, please check your username again"
        )
    }

    const validation = await comparePassword(password, user.password)

    if(!validation){
        throw new ErrorHandler(
            401,
            "UNAUTHORIZED",
            "Wrong password"
        )
    }

    const token = jwtSign({
        id: user.UserInformation.id,
        fullName: user.UserInformation.fullName,
        picture: user.UserInformation.picture,
        role: user.UserInformation.role
    })

    return ResponseBuilder(
        200,
        "SUCCESS",
        "Sign in successfully",
        {
            token,
            information: jwtVerify(token)
        }
    )
}

export async function RegisterAccountService(user: User){
    const account = await findByUsername(user.credential.username)

    if(account){
        throw new ErrorHandler(409, "USERNAME_FOUND", "Username already exists")
    }

    const userInfo = await createUserInformation(user)
    await createAccount(user.credential.username, user.credential.password, userInfo.id)

    return ResponseBuilder(
        200,
        "SUCCESS",
        "Register new user successfuly",
        {}
    )
}

export async function MeService(token: string){
    return ResponseBuilder(
        200,
        "SUCCESS",
        "Success fetch user information",
        jwtVerify(token)
    )
}
