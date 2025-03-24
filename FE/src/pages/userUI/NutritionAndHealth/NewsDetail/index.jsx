import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Bredcrum from "../../../../components/global/Bredcrumb";
import { useTinTuc } from "../../../../hook/tinTuc";
import "./style.scss";

const NewsDetails = () => {
  const { id } = useParams();
  const { getTinTuc, TinTuc } = useTinTuc();
  useEffect(() => {
    if (id) {
      getTinTuc(Number(id));
    }
  }, [id]);
  return (
    <div className="main-content">
      <Bredcrum title1="Trang chủ" title2="Tin tức" title3={TinTuc?.TIEUDE} />
      <div className="grid wide">
        <div className="nutrition-health">
          <div className="row">
            <div className="l-12 m-12 c-12">
              <div className="news-details">
                <h3 className="title">{TinTuc?.TIEUDE}</h3>
                <div dangerouslySetInnerHTML={{ __html: TinTuc?.NOIDUNG }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
