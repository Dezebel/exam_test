import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import jwt, { SignOptions } from 'jsonwebtoken'

import { getUserById } from './models'

export const connectDB = async () => {
  console.log(`⚡️[server]: Connecting to DB...`)
  try {
    await mongoose.connect(process.env.dbURI || '')
  } catch (error) {
    console.log('⚡️[server]: Could not connect to db')
    console.log(error)
    process.exit(1)
  }
}

export const signJwt = (payload: Object, options: SignOptions = {}) => {
  const privateKey = process.env.accessTokenPrivateKey as string
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
    expiresIn: '8h',
  })
}

export const deserializeUser = async (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).send('You are not authenticated')
    }
    const decoded = jwt.verify(
      token,
      process.env.accessTokenPublicKey || ''
    ) as jwt.JwtPayload
    if (!decoded) {
      return res.status(401).send('Your token is invalid')
    }
    const user = await getUserById(decoded?.userId as string)
    if (!user) {
      return res.status(401).send('Invalid user')
    }
    req.userId = user._id.toString()
    next()
  } catch (err) {
    next(err)
  }
}
