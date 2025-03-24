import { Button, Input, Select } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import "./style.scss";

const HeadBarProduct = ({
  onOpen,
  onChange,
  query,
  categoryOption,
  setFilterCategory,
}) => {
  return (
    <>
      <div className="headerbar-container">
        <div className="headbar-search">
          <div className="select-pc">
            <Select
              options={categoryOption}
              allowClear
              showSearch
              placeholder="Danh mục sản phẩm"
              style={{ width: 250 }}
              onSelect={(value) => setFilterCategory(value)}
              onClear={() => setFilterCategory(undefined)}
            />
          </div>
          <Input
            placeholder="Tim kiếm nhanh"
            query={query}
            onChange={onChange}
            className="headbar-input"
          />
        </div>
        <div className="hearbar-category">
          <div className="select-mobile">
            <Select
              options={categoryOption}
              allowClear
              showSearch
              placeholder="Danh mục sản phẩm"
              style={{ width: 250 }}
              onSelect={(value) => setFilterCategory(value)}
              onClear={() => setFilterCategory(undefined)}
            />
          </div>
          <Button type="primary" onClick={onOpen} size="small">
            <PlusOutlined />
          </Button>
        </div>
      </div>
    </>
  );
};

export default HeadBarProduct;
