import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Post from "./pages/Post";
import EditarPost from "./pages/EditarPost";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import Chat from "./pages/Chat";
import ChatOpen from "./pages/ChatOpen";
export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/CreatePost" component={CreatePost} />
        <Route path="/Profile" component={Profile} />
        <Route path="/ChatOpen/:id" component={ChatOpen} />
        <Route path="/Chat" component={Chat} />
        <Route path="/Category" component={Category} />
        <Route path="/Login" component={Login} />
        <Route path="/EditarPost" component={EditarPost} />
        <Route path="/:id" component={Post} />
      </Switch>
    </BrowserRouter>
  );
}
