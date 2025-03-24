import {
  EyeOutlined,
  ShoppingCartOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import ModalView from "./ModalView";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import React, { useMemo, useState } from "react";
import { useProducts } from "../../../hook/product";
import { productCartState } from "../../../recoil/atom/productState";
import { convertMoney, IMG_LINK, handleAddCart } from "../../../commons";
import "./style.scss";
import { Badge } from "antd";

const Product = ({ product }) => {
  const navigate = useNavigate();
  const [productCarts, setProductCarts] = useRecoilState(productCartState);
  const [productData, setProductData] = useState(undefined);
  const [openView, setOpenView] = useState(false);
  const { increaseViewProduct } = useProducts();
  const avt = useMemo(() => {
    return product?.Image_Products?.find((item) => item.IS_AVT);
  }, [product]);

  const productPrice = useMemo(() => {
    return product?.Price_Histories?.[product?.Price_Histories?.length - 1]
      ?.PRICE;
  }, [product]);

  const handleView = async (data) => {
    setProductData(data);
    setOpenView(true);
    await increaseViewProduct(data?.id);
  };

  const handleCancel = () => {
    setProductData(undefined);
    setOpenView(false);
  };

  const handleClick = async (id) => {
    await increaseViewProduct(id);
    navigate(`/product/${id}`);
  };

  return (
    <>
      {product?.IS_FREESHIP ? (
        <Badge.Ribbon
          text="Freeship"
          placement="start"
          color="#e3282c"
          className="ribbon-style"
        >
          <div class="wrapper">
            <div class="container-product">
              <div
                class="top"
                style={{
                  backgroundImage: `url(${IMG_LINK + "/" + avt?.NAME})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                onClick={() => handleView(product)}
              ></div>
              <div class="bottom">
                <div class="details">
                  <div className="detail-header">
                    <h1 className="text-center">{product?.NAME}</h1>
                    <p className="text-center price">
                      {convertMoney(productPrice)}
                    </p>
                  </div>
                  <div className="detail-footer">
                    <div className="browse">
                      <p className="text-center">Lượt xem</p>
                      <p className="text-center">{product?.VIEW}</p>
                    </div>
                    <div className="browse">
                      <p className="text-center">Lượt mua</p>
                      <p className="text-center">{product?.SELL_NUMBER}</p>
                    </div>
                  </div>
                </div>
                <div className="group-left">
                  <div className="group-icon eye">
                    <EyeOutlined
                      className="cart-shop"
                      onClick={() => handleClick(product?.id)}
                    />
                  </div>
                  <div class="group-icon buy">
                    <ShoppingCartOutlined
                      className="cart-shop"
                      handleAddCart
                      onClick={() =>
                        handleAddCart(product, productCarts, setProductCarts)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <div class="inside">
              <div class="icon">
                <ExclamationCircleOutlined className="product-info" />
              </div>
              <div class="contents">
                <h4 style={{ marginBottom: 8 }}>Thông tin sản phẩm</h4>
                <div>
                  <p style={{ whiteSpace: "pre-line" }}>{product?.DESC}</p>
                </div>
              </div>
            </div> */}
            <ModalView
              open={openView}
              product={productData}
              onCancel={handleCancel}
            />
          </div>
        </Badge.Ribbon>
      ) : (
        <div class="wrapper">
          <div class="container-product">
            <div
              class="top"
              style={{
                backgroundImage: `url(${IMG_LINK + "/" + avt?.NAME})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              onClick={() => handleView(product)}
            ></div>
            <div class="bottom">
              <div class="details">
                <div className="detail-header">
                  <h1 className="text-center">{product?.NAME}</h1>
                  <p className="text-center price">
                    {convertMoney(productPrice)}
                  </p>
                </div>
                <div className="detail-footer">
                  <div className="browse">
                    <p className="text-center">Lượt xem</p>
                    <p className="text-center">{product?.VIEW}</p>
                  </div>
                  <div className="browse">
                    <p className="text-center">Lượt mua</p>
                    <p className="text-center">{product?.SELL_NUMBER}</p>
                  </div>
                </div>
              </div>
              <div className="group-left">
                <div className="group-icon eye">
                  <EyeOutlined
                    className="cart-shop"
                    onClick={() => handleClick(product?.id)}
                  />
                </div>
                <div class="group-icon buy">
                  <ShoppingCartOutlined
                    className="cart-shop"
                    handleAddCart
                    onClick={() =>
                      handleAddCart(product, productCarts, setProductCarts)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <div class="inside">
            <div class="icon">
              <ExclamationCircleOutlined className="product-info" />
            </div>
            <div class="contents">
              <h4 style={{ marginBottom: 8 }}>Thông tin sản phẩm</h4>
              <div>
                <p style={{ whiteSpace: "pre-line" }}>{product?.DESC}</p>
              </div>
            </div>
          </div> */}
          <ModalView
            open={openView}
            product={productData}
            onCancel={handleCancel}
          />
        </div>
      )}
    </>
  );
};

export default Product;
