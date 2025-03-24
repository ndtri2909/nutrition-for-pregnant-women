import { Divider } from "antd";
import Introduces from "./Introduces";
import React from "react";
import Bredcrum from "../../../components/global/Bredcrumb";

const Home = () => {
  return (
    <div className="main-content">
      <Bredcrum title1="Trang chủ" />
      <div className="grid wide">
        <Introduces />
      </div>
    </div>
  );
};

export default Home;
