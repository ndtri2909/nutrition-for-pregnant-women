import { useUsers } from "../../hook/users";
import React, { useEffect, useRef } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import { validateMessages } from "../../commons";
import "./style.scss";
import { useCities } from "../../hook/city";
import { useRecoilValue } from "recoil";
import { cityOptionState } from "../../recoil/atom/locationState";
import { regEmail, regPhone } from "../../commons/data";
import moment from "moment";

const Register = ({ onCancel, open, onLogin }) => {
  useCities();
  const cityOption = useRecoilValue(cityOptionState);
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const { isLoading, register } = useUsers();
  useEffect(() => {
    if (open) {
      inputRef.current.focus();
    }
  }, [open]);
  const handleCancel = () => {
    form.resetFields();
  };
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        delete values["confirm"];
        const newData = {
          ...values,
          IS_ADMIN: false,
        };
        register(newData, () => handleCancel());
      })
      .catch((info) => {
        console.log("Validation Failed: ", info);
      });
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div>
      <Form
        name="basic"
        form={form}
        validateMessages={validateMessages}
        className="form-style"
        style={{ marginTop: 30 }}
      >
        <p>
          Thông tin có dấu (<span style={{ color: "#e3282c" }}>*</span>) là bắt
          buộc
        </p>
        <Form.Item
          name="FULLNAME"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Họ và tên *" ref={inputRef} autoFocus={true} />
        </Form.Item>
        <Form.Item
          name="PHONE"
          rules={[
            {
              required: true,
              pattern: regPhone,
              message: "Vui lòng nhập SĐT",
            },
          ]}
        >
          <Input placeholder="Số điện thoại *" />
        </Form.Item>
        <Form.Item
          name="EMAIL"
          rules={[
            {
              required: true,
              pattern: regEmail,
              message: "Vui lòng nhập email",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="DOB"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker
            style={{ width: "100%" }}
            placeholder="Ngày sinh"
            format={"DD/MM/YYYY"}
            disabledDate={(current) =>
              current &&
              current.valueOf() >
                new Date().setFullYear(new Date().getFullYear() - 16)
            }
          />
        </Form.Item>
        <Form.Item
          name="CITY_ID"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={cityOption}
            allowClear
            showSearch
            placeholder="Tỉnh/ Thành phố *"
          />
        </Form.Item>
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
        <div className="note-login">
          <Checkbox onChange={onChange}>
            Bằng việc đăng kí, bạn đã đồng ý với{" "}
            <a href="">Điều kiện và Điều khoản bảo mật thông tin</a> của website
          </Checkbox>
        </div>
        <Form.Item>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              htmlType="submit"
              onClick={handleSubmit}
              loading={isLoading}
              className="btn-submit"
            >
              Đăng ký
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
