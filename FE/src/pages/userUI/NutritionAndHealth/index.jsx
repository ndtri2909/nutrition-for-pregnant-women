import React, { useMemo, useState } from "react";
import Bredcrum from "../../../components/global/Bredcrumb";
import "./style.scss";
import NewsTop from "./NewsTop";
import NewsMain from "./NewsMain";
import NewsItem from "./NewsItem";
import thapdinhduong from "../../../assets/images/thapdinhduong.jpg";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { useTinTuc } from "../../../hook/tinTuc";

const NutritionAndHealth = () => {
  const navigate = useNavigate();
  const { TinTucs } = useTinTuc();
  const [pagination, setPagination] = useState({
    from: 0,
    to: 12,
    page: 1,
    sizepage: 12,
  });

  // data hiển thị tin tức
  const newData = useMemo(() => {
    return TinTucs?.slice(pagination?.from, pagination?.to);
  }, [TinTucs, pagination]);
  const onChangePagination = (pageNumber, pagination, setPagination) => {
    if (pageNumber > pagination?.page) {
      setPagination({
        from: pagination?.sizepage * (pageNumber - 1),
        to: pagination?.sizepage * pageNumber,
        page: pageNumber,
        sizepage: pagination?.sizepage,
      });
    } else if (pageNumber === 1) {
      setPagination({
        from: 0,
        to: pagination?.sizepage,
        page: 1,
        sizepage: pagination?.sizepage,
      });
    } else {
      setPagination({
        from: (pageNumber - 1) * pagination?.sizepage,
        to: pageNumber * pagination?.sizepage,
        page: pageNumber,
        sizepage: pagination?.sizepage,
      });
    }
  };

  const handleClick = (id) => {
    navigate(`/dinh-duong-va-suc-khoe-cho-me/${id}`);
  };
  return (
    <div className="main-content">
      <Bredcrum title1="Trang chủ" title2="Tin tức" />
      <div className="grid wide">
        <div className="nutrition-health">
          <div className="row">
            <div className="l-8 m-12 c-12">
              <div className="nutritional-health-left">
                <h3>Tin tức</h3>
                <div className="row">
                  {newData &&
                    newData.map((item, index) =>
                      index === 0 ? (
                        <div className="l-12 m-12 c-12">
                          <NewsMain item={item} handleClick={handleClick} />
                        </div>
                      ) : (
                        <div className="l-12 m-12 c-12">
                          <NewsMain item={item} handleClick={handleClick} />
                        </div>
                      )
                    )}
                </div>
                <div className="news-pagination">
                  <Pagination
                    defaultCurrent={1}
                    total={TinTucs?.length}
                    defaultPageSize={8}
                    onChange={(pageNumber) =>
                      onChangePagination(pageNumber, pagination, setPagination)
                    }
                    current={pagination?.page}
                  />
                </div>
              </div>
            </div>
            <div className="l-4 m-12 c-12">
              <NewsTop TinTucs={TinTucs} handleClick={handleClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionAndHealth;
