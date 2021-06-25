import React from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from "./pages/Login"
import CreatePost from "./pages/CreatePost"
import Home from "./pages/Home"


export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                
                <Route exact path="/" component={Home}/>
                <Route path="/CreatePost" component={CreatePost}/>
                <Route path="/Login" component={Login}/>
               
            </Switch>
        </BrowserRouter>

    )
}