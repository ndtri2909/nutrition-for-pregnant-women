import { Card, Col, Row } from "antd";
import PieCity from "../components/dashboard/PieCity";
import PiePhanLoai from "../components/dashboard/PiePhanLoai";
import { useUser } from "../hooks/user";
import { useBmi } from "../hooks/bmi";
import { useEffect } from "react";

const Home = () => {
  const { countUser, getCountUserByCity } = useUser();
  const { countBmi } = useBmi();
  useEffect(() => {
    getCountUserByCity();
  }, []);
  return (
    <div className="page-content">
      <Row gutter={10}>
        <Col span={12}>
          <Card title="Thống kê theo tỉnh thành">
            <PieCity data={countUser} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Thống kê phân loại">
            <PiePhanLoai data={countBmi} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
