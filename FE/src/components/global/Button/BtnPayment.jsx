import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const BtnPayment = ({ title, onOk, loading }) => {
  return (
    <div className="btn-pay" onClick={() => onOk()}>
      {loading && <LoadingOutlined style={{ marginRight: 3 }} />} {title}
    </div>
  );
};

export default BtnPayment;
