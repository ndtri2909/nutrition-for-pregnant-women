import { Image } from "antd";
import React from "react";
import hinh1 from "../../../assets/images/Food/hinh1.jpeg";

const TwoMeal = () => {
  return (
    <div className="one-nutritional">
      <div className="one-nutritional-title">
        <p className="one-nutritional-title__number">2</p>
        <div className="one-nutritional-title__right">
          <h4>KHẨU PHẦN ĂN KHUYẾN NGHỊ CỦA BẠN TRONG MỘT NGÀY</h4>
          <p>
            Bảng dưới đây là khẩu phần ăn cho mẹ trong một ngày để đáp ứng nhu
            cầu dinh dưỡng cần thiết ở giai đoạn này
          </p>
        </div>
      </div>
      <div className="btn-info-food">
        <div className="tbl-info-header">
          <div className="div-1">Nhóm thực phẩm</div>
          <div className="div-2">Nhu cầu trong ngày</div>
          <div className="div-3">Hình minh họa cho 1 đơn vị</div>
        </div>
        <div className="tbl-info-content">
          <table>
            <tr>
              <td className="div-1">
                <div className="row">
                  <div className="l-4 m-4 c-4">
                    <div className="food-img">
                      <Image src={hinh1} preview={false} />
                    </div>
                  </div>
                  <div className="l-8 m-8 c-8">
                    <div className="info-food">
                      <h4>Ngũ cốc</h4>
                      <div>
                        <p>
                          <b>Thực phẩm: </b>gạo, bắp (ngô), khoai lang, khoai
                          tây, khoai mì (sắn)…
                        </p>
                        <p>
                          <b>Vai trò:</b>
                        </p>
                        <p>
                          - Cung cấp chất đường bột, là nguồn cung cấp năng
                          lượng chính;{" "}
                        </p>
                        <p>- Cung cấp chất xơ; </p>
                        <p>- Cung cấp vitamin nhóm B.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="div-2">
                <b>14,5 đơn vị</b>
              </td>
              <td className="div-3">Germany</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TwoMeal;
