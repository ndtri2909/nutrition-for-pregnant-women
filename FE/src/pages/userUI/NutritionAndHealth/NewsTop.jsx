import { Image } from "antd";
import React from "react";

const NewsTop = ({ TinTucs, handleClick }) => {
  return (
    <div className="nutritional-health-right">
      <h3>Bài viết nổi bật</h3>
      <div className="news-item" onClick={() => handleClick(2)}>
        {TinTucs?.slice(0, 3)?.map((item) => (
          <div className="row">
            <div className="l-12 m-8 c-8">
              <div className="news-title">
                <p>{item?.TIEUDE}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsTop;
