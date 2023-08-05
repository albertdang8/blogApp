import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import Auth from "./Pages/Auth/Auth";
import CategoryArticle from "./Pages/CategoryArticle/CategoryArticle";
import AddArticle from "./Pages/AddArticle/AddArticle";
import ArticleDetails from "./Pages/ArticleDetails/ArticleDetails";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/addarticle" element={<AddArticle />} />
        <Route path="/category/:categoryName" element={<CategoryArticle />} />
        <Route path="/article/:articleId" element={<ArticleDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
