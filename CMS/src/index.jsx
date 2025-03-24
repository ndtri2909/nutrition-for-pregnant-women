import React from "react";
import ReactDOM from "react-dom";
import Layout from "./layout/Layout";
import { RecoilRoot } from "recoil";
import "./styles/index.css";
import "antd/dist/antd.css";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Layout />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
