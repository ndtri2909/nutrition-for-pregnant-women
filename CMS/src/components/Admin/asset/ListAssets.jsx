import moment from "moment";
import PrintLabel from "./PrintLabel";
import { useRecoilState } from "recoil";
import { useEffect, useMemo, useState } from "react";
import { checkStatus, formatDate } from "../../../common";
import { Button, Dropdown, Menu, Space, Table, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { paginationState, sizeState } from "../../../recoil/atom/customerState";

const ListAssets = ({
  assets,
  onDelete,
  isLoading,
  totalPage,
  onAssignUser,
  openEditAsset,
  isEditBtn,
  isDeleteBtn,
}) => {
  // set key for list customer
  const listAssets = useMemo(() => {
    return assets?.map((item) => ({
      ...item,
      key: item.id,
    }));
  }, [assets]);

  const [size, setSize] = useRecoilState(sizeState);
  const [pagination, setPagination] = useRecoilState(paginationState);

  const handleDelete = (id) => {
    onDelete(id);
  };

  //create customer contact
  const handleMenuClick1 = (e, app) => {
    if (e.key === "assign_user") {
      onAssignUser(app);
    }
    if (e.key === "edit_asset") {
      openEditAsset(app);
    }
  };

  // menu customer for mobile
  const menuCusMobile = (app) => (
    <Menu
      onClick={(e) => handleMenuClick1(e, app)}
      items={[
        {
          label: "Gán nhân viên",
          key: "assign_user",
        },
        {
          label: "Chỉnh sửa",
          key: "edit_asset",
          disabled: { isEditBtn },
        },
        {
          label: "Xóa",
          key: "delete_asset",
          disabled: { isDeleteBtn },
        },
      ]}
    />
  );

  // menu customer for pc
  const menuCus = (app) => (
    <Menu
      onClick={(e) => handleMenuClick1(e, app)}
      items={[
        {
          label: "Gán nhân viên",
          key: "assign_user",
        },
      ]}
    />
  );

  // column customers
  const columns = [
    {
      title: "STT",
      render: (text, record, index) => index + 1,
      width: 25,
    },
    {
      title: "Mã",
      width: 85,
      sorter: (a, b) =>
        ("" + a.Customer_Status?.NAME).localeCompare(b.Customer_Status?.NAME),
      dataIndex: "CD",
    },
    {
      title: "Tên tài sản",
      width: 120,
      dataIndex: "NAME",
      sorter: (a, b) => ("" + a?.NAME).localeCompare(b?.NAME),
    },
    {
      title: "Nhóm tài sản",
      width: 120,
      render: (_, record) => record.Asset_Category?.NAME,
    },
    {
      title: "Mô tả",
      dataIndex: "DESC",
      width: 100,
    },
    {
      title: "Chi nhánh",
      width: 110,
      render: (_, record) => record.Workplace?.NAME,
    },
    {
      title: "Trạng thái",
      width: 55,
      render: (_, record) => (
        <div
          style={{
            textAlign: "center",
            background: `${checkStatus(
              record.Asset_Current_Statuses?.[
                record.Asset_Current_Statuses?.length - 1
              ]?.Asset_Status?.CD
            )}`,
            fontWeight: 600,
          }}
        >
          {
            record.Asset_Current_Statuses?.[
              record.Asset_Current_Statuses?.length - 1
            ]?.Asset_Status?.NAME
          }
        </div>
      ),
    },
    {
      title: "Người giữ",
      width: 100,
      render: (_, record) => {
        const NAME =
          record.Asset_Trackings?.[0]?.User?.FIRST_NAME +
          " " +
          record.Asset_Trackings?.[0]?.User?.LAST_NAME;
        return record.Asset_Trackings?.length ? NAME : "";
      },
    },

    {
      title: "Mã phiếu chi",
      render: (_, record) => record.EXPENSE_ID && record?.Expense?.EXPENSE_CD,
      width: 100,
    },
    {
      title: "",
      fixed: "right",
      render: (_, record) => (
        <Space size="small">
          <div className="layout-pc">
            <Dropdown overlay={(e) => menuCus(record)}>
              <Button icon={<MoreOutlined />} size="small" />
            </Dropdown>
          </div>
          <div className="layout-mobile">
            <Dropdown overlay={(e) => menuCusMobile(record)}>
              <Button icon={<MoreOutlined />} size="small" />
            </Dropdown>
          </div>

          <div className="layout-pc">
            <Space size="small">
              <Tooltip title="Chỉnh sửa">
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  className={"btn-warning"}
                  onClick={() => openEditAsset(record)}
                  size="small"
                  disabled={isEditBtn}
                />
              </Tooltip>
              <Tooltip title="Xóa">
                <Button
                  type="primary"
                  icon={<DeleteOutlined />}
                  className={"btn-danger"}
                  size="small"
                  disabled={isDeleteBtn}
                />
              </Tooltip>
            </Space>
          </div>
        </Space>
      ),
    },
  ];

  // handle change apge
  const hanleChangePage = (page, pageSize) => {
    setPagination({
      page: page,
      size: pageSize,
    });
  };

  const expandedRowRender = (data) => {
    // SET KEY FOR DATA LIST CLASS
    let classLists = data?.Asset_Current_Statuses?.map((item) => ({
      ...item,
      key: item.id,
    }));
    const columns1 = [
      {
        title: "STT",
        width: 40,
        render: (text, record, index) => <span>{index + 1}</span>,
      },
      {
        title: "Ngày",
        render: (_, record) => (
          <span>{moment(record?.MODIFIED_DATE).format(formatDate.Type)}</span>
        ),
        width: 80,
      },
      {
        title: "Số lượng",
        render: (_, record) => <span>{record?.COUNT}</span>,
        width: 80,
      },
      {
        title: "Trạng thái",
        render: (_, record) => (
          <div
            style={{
              textAlign: "center",
              background: `${checkStatus(record?.Asset_Status?.CD)}`,
              fontWeight: 600,
            }}
          >
            {record?.Asset_Status?.NAME}
          </div>
        ),
        width: 100,
      },
      {
        title: "Ghi chú",
        width: 500,
        render: (_, record) => <span>{record?.NOTE}</span>,
      },
    ];

    return (
      <Table
        columns={columns1}
        dataSource={classLists}
        pagination={false}
        className="gray-color-thead"
        style={{ marginBottom: 40 }}
      />
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

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpenExport, setIsOpenExport] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 500);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnWidth: 18,
  };
  const dataExport = useMemo(() => {
    const tmp = listAssets?.filter((item) =>
      selectedRowKeys?.includes(item?.id)
    );
    return tmp;
  }, [selectedRowKeys, listAssets]);

  return (
    <div className="table-moble">
      <div style={{ marginTop: 10, marginBottom: -5 }}>
        <Button
          type="primary"
          onClick={start}
          disabled={!selectedRowKeys?.length}
          loading={loading}
        >
          Hủy
        </Button>

        <span
          style={{
            marginLeft: 8,
          }}
        >
          {selectedRowKeys.length ? (
            <Button type="primary" onClick={() => setIsOpenExport(true)}>
              In nhãn
            </Button>
          ) : (
            ""
          )}
        </span>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {selectedRowKeys.length
            ? `cho ${selectedRowKeys?.length} tài sản được chọn`
            : ""}
        </span>
      </div>
      <Table
        columns={columns}
        dataSource={listAssets}
        loading={isLoading}
        scroll={{
          x: 1450,
        }}
        pagination={{
          defaultCurrent: pagination?.page,
          defaultPageSize: pagination?.sizepage,
          total: totalPage,
          onChange: onChange,
          pageSizeOptions: [25, 50, 100, 150, 200],
          onShowSizeChange: onShowSizeChange,
          current: pagination?.page,
        }}
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => {
            return record?.Asset_Current_Statuses?.length > 0;
          },
          columnWidth: 20,
        }}
        rowSelection={rowSelection}
      />
      <PrintLabel
        title="In nhãn"
        isOpen={isOpenExport}
        onCancel={() => setIsOpenExport(false)}
        dataExport={dataExport}
      />
    </div>
  );
};

export default ListAssets;
