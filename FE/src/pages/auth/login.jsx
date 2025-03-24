import { Button, Checkbox, Form, Input } from "antd";
import React, { useEffect, useRef } from "react";
import { validateMessages } from "../../commons";
import "./style.scss";
import { useUsers } from "../../hook/users";
import { LoadingOutlined } from "@ant-design/icons";
import { regPhone } from "../../commons/data";

const Login = ({ title, open }) => {
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const { isLoading, login } = useUsers();
  useEffect(() => {
    if (open) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const newData = {
          ...values,
        };
        login(newData);
      })
      .catch((info) => {
        console.log("Validation Failed: ", info);
      });
  };

  return (
    <div>
      <Form
        name="basic"
        form={form}
        validateMessages={validateMessages}
        className="form-style"
        style={{ marginTop: 30 }}
        layout="vertical"
      >
        <Form.Item
          name="PHONE"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              pattern: regPhone,
              message: "Vui lòng nhập số điện thoại!",
            },
          ]}
        >
          <Input
            placeholder="số điện thoại của bạn"
            ref={inputRef}
            autoFocus={true}
          />
        </Form.Item>
        <Form.Item
          name="PASSWORD"
          label="Nhập mật khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
          ]}
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              htmlType="submit"
              onClick={handleSubmit}
              className="btn-submit"
              loading={isLoading}
            >
              {title}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
