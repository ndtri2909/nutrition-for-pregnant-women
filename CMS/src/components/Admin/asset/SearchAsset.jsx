import {
  RedoOutlined,
  SearchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import React, { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { removeAccents } from "../../../common";
import { useAssets } from "../../../hooks/useAsset";
import { useAssetCats } from "../../../hooks/useAssetCats";
import { useAssetStatus } from "../../../hooks/assetStatus";
import { Button, Col, Form, Input, Row, Select } from "antd";
import {
  assetCatOptionState,
  assetStatusOptionState,
} from "../../../recoil/atom/assetState";

const SearchAsset = ({ setFormData, loading, isShow, searchCustomer }) => {
  const [form] = Form.useForm();
  const { getAllAssets } = useAssets();

  const { getAllAssetStatuses, isLoading: loadStatus } = useAssetStatus();
  const assetStatusOption = useRecoilValue(assetStatusOptionState);
  const handleGetAssetStatus = async () => {
    if (assetStatusOption?.length === 0) {
      await getAllAssetStatuses();
    }
  };

  // asset category
  const { getAllAssetCategorys, isLoading: loadAssetCat } = useAssetCats();
  const assetCatOption = useRecoilValue(assetCatOptionState);
  const handleGetAssetCat = async () => {
    if (assetCatOption?.length === 0) {
      await getAllAssetCategorys();
    }
  };

  const onFinish = (values) => {
    setFormData({
      ...values,
      NAME: values?.NAME?.length ? values?.NAME : undefined,
      CD: values?.CD?.length ? values?.CD : undefined,
    });
  };

  return (
    <div style={{ marginBottom: 8 }}>
      <Form
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        className="header_search"
        labelAlign="left"
        layout="vertical"
        ref={searchCustomer}
      >
        <Row gutter={[10, 10]} style={{ marginBottom: 10 }}>
          <Col xs={24} sm={12} lg={6}>
            <Form.Item label="Mã" name="CD">
              <Input allowClear />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Form.Item label="Tên tài sản" name="NAME">
              <Input allowClear />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Form.Item label="Nhóm tài sản" name="ASSET_CAT_ID">
              <Select
                showSearch
                allowClear
                options={assetCatOption}
                filterOption={(input, option) =>
                  removeAccents(option?.label ?? "")
                    .toLowerCase()
                    .includes(removeAccents(input.toLowerCase()))
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "").localeCompare(
                    (optionB?.label ?? "").toLowerCase()
                  )
                }
                onFocus={() => handleGetAssetCat()}
                loading={loadAssetCat}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Form.Item label="Tình trạng" name="STATUS_ID">
              <Select
                showSearch
                allowClear
                options={assetStatusOption}
                filterOption={(input, option) =>
                  removeAccents(option?.label ?? "")
                    .toLowerCase()
                    .includes(removeAccents(input.toLowerCase()))
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "").localeCompare(
                    (optionB?.label ?? "").toLowerCase()
                  )
                }
                onFocus={() => handleGetAssetStatus()}
                loading={loadStatus}
              />
            </Form.Item>
          </Col>
          {/* <Col xs={24} sm={12} lg={6}>
            <Form.Item label="Người giữ" name="EMPLOYE_ID">
              <Select
                showSearch
                allowClear
                options={newEmployees}
                filterOption={(input, option) =>
                  removeAccents(option?.label ?? "")
                    .toLowerCase()
                    .includes(removeAccents(input.toLowerCase()))
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "").localeCompare(
                    (optionB?.label ?? "").toLowerCase()
                  )
                }
                loading={isLoading}
                onFocus={() => handleGetEmployee()}
              />
            </Form.Item>
          </Col> */}
        </Row>
        {!isShow && (
          <Row gutter={[10]} style={{ marginTop: 12 }}>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                icon={loading ? <LoadingOutlined /> : <SearchOutlined />}
                className="btn btn-info"
              >
                Tìm kiếm
              </Button>
            </Col>
            <Col>
              <Button
                htmlType="button"
                onClick={() => {
                  form.resetFields();
                  setFormData(undefined);
                  getAllAssets();
                }}
                type="primary"
                icon={<RedoOutlined />}
                className="btn btn-info"
              >
                Làm mới
              </Button>
            </Col>
          </Row>
        )}
      </Form>
    </div>
  );
};
export default SearchAsset;
