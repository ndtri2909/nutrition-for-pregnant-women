import React from "react";
import FoodItem from "./FoodItem";
import HeadFoodItem from "./HeadFoodItem";

const ListMenu = ({ breakfast, lunch, dinner }) => {
  return (
    <div className="list-food-item">
      <div className="session-food-item">
        <HeadFoodItem title="Bữa sáng" />
        {breakfast &&
          breakfast.map((item) => (
            <FoodItem
              name={item?.Mon_An?.TEN}
              dinhduong={item?.Mon_An?.Dinh_Duongs}
              congthuc={item?.Mon_An?.Cong_Thucs}
              img={item?.Mon_An?.Image_Mon_Ans?.[0]?.NAME}
            />
          ))}
      </div>
      <div className="session-food-item">
        <HeadFoodItem title="Bữa trưa" />
        {lunch &&
          lunch.map((item) => (
            <FoodItem
              name={item?.Mon_An?.TEN}
              dinhduong={item?.Mon_An?.Dinh_Duongs}
              congthuc={item?.Mon_An?.Cong_Thucs}
              img={item?.Mon_An?.Image_Mon_Ans?.[0]?.NAME}
            />
          ))}
      </div>

      <div className="session-food-item">
        <HeadFoodItem title="Bữa tối" />
        {dinner &&
          dinner.map((item) => (
            <FoodItem
              name={item?.Mon_An?.TEN}
              dinhduong={item?.Mon_An?.Dinh_Duongs}
              congthuc={item?.Mon_An?.Cong_Thucs}
              img={item?.Mon_An?.Image_Mon_Ans?.[0]?.NAME}
            />
          ))}
      </div>
      {/* <div className="session-food-item">
        <HeadFoodItem title="Bữa phụ 1" />
        <FoodItem />
      </div>
      <div className="session-food-item">
        <HeadFoodItem title="Bữa phụ 2" />
        <FoodItem />
      </div> */}
    </div>
  );
};

export default ListMenu;
