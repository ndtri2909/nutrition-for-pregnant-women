import { Image } from "antd";
import React from "react";

const NewsMain = ({ item, handleClick }) => {
  return (
    <div className="news-main" onClick={() => handleClick(item?.id)}>
      <div className="row">
        <div className="l-12 m-6 c-12">
          <div className="news-main-info">
            <h4>{item?.TIEUDE}</h4>
            <p>{item?.MOTA}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsMain;
