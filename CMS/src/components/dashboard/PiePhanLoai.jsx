import { Pie } from "@ant-design/plots";
import React, { memo } from "react";

const PiePhanLoai = ({ data }) => {
  const config = {
    data,
    angleField: "count",
    colorField: "TEN",
    marginBottom: [50],
    label: {
      //   type: "spider",
      labelHeight: 28,
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
export default memo(PiePhanLoai);
