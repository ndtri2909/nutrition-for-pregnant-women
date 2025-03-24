import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export const data1 = [
  {
    key: "1",
    name: "Tổng nhu cầu năng lượng",
    age: "1.978 - 2.082",
    address: "kcal/ngày",
  },
];

export const columns1 = [
  {
    title: "Năng lượng",
    dataIndex: "name",
    key: "name",
    render: (text) => <div style={{ display: "flex", justifyContent: "space-between" }}>
      <p>
        {text}
      </p>
      <Tooltip title="prompt text" color="#e0582a">
        <InfoCircleOutlined style={{ fontSize: 18, color: "red" }} />
      </Tooltip>
    </div>,
    width: "50%",
  },
  {
    title: "",
    dataIndex: "age",
    key: "age",
    align: "center",
    width: "25%",
  },
  {
    title: "",
    dataIndex: "address",
    key: "address",
    width: "25%",
    align: "center",
  },
];

export const data2 = [
  {
    key: "1",
    name: "Protein",
    age: "13 - 20",
    address: "%",
  },
  {
    key: "2",
    name: "Tỷ lệ protein động vật/ protein tổng số",
    age: "≥ 35",
    address: "%",
  },
  {
    key: "3",
    name: "Lipid",
    age: "25 - 30",
    address: "%",
  },
  {
    key: "4",
    name: "Tỷ lệ lipid động vật/ lipid tổng số",
    age: "≤ 60",
    address: "%",
  },
  {
    key: "5",
    name: "Glucid",
    age: "55 - 65",
    address: "%",
  },
];

export const columns2 = [
  {
    title: "Tỷ lệ các chất P:L:G trong một bữa ăn và cả ngày",
    dataIndex: "name",
    key: "name",
    render: (text) => <div style={{ display: "flex", justifyContent: "space-between" }}>
      <p>
        {text}
      </p>
      <Tooltip title="prompt text" color="#e0582a">
        <InfoCircleOutlined style={{ fontSize: 18, color: "red" }} />
      </Tooltip>
    </div>,
    width: "50%",
  },
  {
    title: "",
    dataIndex: "age",
    key: "age",
    align: "center",
    width: "25%",
  },
  {
    title: "",
    dataIndex: "address",
    key: "address",
    width: "25%",
    align: "center",
  },
];

export const data3 = [
  {
    key: "1",
    name: "Vitamin A",
    age: "650",
    address: "µg/ngày",
  },
  {
    key: "2",
    name: "Vitamin D",
    age: "20",
    address: "µg/ngày",
  },
  {
    key: "3",
    name: "Vitamin D",
    age: "6,5",
    address: "mg/ngày",
  },
  {
    key: "4",
    name: "Vitamin K",
    age: "150",
    address: "µg/ngày",
  },
  {
    key: "5",
    name: "Vitamin B1",
    age: "1,2",
    address: "µg/ngày",
  },
  {
    key: "6",
    name: "Vitamin B2",
    age: "1,5",
    address: "µg/ngày",
  },
  {
    key: "7",
    name: "Vitamin B6",
    age: "1,9",
    address: "µg/ngày",
  },
  {
    key: "8",
    name: "Vitamin B9 (Folate)",
    age: "600",
    address: "µg/ngày",
  },
  {
    key: "9",
    name: "Vitamin B12",
    age: "150",
    address: "µg/ngày",
  },
  {
    key: "10",
    name: "Vitamin C",
    age: "110",
    address: "mg/ngày",
  },
  {
    key: "11",
    name: "Choline",
    age: "450",
    address: "mg/ngày",
  },
];

export const columns3 = [
  {
    title: "Chât khoáng",
    dataIndex: "name",
    key: "name",
    render: (text) => <div style={{ display: "flex", justifyContent: "space-between" }}>
      <p>
        {text}
      </p>
      <Tooltip title="prompt text" color="#e0582a">
        <InfoCircleOutlined style={{ fontSize: 18, color: "red" }} />
      </Tooltip>
    </div>,
    width: "50%",
  },
  {
    title: "",
    dataIndex: "age",
    key: "age",
    align: "center",
    width: "25%",
  },
  {
    title: "",
    dataIndex: "address",
    key: "address",
    width: "25%",
    align: "center",
  },
];


export const data4 = [
  {
    key: "1",
    name: "Chất xơ",
    age: "28",
    address: "g/ngày",
  },
  {
    key: "1",
    name: "Muối",
    age: "< 5",
    address: "g/ngày",
  },
];

