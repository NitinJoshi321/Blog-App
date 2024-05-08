import React from "react";
import Register from "./components/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Articles from "./components/Articles";
import ArticleDetailPage from "./components/ArticleDetailPage";
import ProtectedRoutes from "./components/utils/ProtectedRoutes";
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
          </Route>
          {/* <Route path="/articles" element={<Articles />} /> */}
          {/* <Route path="/article/:slug" element={<ArticleDetailPage />} /> */}
        </Routes>
      </Router>
    </div>
  );
}
