import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function Home(){

  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const res = await response.json();
        if (response.ok) {
          setPosts(res);
        } 
    }
      catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "16px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Blog Posts</h1>
      <Link href="/new" style={{ color: "#3b82f6", textDecoration: "none", marginBottom: "16px", display: "inline-block" }}>
      Create New Post
      </Link>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {posts.map((post) => (
        <Link href={`/posts/${post._id}`} key={post._id} style={{ textDecoration: "none", color: "inherit" }}>
        <div key={post._id} style={{ padding: "16px", border: "1px solid #e5e7eb", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600" }}>{post.title}</h2>
        <p style={{ color: "#4b5563" }}>{post.content}</p>
        
        </div>
        </Link>
      ))}
      </div>
    </div>
    
  );
}