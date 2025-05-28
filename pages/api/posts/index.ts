import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '../../../lib/mongodb'
import Post, { IPost } from '../../../models/Post'
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo()
 
  if (req.method === 'GET') {
    const posts = await Post.find()
    return res.status(200).json(posts)
  }
 
  if (req.method === 'POST') {
    try {
      const { title, content } = req.body
      const newPost = await Post.create({ title, content })
      return res.status(201).json(newPost)
    } catch (err) {
      return res.status(400).json({ error: 'Failed to create post' })
    }
  }
 
  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}