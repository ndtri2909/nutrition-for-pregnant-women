import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row } from "antd";
import React, { useState } from "react";
import { useDinhDuong } from "../../hooks/dinhDuong";
import { removeAccents } from "../../common";
import { useSearch } from "react-use-search";
import ListDinhDuong from "../../components/dinhDuong/ListDinhDuong";
import { useMonAn } from "../../hooks/monAn";
import ModalDinhDuong from "../../components/dinhDuong/ModalDinhDuong";
import { useCongThuc } from "../../hooks/congThuc";
import ListCongThuc from "../../components/congThuc/ListCongThuc";
import ModalCongThuc from "../../components/congThuc/ModalCongThuc";
const predicate = (data, query) => {
  const newQuery = removeAccents(String(query)).toLowerCase().trim();
  const NAME = data?.TEN
    ? removeAccents(String(data?.TEN)).toLowerCase().trim()
    : "";

  return NAME.includes(newQuery);
};
const CongThuc = () => {
  const { createCongThuc, updateCongThuc, deleteCongThuc, isLoading } =
    useCongThuc();
  const { MonAns, getAllMonAns } = useMonAn();
  const [isOpen, setIsOpen] = useState(false);
  const [dataSelect, setDataSelect] = useState(undefined);
  const [monAnSelect, setMonAnSelect] = useState(undefined);
  const handleOpenModal = (id) => {
    setIsOpen(true);
    setMonAnSelect(id);
  };

  const openEdit = (data) => {
    setDataSelect(data);
    setIsOpen(true);
  };
  const handleDelete = (id) => {
    deleteCongThuc(id, () => getAllMonAns());
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
          <Card title={"Công thức"}>
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
            </Row>
            <ListCongThuc
              data={query ? filterePhanLoai : MonAns}
              isLoading={isLoading}
              openEdit={openEdit}
              onDelete={handleDelete}
              handleOpenModal={handleOpenModal}
            />
          </Card>
        </Col>
      </Row>
      <ModalCongThuc
        isOpen={isOpen}
        handleCancel={() => {
          setIsOpen(false);
          setDataSelect(undefined);
          setMonAnSelect(undefined);
        }}
        isLoading={isLoading}
        onCreate={createCongThuc}
        onUpdate={updateCongThuc}
        data={dataSelect}
        monAnSelect={monAnSelect}
        getAllMonAns={getAllMonAns}
      />
    </div>
  );
};

export default CongThuc;
