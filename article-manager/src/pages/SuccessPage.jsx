import { useLocation, Link } from "react-router-dom";

export const SuccessPage = () => {
  const queryString = useLocation().search;

  const queryParams = new URLSearchParams(queryString);

  const name = queryParams.get("name");
  return (
    <div>
      <h1>Thanks for your feedback {name} !</h1>
      <Link to="/">Back to Home</Link>
    </div>
  );
};
