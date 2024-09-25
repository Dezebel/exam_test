import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import { getCommentsByUserId, getPostsByUserId } from '../models'
import { deserializeUser } from '../utils'

const userHandler = express.Router()

userHandler.use(deserializeUser)

userHandler.get(
  '/',
  async (req: Request & { userId?: string }, res: Response) => {
    const userId = new mongoose.Types.ObjectId(req.userId)
    try {
      const posts = await getPostsByUserId(userId)
      const comments = await getCommentsByUserId(userId)
      return res.status(200).send({ posts, comments })
    } catch (err) {
      return res.status(500).send(err)
    }
  }
)

export default userHandler
