import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import moment from "moment";
import React from "react";
import { formatDate } from "../../common";

const ListUser = ({ data, isLoading, openEdit, onDelete }) => {
  const columns = [
    {
      title: "STT",
      render: (_, record, index) => index + 1,
      width: "5%",
    },
    {
      title: "Họ và tên",
      dataIndex: "FULLNAME",
      sorter: (a, b) => a.NAME - b.NAME,
    },
    {
      title: "SĐT",
      dataIndex: "PHONE",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "Email",
      dataIndex: "EMAIL",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "Tỉnh/ Thành phố",
      render: (_, record) => record?.City?.NAME,
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: ``,
      dataIndex: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <>
          <Button
            size="small"
            type="primary"
            icon={<EditOutlined />}
            className={"btn-warning"}
            onClick={() => openEdit(record)}
          />
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

export default ListUser;
