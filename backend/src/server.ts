import "reflect-metadata"

import express, { Request, Response, NextFunction } from "express"
import "express-async-errors"
import cors from "cors"

import "./database"
import routes from "./routes"
import uploadConfig from "./config/upload"
import AppError from "./errors/AppError"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/files", express.static(uploadConfig.directory))
app.use(routes)

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