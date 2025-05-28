import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';

interface Post {
  _id: string;  
    title: string;
    content: string;
    createdAt: string;
}

export default function PostPage() {
  const [post, setPost] = useState<Post | null>(null);
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
    </div>
  );
}