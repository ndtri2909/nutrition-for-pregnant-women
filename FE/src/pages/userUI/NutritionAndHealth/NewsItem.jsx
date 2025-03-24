import { Image } from "antd";
import React from "react";

const NewsItem = ({ img, handleClick }) => {
  return (
    <div className="news-item-wrapper">
      <div className="news-item-container" onClick={() => handleClick(3)}>
        <div className="news-item-img">
          <Image src={img} preview={false} />
        </div>
        <div className="news-item-title">
          <h4>Thai nhi 40 tuần cuối: Sự phát triển của bé và thay đổi ở mẹ</h4>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
