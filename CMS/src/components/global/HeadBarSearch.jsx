import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import SearchCustomer from "../Admin/customer/SearchCustomer";

const HeadBarSearch = ({ openAdd, query, onSearch, isDisplayBtn = true }) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <SearchCustomer />
    </div>
  );
};

export default HeadBarSearch;
