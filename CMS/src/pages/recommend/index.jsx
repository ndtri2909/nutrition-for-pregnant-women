import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row } from "antd";
import React, { useState } from "react";
import ListKetLuanKhuyenNghi from "../../components/ketLuanKhuyenNghi/ListKetLuanKhuyenNghi";
import { useKetLuanKhuyenNghi } from "../../hooks/ketLuanKhuyenNghi";
import ModalKetLuanKhuyenNghi from "../../components/ketLuanKhuyenNghi/ModalKetLuanKhuyenNghi";

const Recommend = () => {
  const {
    KetLuanKhuyenNghis,
    createKetLuanKhuyenNghi,
    updateKetLuanKhuyenNghi,
    deleteKetLuanKhuyenNghi,
    isLoading,
  } = useKetLuanKhuyenNghi();
  const [isOpen, setIsOpen] = useState(false);
  const [dataSelect, setDataSelect] = useState(undefined);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const openEdit = (data) => {
    setDataSelect(data);
    setIsOpen(true);
  };
  return (
    <>
      <div className="page-content">
        <Row>
          <Col span={24}>
            <Card title={"Kết luận khuyến nghị"}>
              <Row justify="end">
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
              <ListKetLuanKhuyenNghi
                data={KetLuanKhuyenNghis}
                isLoading={isLoading}
                openEdit={openEdit}
                onDelete={deleteKetLuanKhuyenNghi}
              />
            </Card>
          </Col>
        </Row>
        <ModalKetLuanKhuyenNghi
          isOpen={isOpen}
          handleCancel={() => {
            setIsOpen(false);
            setDataSelect(undefined);
          }}
          isLoading={isLoading}
          onCreate={createKetLuanKhuyenNghi}
          onUpdate={updateKetLuanKhuyenNghi}
          data={dataSelect}
        />
      </div>
    </>
  );
};

export default Recommend;
