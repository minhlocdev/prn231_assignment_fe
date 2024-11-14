import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBooking,
  useFetchBooking,
} from "../../../utils/services/bookingService";
import { useFetchCourt } from "../../../utils/services/courtService";
import { Avatar, Button, Descriptions, Divider, Flex, Modal } from "antd";
import { useState } from "react";

const BookingDetail = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useFetchBooking(bookingId);
  const { data: court, isLoading: courtLoading } = useFetchCourt(
    data?.result?.courtId
  );
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const { mutate: deleteBooking } = useDeleteBooking();
  const handleOk = async () => {
    await deleteBooking(bookingId);
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  if (isLoading || courtLoading) return <div>Loading...</div>;
  const handlePayClick = (bookingId) => {
    navigate(`/player/payment/${bookingId}`);
  };
  const getStatusColor = (status) => {
    switch (status) {
      // UnPaid = 0,
      // Reserved = 1,
      // Completed = 2,
      // Cancelled = 3,
      case "UnPaid":
        return "text-yello-500";
      case "Reserved":
        return "text-green-500";
      case "Completed":
        return "text-blue-500";
      case "Cancelled":
        return "text-red-500";
    }
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
                <p className={getStatusColor(data.result.status)}>
                  {data.result.status}
                </p>
                {data.result.status === "UnPaid" && (
                  <Button
                    type="link"
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
          {(data.result.status == "UnPaid" ||
            data.result.status == "Reserved") && (
            <Flex gap={20} justify="flex-end">
              <Button
                type="primary"
                onClick={() => {
                  navigate(`/player/book-field/${data.result.bookingId}`);
                }}
              >
                Edit
              </Button>
              <Button type="dashed" danger onClick={showModal}>
                Delete
              </Button>
              <Modal
                open={open}
                title="Confirm delete booking"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <OkBtn />
                  </>
                )}
              ></Modal>
            </Flex>
          )}
        </>
      )}
    </div>
  );
};

export default BookingDetail;
