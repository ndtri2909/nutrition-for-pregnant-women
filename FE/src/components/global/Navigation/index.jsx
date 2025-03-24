import { Menu } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const items = [
  {
    label: "Trang chủ",
    key: "home",
  },
  {
    label: "Ngân hàng thực đơn dinh dưỡng",
    key: "nutri",
  },
  {
    label: "Theo dõi sức khỏe của mẹ",
    key: "health",
  },
  {
    label: "Tin tức",
    key: "healthmom",
  },
];

const Navigation = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("home");
  const handldeClick = (e) => {
    if (e.key === "home") {
      navigate("/");
      document.title = "Trang chủ";
    }
    if (e.key === "nutri") {
      navigate("/ngan-hang-thuc-don-dinh-duong");
      document.title = "Ngân hàng thực đơn dinh dưỡng";
    }
    if (e.key === "health") {
      navigate("/theo-doi-suc-khoe-cua-me");
      document.title = "Theo dõi sức khỏe của mẹ";
    }
    if (e.key === "healthmom") {
      navigate("/dinh-duong-va-suc-khoe-cho-me");
      document.title = "Tin tức";
    }
    setCurrent(e.key);
  };

  return (
    <div className="navigation">
      <div className="navigtion-container">
        {items.map((item, index) => (
          <p
            key={index}
            onClick={() => handldeClick(item)}
            className={`${current === item.key && "menu-active"}`}
          >
            {item.label}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
