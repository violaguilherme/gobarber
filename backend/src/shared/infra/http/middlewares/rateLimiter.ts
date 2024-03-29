import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible"
import redis from "redis"
import AppError from "../../../errors/AppError";

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS || undefined
})

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rateLimit",
    points: 5,
    duration: 1
})

async function rateLimiter(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        await limiter.consume(request.ip)

        return next()
    } catch {
        throw new AppError("To many requests", 429)
    }
}

export default rateLimiter