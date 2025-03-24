import React, { useState } from "react";
import HeadBar from "../../components/global/HeadBar";
import { Button, Card, Col, Input, Row, Table } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import ListMonAn from "../../components/monAn/ListMonAn";
import { useMonAn } from "../../hooks/monAn";
import { removeAccents } from "../../common";
import { useSearch } from "react-use-search";
import ModalMonAn from "../../components/monAn/ModalMonAn";
const predicate = (data, query) => {
  const newQuery = removeAccents(String(query)).toLowerCase().trim();
  const NAME = data?.TEN
    ? removeAccents(String(data?.TEN)).toLowerCase().trim()
    : "";

  return NAME.includes(newQuery);
};
const Foods = () => {
  const {
    MonAns,
    isLoading,
    createMonAn,
    updateMonAn,
    updateFileMonAn,
    deleteMonAn,
  } = useMonAn();

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
    MonAns,
    predicate,
    { debounce: 200 }
  );
  return (
    <div className="page-content">
      <Row>
        <Col span={24}>
          <Card title={"Món ăn"}>
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
            <ListMonAn
              data={query ? filterePhanLoai : MonAns}
              isLoading={isLoading}
              openEdit={openEdit}
              onDelete={deleteMonAn}
            />
          </Card>
        </Col>
      </Row>
      <ModalMonAn
        isOpen={isOpen}
        handleCancel={() => {
          setIsOpen(false);
          setDataSelect(undefined);
        }}
        isLoading={isLoading}
        onCreate={createMonAn}
        onUpdate={updateMonAn}
        updateFileMonAn={updateFileMonAn}
        data={dataSelect}
      />
    </div>
  );
};

export default Foods;
