import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import { removeAccents, validateMessages } from "../../../common";
import { memo, useMemo, useRef } from "react";
import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import ModalAssetCategory from "./ModalAssetCategory";
import { useAssetCats } from "../../../hooks/useAssetCats";
import { useRecoilValue } from "recoil";
import { assetCatOptionState } from "../../../recoil/atom/assetState";
import moment from "moment";

const selectOptions = (array) => {
  const list = [];
  for (let item of array) {
    list.push({
      ...item,
      value: item.id,
      label: item.EXPENSE_CD,
    });
  }
  return list;
};

const MutationAsset = ({
  asset,
  title,
  assets,
  isOpen,
  onCancel,
  loading,
  isDisplayBtn,
  onCreateAsset,
  onUpdateAsset,
}) => {
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [newTime, setNewTime] = useState(undefined);

  // asset category
  const {
    assetCats,
    getAllAssetCategorys,
    isLoading: loadAssetCat,
  } = useAssetCats();
  const assetCatOption = useRecoilValue(assetCatOptionState);
  const handleGetAssetCat = async () => {
    if (assetCats?.length === 0) {
      await getAllAssetCategorys();
    }
  };

  useEffect(() => {
    if (asset && isOpen) {
      handleGetAssetCat();
    }

    if (isOpen) {
      inputRef.current.focus();
      setNewTime(moment(new Date()).format("DDMMYYYYhmmss"));
    }
  }, [isOpen, asset]);

  // modified expense list
  const newListExpense = useMemo(() => {
    const expenseOption = [];
    const assetExpenseCD = assets?.map((item) => item.EXPENSE_ID);
    const newData = expenseOption?.filter(
      (elem) => !assetExpenseCD?.find((item) => elem?.id === item)
    );
    if (asset) {
      return [
        ...newData,
        {
          ...asset?.Expense,
          label: asset?.Expense?.EXPENSE_CD,
          value: asset?.EXPENSE_ID,
        },
      ];
    } else {
      return newData;
    }
  }, [assets, asset, isOpen]);

  // setfield value form
  useEffect(() => {
    if (asset) {
      form.setFieldsValue(asset);
    } else {
      form.setFieldsValue({
        CD: newTime,
      });
    }
  }, [asset, newTime]);

  // submit form
  const handleOk = async () => {
    const result = {
      ...form.getFieldValue(),
    };

    // check null and undefined
    if (
      result?.NAME === undefined ||
      result?.NAME === null ||
      result?.COUNT === undefined ||
      result?.COUNT === null ||
      result?.CD === undefined ||
      result?.CD === null ||
      result?.NAME.trim() === "" ||
      result?.CD.trim() === ""
    ) {
      return;
    }

    if (asset) {
      handleUpdateAsset(result, asset?.id, handleCancel);
    } else {
      handleCreateAsset(result, () => handleCancel());
    }
  };

  // create cusstomer
  const handleCreateAsset = async (data, callback) => {
    await onCreateAsset(data, callback);
  };

  // handle update customer
  const handleUpdateAsset = async (data, id, callback) => {
    await onUpdateAsset(data, id, callback);
  };

  // cancel
  const handleCancel = () => {
    onCancel();
    form.resetFields();
    setNewTime(undefined);
  };

  return (
    <div>
      <Modal
        title={`${title} tài sản`}
        visible={isOpen}
        onCancel={handleCancel}
        style={{ top: 20 }}
        footer={[
          <Button form="myForm" type="second" onClick={handleCancel}>
            Hủy bỏ
          </Button>,
          <Button
            form="basic"
            key="basic"
            htmlType="submit"
            type="primary"
            onClick={handleOk}
            style={{ minWidth: 80 }}
          >
            {loading ? <LoadingOutlined /> : title}
          </Button>,
        ]}
        width={600}
        className="modal-customer modal-mobile"
      >
        <Form
          form={form}
          name="basic"
          scrollToFirstError={true}
          validateMessages={validateMessages}
          labelCol={{
            span: 5,
          }}
          wrroleerCol={{
            span: 19,
          }}
          labelWrap
          labelAlign="left"
          className="modal-form"
        >
          <Row gutter={[40]}>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item label="Mã tài sản" name="CD">
                <Input autoFocus={true} allowClear ref={inputRef} disabled />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                label="Tên tài sản"
                name="NAME"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input allowClear />
              </Form.Item>
            </Col>
            {/* {!asset && ( */}
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                label="Số lượng"
                name="COUNT"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            {/* )} */}
            <Col xs={24} sm={24} lg={24}>
              <Form.Item label="Nhóm tài sản">
                <Row gutter={8}>
                  <Col span={21}>
                    <Form.Item name="ASSET_CAT_ID" noStyle>
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
                  <Col span={3}>
                    <Button
                      type="primary"
                      style={{ width: "100%" }}
                      onClick={() => setOpen(true)}
                      disabled={!isDisplayBtn}
                    >
                      +
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item label="Phiếu chi" name="EXPENSE_ID">
                <Select
                  showSearch
                  allowClear
                  options={newListExpense}
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
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item label="Chi nhánh" name="BRANCH_ID">
                <Select
                  showSearch
                  allowClear
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
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} lg={24}>
              <Form.Item label="Tổ chức" name="ORG_ID">
                <Select
                  showSearch
                  allowClear
                  options={[]}
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
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Mô tả" name="DESC">
                <Input.TextArea rows={3} allowClear />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Ghi chú" name="NOTE">
                <Input.TextArea rows={3} allowClear />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* modal asset status */}
      <ModalAssetCategory
        title={"Danh sách nhóm tài sản"}
        onCancel={() => {
          setOpen(false);
        }}
        isOpen={open}
      />
    </div>
  );
};

export default memo(MutationAsset);
