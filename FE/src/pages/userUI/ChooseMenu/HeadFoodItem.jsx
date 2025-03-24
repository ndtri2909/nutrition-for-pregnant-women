import { InputNumber } from "antd";
import React, { useState } from "react";

const HeadFoodItem = ({ title }) => {
  const [value, setValue] = useState(1);
  const handleChange = (value1) => {
    setValue(value1);
  };
  return (
    <div className="header-food-item">
      <p className="title">{title}</p>
    </div>
  );
};

export default HeadFoodItem;
