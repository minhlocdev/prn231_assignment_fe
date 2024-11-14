import { useRef, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Table,
  Pagination,
  Button,
  Input,
  Space,
  notification,
  Popconfirm,
} from "antd";
import { useFetchOwnerCourts } from "../../../utils/services/courtService";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";

export const ManageCourtPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [filterField, setFilterField] = useState("");
  const [order, setOrder] = useState("");
  const searchInput = useRef(null);
  const {
    data: courtsData,
    isLoading,
    isError,
  } = useFetchOwnerCourts(
    {
      CourtName: searchedColumn === "courtName" ? searchText : "",
      Contact: searchedColumn === "contact" ? searchText : "",
    },
    filterField,
    order,
    currentPage,
    pageSize
  );

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading courts.</div>;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (e, courtId) => {
    e.stopPropagation();
    // Navigate to the edit page for the selected court
    navigate(`/owner/courts/edit/${courtId}`);
  };

  const handleDelete = async (courtId) => {
    // Implement your delete logic here
    console.log(`Deleting court with ID: ${courtId}`);
    // Call your delete function here, e.g., await deleteCourt(courtId);

    notification.success({
      message: "Court Deleted",
      description: `Court with ID ${courtId} has been successfully deleted.`,
    });
  };
  const columns = [
    {
      title: "Court Name",
      dataIndex: "courtName",
      key: "courtName",
      ...getColumnSearchProps("courtName"),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      ...getColumnSearchProps("location"),
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      ...getColumnSearchProps("contact"),
    },
    {
      title: "Max Players",
      dataIndex: "maxPlayers",
      key: "maxPlayers",
      sorter: (a, b) => a.maxPlayers - b.maxPlayers,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            icon={<EditOutlined />}
            onClick={(e) => handleEdit(e, record.courtId)}
            size="small"
          />
          <Popconfirm
            title="Are you sure to delete this court?"
            onConfirm={() => handleDelete(record.courtId)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger size="small" />
          </Popconfirm>
        </div>
      ),
    },
  ];
  const onChange = (pagination, filters, sorter) => {
    setFilterField(sorter.columnKey);
    setOrder(sorter.order == "ascend" ? "asc" : "desc");
  };
  const handleRowClick = (record) => {
    // Navigate to the detail page for the selected court
    navigate(`/owner/courts/${record.courtId}`);
  };
  return (
    <div className="flex flex-col">
      <Button
        type="primary"
        className="ms-auto my-4"
        onClick={() => {
          navigate("/owner/create-court");
        }}
      >
        Create new court
      </Button>
      {!courtsData.isSuccess &&
        notification.error({ message: courtsData.message })}
      <Table
        onChange={onChange}
        columns={columns}
        dataSource={courtsData?.result.data}
        onRow={(record) => ({
          onClick: () => handleRowClick(record), // Navigate on row click
        })}
        rowKey="courtId"
        pagination={false}
      />

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={courtsData?.result.totalCount || 0}
        onChange={handlePageChange}
        style={{ marginTop: "20px", marginBottom: "20px", textAlign: "right" }}
      />
    </div>
  );
};
