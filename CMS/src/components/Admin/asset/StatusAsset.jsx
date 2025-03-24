import React from "react";
import moment from "moment";
import Card from "../../global/Card";
import { checkStatus } from "../../../common";
import { Col, Divider, Empty, Row } from "antd";
import {
  FieldNumberOutlined,
  FieldTimeOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const StatusAsset = ({ statuss }) => {
  return (
    <Card>
      <Row>
        <Col span={22}>
          <h5>Lịch sử trạng thái</h5>
        </Col>
      </Row>
      <Divider style={{ marginTop: 2, marginBottom: 10 }} />
      <Row>
        {statuss?.length ? (
          statuss?.map((item, index) => (
            <div key={index} style={{ width: "100%" }}>
              <Col span={24}>
                <Row>
                  <Col span={24}>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <FieldTimeOutlined /> &ensp;
                      <b>
                        {moment(item?.CREATED_DATE).format(
                          "DD/MM/YYYY, h:mm:ss a"
                        )}
                      </b>
                    </span>
                  </Col>
                  <Col span={12}>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <FieldNumberOutlined />
                      &ensp; <b>{item?.COUNT}</b>
                    </span>
                  </Col>
                  <Col span={12}>
                    <span>
                      <b
                        style={{
                          color: `${checkStatus(item?.Asset_Status?.CD)}`,
                        }}
                      >
                        {item?.Asset_Status?.NAME}
                      </b>
                    </span>
                  </Col>
                  <Col span={12}>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <UnorderedListOutlined />
                      &ensp; <b>{item?.NOTE}</b>
                    </span>
                  </Col>
                </Row>
              </Col>

              <Divider style={{ marginTop: 10, marginBottom: 10 }} />
            </div>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Empty description={<span>Hiện chưa có trạng thái nào.</span>} />
          </div>
        )}
      </Row>
    </Card>
  );
};

export default StatusAsset;
