import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../../lib/mongodb';
import Post, { IPost } from '../../../../models/Post';
import Comment, { IComment } from '../../../../models/Comment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const comments = await Comment.find({ postId: id }).populate('postId');
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch comments' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { content } = req.body;
      const newComment = await Comment.create({ content, postId: id });
      return res.status(201).json(newComment);
    } catch (error) {
      return res.status(400).json({ error: 'Failed to create comment' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}