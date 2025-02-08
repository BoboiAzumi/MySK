import express, { Express, NextFunction, Request, Response } from "express"
import { routes } from "./routes"
import { ErrorHandler } from "./utils/error-handler"
import dotenv from "dotenv"
import cors from "cors"
import { FileAuthorization } from "./middlewares/authorization"
import { Role } from "@prisma/client"

dotenv.config()

const app: Express = express()

app.use(
    '/uploads',
    FileAuthorization([Role.ADMIN, Role.DOSEN]),
    express.static('public')
)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", routes)

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new ErrorHandler(404, "NOT_FOUND", `Can't ${req.method} ${req.path}`))
})

const ErrorHandling = (err: ErrorHandler, _req: Request, res: Response, _next: NextFunction) => {
    if(err.name == "ErrorHandler"){
        res.status(err.statusCode)
        res.json({
            meta: {
                status: err.status,
                code: err.statusCode,
                message: err.message
            },
            data: []
        })
        console.log(`[${new Date().toISOString()}] Error : `)
        console.log(`\tURL        : ${_req.url}`)
        console.log(`\tMethod     : ${_req.method}`)
        console.log(`\tStatus     : ${err.status}`)
        console.log(`\tCode       : ${err.statusCode}`)
        console.log(`\tMessage    : ${err.message}`)
    }
    else{
        res.status(500)
        res.json({
            meta: {
                status: "INTERNAL_SERVER_ERROR",
                code: 500,
                message: err.message
            },
            data: []
        })
        console.log(`[${new Date().toISOString()}] Internal Server Error : `)
        console.log(`\tURL        : ${_req.url}`)
        console.log(`\tMethod     : ${_req.method}`)
        console.log(`\tStatus     : INTERNAL_SERVER_ERROR`)
        console.log(`\tCode       : 500`)
        console.log(`\tMessage    : ${err.message}`)
    }
}

app.use(ErrorHandling)

app.listen(process.env.PORT || 3000, () => console.log(`Service run at ${process.env.PORT || 3000}`))