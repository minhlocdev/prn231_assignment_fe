import { useNavigate, useParams } from "react-router-dom";
import { useFetchBooking } from "../../../utils/services/bookingService";
import { useFetchCourt } from "../../../utils/services/courtService";
import { Avatar, Button, Descriptions, Divider, Flex } from "antd";

const BookingDetail = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useFetchBooking(bookingId);
  const { data: court, isLoading: courtLoading } = useFetchCourt(
    data?.result?.courtId
  );

  if (isLoading || courtLoading) return <div>Loading...</div>;
  const handlePayClick = (bookingId) => {
    navigate(`/player/payment/${bookingId}`);
  };
  return (
    <div>
      <h2 className="font-bold text-2xl mb-3">Booking Details</h2>
      {data && (
        <>
          <Descriptions bordered>
            <Descriptions.Item label="Court">
              {court?.result.courtName}
            </Descriptions.Item>
            <Descriptions.Item label="Date">
              {data.result.date}
            </Descriptions.Item>
            <Descriptions.Item label="Time">
              {data.result.timeStart} - {data.result.timeEnd}
            </Descriptions.Item>
            <Descriptions.Item label="Cost">
              ${data.result.cost}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <div className="flex justify-between items-center">
                <p>{data.result.status}</p>
                {data.result.status === "UnPaid" && (
                  <Button
                    type="primary"
                    onClick={() => handlePayClick(data.result.bookingId)}
                  >
                    Pay your booking
                  </Button>
                )}
              </div>
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <h3 className="font-semibold text-xl mb-3">Booking Applicants</h3>
          <Flex wrap gap={60}>
            {data.result.bookingAppliers.map((user) => (
              <>
                <div
                  key={user?.userId}
                  className="p-4 border rounded-lg flex gap-x-3 items-center shadow-md"
                >
                  <Avatar src={user?.avatar} shape="circle" />
                  <p>{user?.userName}</p>
                </div>
              </>
            ))}
          </Flex>
        </>
      )}
    </div>
  );
};

export default BookingDetail;
