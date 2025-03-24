import React, { useState } from "react";
import Bredcrum from "../../../components/global/Bredcrumb";
import FrmChooseMenu from "./FrmChooseMenu";
import "./style.scss";
import BtnSubmit from "../../../components/global/Button/BtnSubmit";
import OneNutritional from "./OneNutritional";
import ThreeInfo from "./ThreeInfo";
import { useNavigate } from "react-router-dom";

const Recommend = () => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="main-content">
      <Bredcrum title1="Trang chủ" title2="Nhu cầu dinh dưỡng khuyến nghị" />
      <div className="grid wide">
        <div className="recommend-wrapper">
          <FrmChooseMenu setIsShow={setIsShow} />

          {/*  */}
          {isShow && (
            <>
              <div className="result-recommend-container">
                <OneNutritional />
                {/* <TwoMeal /> */}
                <ThreeInfo />
              </div>
              {/*  */}
              <div className="bmi-footer">
                <div className="bmi-footer-note">
                  <p>
                    Hi vọng Công cụ đã cung cấp cho bạn các thông tin hữu ích về
                    tình trạng sức khỏe hiện tại trong thai kì. Bạn hãy tham
                    khảo thêm các Công Cụ Thông Minh khác để chăm sóc sức khỏe
                    của bạn.
                  </p>
                </div>
                <div className="bmi-btn-group">
                  <BtnSubmit
                    title="Xem thực đơn dinh dưỡng"
                    onOk={() => navigate("/ngan-hang-thuc-don-dinh-duong")}
                  />
                  <BtnSubmit title="Tự kiểm tra chế độ dinh dưỡng hiện tại" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommend;
