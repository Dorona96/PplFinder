import React, { Component, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { BrowserRouter, Route, Link ,Switch} from "react-router-dom";
import Favorites from "pages/Favorites";
import { Home } from "pages";

const NavBar = () => {
  const [value, setValue] = useState(0);
  const routes = ["Home", "Favorites"];

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  return (
    <BrowserRouter>
      <Route path="/">
        <AppBar
          position="static"
          color="transparent"
          style={{ position: "fixed", top: 0 }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Navigation"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              label="Home"
              index={0}
              value={routes[0]}
              component={Link}
              to={routes[0]}
            />
            <Tab
              label="Favorites"
              index={1}
              value={routes[1]}
              component={Link}
              to={routes[1]}
            />
          </Tabs>
        </AppBar>
      </Route>
      <Switch>
          <Route exact path="/Home" component={Home} />
          <Route exact path="/Favorites" component={Favorites} />
        </Switch>
    </BrowserRouter>
  );
};

export default NavBar;
