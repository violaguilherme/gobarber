import "reflect-metadata"

import express, { Request, Response, NextFunction } from "express"
import "express-async-errors"
import { errors } from "celebrate"
import cors from "cors"

import "../typeorm"
import "../../container"
import routes from "./routes"
import uploadConfig from "../../../config/upload"
import AppError from "../../errors/AppError"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/files", express.static(uploadConfig.uploadsFolder))
app.use(routes)
app.use(errors())

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message
        })
    }
    console.error(err)

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
}) 

app.listen(3333, () => {
    console.log("HTTP server running at port 3333")
})