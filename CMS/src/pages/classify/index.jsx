import { Button, Card, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import ListClassify from "../../components/classify/ListClassify";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { usePhanLoai } from "../../hooks/phanLoai";
import ModalClassify from "../../components/classify/ModalClassify";
import { removeAccents } from "../../common";
import { useSearch } from "react-use-search";
const predicate = (data, query) => {
  const newQuery = removeAccents(String(query)).toLowerCase().trim();
  const NAME = data?.TEN
    ? removeAccents(String(data?.TEN)).toLowerCase().trim()
    : "";

  return NAME.includes(newQuery);
};
const Classify = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataSelect, setDataSelect] = useState(undefined);
  const {
    createPhanLoai,
    updatePhanLoai,
    deletePhanLoai,
    PhanLoais,
    isLoading,
  } = usePhanLoai();

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const openEdit = (data) => {
    setDataSelect(data);
    setIsOpen(true);
  };

  const [filterePhanLoai, query, handleChange, setQuery] = useSearch(
    PhanLoais,
    predicate,
    { debounce: 200 }
  );
  return (
    <>
      <div className="page-content">
        <Row>
          <Col span={24}>
            <Card title={"Phân loại"}>
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
              <ListClassify
                data={query ? filterePhanLoai : PhanLoais}
                isLoading={isLoading}
                openEdit={openEdit}
                onDelete={deletePhanLoai}
              />
            </Card>
          </Col>
        </Row>
        <ModalClassify
          isOpen={isOpen}
          handleCancel={() => {
            setIsOpen(false);
            setDataSelect(undefined);
          }}
          isLoading={isLoading}
          onCreate={createPhanLoai}
          onUpdate={updatePhanLoai}
          data={dataSelect}
        />
      </div>
    </>
  );
};

export default Classify;
