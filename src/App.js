import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Error from "./components/Error";


function App(props) {
    return (
       <div className="todoapp stack-large">
        <Navbar />
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/about" component={About} />
            <Route component={Error} />
        </Switch>
       </div> 
    );
}

export default App;