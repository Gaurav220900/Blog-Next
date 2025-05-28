import { useState} from "react";
import { useRouter } from "next/router";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "16px" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px" }}>Create New Post</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "8px" }}>Title</label>
        <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxSizing: "border-box",
        }}
        required
        />
      </div>
      <div>
        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "8px" }}>Content</label>
        <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxSizing: "border-box",
          resize: "vertical",
        }}
        rows={5}
        required
        />
      </div>
      <button
        type="submit"
        style={{
        padding: "8px 16px",
        backgroundColor: "#3b82f6",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
      >
        Create Post
      </button>
      </form>
    </div>
  );
}