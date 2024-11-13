import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Pagination, Button, Input, Space, notification } from "antd";
import { useFetchPlayerCourts } from "../../../utils/services/courtService";
import Highlighter from "react-highlight-words";

export const CourtTable = ({ selectedCourt, handleSelectCourt }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [filterField, setFilterField] = useState("");
  const [order, setOrder] = useState("");
  const searchInput = useRef(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState([
    selectedCourt?.courtId,
  ]);
  const {
    data: courtsData,
    isLoading,
    isError,
  } = useFetchPlayerCourts(
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
  ];
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      handleSelectCourt(selectedRows[0]);
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  const onChange = (pagination, filters, sorter) => {
    setFilterField(sorter.columnKey);
    setOrder(sorter.order == "ascend" ? "asc" : "desc");
  };
  return (
    <div>
      {!courtsData.isSuccess &&
        notification.error({ message: courtsData.message })}
      <Table
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        onChange={onChange}
        columns={columns}
        dataSource={courtsData?.result.data}
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

CourtTable.propTypes = {
  selectedCourt: PropTypes.object, // Adjust based on your court object structure
  handleSelectCourt: PropTypes.func.isRequired,
};
