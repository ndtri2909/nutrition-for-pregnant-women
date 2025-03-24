import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Image, Space, Table } from "antd";
import React from "react";

const ListCongThuc = ({
  data,
  isLoading,
  openEdit,
  onDelete,
  handleOpenModal,
}) => {
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
          width={150}
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
          <Button
            size="small"
            onClick={() => handleOpenModal(record?.id)}
            title="Create"
            type="primary"
            style={{
              display: "block",
            }}
            icon={<PlusOutlined />}
          />
        </>
      ),
    },
  ];

  const expandedRowRender = (data) => {
    let listNutri = data?.Cong_Thucs?.reduceRight(function (previous, current) {
      previous.push(current);
      return previous;
    }, []);
    // SET KEY FOR DATA LIST CLASS
    let modifiedData = listNutri?.map((item) => ({
      ...item,
      key: item.id,
    }));
    const columns2 = [
      {
        title: "STT",
        render: (_, record, index) => index + 1,
        width: "5%",
      },
      {
        title: "Tên",
        dataIndex: "TEN",
        sorter: (a, b) => a.NAME - b.NAME,
      },
      {
        title: "Mô tả",
        dataIndex: "MOTA",
        sorter: (a, b) => a.MOTA - b.MOTA,
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
      <Table
        columns={columns2}
        dataSource={modifiedData.sort(
          (a, b) => Date.parse(b.OPENING_DATE) - Date.parse(a.OPENING_DATE)
        )}
        pagination={false}
        className="gray-color-thead"
        style={{ marginBottom: 30 }}
      />
    );
  };
  let modifiedData = data?.map((item) => ({
    ...item,
    key: item.id,
  }));
  return (
    <div>
      <Table
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => {
            return record?.Cong_Thucs?.length > 0;
          },
          columnWidth: 25,
        }}
        dataSource={modifiedData}
        columns={columns}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
      />
    </div>
  );
};

export default ListCongThuc;
