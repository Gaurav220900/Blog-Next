import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';

interface Post {
  _id: string;  
    title: string;
    content: string;
    createdAt: string;
}

interface Comment {
  _id: string;  
    content: string;
    postId: string;
    createdAt: string;
}

export default function PostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`/api/posts/${id}`);
          if (response.ok) {
            const data = await response.json();
            setPost(data);
          } else {
            console.error("Failed to fetch post");
          }
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      };

      fetchPost();
    }
  }, [id]);

    useEffect(() => {
        
        const fetchComments = async () => {
            try {
            const response = await fetch(`/api/posts/${id}/comments`);
            if (response.ok) {
                const data = await response.json();
                setComments(data);
            } else {
                console.error("Failed to fetch comments");
            }
            } catch (error) {
            console.error("Error fetching comments:", error);
            }
        };
    
        fetchComments();
        
    }, [id,comments]);

  if (!post) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "16px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginBottom: "16px" }}>
            <button
                style={{
                    padding: "8px 16px",
                    backgroundColor: "#3b82f6",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
                onClick={() => router.push(`/posts/${post._id}/edit`)}
            >
                Edit
            </button>
            <button
                style={{
                    padding: "8px 16px",
                    backgroundColor: "#ef4444",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
                onClick={async () => {
                    const confirmDelete = confirm("Are you sure you want to delete this post?");
                    if (confirmDelete) {
                        try {
                            const response = await fetch(`/api/posts/${post._id}`, { method: "DELETE" });
                            if (response.ok) {
                                alert("Post deleted successfully");
                                router.push("/posts");
                            } else {
                                alert("Failed to delete post");
                            }
                        } catch (error) {
                            console.error("Error deleting post:", error);
                        }
                    }
                }}
            >
                Delete
            </button>
        </div>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>{post.title}</h1>
      <p style={{ color: "#4b5563" }}>{post.content}</p>
      <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>Created at: {new Date(post.createdAt).toLocaleDateString()}</p>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "32px", marginBottom: "16px" }}>Comments</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}> 
        {comments.length > 0 ? (
            comments.map((comment) => (
            <div key={comment._id} style={{ padding: "16px", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
                <p style={{ marginBottom: "8px" }}>{comment.content}</p>
                <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>Posted at: {new Date(comment.createdAt).toLocaleDateString()}</p>
            </div>
            ))
        ) : (
            <p>No comments yet.</p>
        )}



    <div style={{ marginTop: "12px" }}></div>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>Add a Comment</h2>
      <textarea
        id="comment"
        placeholder="Write your comment here..."
        style={{
        width: "100%",
        padding: "8px",
        border: "1px solid #d1d5db",
        borderRadius: "4px",
        marginBottom: "8px",
        resize: "vertical",
        }}
      />
      <button
        style={{
        padding: "8px 16px",
        backgroundColor: "#10b981",
        color: "#ffffff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        }}
        onClick={async () => {
        const comment = (document.getElementById("comment") as HTMLTextAreaElement).value.trim();
        if (!comment) {
          alert("Comment cannot be empty");
          return;
        }
        try {
          const response = await fetch(`/api/posts/${post._id}/comments`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ content:comment, postId: id }),
          });
          if (response.ok) {
            alert("Comment added successfully");
            (document.getElementById("comment") as HTMLTextAreaElement).value = "";
          } else {
            console.log(response);
            alert("Failed to add comment");
          }
        } catch (error) {
          console.error("Error adding comment:", error);
        }
        }}
      >
        Submit
      </button>
    </div>
    </div>
  );
}