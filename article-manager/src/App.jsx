import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  About,
  Contact,
  Home,
  Article,
  Success,
  NavBar,
  PostArticle,
} from "./pages/index";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/articles/:id" element={<Article />} />

          <Route path="/post" element={<PostArticle />} />

          <Route path="/success" element={<Success />} />

          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
