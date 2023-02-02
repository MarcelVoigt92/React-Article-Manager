import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import "./styles/Article.css";

export const ArticlePage = () => {
  const { id } = useParams();
  const url = `http://localhost:4000/articles/${id}`;
  const { data: article, isPending: loading, error } = useFetch(url);
  console.log("ARTIKEL", article);
  const [showModal, setShowModal] = useState(false);
  const [title] = useState("");
  console.log("EINS", title);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    content: "",
    imageUrl: "",
  });

  const history = useNavigate();

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/articles/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
    console.log("page to reload");
  }

  const handleEdit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:4000/articles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: formData.author,
        title: formData.title,
        body: formData.content,
        imageUrl: formData.imageUrl,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(refreshPage());
  };
  console.log(formData);
  const closeModal = () => {
    setShowModal(false);
    history("/");
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history("/");
      }, 2000);
    }
  }, [error, history]);
  return (
    <div>
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      {showForm && (
        <form onSubmit={handleEdit}>
          <h1>Edit Article</h1>
          <input
            type="text"
            placeholder="Author Name"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Article Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <textarea
            placeholder="Article Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
          <button type="submit">Confirm Edit</button>
        </form>
      )}
      {article && (
        <div className="article-container">
          <h1>Article by {article.author}</h1>
          <h2>{article.title}</h2>
          <p>{article.body}</p>
          <img src={article.imageUrl} alt="" />
          <button onClick={() => setShowForm(true)}>Edit</button>
          <button onClick={() => handleDelete(article.id)}>Delete</button>
        </div>
      )}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Article deleted successfully</h2>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
