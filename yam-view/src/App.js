import React, { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import WebView from "./pages/WebView";
import axios from "axios";

//axios.defaults.withCredentials = true;

function App() {
  // 받아오는 값에 따라 달라지는 tag 값
  const [textValue, setTextValue] = useState("");

  /** react native 환경에서만 가능 */
  const onMessageHandler = (e) => {
    const event = JSON.parse(e.data);
    window.ReactNativeWebView.postMessage(JSON.stringify({ event: event }));
    if (event.changeText) {
      console.log(event.changeText);
      setTextValue(event.changeText);
    }
  };

  // tagChange
  useEffect(() => {
    const isUIWebView = () => {
      return navigator.userAgent
        .toLowerCase()
        .match(/\(ip.*applewebkit(?!.*(version|crios))/);
    };

    const receiver = isUIWebView() ? window : document;

    receiver.addEventListener("message", onMessageHandler);
    return () => {
      receiver.removeEventListener("message", onMessageHandler);
    };
  });
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={WebView} />
      </Switch>
    </Router>
  );
}

export default App;
