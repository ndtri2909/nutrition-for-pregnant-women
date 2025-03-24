import { Drawer } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const MenuDrawer = ({ open, setOpen }) => {
  return (
    <Drawer
      placement="top"
      closable={false}
      onClose={() => setOpen(false)}
      open={open}
      visible={open}
    >
      <div
        style={{
          marginTop: 25,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p className="item-drawer" onClick={() => setOpen(false)}>
          <NavLink className="nav-link" to="/" exact={true}>
            <span>Trang chủ</span>
          </NavLink>
        </p>
        <p className="item-drawer " onClick={() => setOpen(false)}>
          <NavLink className="nav-link" to="/ngan-hang-thuc-don-dinh-duong">
            <span>Ngân hàng thực đơn dinh dưỡng</span>
          </NavLink>
        </p>
        <p className="item-drawer " onClick={() => setOpen(false)}>
          <NavLink className="nav-link" to="/theo-doi-suc-khoe-cua-me">
            <span>Theo dõi sức khỏe của mẹ</span>
          </NavLink>
        </p>
        <p className="item-drawer " onClick={() => setOpen(false)}>
          <NavLink className="nav-link" to="/dinh-duong-va-suc-khoe-cho-me">
            <span>Tin tức</span>
          </NavLink>
        </p>
      </div>
    </Drawer>
  );
};

export default MenuDrawer;
