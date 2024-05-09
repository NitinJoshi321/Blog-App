import React from "react";
import Register from "./components/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Articles from "./components/Articles";
import ArticleDetailPage from "./components/ArticleDetailPage";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Profile from "./components/Profile";
import CreateArticle from "./components/CreateArticle";
import FavouriteArticle from "./components/FavouriteArticle";
// import './App.css'

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/reg" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="" element={<ProtectedRoutes/>}>
            <Route path="/articles" element={<Articles />} exact/>
            <Route path="/article/:slug" element={<ArticleDetailPage />} exact/>
            <Route path="/profile" element={<Profile />} exact/>
            <Route path="/create" element={<CreateArticle />} exact/>
            <Route path="/favourites" element={<FavouriteArticle />} exact/>
          </Route>
          {/* <Route path="/articles" element={<Articles />} /> */}
          {/* <Route path="/article/:slug" element={<ArticleDetailPage />} /> */}
        </Routes>
      </Router>
    </div>
  );
}
