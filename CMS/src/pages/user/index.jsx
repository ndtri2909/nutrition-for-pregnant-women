import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row } from "antd";
import React, { useState } from "react";
import { useUser } from "../../hooks/user";
import { removeAccents } from "../../common";
import { useSearch } from "react-use-search";
import ListUser from "../../components/user/ListUser";
import ModalUser from "../../components/user/ModalUser";
const predicate = (data, query) => {
  const newQuery = removeAccents(String(query)).toLowerCase().trim();
  const NAME = data?.FULLNAME
    ? removeAccents(String(data?.FULLNAME)).toLowerCase().trim()
    : "";

  return NAME.includes(newQuery);
};
const User = () => {
  const { users, createUser, updateUser, isLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [dataSelect, setDataSelect] = useState(undefined);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const openEdit = (data) => {
    setDataSelect(data);
    setIsOpen(true);
  };

  const [filterePhanLoai, query, handleChange, setQuery] = useSearch(
    users,
    predicate,
    { debounce: 200 }
  );
  return (
    <div className="page-content">
      <Row>
        <Col span={24}>
          <Card title={"Quản lý người dùng"}>
            <Row justify="space-between">
              <Col>
                <Input
                  allowClear
                  value={query}
                  onChange={handleChange}
                  placeholder={"Tìm kiếm"}
                  prefix={<SearchOutlined />}
                />
              </Col>
              <Col>
                {" "}
                <Button
                  size="small"
                  onClick={handleOpenModal}
                  title="Create"
                  type="primary"
                  style={{
                    display: "block",
                  }}
                  icon={<PlusOutlined />}
                />
              </Col>
            </Row>
            <ListUser
              data={query ? filterePhanLoai : users}
              isLoading={isLoading}
              openEdit={openEdit}
            />
          </Card>
        </Col>
      </Row>
      <ModalUser
        isOpen={isOpen}
        handleCancel={() => {
          setIsOpen(false);
          setDataSelect(undefined);
        }}
        isLoading={isLoading}
        onCreate={createUser}
        onUpdate={updateUser}
        data={dataSelect}
      />
    </div>
  );
};

export default User;
