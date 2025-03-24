import { Button, Modal, Table } from "antd";
import React from "react";

const ModalViewChangeInfo = ({ open, handleCancel }) => {
  const data1 = [
    {
      key: "1",
      name: "Bột canh",
      age: "100g",
      address: "25 thìa / muỗng cà phê",
    },
    {
      key: "2",
      name: "Bột canh",
      age: "100g",
      address: "12,5 thìa / muỗng canh",
    },
    {
      key: "3",
      name: "Bột ngọt",
      age: "100g",
      address: "25 thìa / muỗng cà phê",
    },
    {
      key: "4",
      name: "Bột ngọt",
      age: "100g",
      address: "12,5 thìa / muỗng canh",
    },
    {
      key: "5",
      name: "Dầu ăn dùng để chiên",
      age: "100g",
      address: "50 thìa / muỗng cà phê",
    },
    {
      key: "6",
      name: "Dầu ăn dùng để chiên",
      age: "100g",
      address: "25 thìa / muỗng canh",
    },
    {
      key: "7",
      name: "Dầu ăn thấm vào thực phẩm",
      age: "100g",
      address: "50 thìa / muỗng cà phê",
    },
    {
      key: "8",
      name: "Dầu ăn thấm vào thực phẩm",
      age: "100g",
      address: "25 thìa / muỗng canh",
    },
  ];

  const columns1 = [
    {
      title: "STT",
      key: "name",
      render: (_, record, index) => index + 1,
      width: "5%",
    },
    {
      title: "Tên nguyên liệu",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
      width: "35%",
    },
    {
      title: "Đơn vị khối lượng chuẩn",
      dataIndex: "age",
      key: "age",
      align: "center",
      width: "20%",
    },
    {
      title: "Đơn vị chuyển đổi",
      dataIndex: "address",
      key: "address",
      width: "40%",
    },
  ];
  return (
    <div>
      <Modal
        // title="THÔNNG TIN CHI TIẾT CHUYỂN ĐỔI NGUYÊN LIỆU TRÊN ĐƠN VỊ KHỐI LƯỢNG CHUẨN 100G (Tham khảo)"
        title=" "
        open={open}
        onCancel={handleCancel}
        width={800}
        footer={false}
        style={{ top: 20 }}
        maskClosable={false}
        className="form-style"
      >
        <div className="model-view">
          <h3>
            THÔNNG TIN CHI TIẾT CHUYỂN ĐỔI NGUYÊN LIỆU TRÊN ĐƠN VỊ KHỐI LƯỢNG
            CHUẨN 100G (Tham khảo)
          </h3>
          <Table
            columns={columns1}
            dataSource={data1}
            pagination={false}
            bordered={true}
          />
          <div className="btn-close-modal">
            <Button onClick={handleCancel} className="close-modal">
              Đóng
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalViewChangeInfo;
