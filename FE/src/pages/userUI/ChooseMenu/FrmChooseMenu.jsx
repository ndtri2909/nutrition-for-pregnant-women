import { Divider, Image, Radio, Select } from "antd";
import React from "react";
import menu from "../../../assets/images/choose-menu.png";
import BtnSubmit from "../../../components/global/Button/BtnSubmit";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { profileState } from "../../../recoil/atom/userState";
const data = [
  { value: 1, label: "3 tháng đầu" },
  { value: 2, label: "3 - 6 tháng" },
  { value: 3, label: "3 tháng cuối" },
];
const options1 = [
  {
    label: "Thứ 2",
    value: 1,
  },
  {
    label: "Thứ 3",
    value: 2,
  },
  {
    label: "Thứ 4",
    value: 3,
    disabled: true,
  },
  {
    label: "Thứ 5",
    value: 4,
    disabled: true,
  },
  {
    label: "Thứ 6",
    value: 5,
    disabled: true,
  },
  {
    label: "Thứ 7",
    value: 6,
    disabled: true,
  },
  {
    label: "Chủ nhật",
    value: 7,
    disabled: true,
  },
];
const options2 = [
  {
    label: "Thứ 2",
    value: 1,
  },
  {
    label: "Thứ 3",
    value: 2,
  },
  {
    label: "Thứ 4",
    value: 3,
  },
  {
    label: "Thứ 5",
    value: 4,
  },
  {
    label: "Thứ 6",
    value: 5,
  },
  {
    label: "Thứ 7",
    value: 6,
  },
  {
    label: "Chủ nhật",
    value: 7,
  },
];

const FrmChooseMenu = ({ setValueSelect, setValueRadio, valueRadio }) => {
  const navigate = useNavigate();
  const profile = useRecoilValue(profileState);
  const onChangeSelect = (e) => {
    setValueSelect(e);
  };
  const onChangeDate = ({ target: { value } }) => {
    setValueRadio(value);
  };
  return (
    <div className="choose-menu-bank">
      <div className="row">
        <div className="l-4 m-4 c-12">
          <div className="choose-menu-left">
            <Image src={menu} preview={false} width={100} />
            <h3 className="title">Ngân Hàng Thực Đơn</h3>
            <h3>Dinh Dưỡng</h3>
          </div>
        </div>
        <div className="l-8 m-8 c-12">
          <div className="choose-menu-right">
            <div className="menu-rigth-choose mb-30">
              <p className="uppercase mr-40">Giai đoạn</p>
              <Select
                allowClear
                showSearch
                options={data}
                defaultValue={1}
                style={{ width: 250, borderColor: "red" }}
                placeholder="Chọn giai đoạn"
                onChange={onChangeSelect}
              />
            </div>
            <Divider />
            <div>
              <div className="choose-date">
                <Radio.Group
                  options={profile ? options2 : options1}
                  onChange={onChangeDate}
                  value={valueRadio}
                  optionType="button"
                />
              </div>
              {!profile && (
                <div className="bmi-btn-group">
                  <BtnSubmit
                    title="Đăng nhập để xem thêm thực đơn"
                    onOk={() => navigate(`/form`)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrmChooseMenu;
