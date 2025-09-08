import { useState, useEffect } from "react";

export default function PostForm() {
  const [posts, setPosts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const fetchPosts = async () => {
    const res = await fetch("http://localhost:3000/posts");
    const data = await res.json();
    setPosts(data.posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, author }),
    });
    const data = await res.json();
    alert(data.message);
    fetchPosts(); // atualizar lista
  };

  return (
    <div>
      <h2>Criar Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit">Postar</button>
      </form>

      <h3>Posts existentes:</h3>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong> ({p.author})<br />
            {p.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
