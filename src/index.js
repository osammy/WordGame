import React from "react";
import ReactDOM from "react-dom";
// import App from './App';
// import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import indexRoutes from "./routes/index.js";
import "./index.css";
// import { Button } from "@chakra-ui/core";

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

ReactDOM.render(
  <ThemeProvider>
    <CSSReset />
    <Router>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return (
            <Route
              exact={prop.exact}
              path={prop.path}
              component={prop.component}
              key={key}
            />
          );
        })}
      </Switch>
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);
