export class ErrorHandler extends Error{
    statusCode: number
    status: string
    constructor(statusCode: number, status: string, message: string){
        super(message)
        this.name = "ErrorHandler"
        this.statusCode = statusCode
        this.message = message
        this.status = status

        Error.captureStackTrace(this, this.constructor)
    }
}