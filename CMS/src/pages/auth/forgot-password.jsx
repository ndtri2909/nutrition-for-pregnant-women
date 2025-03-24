import React, { useState } from "react";

import { useAuth } from "../../hooks/auth";
import { Button, Form, Input, Spin, Alert } from "antd";
import { MailOutlined } from "@ant-design/icons";

const ForgotPassword = () => {
  const { isLoading, forgotPassword } = useAuth();
  const [notice, setNotice] = useState();

  const onFinish = async (values) => {
    try {
      const { success, message } = await forgotPassword(values);
      setNotice({
        success,
        message,
      });
    } catch (error) {
      setNotice({
        success: false,
        message: error.response.data.message,
      });
    }
  };

  return (
    <>
      <div className="page-wrapper full-page">
        <Spin spinning={false}>
          <div className="page-content d-flex justify-content-center">
            <div className="row w-100 mx-0 auth-page">
              <div className="col-md-8 col-xl-6 mx-auto">
                <div className="card">
                  <div className="row">
                    <div className="col-md-12 ps-md-0">
                      <div className="auth-form-wrapper px-4 py-5">
                        <div>
                          <h5 className="text-muted text-center fw-normal mb-4">
                            Forgot your password ?
                          </h5>
                        </div>
                        <Form
                          className="login-form"
                          name="basic"
                          initialValues={{
                            remember: true,
                          }}
                          onFinish={onFinish}
                          autoComplete="off"
                        >
                          <Form.Item>
                            {notice && (
                              <Alert
                                message={notice?.message}
                                type={notice?.success ? "success" : "error"}
                                showIcon
                              />
                            )}
                          </Form.Item>
                          <Form.Item
                            name="email"
                            rules={[
                              {
                                required: true,
                                message: "Please input your email!",
                                type: "email",
                              },
                            ]}
                          >
                            <Input
                              prefix={
                                <MailOutlined className="site-form-item-icon" />
                              }
                              placeholder="Email"
                              autoFocus={true}
                            />
                          </Form.Item>
                          <Form.Item>
                            <Button
                              className="login-form-button"
                              htmlType="submit"
                              loading={isLoading}
                              type="primary"
                            >
                              Send Email
                            </Button>
                          </Form.Item>
                          {/* <Form.Item
                                                    >
                                                        <Link to="/auth/login" >Login</Link>
                                                    </Form.Item> */}
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default ForgotPassword;
