import { Image, Select } from "antd";
import React, { useEffect, useState } from "react";
import menu from "../../../assets/images/health-recommend.png";
import BtnSubmit from "../../../components/global/Button/BtnSubmit";
import { data, valueDate } from "../../../commons/data";

const FrmChooseMenu = ({ setIsShow }) => {
  const [select, setSelect] = useState(1);
  const [error, setError] = useState(null);
  const [week, setWeek] = useState(undefined);
  const [day, setDay] = useState(undefined);

  const handleSubmit = () => {
    if (select === 1) {
      if (!week || !day) {
        setError("Vui lòng chọn thời gian mang thai");
        return;
      } else {
        setError(null);
        setIsShow(true);
      }
    }
  };

  useEffect(() => {
    if (week && day) {
      setError(null);
    }
  }, [week, day]);

  return (
    <>
      <div className="choose-menu-bank">
        <div className="row">
          <div className="l-4 m-12 c-12">
            <div className="choose-menu-left">
              <Image src={menu} preview={false} width={60} />
              <h3 className="title">Nhu Cầu Dinh Dưỡng</h3>
              <h3>Khuyến Nghị</h3>
            </div>
          </div>
          <div className="l-8 m-12 c-12">
            <div className="choose-menu-right">
              <p className="choose-menu-right__title">
                Bạn hãy nhập thông tin theo bảng bên dưới để biết được nhu cầu
                dinh dưỡng khuyến nghị ở giai đoạn hiện tại của bạn
              </p>
              <div className="row">
                <div className="l-6 m-12 c-12">
                  <div className="form-select">
                    <div>
                      <p>Thời gian mang thai</p>
                      <div className="select-date">
                        <div className="select-item">
                          <Select
                            placeholder="Chọn"
                            style={{ width: "60%" }}
                            options={data}
                            onSelect={(value) => setWeek(value)}
                          />{" "}
                          <span>Tuần</span>
                        </div>
                        <div className="select-item">
                          <Select
                            placeholder="Chọn"
                            style={{ width: "60%" }}
                            options={valueDate}
                            onSelect={(value) => setDay(value)}
                          />{" "}
                          <span>Ngày</span>
                        </div>
                      </div>
                      <div style={{ color: "red", paddingTop: 4 }}>{error}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <BtnSubmit title="Xem khuyến nghị" onOk={() => handleSubmit()} />
    </>
  );
};

export default FrmChooseMenu;
