import {
  CaretDownOutlined,
  FunnelPlotOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Space } from "antd";
import React from "react";

const Card = ({
  title = "",
  children,
  isShow,
  showSearch,
  isSearch,
  setOpenDrawer,
}) => {
  return (
    <div className="card">
      <div className="card-body">
        {title && (
          <Space
            style={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <h6 className="card-title" style={{ marginBottom: 0 }}>
              {title}{" "}
            </h6>
            {isShow && (
              <>
                <span
                  onClick={showSearch}
                  style={{ cursor: "pointer", marginLeft: 10 }}
                  className="lists-pc"
                >
                  <CaretDownOutlined rotate={isSearch ? 180 : 0} />
                </span>
              </>
            )}
            <span
              className="lists-mobile"
              style={{ marginTop: -4, marginLeft: 5 }}
            >
              <FunnelPlotOutlined
                onClick={() => setOpenDrawer(true)}
                style={{ fontSize: 18 }}
              />
              {/* <SearchOutlined
                onClick={() => setOpenDrawer(true)}
                style={{ fontSize: 18 }}
              /> */}
            </span>
          </Space>
        )}

        {children}
      </div>
    </div>
  );
};

export default Card;