export const columns4 = [
  {
    title: "Thông tin khác",
    dataIndex: "name",
    key: "name",
    render: (text) => <div style={{ display: "flex", justifyContent: "space-between" }}>
      <p>
        {text}
      </p>
      <Tooltip title="prompt text" color="#e0582a">
        <InfoCircleOutlined style={{ fontSize: 18, color: "red" }} />
      </Tooltip>
    </div>,
    width: "50%",
  },
  {
    title: "",
    dataIndex: "age",
    key: "age",
    align: "center",
    width: "25%",
  },
  {
    title: "",
    dataIndex: "address",
    key: "address",
    width: "25%",
    align: "center",
  },
];


export const data5 = [
  {
    key: "1",
    name: "Canxi",
    age: "720 - 960",
    address: "mg/ngày",
  },
  {
    key: "2",
    name: "Sắt",
    age: "41,1",
    address: "mg/ngày",
  },
  {
    key: "3",
    name: "Kẽm",
    age: "10",
    address: "mg/ngày",
  },
  {
    key: "4",
    name: "I-ốt",
    age: "220",
    address: "µg/ngày",
  },
];

export const columns5 = [
  {
    title: "Chất khoáng",
    dataIndex: "name",
    key: "name",
    render: (text) => <div style={{ display: "flex", justifyContent: "space-between" }}>
      <p>
        {text}
      </p>
      <Tooltip title="prompt text" color="#e0582a">
        <InfoCircleOutlined style={{ fontSize: 18, color: "red" }} />
      </Tooltip>
    </div>,
    width: "50%",
  },
  {
    title: "",
    dataIndex: "age",
    key: "age",
    align: "center",
    width: "25%",
  },
  {
    title: "",
    dataIndex: "address",
    key: "address",
    width: "25%",
    align: "center",
  },
];
export const regPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
export const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
export const data = [
  { label: 0, value: 0, index: null },
  { label: 1, value: 1, index: null },
  { label: 2, value: 2, index: null },
  { label: 3, value: 3, index: null },
  { label: 4, value: 4, index: null },
  { label: 5, value: 5, index: null },
  { label: 6, value: 6, index: null },
  { label: 7, value: 7, index: null },
  { label: 8, value: 8, index: null },
  { label: 9, value: 9, index: null },
  { label: 10, value: 10, index: null },
  { label: 11, value: 11, index: null },
  { label: 12, value: 12, index: null },
  { label: 13, value: 13, index: null },
  { label: 14, value: 14, index: null },
  { label: 15, value: 15, index: null },
  { label: 16, value: 16, index: null },
  { label: 17, value: 17, index: null },
  { label: 18, value: 18, index: null },
  { label: 19, value: 19, index: null },
  { label: 20, value: 20, index: null },
  { label: 21, value: 21, index: null },
  { label: 22, value: 22, index: null },
  { label: 23, value: 23, index: null },
  { label: 24, value: 24, index: null },
  { label: 25, value: 25, index: null },
  { label: 26, value: 26, index: null },
  { label: 27, value: 27, index: null },
  { label: 28, value: 28, index: null },
  { label: 29, value: 29, index: null },
  { label: 30, value: 30, index: null },
  { label: 31, value: 31, index: null },
  { label: 32, value: 32, index: null },
  { label: 33, value: 33, index: null },
  { label: 34, value: 34, index: null },
  { label: 35, value: 35, index: null },
  { label: 36, value: 36, index: null },
  { label: 37, value: 37, index: null },
  { label: 38, value: 38, index: null },
  { label: 39, value: 39, index: null },
  { label: 40, value: 40, index: null },
];
export const valueDate = [
  { label: 1, value: 1, index: null },
  { label: 2, value: 2, index: null },
  { label: 3, value: 3, index: null },
  { label: 4, value: 4, index: null },
  { label: 5, value: 5, index: null },
  { label: 6, value: 6, index: null },
  { label: 7, value: 7, index: null },
];


// take the last 3 years
function listYears() {
  const dateNow = new Date().getFullYear();
  const listYear = [];
  for (let i = 0; i < 2; i++) {
    listYear.push({ value: dateNow - i, label: dateNow - i });
  }
  return listYear;
}
export const yearData = listYears();

// take the last 3 years
function listDays() {
  const dateNow = new Date().getDate();
  const listYear = [];
  for (let i = 0; i < dateNow; i++) {
    listYear.push({ value: dateNow - i, label: dateNow - i });
  }
  return listYear;
}
export const dayDatas = listDays();

// take the last 3 years
function listMonths() {
  const dateNow = new Date().getMonth() + 1;
  const listYear = [];
  for (let i = 0; i < dateNow; i++) {
    listYear.push({ value: dateNow - i, label: dateNow - i });
  }
  return listYear;
}
export const dayMonths = listMonths();

// take the last 3 years
function dataNumbser() {
  const dateNow = 7;
  const listYear = [];
  for (let i = 0; i < dateNow; i++) {
    listYear.push({ value: dateNow - i, label: dateNow - i });
  }
  return listYear;
}
export const listDates = dataNumbser();