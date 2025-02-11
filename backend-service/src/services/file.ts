import { storeFile } from "../repositories/file";
import { ResponseBuilder } from "../utils/response-builder";

export async function StoreFileService(location: string, type: string, fileName: string, documentId: number){
    await storeFile(location, type, fileName, documentId)
    return ResponseBuilder(
        201,
        "CREATED",
        "Successfuly file uploads",
        {}
    )
}