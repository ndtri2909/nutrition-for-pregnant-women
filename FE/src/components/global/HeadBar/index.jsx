import { Button, Input } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";

const HeadBar = ({ isHide, onOpen, onChange, query }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
      }}
    >
      <div>
        <Input placeholder="Tim kiếm nhanh" query={query} onChange={onChange} />
      </div>
      {!isHide && (
        <Button type="primary" onClick={onOpen} size="small">
          <PlusOutlined />
        </Button>
      )}
    </div>
  );
};

export default HeadBar;
