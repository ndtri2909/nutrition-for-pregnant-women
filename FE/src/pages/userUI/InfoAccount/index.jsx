import { Button, DatePicker, Form, Input, Select } from "antd";
import React, { useEffect } from "react";
import { validateMessages } from "../../../commons";
import { useCities } from "../../../hook/city";
import { useRecoilValue } from "recoil";
import { cityOptionState } from "../../../recoil/atom/locationState";
import { useUsers } from "../../../hook/users";
import { profileState } from "../../../recoil/atom/userState";
import Bredcrum from "../../../components/global/Bredcrumb";
import dayjs from "dayjs";

const InfoAccount = () => {
  const profile = useRecoilValue(profileState);
  const [form] = Form.useForm();
  useCities();
  const { updateUser, isLoading } = useUsers();
  const cityOption = useRecoilValue(cityOptionState);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        ...profile,
        DOB: dayjs(new Date(profile?.DOB)),
      });
    }
  }, [profile]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        delete values["confirm"];
        const newData = {
          ...values,
          IS_ADMIN: false,
        };
        updateUser(profile?.id, newData);
      })
      .catch((info) => {
        console.log("Validation Failed: ", info);
      });
  };

  return (
    <div className="main-content">
      <Bredcrum title1="Trang chủ" title2="Thông tin tài khoản" />
      <div className="grid wide">
        <div className=" contact-wrapper">
          <div className="form-login-register">
            <div className="row">
              <div className="l-6 m-6 c-0">
                <h1>Thông tin tài khoản</h1>
              </div>
              <div className="l-6 m-6 c-12">
                <Form
                  layout="vertical"
                  name="basic"
                  form={form}
                  validateMessages={validateMessages}
                  className="form-style"
                  style={{ marginTop: 30 }}
                >
                  <Form.Item
                    name="FULLNAME"
                    label="Họ và tên"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Họ và tên" autoFocus={true} />
                  </Form.Item>
                  <Form.Item name="PHONE" label="Số điện thoại">
                    <Input placeholder="Số điện thoại" />
                  </Form.Item>
                  <Form.Item
                    name="EMAIL"
                    label="Email"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    name="DOB"
                    label="Ngày sinh"
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
                    label="Thành phố"
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

                  <Form.Item>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        htmlType="submit"
                        onClick={handleSubmit}
                        loading={isLoading}
                        className="btn-submit"
                      >
                        Cập nhật
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoAccount;
