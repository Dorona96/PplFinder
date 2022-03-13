import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";

const AppRouter = () => {
  return (
    <ThemeProvider>
      <Router>
        <NavBar />
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
