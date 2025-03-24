import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import HtmlEditor from "./HtmlEditor";

const ModalTinTuc = ({
  isOpen,
  handleCancel,
  isLoading,
  onCreate,
  onUpdate,
  data,
}) => {
  const [form] = useForm();
  const [htmlContent, setHtmlContent] = useState(undefined);

  const onCancel = () => {
    form.resetFields();
    setHtmlContent(undefined);
    handleCancel();
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data });
      setHtmlContent(data?.NOIDUNG);
    }
  }, [data]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (data) {
        onUpdate({ ...values, NOIDUNG: htmlContent }, data?.id, () =>
          onCancel()
        );
      } else {
        onCreate({ ...values, NOIDUNG: htmlContent }, () => onCancel());
      }
    });
  };
  return (
    <>
      <Modal
        title="Tin tức"
        visible={isOpen}
        onCancel={onCancel}
        width={1200}
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
            label="Tiêu đề"
            name="TIEUDE"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tiêu đề",
              },
            ]}
          >
            <Input autoFocus={true} />
          </Form.Item>
          <Form.Item label="Mô tả" name="MOTA">
            <TextArea rows={4} />
          </Form.Item>
          <HtmlEditor value={htmlContent} setValue={setHtmlContent} />
        </Form>
      </Modal>
    </>
  );
};

export default ModalTinTuc;
