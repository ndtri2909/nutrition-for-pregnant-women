import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const useConfirm = (onDelete, title) => {
  const { confirm } = Modal;

  const showDeleteConfirm = (id) => {
    confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      // icon: null,
      content: `Dữ liệu sẽ không được khôi phục`,
      okText: `Đồng ý`,
      okType: "danger",
      cancelText: `Hủy bỏ`,
      onOk() {
        onDelete(id);
      },
    });
  };
  return {
    confirmDel: showDeleteConfirm,
  };
};

export default useConfirm;
