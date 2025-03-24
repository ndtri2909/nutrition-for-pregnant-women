import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect } from "react";
import { useCities } from "../../hooks/city";
import { useRecoilValue } from "recoil";
import { cityOptionState } from "../../recoil/atom/locationState";

const ModalUser = ({
  isOpen,
  handleCancel,
  isLoading,
  onCreate,
  onUpdate,
  data,
}) => {
  const [form] = useForm();
  useCities();
  const cityOption = useRecoilValue(cityOptionState);
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
        title="Tài khoản"
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
          name="basic"
          form={form}
          validateMessages={"Không được để trống"}
          className="form-style"
          style={{ marginTop: 30 }}
        >
          <p>
            Thông tin có sấu (<span style={{ color: "#e3282c" }}>*</span>) là
            bắt buộc
          </p>
          <Form.Item
            name="FULLNAME"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Họ và tên *" />
          </Form.Item>
          <Form.Item
            name="PHONE"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Số điện thoại *" />
          </Form.Item>
          <Form.Item name="EMAIL">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="CITY_ID"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select options={cityOption} placeholder="Tỉnh/ Thành phố *" />
          </Form.Item>
          {data ? (
            <></>
          ) : (
            <>
              <Form.Item
                name="PASSWORD"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                  {
                    min: 6,
                    message: "Nhập ít nhất 6 ký tự!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Nhập mật khẩu (ít nhất 6 ký tự) *" />
              </Form.Item>
              <Form.Item
                name="confirm"
                dependencies={["PASSWORD"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("PASSWORD") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Vui lòng nhập đúng mật khẩu!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Nhập lại mật khẩu *" />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default ModalUser;
