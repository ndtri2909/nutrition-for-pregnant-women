import { MenuOutlined } from "@ant-design/icons";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { collapsedMobileState } from "../../../recoil/atom/booleanState";
import NavBar from "./NavBar";
import { authState } from "../../../recoil/atom/authState";

const Header = () => {
  const setIsShowMobile = useSetRecoilState(collapsedMobileState);
  const { profile } = useRecoilValue(authState);
  return (
    <>
      <nav className="navbar">
        <div className="toggle-mobile" onClick={() => setIsShowMobile(true)}>
          <MenuOutlined style={{ fontSize: 20, color: "grey" }} />
        </div>
        <div className="navbar-content">
          <a className="nav-link nav-title" style={{ paddingTop: 20 }}>
            Welcome to {profile?.FULLNAME}
          </a>
          <NavBar />
        </div>
      </nav>
    </>
  );
};

export default Header;
