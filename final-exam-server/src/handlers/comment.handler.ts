import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import { deserializeUser } from '../utils'
import { createComment, getCommentById } from '../models'

const commentHandler = express.Router()

commentHandler.use(deserializeUser)

commentHandler.post(
  '/',
  async (req: Request & { userId?: string }, res: Response) => {
    const userId = new mongoose.Types.ObjectId(req.userId)
    const { post, content } = req.body
    if (!post) {
      return res.status(400).send('Post ID is required')
    }
    if (!content) {
      return res.status(400).send('Post content is required')
    }
    try {
      const newComment = await createComment({
        user: userId,
        post: new mongoose.Types.ObjectId(post),
        content,
      })
      return res.status(200).send(newComment._id)
    } catch (err) {
      return res.status(500).send(err)
    }
  }
)

commentHandler.delete(
  '/:id',
  async (req: Request & { userId?: string }, res: Response) => {
    const commentId = new mongoose.Types.ObjectId(req.params.id)
    const userId = new mongoose.Types.ObjectId(req.userId)
    try {
      const comment = await getCommentById(commentId)
      if (!comment) {
        return res
          .status(404)
          .send(`Cannot find the comment with id: ${commentId}`)
      }
      if (!comment.user._id.equals(userId)) {
        return res
          .status(403)
          .send('You are not authorized to update this comment')
      }
      await comment.delete()
      return res.sendStatus(200)
    } catch (err) {
      return res.status(500).send(err)
    }
  }
)

export default commentHandler
