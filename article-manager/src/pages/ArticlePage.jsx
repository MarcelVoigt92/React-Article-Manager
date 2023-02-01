import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import "./styles/Article.css";

export const ArticlePage = () => {
  const { id } = useParams();
  const url = `http://localhost:4000/articles/${id}`;
  const [showModal, setShowModal] = useState(false);

  const { data: article, isPending: loading, error } = useFetch(url);

  const history = useHistory();

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

  const closeModal = () => {
    setShowModal(false);
    history.push("/");
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  }, [error, history]);
  return (
    <div>
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}

      {article && (
        <div className="article-container">
          <h1>Article by {article.author}</h1>
          <h2>{article.title}</h2>
          <p>{article.body}</p>
          <img src={article.imageUrl} alt="" />
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
