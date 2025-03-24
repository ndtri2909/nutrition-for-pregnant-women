import React from "react";
import { Image, Tooltip } from "antd";
import { useRecoilValue } from "recoil";
import ColumnChartBMI from "./ColumnChartBMI";
import mama from "../../../assets/images/mama-green.png";
import { bmiResultState } from "../../../recoil/atom/globalState";

const ResultBMI = () => {
  const bmiResult = useRecoilValue(bmiResultState);
  return (
    <div className="result-bmi">
      <div className="row">
        <div className="l-9 m-12 c-12">
          <div className="result-bmi-index">
            <h4>BMI trước khi mang thai của bạn</h4>

            <div className="line-bmi">
              <Tooltip
                placement="top"
                title={<p style={{ color: "white" }}>BMI = {bmiResult} </p>}
                open={bmiResult > 0 && bmiResult < 18.5 ? true : false}
                color="rgb(29, 174, 236)"
              >
                <ColumnChartBMI
                  title="Gầy"
                  backgroundColor="rgb(29, 174, 236)"
                  width="25%"
                />
              </Tooltip>
              <Tooltip
                placement="top"
                title={<p style={{ color: "white" }}>BMI = {bmiResult} </p>}
                open={bmiResult >= 18.5 && bmiResult < 23 ? true : false}
                color="rgb(96, 185, 99)"
              >
                <ColumnChartBMI
                  title="Bình thường"
                  backgroundColor="rgb(96, 185, 99)"
                  width="50%"
                />
              </Tooltip>
              <Tooltip
                placement="top"
                title={<p style={{ color: "white" }}>BMI = {bmiResult} </p>}
                open={bmiResult >= 23 ? true : false}
                color="rgb(252, 83, 42)"
              >
                <ColumnChartBMI
                  title="Thừa cân"
                  backgroundColor="rgb(252, 83, 42)"
                  //   color="black"
                  width="25%"
                />
              </Tooltip>
            </div>
            <div style={{ display: "flex", marginTop: 4 }}>
              <div
                style={{
                  width: "25%",
                  display: "flex",
                  justifyContent: "end",
                  fontWeight: 600,
                }}
              >
                18,5
              </div>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "end",
                  fontWeight: 600,
                }}
              >
                22
              </div>
            </div>
          </div>
        </div>
        <div className="l-3 m-12 c-12">
          <div className="result-bmi-comment">
            <h4>Nhận xét về BMI trước khi mang thai của bạn</h4>
            <div className="resulte-recommend">
              <Image src={mama} preview={false} width={50} />
              <p style={{ marginBottom: 20 }}>
                {Number(bmiResult) <= 18.5
                  ? "Bạn có chỉ số BMI trước khi mang thai thuộc loại gầy"
                  : Number(bmiResult) > 18.5 && Number(bmiResult) <= 25
                  ? "Bạn có chỉ số BMI trước khi mang thai thuộc loại bình thường"
                  : Number(bmiResult) > 25
                  ? "Bạn có chỉ số BMI trước khi mang thai thuộc loại thừa cân"
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultBMI;
