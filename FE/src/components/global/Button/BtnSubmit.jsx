import { Button } from "antd";
import React from "react";
import "./style.scss";

const BtnSubmit = ({ title, onOk }) => {
  return (
    <div className="btn-check-health">
      <Button className="btn-check" onClick={onOk}>
        {title}
      </Button>
    </div>
  );
};

export default BtnSubmit;
