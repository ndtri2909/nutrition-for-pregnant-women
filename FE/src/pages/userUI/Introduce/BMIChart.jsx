import React, { memo } from "react";
import { Line } from "@ant-design/plots";

const BMIChart = ({ data }) => {
  const config1 = {
    data,
    padding: "auto",
    xField: "value",
    yField: "index",
    yAxis: {
      title: {
        text: "Mức tăng cân so với thời điểm mang thai (kg)",
        style: {
          fill: "#f58826",
          fontWeight: 700,
        },
      },
      tickCount: 10,
      min: 0,
      max: 12,
    },
    legend: false,
    lineStyle: {
      lineWidth: 1,
    },
    smooth: false,
    color: "#10ba08",
    colorField: "name",
    annotations: [
      {
        type: "region",
        start: ["0%", 91.7],
        end: ["28.8%", 100],
        style: {
          fill: "#eff7e4",
          fillOpacity: 1,
          opacity: 1,
        },
      },

      {
        type: "region",
        start: ["28.8%", 91.7],
        end: ["58.8%", 50],
        style: {
          fill: "#c7dffa",
          fillOpacity: 1,
          opacity: 1,
        },
      },

      {
        type: "region",
        start: ["58.8%", 50],
        end: ["100%", 0],
        style: {
          fill: "#f9e2da",
          fillOpacity: 1,
          opacity: 1,
        },
      },
    ],
    label: {
      style: {
        fill: "#f38217",
      },
    },
    point: {
      size: 8,
      shape: "star",
      style: {
        fill: "#e0582a",
        stroke: "white",
        lineWidth: 2,
      },
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [
      {
        type: "marker-active",
      },
    ],
    tooltip: {
      title: (_, data2) =>
        `
        Bạn đã tăng thêm ${data2?.weighChange} kg ở tuần ${data2?.value}
      `,
    },
  };

  return (
    <>
      <Line {...config1} />
    </>
  );
};

export default memo(BMIChart);
