import React from "react";

const ColumnChartBMI = ({
  title,
  backgroundColor,
  color = "white",
  number,
  width,
}) => {
  return (
    <>
      <div
        style={{
          backgroundColor: backgroundColor,
          color: color,
          width: `${width}`,
        }}
        className="check-bmi-info"
      >
        {title}
      </div>
      {/* <div style={{ paddingTop: 30, fontSize: 18 }}>{number}</div> */}
    </>
  );
};

export default ColumnChartBMI;
