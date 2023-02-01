import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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

        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/about">
            <About />
          </Route>

          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/articles/:id">
            <Article />
          </Route>
          <Route path="/post">
            <PostArticle />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
