import express, { Express } from 'express'

import {
  authHandler,
  commentHandler,
  postHandler,
  userHandler,
} from './handlers'

const app: Express = express()
app.use(express.json())

/*
Task 4 (3 points):
Add a simple GET `/api/health-check` end point to perform a server health check.
The API handler just simply returns a 200 status code. To verify this, visit 
http://localhost:8080/api/health-check from your browser, you should see "OK" 
on the page.
*/
app.use('/api/auth', authHandler)
app.use('/api/posts', postHandler)
app.use('/api/comments', commentHandler)
app.use('/api/me', userHandler)

export default app
