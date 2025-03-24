import { MenuOutlined } from "@ant-design/icons";
import { Drawer, Menu } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import logo from "../../../assets/images/logo-bau.png";
import {
  collapsedMobileState,
  collapsedState,
} from "../../../recoil/atom/booleanState";
import { moduleSelectState } from "../../../recoil/atom/moduleState";

function getItem(label, key, icon) {
  return {
    label,
    key,
    icon,
  };
}
const items = [
  getItem("Thống kê", ""),
  getItem("Quản lý người dùng", "user"),
  getItem("Món ăn", "food"),
  getItem("Dinh dưỡng", "nutri"),
  getItem("Công thức món ăn", "congthuc"),
  getItem("Phân loại", "classify"),
  getItem("Thực đơn", "food_menu"),
  getItem("Khuyến nghị", "recommend"),
  getItem("Tin tức", "news"),
];

const SideBar = () => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useRecoilState(collapsedState);
  const [isShowMobile, setIsShowMobile] = useRecoilState(collapsedMobileState);
  const setModuleSelect = useSetRecoilState(moduleSelectState);

  // handle click menu
  const onClick = (e) => {
    setModuleSelect(e.key);
    setIsShowMobile(false);
    history.push(`/${e.key}`);
    if (e.key === "dashboard") {
      document.title = "Thồng kê";
    }
    if (e.key === "nutri") {
      document.title = "Dinh dưỡng món ăn";
    }
    if (e.key === "congthuc") {
      document.title = "Công thức món ăn";
    }
    if (e.key === "food") {
      document.title = "Món ăn";
    }
    if (e.key === "food_menu") {
      document.title = "Thực đơn";
    }
    if (e.key === "classify") {
      document.title = "Phân loại";
    }
    if (e.key === "recommend") {
      document.title = "Khuyến nghị";
    }
    if (e.key === "news") {
      document.title = "Tin tức";
    }
  };

  return (
    <>
      <div className="menu-group">
        <div style={{ height: 60, borderBottom: "1px solid white" }}>
          {collapsed ? (
            <div
              onClick={() => setCollapsed(!collapsed)}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <MenuOutlined />
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <p style={{ width: 25 }}></p>
              <Link to="/" className="sidebar-brand" style={{ margin: "auto" }}>
                <img style={{ width: 50, alignContent: "center" }} src={logo} />
              </Link>
              <div
                style={{
                  paddingTop: 10,
                }}
              >
                <p
                  style={{
                    width: 25,
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                  onClick={() => setCollapsed(!collapsed)}
                >
                  X
                </p>
              </div>
            </div>
          )}
        </div>
        <Menu
          className="menu"
          mode="inline"
          items={items}
          defaultSelectedKeys="1"
          onClick={onClick}
          inlineCollapsed={collapsed}
          theme="light"
        />
      </div>
      <div className="menu-mobile-drawer">
        <Drawer
          title={
            <>
              <div style={{ display: "flex" }}>
                <p style={{ width: 25 }}></p>
                <Link
                  to="/"
                  className="sidebar-brand"
                  style={{ margin: "auto" }}
                >
                  {/* <img src={logo} style={{ width: 140 }} /> */}
                </Link>
                <div
                  style={{
                    paddingTop: 10,
                  }}
                >
                  <p
                    style={{
                      width: 25,
                      fontSize: 20,
                      cursor: "pointer",
                    }}
                    onClick={() => setIsShowMobile(false)}
                  >
                    X
                  </p>
                </div>
              </div>
            </>
          }
          placement="left"
          closable={false}
          onClose={() => setIsShowMobile(false)}
          visible={isShowMobile}
          getContainer={false}
        >
          <Menu
            className="menu"
            mode="inline"
            items={items}
            defaultSelectedKeys="1"
            onClick={onClick}
            theme="light"
          />
        </Drawer>
      </div>
    </>
  );
};

export default SideBar;
