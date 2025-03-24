import React from "react";
import { useAuth } from "../../hooks/auth";
import { Button, Form, Input, Spin } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const Login = () => {
  const { loginDirect, isLoading } = useAuth();

  const onFinish = async (values) => {
    await loginDirect(values);
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
                        <h5 className="text-muted text-center fw-normal mb-4">
                          Welcome back! Log in to your account.
                        </h5>
                        <Form
                          className="login-form"
                          name="basic"
                          initialValues={{
                            remember: true,
                          }}
                          onFinish={onFinish}
                          autoComplete="off"
                        >
                          {process.env?.REACT_APP_SSO_SERVICE ? (
                            ""
                          ) : (
                            <>
                              <Form.Item
                                name="PHONE"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your phone!",
                                  },
                                ]}
                              >
                                <Input
                                  prefix={
                                    <UserOutlined className="site-form-item-icon" />
                                  }
                                  placeholder="phone"
                                  autoFocus={true}
                                />
                              </Form.Item>

                              <Form.Item
                                name={"PASSWORD"}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your password!",
                                  },
                                ]}
                              >
                                <Input.Password
                                  prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                  }
                                  type="password"
                                  placeholder="Password"
                                />
                              </Form.Item>
                            </>
                          )}

                          <Form.Item>
                            <Button
                              className="login-form-button"
                              htmlType="submit"
                              loading={isLoading}
                              type="primary"
                            >
                              Login
                            </Button>
                          </Form.Item>
                          {/* <Form.Item>
                            <Link to="/auth/forgot-password">
                              Forgotten password?
                            </Link>
                          </Form.Item>
                          <Form.Item>
                            <GoogleLogin
                              clientId="856481487114-a5l7ot4ooenqavjt40mtk8enfafs6bmi.apps.googleusercontent.com"
                              buttonText="Login with Google"
                              onSuccess={responseGoogle}
                              // onFailure={responseGoogle}
                              cookiePolicy={"single_host_origin"}
                              className={"button_gg"}
                            />
                          </Form.Item>
                          <Form.Item>
                            <FacebookLogin
                              appId="910390727019920"
                              autoLoad={false}
                              fields="name,email,picture"
                              callback={responseFacebook}
                            />
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

export default Login;
