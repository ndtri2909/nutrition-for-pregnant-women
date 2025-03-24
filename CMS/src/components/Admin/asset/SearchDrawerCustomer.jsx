import React, { useRef } from "react";
import { Button, Drawer } from "antd";
import { useRecoilState } from "recoil";
import { searchDrawerState } from "../../../recoil/atom/booleanState";
import {
  RedoOutlined,
  CloseOutlined,
  SearchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import SearchAsset from "./SearchAsset";

const SearchDrawerAsset = ({ isLoading, setFormData, loading }) => {
  const [openDrawer, setOpenDrawer] = useRecoilState(searchDrawerState);
  const searchCustomer = useRef();

  const handleSearch = () => {
    const values = {
      ...searchCustomer.current.getFieldsValue(),
    };
    setFormData(values);
    setOpenDrawer(false);
  };

  const handleCancel = () => {
    searchCustomer.current.resetFields();
    setFormData(undefined);
    setOpenDrawer(false);
  };
  return (
    <Drawer
      title="Tìm kiếm tài sản"
      placement="right"
      onClose={() => setOpenDrawer(false)}
      visible={openDrawer}
      closable={false}
      footer={
        <>
          <Button
            className="btn btn-info"
            onClick={handleSearch}
            key="submit"
            htmlType="submit"
          >
            {isLoading ? <LoadingOutlined /> : <SearchOutlined />}
          </Button>
          <Button
            htmlType="button"
            onClick={handleCancel}
            className="btn btn-info"
          >
            <RedoOutlined />
          </Button>
          <Button
            onClick={() => setOpenDrawer(false)}
            className="btn btn-danger"
          >
            <CloseOutlined />
          </Button>
        </>
      }
      className="search-drawer"
    >
      <SearchAsset
        setFormData={setFormData}
        loading={isLoading}
        isShow={true}
        searchCustomer={searchCustomer}
      />
    </Drawer>
  );
};

export default SearchDrawerAsset;
