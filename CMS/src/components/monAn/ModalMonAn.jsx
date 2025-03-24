import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import monAnApi from "../../api/monAnApi";
import { useSnackbar } from "notistack";

const ModalMonAn = ({
  isOpen,
  handleCancel,
  isLoading,
  onUpdate,
  updateFileMonAn,
  data,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [form] = useForm();
  const [fileList, setFileList] = useState([]);
  const [avatar, setAvatar] = useState(undefined);
  const onCancel = () => {
    form.resetFields();
    handleCancel();
    setAvatar(undefined);
    setFileList([]);
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data });
      setFileList([
        {
          name: data?.Image_Mon_Ans?.[0]?.NAME,
          status: "done",
          url: `http://localhost:1111/files/${data?.Image_Mon_Ans?.[0]?.NAME}`,
        },
      ]);
    }
  }, [data]);

  const handleOk = async () => {
    form.validateFields().then((values) => {
      if (data) {
        onUpdate(values, data?.id, () => onCancel());
      } else {
        handleCreate(values);
      }
    });
  };
  const handleCreate = async (data) => {
    let res = await monAnApi.createMonAn(data);
    if (res.data) {
      handleUpdateFileMonAn(res.data?.elements?.id);
      enqueueSnackbar(res?.data?.message, { variant: "success" });
    }
  };
  const handleUpdateFileMonAn = (id) => {
    let formData = new FormData();
    formData.append("MONAN_ID", id);
    if (avatar && avatar.originFileObj) {
      formData.append("uploadFile", avatar?.originFileObj);
    }

    updateFileMonAn(formData, () => onCancel());
  };
  const onChange = ({ fileList: newFileList }) => {
    let newImage = [...newFileList];
    if (newImage && newImage.length > 0) {
      newImage[0].status = "success";
    }
    setFileList(newImage);
  };
  const onSelectFile = ({ fileList }) => {
    if (!fileList || fileList.length === 0) {
      setAvatar(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setAvatar(fileList[0]);
  };
  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <>
      <Modal
        title="Phân loại"
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
        <Form
          form={form}
          labelCol={{
            span: 5,
          }}
          wrroleerCol={{
            span: 19,
          }}
        >
          <Form.Item
            label="Tên"
            name="TEN"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên loại",
              },
            ]}
          >
            <Input autoFocus={true} />
          </Form.Item>
          <Form.Item label="Buổi" name="TYPE">
            <Select
              options={[
                {
                  value: 1,
                  label: "Sáng",
                },
                {
                  value: 2,
                  label: "Trưa",
                },
                {
                  value: 3,
                  label: "Tối",
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="avt" label="Avatar">
            <ImgCrop rotate>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={(e) => {
                  onChange(e);
                  onSelectFile(e);
                }}
                onPreview={onPreview}
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalMonAn;
