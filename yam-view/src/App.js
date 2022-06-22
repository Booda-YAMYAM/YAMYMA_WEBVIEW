import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import WebView from "./pages/WebView";
import axios from "axios";

//axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={WebView} />
      </Switch>
    </Router>
  );
}

export default App;
