export function ResponseBuilder(statusCode: number, status: string, message: string, data: object){
    return {
        meta: {
            statusCode,
            status,
            message
        },
        data
    }
}