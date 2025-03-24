import React from "react";
import { Image } from "antd";
import logo from "../../../assets/images/DINHDUONG.png";
import fb from "../../../assets/images/facebook.png";
import yt from "../../../assets/images/youtube.png";
import zl from "../../../assets/images/zalo.png";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

import "./style.scss";

const Footer = () => {
  return (
    <>
      <div className="footer-wrapper">
        <div className="grid wide ">
          <div className="row">
            <div className="l-6 m-12 c-12 mb-10">
              <div className="footer-logo">
                {/* <Image src={logo} width={220} height={80} preview={false} /> */}
              </div>
            </div>
            <div className="l-6 m-12 c-12">
              <h3 className="text-center">
                Vui lòng liên hệ để được hướng dẫn khi cần
              </h3>
              <div className="row" style={{ padding: 10 }}>
                <div className="l-6 m-6 c-12">
                  <p>
                    <PhoneOutlined
                      style={{
                        fontSize: 22,
                        color: "#e3282c",
                        marginRight: 8,
                      }}
                    />{" "}
                    <span style={{ fontSize: 18 }}>0123 456 789</span>{" "}
                  </p>
                </div>
                <div className="l-6 m-6 c-12">
                  <p>
                    <MailOutlined
                      style={{ fontSize: 22, color: "#e3282c", marginRight: 8 }}
                    />
                    <span style={{ fontSize: 18 }}>ndtri@gmail.com</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-info">
        <div className="grid wide ">
          <div className="footer-contact">
            <p>Liên hệ</p>
            <div className="footer-icon">
              <Image src={fb} preview={false} className="footer-icon-img" />
              <Image src={yt} preview={false} className="footer-icon-img" />
              <Image src={zl} preview={false} className="footer-icon-img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
