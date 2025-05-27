import mongoose, { Document, Schema } from 'mongoose'
 
export interface IPost extends Document {
  title: string
  content: string
  createdAt: Date
}
 
const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
 
const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema)
 
export default Post