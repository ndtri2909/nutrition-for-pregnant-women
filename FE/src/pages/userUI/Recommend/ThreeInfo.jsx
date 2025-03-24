import { Image } from "antd";
import React from "react";
import thapdinhduong from "../../../assets/images/thapdinhduong.jpg";

const ThreeInfo = () => {
  return (
    <div className="one-nutritional">
      <div className="one-nutritional-title">
        <p className="one-nutritional-title__number">2</p>
        <div className="one-nutritional-title__right">
          <h4>THÔNG TIN THAM KHẢO</h4>
          <p>
            Mẹ có thể tham khảo Tháp dinh dưỡng dưới đây để biết nhu cầu dinh
            dưỡng hợp lý do Viện Dinh dưỡng Quốc gia - Bộ Y tế ban hành
          </p>
        </div>
      </div>
      <div className="one-nutritional-info">
        <Image src={thapdinhduong} preview={false} width="100%" />
      </div>
    </div>
  );
};

export default ThreeInfo;
