import { Table } from "antd";
import React from "react";
import {
  columns1,
  columns2,
  columns3,
  columns4,
  columns5,
  data1,
  data2,
  data3,
  data4,
  data5,
} from "../../../commons/data";

const OneNutritional = () => {
  return (
    <div className="one-nutritional">
      <div className="one-nutritional-title">
        <p className="one-nutritional-title__number">1</p>
        <div className="one-nutritional-title__right">
          <h4>NHU CẦU DINH DƯỠNG CẦN THIẾT TRONG MỘT NGÀY</h4>
          <p>
            Dưới đây là nhu cầu dinh dưỡng cần cung cấp trong một ngày để đảm
            bảo sức khỏe cho mẹ trong giai đoạn hiện tại
          </p>
        </div>
      </div>
      <div className="tbl-health-info">
        <div className="tbl-info-header">
          <div className="div-1">Chỉ tiêu</div>
          <div className="div-2">Nhu cầu</div>
          <div className="div-3">Đơn vị</div>
        </div>
        <div className="tbl-info-1">
          <Table
            columns={columns1}
            dataSource={data1}
            pagination={false}
            bordered={true}
          />
          <Table
            columns={columns5}
            dataSource={data5}
            pagination={false}
            bordered={true}
          />
          <Table
            columns={columns2}
            dataSource={data2}
            pagination={false}
            bordered={true}
          />
          <Table
            columns={columns3}
            dataSource={data3}
            pagination={false}
            bordered={true}
          />
          <Table
            columns={columns4}
            dataSource={data4}
            pagination={false}
            bordered={true}
          />
        </div>
      </div>
    </div>
  );
};

export default OneNutritional;
