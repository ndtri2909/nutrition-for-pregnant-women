import { InfoCircleOutlined } from "@ant-design/icons";
import { Image, Input, InputNumber, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import menu from "../../../assets/images/healthmama.png";
import { compareWeight, typeBMI } from "../../../commons";
import { data } from "../../../commons/data";
import BtnSubmit from "../../../components/global/Button/BtnSubmit";
import { useBMI } from "../../../hook/bmi";
import { useKetLuanKhuyenNghi } from "../../../hook/ketLuanKhuyenNghi";
import {
  bmiResultState,
  dataChartState,
} from "../../../recoil/atom/globalState";
import { profileState } from "../../../recoil/atom/userState";

const FrmChooseMenu = () => {
  const { createBmi, bmis } = useBMI();
  const { KetLuanKhuyenNghi, getKetLuanKhuyenNghiByValue } =
    useKetLuanKhuyenNghi();
  const setBmiResult = useSetRecoilState(bmiResultState);
  const [dataChart, setDataChart] = useRecoilState(dataChartState);
  const [dataCheck, setDataCheck] = useState(false);
  const profile = useRecoilValue(profileState);
  const [name, setName] = useState();
  const [heigh, setHeigh] = useState(0);
  const [weigh, setWeigh] = useState(0);
  const [weighBefo, setWeighBefo] = useState(0);
  const [week, setWeek] = useState(1);
  const [numberDay, setNumberDay] = useState(1);
  const [errorName, setErrorName] = useState(null);
  const [errorHeigh, setErrorHeigh] = useState(null);
  const [errorWeighBefo, setErrorWeighBefo] = useState(null);
  const [errorWeigh, setErrorWeigh] = useState(null);
  useEffect(() => {
    if (profile) {
      setName(profile?.FULLNAME);
    } else {
      setName("");
    }
  }, [profile]);
  const handleSubmit = async () => {
    if (!name || name?.trim() === "") {
      setErrorName("Vui lòng điền thông tin");
    } else {
      setErrorName(null);
    }
    if (!heigh || heigh === 0) {
      setErrorHeigh("Vui lòng điền thông tin");
    } else {
      setErrorHeigh(null);
    }
    if (!weigh || weigh === 0) {
      setErrorWeigh("Vui lòng điền thông tin");
    } else if (weigh > 120) {
      setErrorWeigh("Cân nặng nhỏ hơn 120kg");
    } else {
      setErrorWeigh(null);
    }
    if (!weighBefo || weighBefo === 0) {
      setErrorWeighBefo("Vui lòng điền thông tin");
    } else if (weighBefo > 120) {
      setErrorWeighBefo("Cân nặng nhỏ hơn 120kg");
    } else {
      setErrorWeighBefo(null);
    }
    if (
      heigh > 0 &&
      weighBefo > 0 &&
      errorName === null &&
      errorHeigh === null &&
      errorWeighBefo === null &&
      errorWeigh === null
    ) {
      const bmi = weighBefo / ((heigh / 100) * (heigh / 100));
      setBmiResult(bmi?.toFixed(2));
    }
    if (
      heigh > 0 &&
      weighBefo > 0 &&
      week > 0 &&
      numberDay > 0 &&
      errorName === null &&
      errorHeigh === null &&
      errorWeighBefo === null &&
      errorWeigh === null
    ) {
      setDataChart({
        weightBef: weighBefo,
        bmiBef: weighBefo / ((heigh / 100) * (heigh / 100)),
        weigh: weigh - weighBefo,
        week: week,
        day: numberDay,
      });
      await getKetLuanKhuyenNghiByValue(
        {
          TYPE: typeBMI(weighBefo / ((heigh / 100) * (heigh / 100))),
          COMPARE: compareWeight(
            typeBMI(weighBefo / ((heigh / 100) * (heigh / 100))),
            weighBefo,
            weigh
          ),
          VALUE: weigh - weighBefo,
          KHOANG:
            week <= 12 ? 1 : week > 12 && week <= 24 ? 2 : week > 24 ? 3 : "",
        },
        () => {
          setDataCheck(true);
        }
      );
    }
  };
  useEffect(() => {
    if (profile && KetLuanKhuyenNghi && dataCheck) {
      createBmi(
        {
          CHIEUCAO: heigh,
          CANNANG_1: weighBefo,
          CANNANG_2: weigh,
          CANNANG_TANG: bmis?.length
            ? weigh - bmis?.[0]?.CANNANG_2
            : weigh - weighBefo,
          TUAN: week,
          NGAY: numberDay,
          KETLUANKHUYENNGHI_ID: KetLuanKhuyenNghi?.id,
          PHANLOAI_ID: KetLuanKhuyenNghi?.PHANLOAI_ID,
        },
        () => setDataCheck(false)
      );
    }
  }, [profile, KetLuanKhuyenNghi, dataCheck]);

  useEffect(() => {
    if (!name || name?.trim() === "") {
      setErrorName("");
    } else {
      setErrorName(null);
    }
    if (!heigh || heigh === 0) {
      setErrorHeigh("");
    } else {
      setErrorHeigh(null);
    }
    if (!weigh || weigh === 0) {
      setErrorWeigh("");
    } else if (weigh > 120) {
      setErrorWeigh("Cân nặng nhỏ hơn 120kg");
    } else {
      setErrorWeigh(null);
    }
    if (!weighBefo || weighBefo === 0) {
      setErrorWeighBefo("");
    } else if (weighBefo > 120) {
      setErrorWeighBefo("Cân nặng nhỏ hơn 120kg");
    } else {
      setErrorWeighBefo(null);
    }
  }, [name, heigh, weigh, weighBefo]);

  useEffect(() => {
    if (bmis?.length > 0) {
      const data = bmis?.[0];
      setHeigh(data?.CHIEUCAO);
      setWeighBefo(data?.CANNANG_1);
      setWeek(data?.TUAN + 1);
    }
  }, [bmis]);

  return (
    <>
      <div className="choose-menu-bank">
        <div className="row">
          <div className="l-4 m-12 c-12">
            <div className="choose-menu-left">
              <Image src={menu} preview={false} width={60} />
              <h3 className="title">Theo Dõi Sức Khỏe</h3>
              <p>
                Bạn hãy cập nhật thông tin cá nhân và cân nặng hiện tại theo
                bảng để biết mức độ tăng cân của bạn trong giai đoạn thai kì{" "}
                <span className="mama-info">
                  <InfoCircleOutlined />
                </span>
              </p>
            </div>
          </div>
          <div className="l-8 m-12 c-12">
            <div className="choose-menu-right">
              <div className="row">
                <div className="l-4 m-4 c-12">
                  <div className="form-select">
                    <div className="form-select-row">
                      <p>Họ và tên</p>
                      <Input
                        placeholder="Nhập họ tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <span className="error-massage">{errorName}</span>
                    </div>
                  </div>
                </div>
                <div className="l-4 m-4 c-12">
                  <div className="form-select">
                    <div className="form-select-row">
                      <p>Chiều cao</p>
                      <div className="form-select-item">
                        <div className="form-select-item__input">
                          <InputNumber
                            placeholder="Ví dụ 155.5"
                            controls={false}
                            type="number"
                            style={{ width: "100%" }}
                            value={heigh === 0 ? null : heigh}
                            onChange={(value) => setHeigh(value)}
                          />
                          <span className="error-massage">{errorHeigh}</span>
                        </div>
                        <div className="form-select-item__unit">cm</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="l-4 m-4 c-12">
                  <div className="form-select">
                    <div className="form-select-row">
                      <p>Cân nặng trước khi mang thai</p>
                      <div className="form-select-item">
                        <div className="form-select-item__input">
                          <InputNumber
                            placeholder="Ví dụ 52.5"
                            controls={false}
                            type="number"
                            style={{ width: "100%" }}
                            value={weighBefo === 0 ? null : weighBefo}
                            onChange={(value) => setWeighBefo(value)}
                          />
                          <span className="error-massage">
                            {errorWeighBefo}
                          </span>
                        </div>
                        <div className="form-select-item__unit">kg</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <div className="l-4 m-4 c-12">
                  <div className="form-select">
                    <div>
                      <p>
                        Tuần thai{" "}
                        <span className="mama-info">
                          <InfoCircleOutlined />
                        </span>
                      </p>
                      <div className="select-date">
                        <div className="select-date-first">
                          <Select
                            placeholder="Chọn"
                            options={data}
                            style={{ minWidth: 60 }}
                            defaultValue={1}
                            value={week}
                            onSelect={(value) => setWeek(value)}
                          />{" "}
                          <span>Tuần</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="l-4 m-4 c-12">
                  <div className="form-select">
                    <div>
                      <p>Cân nặng khi đang mang thai</p>
                      <div className="form-select-item">
                        <div className="form-select-item__input">
                          <InputNumber
                            placeholder="Ví dụ 52.5"
                            controls={false}
                            type="number"
                            style={{ width: "100%" }}
                            value={weigh === 0 ? null : weigh}
                            onChange={(value) => setWeigh(value)}
                          />
                          <span className="error-massage">{errorWeigh}</span>
                        </div>
                        <div className="form-select-item__unit">kg</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BtnSubmit title="Kiểm tra sức khỏe" onOk={handleSubmit} />
    </>
  );
};

export default FrmChooseMenu;
