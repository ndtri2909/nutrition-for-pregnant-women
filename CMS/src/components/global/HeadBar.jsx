import { PlusOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Tooltip } from "antd";

const HeadBar = ({ openAdd, query, onSearch, onReloadData }) => {
  return (
    <div>
      <Space
        align="center"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Input
          allowClear
          value={query}
          onChange={onSearch}
          placeholder="Tìm kiếm nhanh..."
          prefix={<SearchOutlined />}
        />
        <Space>
          <Tooltip title="Tải lại dữ liệu">
            <Button
              htmlType="button"
              type="primary"
              className="btn-reload"
              icon={<RedoOutlined />}
              onClick={() => onReloadData()}
            />
          </Tooltip>

          <Tooltip title="Tạo mới">
            <Button
              onClick={openAdd}
              title="Create"
              type="primary"
              style={{
                display: "block",
              }}
              icon={<PlusOutlined />}
            />
          </Tooltip>
        </Space>
      </Space>
    </div>
  );
};

export default HeadBar;
