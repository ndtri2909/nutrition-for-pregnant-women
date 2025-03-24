import React, { useState } from "react";
import { Table } from "antd";
import ModalViewChangeInfo from "./ModalViewChangeInfo";

const ChangeFood = ({
  title,
  handeClose,
  tabkey2,
  tabkey3,
  dinhduong,
  congthuc,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const columns = [
    {
      title: "Chỉ tiêu",
      dataIndex: "TEN",
      key: "TEN",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Giá trị",
      dataIndex: "GIATRI",
      key: "GIATRI",
      align: "center",
    },
    {
      title: "Đơn vị",
      dataIndex: "DONVI",
      key: "DONVI",
      align: "center",
    },
  ];

  const data1 = [
    {
      key: "1",
      name: "Xương sườn lợn",
      age: "10 g",
      address: "Chặt miếng nhỏ, chần qua nước sôi",
    },
    {
      key: "2",
      name: "Tôm biển",
      age: "10 g",
      address: "Để nguyên con đã bóc vỏ",
    },
    {
      key: "3",
      name: "Thị lợn nạc",
      age: "40 g",
      address: "Để nguyên miếng",
    },
  ];

  const columns1 = [
    {
      title: "Tên nguyên liệu",
      dataIndex: "TEN",
      key: "TEN",
      render: (text) => <b>{text}</b>,
      width: "25%",
    },
    {
      title: "Cách chuẩn bị",
      dataIndex: "MOTA",
      key: "MOTA",
      width: "75%",
    },
  ];
  return (
    <div className="change-food">
      <div className="change-food-header">
        <h4>{title}</h4>
        <p onClick={handeClose}>X</p>
      </div>
      {tabkey2 && (
        <div className="change-food-content">
          <div className="change-food-content__info">
            <Table
              columns={columns}
              dataSource={dinhduong}
              pagination={false}
              bordered={true}
            />
          </div>
        </div>
      )}

      {tabkey3 && (
        <div className="change-food-content">
          <div className="change-food-content__info">
            <Table
              columns={columns1}
              dataSource={congthuc}
              pagination={false}
              bordered={true}
            />
          </div>
          {/* <p className="info-change" onClick={() => setIsOpen(true)}>
            Bảng chuyển đổi đơn vị của nguyên liệu
          </p> */}
          <ModalViewChangeInfo
            open={isOpen}
            handleCancel={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ChangeFood;
