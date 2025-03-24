import { FileTextOutlined, InfoOutlined } from "@ant-design/icons";
import { Image } from "antd";
import React, { useState } from "react";
import ChangeFood from "./ChangeFood";

const FoodItem = ({ name, dinhduong, congthuc, img }) => {
  const [tabkey2, setTabkey2] = useState(false);
  const [tabkey3, setTabkey3] = useState(false);

  const handleChangeTab2 = () => {
    setTabkey3(false);
    setTabkey2(!tabkey2);
  };
  const handleChangeTab3 = () => {
    setTabkey2(false);
    setTabkey3(!tabkey3);
  };

  const handeClose = () => {
    setTabkey2(false);
    setTabkey3(false);
  };

  return (
    <>
      <div className="food-item">
        <div className="row">
          <div className="l-4 m-4 c-5">
            <div className="food-item__img">
              <Image
                src={"http://localhost:1111/files/" + img}
                preview={false}
              />
            </div>
          </div>
          <div className="l-8 m-8 c-7">
            <div className="food-item__content">
              <h3>{name}</h3>
              <div className="content-select">
                <div
                  className={`select-item ${tabkey2 && "select-item-active"} `}
                  onClick={handleChangeTab2}
                >
                  <div className="select-icon">
                    <InfoOutlined
                      style={{ fontSize: 20 }}
                      className="icon-antd"
                    />
                  </div>
                  <p className="title1">Thông tin dinh dưỡng</p>
                </div>
                <div
                  className={`select-item ${tabkey3 && "select-item-active"} `}
                  onClick={handleChangeTab3}
                >
                  <div className="select-icon">
                    <FileTextOutlined
                      style={{ fontSize: 20 }}
                      className="icon-antd"
                    />
                  </div>
                  <p className="title1">Công thức món ăn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {(tabkey2 || tabkey3) && (
          <ChangeFood
            title={
              tabkey2
                ? "Thông tin dinh dưỡng chi tiết"
                : tabkey3
                ? "Công thức món ăn"
                : ""
            }
            dinhduong={dinhduong}
            congthuc={congthuc}
            handeClose={handeClose}
            tabkey2={tabkey2}
            tabkey3={tabkey3}
          />
        )}
      </div>
    </>
  );
};

export default FoodItem;
