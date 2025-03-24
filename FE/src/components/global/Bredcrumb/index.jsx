import { CaretRightOutlined } from "@ant-design/icons";
import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const Bredcrum = ({ title1, title2, title3 }) => {
  const navigate = useNavigate();

  return (
    <div className="bredcrumb-container" style={{ backgroundColor: "white" }}>
      <div className="grid wide">
        <div className="bredcrumb">
          <p className="title" onClick={() => navigate("/")}>
            {title1}
          </p>
          {title2 && (
            <>
              <CaretRightOutlined style={{ marginRight: 10 }} />
              <p
                className="title"
                onClick={() => {
                  if (title3) {
                    navigate("/dinh-duong-va-suc-khoe-cho-me");
                  } else return;
                }}
              >
                {title2}
              </p>{" "}
            </>
          )}
          {title3 && (
            <>
              <CaretRightOutlined style={{ marginRight: 10 }} />
              <p className="title">{title3}</p>{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bredcrum;
