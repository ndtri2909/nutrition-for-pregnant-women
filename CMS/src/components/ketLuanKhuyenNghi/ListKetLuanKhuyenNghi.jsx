import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import React from "react";

const ListKetLuanKhuyenNghi = ({ data, isLoading, openEdit, onDelete }) => {
  const columns = [
    {
      title: "STT",
      render: (_, record, index) => index + 1,
      width: "5%",
    },
    {
      title: "Loại",
      render: (_, record) =>
        record?.TYPE === 1
          ? "Gầy"
          : record?.TYPE === 2
          ? "Bình thường"
          : "Thừa cân",
      sorter: (a, b) => a.NAME - b.NAME,
    },
    {
      title: "Khoản",
      render: (_, record) =>
        record?.KHOANG === 1
          ? "3 tháng"
          : record?.KHOANG === 2
          ? "6 tháng"
          : "Tròn thai kỳ",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "So sánh",
      render: (_, record) =>
        record?.SOSANH === 1
          ? "Nhỏ hơn"
          : record?.SOSANH === 2
          ? "Trong khoảng"
          : record?.SOSANH === 3
          ? "Lớn hơn"
          : "",

      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "Nhỏ nhất",
      dataIndex: "NHONHAT",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "Lớn nhất",
      dataIndex: "LONNHAT",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "Kết luận",
      dataIndex: "KETLUAN",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "Khuyến nghị",
      dataIndex: "KHUYENNGHI",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "Phân loại",
      render: (_, record) => record?.Phan_Loai?.TEN,
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: ``,
      dataIndex: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <>
          <Space size="middle">
            <Button
              size="small"
              type="primary"
              icon={<EditOutlined />}
              className={"btn-warning"}
              onClick={() => openEdit(record)}
            />
            <Button
              size="small"
              type="primary"
              icon={<DeleteOutlined />}
              className={"btn-danger"}
              onClick={() => onDelete(record.id)}
            />
          </Space>
        </>
      ),
    },
  ];
  return (
    <div>
      {" "}
      <Table
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
      />
    </div>
  );
};

export default ListKetLuanKhuyenNghi;
