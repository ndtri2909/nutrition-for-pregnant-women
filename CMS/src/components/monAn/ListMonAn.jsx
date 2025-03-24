import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Image, Space, Table } from "antd";
import React from "react";

const ListMonAn = ({ data, isLoading, openEdit, onDelete }) => {
  const columns = [
    {
      title: "STT",
      render: (_, record, index) => index + 1,
      width: "5%",
    },
    {
      title: "Hình ảnh",
      render: (_, record) => (
        <Image
          width={200}
          src={`http://localhost:1111/files/${record?.Image_Mon_Ans?.[0]?.NAME}`}
          preview={false}
        />
      ),
    },
    {
      title: "Tên",
      dataIndex: "TEN",
      sorter: (a, b) => a.NAME - b.NAME,
    },
    {
      title: "Buổi",
      render: (_, record) =>
        record?.TYPE === 1 ? "Sáng" : record?.TYPE === 2 ? "Trưa" : "Tối",
      sorter: (a, b) => a.TYPE - b.TYPE,
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

export default ListMonAn;
