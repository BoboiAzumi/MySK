import jwt from 'jsonwebtoken'
import { Information } from '../types/information';
import { FileInformation } from '../types/file-information';

export function jwtSign(information: Information){
    const token = jwt.sign(information, process.env.JWT_SECRET || "MYSK", {
        algorithm: "HS256",
        expiresIn: "7d"
    });

    return token;
}

export function jwtVerify(token: string) : Information {
    const decoded: Information = <Information>jwt.verify(token, process.env.JWT_SECRET || "MYSK");

    return decoded
}

export function jwtFileSign(fileInformation: FileInformation){
    const token = jwt.sign(fileInformation, process.env.JWT_SECRET || "MYSK", {
        algorithm: "HS256",
        expiresIn: "1d"
    });

    return token;
}

export function jwtFileVerify(token: string) : FileInformation {
    const decoded: FileInformation = <FileInformation>jwt.verify(token, process.env.JWT_SECRET || "MYSK");

    return decoded
}