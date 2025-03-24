import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row } from "antd";
import React, { useState } from "react";
import ListThucDon from "../../components/thucDon/ListThucDon";
import { useThucdon } from "../../hooks/thucDon";
import ModalThucDon from "../../components/thucDon/ModalThucDon";
import ModalSettingThucDon from "../../components/thucDon/ModalSettingThucDon";

const FoodMenu = () => {
  const {
    Thucdons,
    createThucdon,
    updateThucdon,
    deleteThucdon,
    settingThucdon,
    deleteSettingThucdon,
    isLoading,
  } = useThucdon();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [menuSelect, setMenuSelect] = useState(undefined);
  const [dataSelect, setDataSelect] = useState(undefined);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleOpenSetting = (id) => {
    setIsOpenSetting(true);
    setMenuSelect(id);
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
            <Card title={"Thực đơn"}>
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
              <ListThucDon
                data={Thucdons}
                isLoading={isLoading}
                openEdit={openEdit}
                onDelete={deleteThucdon}
                handleOpenSetting={handleOpenSetting}
                deleteSettingThucdon={deleteSettingThucdon}
              />
            </Card>
          </Col>
        </Row>
        <ModalThucDon
          isOpen={isOpen}
          handleCancel={() => {
            setIsOpen(false);
            setDataSelect(undefined);
          }}
          isLoading={isLoading}
          onCreate={createThucdon}
          onUpdate={updateThucdon}
          data={dataSelect}
        />
        <ModalSettingThucDon
          isOpen={isOpenSetting}
          handleCancel={() => {
            setIsOpenSetting(false);
            setMenuSelect(undefined);
          }}
          menuSelect={menuSelect}
          onCreate={settingThucdon}
        />
      </div>
    </>
  );
};

export default FoodMenu;
