import mongoose, { Document, Schema } from 'mongoose';
import Post from './Post'; // Ensure the correct path to the Post model
export interface IComment extends Document {
  content: string;  
  postId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const commentSchema = new Schema<IComment>({
  content: {    
    type: String,
    required: true,
    trim: true,
  },  
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  }, 
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
  timestamps: true,
}); 

const Comment = mongoose.model<IComment>('Comment', commentSchema);
export default Comment;