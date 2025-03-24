import { LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Form, Modal, Row, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useMonAn } from "../../hooks/monAn";
import { monAnOptionState } from "../../recoil/atom/monAnState";

const ModalSettingThucDon = ({
  isOpen,
  handleCancel,
  isLoading,
  onCreate,
  onUpdate,
  data,
  menuSelect,
}) => {
  useMonAn();

  const monAnOption = useRecoilValue(monAnOptionState);

  const [monAnFilterOption, setMonAnFilterOption] = useState([]);
  const [type, setType] = useState(undefined);

  const [form] = useForm();
  const onCancel = () => {
    form.resetFields();
    handleCancel();
  };
  useEffect(() => {
    if (type === 1) {
      setMonAnFilterOption(monAnOption.filter((item) => item.TYPE === 1));
    } else if (type === 2) {
      setMonAnFilterOption(monAnOption.filter((item) => item.TYPE === 2));
    } else if (type === 3) {
      setMonAnFilterOption(monAnOption.filter((item) => item.TYPE === 3));
    } else {
      setMonAnFilterOption(monAnOption);
    }
  }, [type]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onCreate({ ...values, THUCDON_ID: menuSelect }, () => onCancel());
    });
  };
  return (
    <>
      <Modal
        title="Thực đơn"
        visible={isOpen}
        onCancel={onCancel}
        footer={[
          <Button type="second" onClick={onCancel}>
            Cancel
          </Button>,
          <Button type="primary" onClick={handleOk}>
            {" "}
            {isLoading ? <LoadingOutlined /> : "OK"}
          </Button>,
        ]}
      >
        <Form form={form}>
          <Row gutter={10} style={{ width: "100%" }}>
            <Col span={12}>
              <Form.Item label="Buổi">
                <Select
                  onChange={(value, option) => setType(value)}
                  options={[
                    { value: 1, label: "Sáng" },
                    { value: 2, label: "Trưa" },
                    { value: 3, label: "Tối" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Món ăn"
                name="MONAN_ID"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn món ăn",
                  },
                ]}
              >
                <Select options={monAnFilterOption} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalSettingThucDon;
