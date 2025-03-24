import { Button, Card, Col, Input, Row } from "antd";
import React, { useState } from "react";
import { useSearch } from "react-use-search";
import { removeAccents } from "../../common";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useTinTuc } from "../../hooks/tinTuc";
import ListTinTuc from "../../components/TinTuc/ListTinTuc";
import ModalTinTuc from "../../components/TinTuc/ModalTinTuc";
const predicate = (data, query) => {
  const newQuery = removeAccents(String(query)).toLowerCase().trim();
  const NAME = data?.TIEUDE
    ? removeAccents(String(data?.TIEUDE)).toLowerCase().trim()
    : "";

  return NAME.includes(newQuery);
};
const News = () => {
  const { TinTucs, createTinTuc, updateTinTuc, deleteTinTuc, isLoading } =
    useTinTuc();
  const [isOpen, setIsOpen] = useState(false);
  const [dataSelect, setDataSelect] = useState(undefined);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const openEdit = (data) => {
    setDataSelect(data);
    setIsOpen(true);
  };
  const [filtereTinTuc, query, handleChange, setQuery] = useSearch(
    TinTucs,
    predicate,
    { debounce: 200 }
  );
  return (
    <div className="page-content">
      <Row>
        <Col span={24}>
          <Card title={"Tin tức"}>
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
            <ListTinTuc
              data={query ? filtereTinTuc : TinTucs}
              isLoading={isLoading}
              openEdit={openEdit}
              onDelete={deleteTinTuc}
            />
          </Card>
        </Col>
      </Row>
      <ModalTinTuc
        isOpen={isOpen}
        handleCancel={() => {
          setIsOpen(false);
          setDataSelect(undefined);
        }}
        isLoading={isLoading}
        onCreate={createTinTuc}
        onUpdate={updateTinTuc}
        data={dataSelect}
      />
    </div>
  );
};

export default News;
