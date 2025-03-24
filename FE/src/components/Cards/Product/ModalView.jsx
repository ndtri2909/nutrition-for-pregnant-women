import React from "react";
import { Modal } from "antd";
import ViewProduct from "../../admin/productlists/ViewProduct";

const ModalView = ({ open, onCancel, product }) => {
  return (
    <Modal
      title="Thông tin sản phẩm"
      open={open}
      visible={open}
      onCancel={() => onCancel()}
      width={800}
      footer={false}
      style={{ top: 20 }}
    >
      <ViewProduct product={product} isShow={true} />
    </Modal>
  );
};

export default ModalView;
