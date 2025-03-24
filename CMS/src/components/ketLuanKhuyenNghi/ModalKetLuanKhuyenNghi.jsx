import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal, Radio, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { phanLoaiOptionState } from "../../recoil/atom/phanLoaiState";
import { usePhanLoai } from "../../hooks/phanLoai";

const ModalKetLuanKhuyenNghi = ({
  isOpen,
  handleCancel,
  isLoading,
  onCreate,
  onUpdate,
  data,
}) => {
  usePhanLoai();
  console.log("data", data);
  const [form] = useForm();
  const [value, setValue] = useState(1);
  const [valueCompare, setValueCompare] = useState(1);

  const phanLoaiOption = useRecoilValue(phanLoaiOptionState);

  const onCancel = () => {
    form.resetFields();
    setValue(1);
    setValueCompare(1);
    handleCancel();
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data });
      setValue(data?.TYPE);
      setValueCompare(data?.SOSANH);
    }
  }, [data]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (value !== 2) {
        const newData = {
          ...values,
          SOSANH: valueCompare,
        };
        if (data) {
          onUpdate(newData, data?.id, () => onCancel());
        } else {
          onCreate(newData, () => onCancel());
        }
      } else {
        const newData = { ...values };
        if (data) {
          onUpdate(newData, data?.id, () => onCancel());
        } else {
          onCreate(newData, () => onCancel());
        }
      }
    });
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onChangeCompare = (e) => {
    setValueCompare(e.target.value);
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
        <Form form={form} layout="vertical">
          <Form.Item label="BMI trước mang thai" name="TYPE" initialValue={1}>
            <Radio.Group onChange={onChange} value={value} defaultValue={1}>
              <Radio value={1}>Gầy</Radio>
              <Radio value={2}>Bình thường</Radio>
              <Radio value={3}>Thừa cân</Radio>
            </Radio.Group>
          </Form.Item>

          {value !== 2 ? (
            <Form.Item>
              <Radio.Group
                onChange={onChangeCompare}
                value={valueCompare}
                defaultValue={1}
              >
                <Radio value={1}>Nhỏ hơn</Radio>
                <Radio value={2}>Trong khoảng</Radio>
                <Radio value={3}>Lớn hơn</Radio>
              </Radio.Group>
            </Form.Item>
          ) : (
            <>
              {" "}
              <Form.Item
                label="Khoảng"
                name="KHOANG"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Khoảng",
                  },
                ]}
              >
                <Select
                  options={[
                    {
                      value: 1,
                      label: "3 tháng",
                    },
                    {
                      value: 2,
                      label: "6 tháng",
                    },
                    {
                      value: 3,
                      label: "Tròn thai kỳ",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="Nhỏ nhất"
                name="NHONHAT"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Nhỏ nhất",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label="Lớn nhất"
                name="LONNHAT"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Lớn nhất",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </>
          )}

          <Form.Item
            label="Kết luận"
            name="KETLUAN"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập kết luận",
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            label="Khuyến nghị"
            name="KHUYENNGHI"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Khuyến nghị",
              },
            ]}
          >
            <TextArea />
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
        </Form>
      </Modal>
    </>
  );
};

export default ModalKetLuanKhuyenNghi;
