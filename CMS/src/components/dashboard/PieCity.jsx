import { Pie } from "@ant-design/plots";
import React, { memo } from "react";

const PieCity = ({ data }) => {
  const config = {
    data,
    angleField: "count",
    colorField: "NAME",
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
      },
    },
  };
  return <Pie {...config} />;
};
export default memo(PieCity);
