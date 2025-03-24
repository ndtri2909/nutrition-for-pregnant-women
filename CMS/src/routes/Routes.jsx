import React from "react";

import { Route, Switch } from "react-router-dom";
import PageRender from "../PageRender";
import Login from "../pages/auth/login";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={PageRender} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/:appName" component={PageRender} />
      <Route exact path="/:appName/:id" component={PageRender} />
    </Switch>
  );
};

export default Routes;
