import { useParams } from "react-router-dom";
import { useFetchCourt } from "../../../utils/services/courtService";
import { Card, Descriptions, Image, Spin, Table } from "antd";

const CourtDetail = () => {
  const { courtId } = useParams();

  const {
    data: court,
    isLoading: courtLoading,
    isError: courtError,
  } = useFetchCourt(courtId);
  const columns = [
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      key: "bookingId",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "timeStart",
      key: "timeStart",
      render: (text, record) => `${record.timeStart} - ${record.timeEnd}`,
    },
    {
      title: "Sharing Mode",
      dataIndex: "sharingMode",
      key: "sharingMode",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  if (courtLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }
  if (courtError) {
    return <div>Error</div>;
  }
  return (
    <div style={{ padding: "20px" }}>
      <h2>Court Details</h2>

      <Descriptions title="Court Information" bordered>
        <Descriptions.Item label="Court Name">
          {court.result.courtName}
        </Descriptions.Item>
        <Descriptions.Item label="Location">
          {court?.result.courtGroup?.location || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Contact">
          {court?.result.contact}
        </Descriptions.Item>
        <Descriptions.Item label="Max Players">
          {court?.result.maxPlayers}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          {court?.result.status === "1" ? "Active" : "Inactive"}
        </Descriptions.Item>
        <Descriptions.Item label="Court Group">
          {court?.result.courtGroup?.courtGroupName}
        </Descriptions.Item>
        <Descriptions.Item label="Group Location">
          {court?.result.courtGroup?.location}
        </Descriptions.Item>
      </Descriptions>

      <h3>Court Images</h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {court?.result?.courtImages?.map((imageUrl, index) => (
          <Card key={index} hoverable style={{ width: 240 }}>
            <Image src={imageUrl} alt={`Court Image ${index + 1}`} />
          </Card>
        ))}
      </div>

      <h3>Bookings</h3>
      {court?.result?.bookings?.length > 0 ? (
        <Table
          columns={columns}
          dataSource={court.result.bookings}
          rowKey="bookingId"
          pagination={false}
        />
      ) : (
        <p>No bookings available for this court.</p>
      )}
    </div>
  );
};

export default CourtDetail;
