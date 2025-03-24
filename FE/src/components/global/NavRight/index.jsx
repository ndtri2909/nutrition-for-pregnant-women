import { Dropdown, Image, Popover } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import login from "../../../assets/images/icon_login.png";
import register1 from "../../../assets/images/icon_register.png";
import { useUsers } from "../../../hook/users";
import Login from "../../../pages/auth/login";
import { profileState } from "../../../recoil/atom/userState";

const NavRight = () => {
  const { logout } = useUsers();
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem("profile"));
  const setProfile = useSetRecoilState(profileState);
  useEffect(() => {
    if (profile) {
      setProfile(profile);
    }
  }, []);

  const content = (
    <div style={{ width: 400 }}>
      <Login title="Đăng nhập" />
    </div>
  );
  const contentLogout = (
    <div style={{ width: 300 }} aria-labelledby="profileDropdown">
      <ul>
        <li>
          <a
            onClick={() => navigate("/thong-tin-tai-khoan")}
            style={{ display: "flex" }}
          >
            <i className="me-2 icon-md" data-feather="log-out" />
            <span>Thông tin tài khoản</span>
          </a>
        </li>
        <li>
          <a onClick={logout} style={{ display: "flex" }}>
            <i data-feather="log-out" />
            <span>Đăng xuất</span>
          </a>
        </li>
      </ul>
    </div>
    // <div style={{ width: 400 }}>
    //   <p
    //     onClick={() => {
    //       navigate("/thong-tin-tai-khoan");
    //     }}
    //   >
    //     Thông tin tài khoản
    //   </p>
    //   <p onClick={logout}>Đăng xuất</p>
    // </div>
  );
  const items = [
    {
      key: "1",
      label: (
        <a
          rel="noopener noreferrer"
          onClick={() => navigate("/thong-tin-tai-khoan")}
        >
          Thông tin tài khoản
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a rel="noopener noreferrer" onClick={logout}>
          Đăng xuất
        </a>
      ),
    },
  ];
  const handleClick = (type) => {
    if (type === 1) {
      document.title = "Đăng nhập";
      navigate("/form");
    } else if (type === 2) {
      document.title = "Đăng kí";
      navigate("/form");
    }
  };

  return (
    <>
      {profile ? (
        <Dropdown menu={{ items }}>
          <a style={{ textDecoration: "none", color: "#e65821" }}>
            {profile?.FULLNAME}
          </a>
        </Dropdown>
      ) : (
        <div className="user-group">
          <Popover content={content}>
            <div className="login-register" onClick={() => handleClick(1)}>
              <Image src={login} preview={false} width={20} />
              <div className="text-login">
                <span>Đăng nhập</span>
              </div>
            </div>
          </Popover>
          <div className="login-register" onClick={() => handleClick(2)}>
            <Image src={register1} preview={false} width={20} />
            <div className="text-login">
              <span>Đăng ký</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavRight;
