import { Image } from "antd";
import React, { useMemo } from "react";
import mama from "../../../assets/images/doctor.png";
import BMIChart from "./BMIChart";
import { data } from "../../../commons/data";
import { dataChartState } from "../../../recoil/atom/globalState";
import { useRecoilValue } from "recoil";
import { typeBMI } from "../../../commons";
import { useBMI } from "../../../hook/bmi";
import { profileState } from "../../../recoil/atom/userState";
import BtnSubmit from "../../../components/global/Button/BtnSubmit";
import { useNavigate } from "react-router-dom";

const ChartBMI = ({ KetLuanKhuyenNghi }) => {
  const navigate = useNavigate();
  const dataChart = useRecoilValue(dataChartState);
  const { bmi } = useBMI();
  const profile = useRecoilValue(profileState);
  const data1 = useMemo(() => {
    const _assetStockCounts = [...data];
    const index = _assetStockCounts?.findIndex(
      (item) => item.value === dataChart?.week
    );
    _assetStockCounts[index] = {
      label: dataChart?.week,
      value: dataChart?.week,
      index: dataChart?.weigh,
      day: dataChart?.day,
    };
    return _assetStockCounts;
  }, [dataChart, data]);

  const data2 = useMemo(() => {
    const _assetStockCounts = [...data];
    for (let i = 0; i < bmi?.length; i++) {
      for (let j = 0; j < _assetStockCounts?.length; j++) {
        if (_assetStockCounts[j]?.value === bmi[i]?.week) {
          _assetStockCounts[j] = {
            label: bmi[i]?.week,
            value: bmi[i]?.week,
            index: bmi[i]?.weigh,
            day: bmi[i]?.day,
            weighChange: bmi[i]?.weighChange,
          };
        }
      }
    }
    return _assetStockCounts;
  }, [bmi, data]);

  return (
    <div className="result-bmi">
      <div className="row">
        <div className="l-9 m-12 c-12">
          <div className="result-bmi-index">
            <h4>Biểu đồ mức tăng cân trong suốt thời gian thai kỳ</h4>

            <div id="bmi-chart" className="chart-line-bmi">
              <BMIChart data={profile ? data2 : data1} dataChart={bmi} />
            </div>
            {!profile && (
              <div className="bmi-btn-group">
                <BtnSubmit
                  title="Đăng nhập để lưu lại lịch sử tăng cân của bạn"
                  onOk={() => navigate(`/form`)}
                />
              </div>
            )}
            <div className="bmi-region-group">
              <div className="bmi-region-color">
                <div className="three-month-start three-month">3 tháng đầu</div>
                <div className="three-month-center three-month">
                  3 tháng giữa
                </div>
                <div className="three-month-end three-month">3 tháng cuối</div>
              </div>
            </div>
            <p className="week-pregnancy">Tuần thai kỳ</p>
          </div>
        </div>
        <div className="l-3 m-12 c-12">
          <div className="result-bmi-comment">
            <h4>
              KHUYẾN NGHỊ MỨC CÂN NẶNG CẦN TĂNG THEO BMI TRƯỚC KHI MANG THAI CỦA
              BẠN
            </h4>
            {dataChart &&
              (typeBMI(dataChart?.bmiBef) === 1 ? (
                <div className="resulte-recommend">
                  <Image src={mama} preview={false} width={50} />
                  <p>
                    Khi mang thai tròn chín tháng, bạn cần đạt được mức tăng
                    cân:{" "}
                    <span className="fontBold">
                      {dataChart?.weightBef * 0.25 + " " + "kg"}
                    </span>
                  </p>
                  <p>
                    <span className="fontBold">Chú thích:</span> Số cân nặng cần
                    tăng của bạn được tính bằng 25% so với cân nặng trước khi có
                    thai
                  </p>
                </div>
              ) : typeBMI(dataChart?.bmiBef) === 2 ? (
                <div className="resulte-recommend">
                  <Image src={mama} preview={false} width={50} />
                  <p>
                    Ban cần tăng cân như sau khi tròn các giai đoạn trong thai
                    kì:
                  </p>
                  <ul>
                    <li className={`${dataChart?.week <= 12 && "fontBold"}`}>
                      Tròn 3 tháng: tăng 1 kg
                    </li>
                    <li
                      className={`${
                        dataChart?.week > 12 &&
                        dataChart?.week <= 24 &&
                        "fontBold"
                      }`}
                    >
                      Tròn 6 tháng: tăng 5 - 6 kg
                    </li>
                    <li className={`${dataChart?.week > 24 && "fontBold"}`}>
                      Tròn thai kỳ: tăng 10 - 12 kg
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="resulte-recommend">
                  <Image src={mama} preview={false} width={50} />
                  <p>
                    Khi mang thai tròn chín tháng, bạn cần đạt được mức tăng
                    cân:{" "}
                    <span className="fontBold">
                      {dataChart?.weightBef * 0.15 + " " + "kg"}
                    </span>
                  </p>
                  <p>
                    <span className="fontBold">Chú thích:</span> Số cân nặng cần
                    tăng của bạn được tính bằng 15% so với cân nặng trước khi có
                    thai
                  </p>
                </div>
              ))}
          </div>
        </div>
        <div
          className="l-12 m-12 c-12"
          style={{ borderTop: "1px solid #e7e7e7" }}
        >
          <div className="result-bmi-index result-heigh">
            <h4>KẾT QUẢ MỨC TĂNG CÂN CHO ĐẾN HIỆN TẠI CỦA BẠN & KHUYẾN NGHỊ</h4>
            <ul>
              <li>
                Mức tăng cân của bạn từ khi mang thai cho đến hiện tại là{" "}
                {dataChart?.weigh < 0 ? 0 : dataChart?.weigh} kg.
              </li>
              <li>{KetLuanKhuyenNghi?.KETLUAN}</li>
              <li>{KetLuanKhuyenNghi?.KHUYENNGHI}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartBMI;
