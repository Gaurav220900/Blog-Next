import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../lib/mongodb';
import Post, { IPost } from '../../../models/Post';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch post' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { title, content } = req.body;
      const updatedPost = await Post.findByIdAndUpdate(id, { title, content }, { new: true });
      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return res.status(200).json(updatedPost);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update post' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deletedPost = await Post.findByIdAndDelete(id);
      if (!deletedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete post' });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}