import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect } from "react";
import { useMonAn } from "../../hooks/monAn";
import { useRecoilValue } from "recoil";
import { monAnOptionState } from "../../recoil/atom/monAnState";

const ModalCongThuc = ({
  isOpen,
  handleCancel,
  isLoading,
  onCreate,
  onUpdate,
  data,
  monAnSelect,
  getAllMonAns,
}) => {
  const [form] = useForm();
  const monAnOption = useRecoilValue(monAnOptionState);
  const onCancel = () => {
    form.resetFields();
    handleCancel();
  };
  useEffect(() => {
    if (monAnSelect) {
      form.setFieldsValue({
        MONAN_ID: monAnSelect,
      });
    }
  }, [monAnSelect]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data });
    }
  }, [data]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (data) {
        onUpdate(values, data?.id, () => {
          onCancel();
          getAllMonAns();
        });
      } else {
        onCreate(values, () => {
          onCancel();
          getAllMonAns();
        });
      }
    });
  };
  return (
    <>
      <Modal
        title="Phân loại"
        visible={isOpen}
        onCancel={onCancel}
        footer={[
          <Button type="second" onClick={onCancel}>
            Cancel
          </Button>,
          <Button type="primary" onClick={handleOk}>
            {" "}
            {isLoading ? <LoadingOutlined /> : "OK"}
          </Button>,
        ]}
      >
        <Form
          form={form}
          labelCol={{
            span: 5,
          }}
          wrroleerCol={{
            span: 19,
          }}
        >
          <Form.Item label="Món ăn" name="MONAN_ID">
            <Select options={monAnOption} />
          </Form.Item>
          <Form.Item
            label="Tên"
            name="TEN"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên công thức",
              },
            ]}
          >
            <Input autoFocus={true} />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="MOTA"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả",
              },
            ]}
          >
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCongThuc;
