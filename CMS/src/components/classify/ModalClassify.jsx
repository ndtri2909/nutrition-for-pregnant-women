import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect } from "react";

const ModalClassify = ({
  isOpen,
  handleCancel,
  isLoading,
  onCreate,
  onUpdate,
  data,
}) => {
  const [form] = useForm();
  const onCancel = () => {
    form.resetFields();
    handleCancel();
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data });
    }
  }, [data]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (data) {
        onUpdate(values, data?.id, () => onCancel());
      } else {
        onCreate(values, () => onCancel());
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
          <Form.Item
            label="Tên"
            name="TEN"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên loại",
              },
            ]}
          >
            <Input autoFocus={true} />
          </Form.Item>
          <Form.Item label="Mô tả" name="MOTA">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalClassify;
