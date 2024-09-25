import express, { Request, Response } from 'express'
import bcrypt from 'bcryptjs'

import { createUser, getUserByUsername } from '../models'
import { signJwt } from '../utils'

const authHandler = express.Router()

authHandler.post('/register', async (req: Request, res: Response) => {
  /*
  Task 6 (7 points):
  Complete the auth register handler with following requirements:
  - make sure the username has not been occupied, otherwise, return 400,
  - create a new user with encrypted password, use 10 as salt factor,
  - encode the user's id by using `signJwt` method, then return the token with 
    user's id and username.
  */
})

authHandler.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body
  if (username === '') {
    return res.status(400).send('Username is required')
  }
  if (password === '') {
    return res.status(400).send('Password is required')
  }
  try {
    const user = await getUserByUsername(username)
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = signJwt({ userId: user._id })
      return res.status(200).json({ _id: user._id, token, username })
    }
    return res.status(400).send('User credential is invalid')
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
})

export default authHandler
