import { Col, Row } from "antd";
import React from "react";
import "./style.scss";

const CardContent = () => {
  return (
    <div className="card-content">
      <Row gutter={[20]}>
        <Col span={12}>Content</Col>
        <Col span={12}>Image</Col>
      </Row>
    </div>
  );
};

export default CardContent;
