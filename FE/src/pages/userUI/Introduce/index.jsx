import React, { useEffect, useState } from "react";
import ChartBMI from "./ChartBMI";
import ResultBMI from "./ResultBMI";
import FrmChooseMenu from "./FrmChooseMenu";
import { useNavigate } from "react-router-dom";
import Bredcrum from "../../../components/global/Bredcrumb";
import BtnSubmit from "../../../components/global/Button/BtnSubmit";
import "./style.scss";
import { useKetLuanKhuyenNghi } from "../../../hook/ketLuanKhuyenNghi";
import { useBMI } from "../../../hook/bmi";
import { downloadPdfEvaluation } from "../../../commons/generalPdf";
import { useRecoilValue } from "recoil";
import { profileState } from "../../../recoil/atom/userState";
import html2canvas from "html2canvas";

const Introduce = () => {
  const navigate = useNavigate();
  const { KetLuanKhuyenNghi } = useKetLuanKhuyenNghi();
  const { bmis } = useBMI();
  const profile = useRecoilValue(profileState);
  const [imgChart, setImgChart] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      html2canvas(document.getElementById("bmi-chart"), {
        allowTaint: true,
        dpi: 1000,
        letterRendering: true,
        logging: true,
        scale: 3,
      }).then((canvas) => {
        canvas.toDataURL();
        const img = canvas.toDataURL("image/png");
        setImgChart(img);
      });
    }, 500);
  }, [bmis]);

  return (
    <div className="main-content">
      <Bredcrum title1="Trang chủ" title2="Theo dõi sức khỏe của mẹ" />
      <div className="grid wide">
        <div className=" contact-wrapper1">
          <FrmChooseMenu />
          <ResultBMI />
          <ChartBMI KetLuanKhuyenNghi={KetLuanKhuyenNghi} />
          <div className="bmi-footer">
            <div className="bmi-btn-group">
              <BtnSubmit
                title="Xem khuyến nghị thực đơn dinh dưỡng theo kết quả của bạn"
                onOk={() =>
                  navigate(
                    `/ngan-hang-thuc-don-dinh-duong/${KetLuanKhuyenNghi?.PHANLOAI_ID}`
                  )
                }
              />
            </div>
            {profile && (
              <div className="bmi-btn-group">
                <BtnSubmit
                  title="Xem lịch sử tư vấn"
                  onOk={() => downloadPdfEvaluation(profile, bmis, imgChart)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduce;
