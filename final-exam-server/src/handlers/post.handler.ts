import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import { deserializeUser } from '../utils'
import {
  createPost,
  deleteCommentsByPostId,
  getAllPosts,
  getCommentsByPostId,
  getPostById,
} from '../models'

const postHandler = express.Router()

postHandler.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts()
    return res.status(200).send(posts)
  } catch (err) {
    return res.status(500).send(err)
  }
})

postHandler.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const post = await getPostById(id)
    if (!post) {
      return res.status(404).send(`Cannot find the post with id: ${id}`)
    }
    const comments = await getCommentsByPostId(id)
    return res.status(200).send({ ...post.toJSON(), comments })
  } catch (err) {
    return res.status(500).send(err)
  }
})

postHandler.use(deserializeUser)

postHandler.post(
  '/',
  async (req: Request & { userId?: string }, res: Response) => {
    const userId = new mongoose.Types.ObjectId(req.userId)
    const { title, content } = req.body
    if (!title) {
      return res.status(400).send('Post title is required')
    }
    if (!content) {
      return res.status(400).send('Post content is required')
    }
    try {
      const newPost = await createPost({
        user: userId,
        title,
        content,
      })
      return res.status(200).send(newPost._id)
    } catch (err) {
      return res.status(500).send(err)
    }
  }
)

postHandler.put(
  '/:id',
  async (req: Request & { userId?: string }, res: Response) => {
    const postId = new mongoose.Types.ObjectId(req.params.id)
    const userId = new mongoose.Types.ObjectId(req.userId)
    const { title, content } = req.body
    if (!title) {
      return res.status(400).send('Post title is required')
    }
    if (!content) {
      return res.status(400).send('Post content is required')
    }
    try {
      const post = await getPostById(postId)
      if (!post) {
        return res.status(404).send(`Cannot find the post with id: ${postId}`)
      }
      if (!post.user._id.equals(userId)) {
        return res
          .status(403)
          .send('You are not authorized to update this post')
      }
      post.title = title
      post.content = content
      await post.save()
      return res.status(200).send(post.toJSON())
    } catch (err) {
      return res.status(500).send(err)
    }
  }
)

postHandler.delete(
  '/:id',
  async (req: Request & { userId?: string }, res: Response) => {
    /*
    Task 5 (5 points):
    Complete the post delete handler with following requirements:
    - make sure the post can be found with the id in the `req.params`, 
       otherwise, return 404,
    - make sure the post belongs to the current logged-in usr, otherwise,
       return 403,
    - make sure all the comments on this post are also deleted.
    */
  }
)

export default postHandler
