import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect } from "react";
import { usePhanLoai } from "../../hooks/phanLoai";
import { useRecoilValue } from "recoil";
import { thucDonOptionState } from "../../recoil/atom/thucDonState";
import { phanLoaiOptionState } from "../../recoil/atom/phanLoaiState";
const dataKhoang = [
  { value: 1, label: "3 tháng đầu" },
  { value: 2, label: "3 - 6 tháng" },
  { value: 3, label: "3 tháng cuối" },
];
const ModalThucDon = ({
  isOpen,
  handleCancel,
  isLoading,
  onCreate,
  onUpdate,
  data,
}) => {
  usePhanLoai();
  const phanLoaiOption = useRecoilValue(phanLoaiOptionState);
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
        title="Thực đơn"
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
            label="Giai đoạn"
            name="KHOANG"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn giai đoạn",
              },
            ]}
          >
            <Select options={dataKhoang} />
          </Form.Item>
          <Form.Item
            label="Phân loại"
            name="PHANLOAI_ID"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên loại",
              },
            ]}
          >
            <Select options={phanLoaiOption} />
          </Form.Item>
          <Form.Item
            label="Thứ"
            name="THU"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thứ",
              },
            ]}
          >
            <Select
              options={[
                { value: 1, label: "Thứ 2" },
                { value: 2, label: "Thứ 3" },
                { value: 3, label: "Thứ 4" },
                { value: 4, label: "Thứ 5" },
                { value: 5, label: "Thứ 6" },
                { value: 6, label: "Thứ 7" },
                { value: 7, label: "Chủ nhật" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalThucDon;
