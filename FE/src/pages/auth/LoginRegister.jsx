import React, { useEffect, useState } from "react";
import Login from "./login";
import Register from "./register";
import banner from "../../assets/images/banner3.png";
import { Image } from "antd";
import "./style.scss";
import Bredcrum from "../../components/global/Bredcrumb";
import { useUsers } from "../../hook/users";

const LoginRegister = () => {
  const [tabsKey, setTasbkey] = useState(1);

  useEffect(() => {
    if (tabsKey === 1) {
      document.title = "Đăng nhập";
    } else if (tabsKey === 2) {
      document.title = "Đăng kí";
    }
  }, [tabsKey]);
  return (
    <div className="main-content">
      <Bredcrum
        title1="Trang chủ"
        title2={tabsKey === 1 ? "Đăng nhập" : "Đăng ký"}
      />
      <div className="grid wide">
        <div className="form-login-register">
          <div className="row">
            <div className="l-6 m-6 c-0">
              <div className="login-register-img">
                {/* <Image src={banner} preview={false} /> */}
              </div>
            </div>
            <div className="l-6 m-6 c-12">
              <div className="login-resiger-form">
                <div className="login-btn-group">
                  <div
                    className={`btn-group-1 ${tabsKey === 1 && "tabs-active"}`}
                    onClick={() => setTasbkey(1)}
                  >
                    Đăng nhập
                  </div>
                  <div
                    className={`btn-group-1 ${tabsKey === 2 && "tabs-active"}`}
                    onClick={() => setTasbkey(2)}
                  >
                    Đăng ký
                  </div>
                </div>
                {tabsKey === 1 && <Login title="Đăng nhập" />}
                {tabsKey === 2 && <Register title="Đăng ký" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
