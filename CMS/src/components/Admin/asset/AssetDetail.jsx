import {
  UserOutlined,
  GroupOutlined,
  BorderOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import Card from "../../global/Card";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { checkStatus } from "../../../common";
import { Col, Row, Pagination, Empty } from "antd";
import { generalState } from "../../../recoil/atom/generalState";
import { assetSelectState } from "../../../recoil/atom/assetState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { paginationState, sizeState } from "../../../recoil/atom/customerState";

const AssetDetail = ({ data, totalPage }) => {
  const history = useHistory();
  const { moduleSelected } = useRecoilValue(generalState);
  const setAssetSelect = useSetRecoilState(assetSelectState);
  const [size, setSize] = useRecoilState(sizeState);
  const [pagination, setPagination] = useRecoilState(paginationState);

  const handleClick = (item) => {
    setAssetSelect(item);
    history.push(moduleSelected?.url + "/asset_detail?asset=" + item?.id);
  };

  // info item customer
  const ItemInfo = (icon, value, number) => {
    return (
      <Col span={number}>
        <span
          style={{
            color: "gray",
            display: "flex",
            alignItems: "center",
          }}
        >
          {icon} &ensp;{value ? value : ""}
        </span>
      </Col>
    );
  };

  // set pagiantion for table
  const onChange = (pageNumber) => {
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
        page: pageNumber,
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
  const onShowSizeChange = (page, pageSize) => {
    setSize(pageSize);
  };
  useEffect(() => {
    setPagination({
      from: 0,
      to: size,
      page: 1,
      sizepage: size,
    });
  }, [size]);
  // end

  return (
    <>
      {data?.length ? (
        data?.map((item, index) => {
          const status =
            item?.Asset_Current_Statuses[
              item?.Asset_Current_Statuses?.length - 1
            ]?.Asset_Status?.NAME;
          return (
            <div key={index} onClick={() => handleClick(item)}>
              <Card>
                <Row style={{ paddingLeft: 5 }}>
                  <Col span={24}>
                    <b style={{ textTransform: "uppercase" }}>{item?.NAME}</b>
                  </Col>
                  {ItemInfo(<QrcodeOutlined />, item?.CD, 14)}
                  {status ? (
                    <>
                      {ItemInfo(
                        <BorderOutlined
                          style={{ color: `${checkStatus(status)}` }}
                        />,
                        status,
                        10
                      )}
                    </>
                  ) : (
                    ""
                  )}

                  {ItemInfo(<GroupOutlined />, item?.Asset_Category?.NAME, 24)}
                  {ItemInfo(
                    <UserOutlined />,
                    item?.Asset_Trackings?.length
                      ? item?.Asset_Trackings?.[0]?.User?.FIRST_NAME +
                          " " +
                          item?.Asset_Trackings?.[0]?.User?.LAST_NAME
                      : "",
                    24
                  )}
                </Row>
              </Card>
            </div>
          );
        })
      ) : (
        <Card>
          <div
            style={{
              height: "70vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Empty
              imageStyle={{
                height: 60,
              }}
              description={<span>Không có dữ liệu</span>}
            />
          </div>
        </Card>
      )}
      <div style={{ display: "flex", justifyContent: "end", marginTop: 10 }}>
        <Pagination
          defaultCurrent={pagination?.page}
          defaultPageSize={pagination?.sizepage}
          total={totalPage}
          pageSizeOptions={[25, 50, 100, 150, 200]}
          onChange={onChange}
          onShowSizeChange={onShowSizeChange}
          size="small"
          showSizeChanger
          current={pagination?.page}
        />
      </div>
    </>
  );
};

export default AssetDetail;
