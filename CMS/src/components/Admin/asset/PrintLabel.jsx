import React, { memo, useState } from "react";
import { Button, Col, Modal, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const PrintLabel = ({ title, isOpen, onCancel, dataExport }) => {
  const [isDownload, setIsDownLoad] = useState(false);
  const handlePdf = async () => {
    await onCancel();
    setIsDownLoad(false);
  };
  return (
    <div>
      <Modal
        title={`${title} tài sản`}
        visible={isOpen}
        onCancel={onCancel}
        style={{ top: 20 }}
        footer={[
          <Button form="myForm" type="second" onClick={onCancel}>
            Hủy bỏ
          </Button>,
          <Button
            form="basic"
            key="basic"
            htmlType="submit"
            type="primary"
            onClick={() => {
              handlePdf();
              setIsDownLoad(true);
            }}
            style={{ minWidth: 80 }}
          >
            {isDownload ? <LoadingOutlined /> : title}
          </Button>,
        ]}
        width={840}
        className="modal-customer modal-mobile"
      >
        <div className="list-label">
          {dataExport?.length
            ? dataExport?.map((item, index) => (
                <div key={index} className="card-label">
                  <Row gutter={[3]}>
                    <Col span={16}>
                      <Row>
                        <Col span={24}>
                          <b>{item.NAME}</b>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>{item.CD}</Col>
                      </Row>
                      <Row>
                        <Col span={24}>{item.Asset_Category?.NAME}</Col>
                      </Row>
                      {/* <Row>
                        <Col span={24}>Nhà cung cấp</Col>
                      </Row> */}
                    </Col>
                  </Row>
                </div>
              ))
            : ""}
        </div>
      </Modal>
    </div>
  );
};

export default memo(PrintLabel);
