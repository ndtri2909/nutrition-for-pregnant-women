import React from "react";
import NotFound from "./pages/404";
import { useParams } from "react-router-dom";
import SideBar from "./components/global/SideBar/SideBar";
import Header from "./components/global/Header/Header";
import Footer from "./components/global/Footer/Footer";

import { BackTop } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

const GeneratePage = (appName, id) => {
  //
  const component = () => {
    if (appName) {
      return require(`./pages/${appName}`).default;
    } else {
      return require(`./pages`).default;
    }
  };
  const loginPage = () => {
    if (!appName) {
      return require(`./pages/auth/login`).default;
    } else if (appName != "login") {
      return require(`./pages/auth/${appName}`).default;
    } else {
      return require(`./pages/auth/login`).default;
    }
  };

  try {
    // if (!isLogged) {
    //   return React.createElement(loginPage());
    // }

    return (
      <>
        <SideBar />
        <div className="page-wrapper">
          <Header />
          {React.createElement(component())}
          <BackTop>
            <div className="btn-backToTop">
              <ArrowUpOutlined />
            </div>
          </BackTop>
          <Footer />
        </div>
      </>
    );
  } catch (err) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { id, appName } = useParams();
  return GeneratePage(appName, id);
};
export default PageRender;
