import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import WebView from "./pages/WebView";
import axios from "axios";

//axios.defaults.withCredentials = true;
/**
 * RN에서 온 정보를 듣는 함수
 */
const RNListener = () => {
  /** react native 환경에서만 가능 */
  const listener = (event) => {
    const { data, type } = JSON.parse(event.data);
    if (type === "RN_TO_YAM_VIEW") {
      console.log("RN_TO_YAM_VIEW", data);
    }

    if (type === "TOKEN") {
      // type이 TOKEN이기 때문에 이곳에 콘솔이 찍히게 됩니다.
      console.log(data); // xxxxx
    } else if (type === "NOTIFICATION") {
      console.log("NOTIFICATION");
    }
  };

  if (window.ReactNativeWebView) {
    /** android */
    document.addEventListener("message", listener);
    /** ios */
    window.addEventListener("message", listener);
  } else {
    // 모바일이 아니라면 모바일 아님을 alert로 띄웁니다.
    console.log("모바일이 아님");
  }
};

function App() {
  return (
    <Router>
      <RNListener />
      <Switch>
        <Route exact path="/" component={WebView} />
      </Switch>
    </Router>
  );
}

export default App;
