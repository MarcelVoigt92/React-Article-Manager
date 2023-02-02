import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("");

  const history = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:4000/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: author,
        title: title,
        body: content,
        imageUrl: imageUrl,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(history(`/success?name=${author}`));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Post a New Article</h1>
      <input
        type="text"
        placeholder="Author Name"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
      />
      <input
        type="text"
        placeholder="Article Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <textarea
        placeholder="Article Content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(event) => setImageUrl(event.target.value)}
      />
      <button type="submit">Submit Article</button>
    </form>
  );
};

export default PostArticle;
