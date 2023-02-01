import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export const ArticlePage = () => {
  const { id } = useParams();
  const url = `http://localhost:4000/articles/${id}`;

  const { data: article, isPending: loading, error } = useFetch(url);

  const history = useHistory();

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
        <div>
          <h1>Article by {article.author}</h1>
          <h2>{article.title}</h2>
          <p>{article.body}</p>
          <img src={article.imageUrl} alt="" />
        </div>
      )}
    </div>
  );
};
