import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Routes from "../routes/Routes";
import { collapsedState } from "../recoil/atom/booleanState";
import { useRecoilValue } from "recoil";

const Layout = () => {
  const collapsed = useRecoilValue(collapsedState);
  return (
    <Router>
      <Route
        render={() => (
          <div className={`main-wrapper ${collapsed && "sibar-wrapp "} `}>
            <SnackbarProvider maxSnack={3}>
              <Routes />
            </SnackbarProvider>
          </div>
        )}
      />
    </Router>
  );
};

export default Layout;
