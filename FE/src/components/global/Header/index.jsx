import { Image } from "antd";
import NavRight from "../NavRight";
import MenuDrawer from "./MenuDrawer";
import Navigation from "../Navigation";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import logo from "../../../assets/images/logo-bau.png";

import "./style.scss";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="header-wrapper">
        <div className="header-container">
          <div className="btn-menu-mobile">
            <div className="btn-menu" onClick={() => setOpen(!open)}>
              <MenuOutlined />
            </div>
          </div>

          <div
            className="header-img"
            onClick={() => {
              navigate("/");
            }}
          >
            <Image src={logo} alt="" preview={false} width={80} />
          </div>

          <div className="menu-pc">
            <Navigation />
          </div>
          <NavRight />
        </div>
      </div>
      <MenuDrawer open={open} setOpen={setOpen} />
    </>
  );
};

export default Header;
