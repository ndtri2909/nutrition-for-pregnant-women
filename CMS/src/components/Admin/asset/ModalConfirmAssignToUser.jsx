import React from "react";
import { memo } from "react";
import { Button, Modal } from "antd";
import { useSetRecoilState } from "recoil";
import { useAuth } from "../../../hooks/auth";
import { useAssets } from "../../../hooks/useAsset";
import { LoadingOutlined } from "@ant-design/icons";
import { assetSelectState } from "../../../recoil/atom/assetState";
import { useAssetTracking } from "../../../hooks/useAssetTracking";

const ModalConfirmAssignToUser = ({
  title,
  isOpen,
  onCancel,
  dataTracking,
  employeeSelect,
}) => {
  const { auth } = useAuth();
  const { getAssetIdUpdate } = useAssets();
  const setAssetSelect = useSetRecoilState(assetSelectState);
  const { createAssetTracking, isLoading, getAllByQuery } = useAssetTracking();

  // create assign asset to user
  const handleOk = async () => {
    let res = await createAssetTracking(dataTracking);
    if (res) {
      let resp = await getAssetIdUpdate(dataTracking?.ASSET_ID, true);
      if (resp) {
        await onCancel();
        setAssetSelect(resp);
        await getAllByQuery({ USER_ID: auth?.profile?.id });
      }
    }
  };
  return (
    <div>
      <Modal
        title={`${title}`}
        visible={isOpen}
        onCancel={() => onCancel()}
        style={{ top: 20 }}
        footer={[
          <Button type="second" onClick={() => onCancel()}>
            Hủy bỏ
          </Button>,
          <Button type="primary" onClick={() => handleOk()}>
            {isLoading ? <LoadingOutlined /> : "Đồng ý"}
          </Button>,
        ]}
        width={600}
        className="modal-customer modal-mobile"
      >
        <p style={{ textAlign: "center" }}>
          Bạn có đồng ý gán tài sản này cho nhân viên{" "}
          <b>
            {employeeSelect?.User?.FIRST_NAME +
              " " +
              employeeSelect?.User?.LAST_NAME}
          </b>
          ??
        </p>
      </Modal>
    </div>
  );
};

export default memo(ModalConfirmAssignToUser);
