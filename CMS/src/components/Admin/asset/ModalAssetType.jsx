import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Space,
  Table,
} from "antd";
import { TblPagination, validateMessages } from "../../../common";
import { memo, useRef } from "react";
import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { useAssetType } from "../../../hooks/useAssetType";

const ModalAssetType = ({ title, isOpen, onCancel }) => {
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const [assetType, setAssetType] = useState(undefined);

  const {
    getAllAssetTypes,
    isLoading,
    assetTypes,
    setAssetTypes,
    createAssetTrackingType,
    updateAssetTrackingType,
    deleteAssetTrackingType,
  } = useAssetType();

  //get all data when update asset
  useEffect(() => {
    if (isOpen) {
      inputRef.current.focus();

      if (assetTypes?.length === 0) {
        getAllAssetTypes();
      }
    }
  }, [isOpen, assetType]);

  // setfield value form
  useEffect(() => {
    if (assetType) {
      form.setFieldsValue(assetType);
    } else {
      form.resetFields();
    }
  }, [assetType]);

  // submit form
  const handleOk = async () => {
    const result = {
      ...form.getFieldValue(),
    };
    if (
      result?.NAME === undefined ||
      result?.NAME === null ||
      result?.CD === undefined ||
      result?.CD === null ||
      result?.CD?.trim() === "" ||
      result?.NAME?.trim() === ""
    )
      return;

    if (assetType) {
      updateAssetTrackingType(result, assetType?.id, () => handleReset());
    } else {
      createAssetTrackingType(result, () => handleReset());
    }
  };

  // confirm delete
  const confirm = async (id) => {
    let res = await deleteAssetTrackingType(id);
    if (res) {
      setAssetTypes(assetTypes?.filter((item) => item?.id !== id));
    }
  };

  const handleCancel = () => {
    handleReset();
    onCancel();
  };

  //
  const handleReset = () => {
    setAssetType(undefined);
    form.resetFields();
  };

  const columns = [
    {
      title: "STT",
      key: "no1",
      render: (_, recor, index) => index + 1,
      width: 40,
    },
    {
      title: "CD",
      key: "CD",
      dataIndex: "CD",
      width: 60,
    },
    {
      title: "Type name",
      dataIndex: "NAME",
      key: "NAME",
      width: 200,
    },
    {
      title: "Decriptions",
      dataIndex: "DESC",
      key: "DESC",
      width: 300,
    },
    {
      title: "",
      width: 35,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EditOutlined />}
            className={"btn-warning"}
            onClick={() => setAssetType(record)}
            size="small"
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => confirm(record?.id)}
            okText="Xóa"
            cancelText="Không"
          >
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              className={"btn-danger"}
              size="small"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Modal
        title={`${title}`}
        visible={isOpen}
        onCancel={() => handleCancel()}
        style={{ top: 20 }}
        footer={[
          <Button form="myForm" type="second" onClick={() => handleCancel()}>
            Đóng
          </Button>,
        ]}
        width={900}
        className="modal-customer modal-mobile"
      >
        <Form
          form={form}
          name="basic"
          scrollToFirstError={true}
          validateMessages={validateMessages}
          labelAlign="left"
          className="modal-form"
          onFinish={handleOk}
          layout="vertical"
        >
          <Row gutter={[20]}>
            <Col xs={24} sm={10} lg={10}>
              <Form.Item
                label="CD"
                name="CD"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={14} lg={14}>
              <Form.Item
                label="Type name"
                name="NAME"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input autoFocus={true} allowClear ref={inputRef} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Description" name="DESC">
                <Input.TextArea rows={3} allowClear />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Row>
              <Col span={24} style={{ display: "flex", justifyContent: "end" }}>
                <Space size="small">
                  <Button
                    type="primary"
                    className={"btn-danger"}
                    onClick={() => handleReset()}
                    icon={<UndoOutlined />}
                    size="small"
                    style={{ width: 50 }}
                  />
                  <Button
                    title={assetType ? "Cập nhật" : "Tạo mới"}
                    type="primary"
                    icon={
                      isLoading ? (
                        <LoadingOutlined />
                      ) : assetType ? (
                        <EditOutlined />
                      ) : (
                        <PlusOutlined />
                      )
                    }
                    htmlType="submit"
                    size="small"
                    style={{ width: 50 }}
                  />
                </Space>
              </Col>
            </Row>
          </Form.Item>
        </Form>

        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={assetTypes}
              pagination={{ ...TblPagination, size: "small" }}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default memo(ModalAssetType);
