import React, { useEffect, useState } from "react";
import Bredcrum from "../../../components/global/Bredcrumb";
import "./style.scss";

import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { usePhanLoai } from "../../../hook/phanLoai";
import { useThucDon } from "../../../hook/thucDon";
import { phanLoaiOptionState } from "../../../recoil/atom/phanLoaiState";
import FrmChooseMenu from "./FrmChooseMenu";
import ListMenu from "./ListMenu";
import { profileState } from "../../../recoil/atom/userState";
import { getDataUri, showThu } from "../../../commons";
import BtnSubmit from "../../../components/global/Button/BtnSubmit";
import { downloadPdfThucDon } from "../../../commons/generalPdf";

const ChooseMenu = () => {
  usePhanLoai();
  const profile = useRecoilValue(profileState);
  const phanLoaiOption = useRecoilValue(phanLoaiOptionState);
  const [dataPhanLoai, setDataPhanLoai] = useState([]);
  const id = useParams();
  const {
    getAllByQueryThucDon,
    getAllThucDonByPhanLoai,
    ThucDonByPhanLoai,
    ThucDon,
  } = useThucDon();
  const [valueSelect, setValueSelect] = useState(1);
  const [valueRadio, setValueRadio] = useState(1);
  const [breakfast, setBreakFast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [dataPdf, setDataPdf] = useState([]);
  console.log("dataPdf", dataPdf);
  useEffect(() => {
    if (id && phanLoaiOption?.length) {
      setDataPhanLoai(
        phanLoaiOption?.filter((item) => item?.id === Number(id?.id))
      );
    }
  }, [phanLoaiOption, id]);

  useEffect(() => {
    getAllThucDonByPhanLoai({
      KHOANG: valueSelect,
      PHANLOAI_ID: id?.id ? Number(id?.id) : 1,
    });
  }, [id]);

  useEffect(() => {
    if (ThucDonByPhanLoai?.length) {
      let week = [];
      ThucDonByPhanLoai.map((item) => {
        let data = {};
        data.thu = showThu(item?.THU);
        data.phanLoai = item?.Phan_Loai?.TEN;
        let sang = [];
        let trua = [];
        let toi = [];
        item?.Setting_ThucDons.map((value) => {
          if (value?.Mon_An?.TYPE === 1) {
            getDataUri(
              "http://localhost:1111/files/" +
                value?.Mon_An?.Image_Mon_Ans?.[0]?.NAME,
              function (dataUri) {
                sang.push({ ...value?.Mon_An, img: dataUri });
              }
            );
          }
          if (value?.Mon_An?.TYPE === 2) {
            getDataUri(
              "http://localhost:1111/files/" +
                value?.Mon_An?.Image_Mon_Ans?.[0]?.NAME,
              function (dataUri) {
                trua.push({ ...value?.Mon_An, img: dataUri });
              }
            );
          }
          if (value?.Mon_An?.TYPE === 3) {
            getDataUri(
              "http://localhost:1111/files/" +
                value?.Mon_An?.Image_Mon_Ans?.[0]?.NAME,
              function (dataUri) {
                toi.push({ ...value?.Mon_An, img: dataUri });
              }
            );
          }
        });
        data.sang = sang;
        data.trua = trua;
        data.toi = toi;
        week.push(data);
      });
      setDataPdf(week);
    }
  }, [ThucDonByPhanLoai]);

  useEffect(() => {
    getAllByQueryThucDon({
      KHOANG: valueSelect,
      THU: valueRadio,
      PHANLOAI_ID: id?.id ? Number(id?.id) : 1,
    });
  }, [valueSelect, valueRadio]);

  useEffect(() => {
    if (ThucDon?.length) {
      setBreakFast(ThucDon.filter((item) => item?.Mon_An?.TYPE === 1));
      setLunch(ThucDon.filter((item) => item?.Mon_An?.TYPE === 2));
      setDinner(ThucDon.filter((item) => item?.Mon_An?.TYPE === 3));
    } else {
      setBreakFast([]);
      setLunch([]);
      setDinner([]);
    }
  }, [ThucDon]);
  console.log("ThucDon", ThucDon);
  return (
    <div className="main-content">
      <Bredcrum title1="Trang chủ" title2="Ngân hàng thực đơn dinh dưỡng" />
      <div className="grid wide">
        <div className=" contact-wrapper">
          <FrmChooseMenu
            setValueSelect={setValueSelect}
            setValueRadio={setValueRadio}
            valueRadio={valueRadio}
          />
          <div className="menu-suggestions">
            <h2>
              GỢI Ý THỰC ĐƠN DÀNH CHO{" "}
              <span>
                MẸ MANG THAI GIAI ĐOẠN{" "}
                {valueSelect === 1
                  ? "3 THÁng ĐẦU"
                  : valueSelect === 2
                  ? "3 - 6 THÁNG"
                  : "3 THÁNG CUỐI"}
              </span>
            </h2>
            {dataPhanLoai?.length > 0 && (
              <h2>
                Dành cho phân loại <span>{dataPhanLoai?.[0]?.TEN}</span>
              </h2>
            )}
          </div>
          <ListMenu breakfast={breakfast} lunch={lunch} dinner={dinner} />
        </div>
      </div>
      {profile && (
        <div className="bmi-btn-group">
          <BtnSubmit
            title="Tải xuống thực đơn"
            onOk={() =>
              downloadPdfThucDon(
                valueSelect === 1
                  ? "3 THÁNG ĐẦU"
                  : valueSelect === 2
                  ? "3 - 6 THÁNG"
                  : "3 THÁNG CUỐI",
                dataPdf
              )
            }
          />
        </div>
      )}
    </div>
  );
};

export default ChooseMenu;
