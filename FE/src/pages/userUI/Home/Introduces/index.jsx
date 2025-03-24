import React from "react";
import introduce from "../../../../assets/images/introduce.png";

import "./style.scss";
import { Image } from "antd";
import banner from "../../../../assets/images/banner.jpg";
const Introduces = () => {
  return (
    <div className="introduce-container">
      <div className="introduce-img">
        <h1 style={{ color: "#e0582a" }}>
          HỆ THỐNG TƯ VẤN DINH DƯỠNG CHO PHỤ NỮ MANG THAI
        </h1>
        <Image src={banner} alt="" preview={false} />
      </div>
    </div>
  );
};

export default Introduces;
