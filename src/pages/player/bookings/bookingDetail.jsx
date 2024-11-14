import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBooking,
  useFetchBooking,
  useFetchBookingApplier,
  usePutApplier,
} from "../../../utils/services/bookingService";
import { useFetchCourt } from "../../../utils/services/courtService";
import { Avatar, Button, Descriptions, Divider, Modal } from "antd";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import InviteUsers from "./inviteUser";

const BookingDetail = () => {
  const { user } = useAuth();
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useFetchBooking(bookingId);
  const { data: court, isLoading: courtLoading } = useFetchCourt(
    data?.result?.courtId
  );
  const { data: bookingApplierData, isLoading: applierLoading } =
    useFetchBookingApplier(bookingId);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const { mutate: deleteBooking } = useDeleteBooking();
  const handleOk = async () => {
    await deleteBooking(bookingId);
    setOpen(false);
    // Optionally navigate or refresh after deletion
    navigate("/path-to-navigate-after-deletion"); // Update with your path
  };
  const [userToKick, setUserToKick] = useState(null);
  const { mutate: kickUser } = usePutApplier();
  const handleOkKick = async () => {
    if (userToKick) {
      kickUser({ bookingId: bookingId, userId: userToKick });
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setUserToKick(null);
  };
  const handleCancelKick = () => {
    setOpenDeleteModal(false);
  };
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const showDeleteModal = (applier) => {
    setUserToKick(applier.userId);
    setOpenDeleteModal(true);
  };
  // Track ownership status of each user
  const [ownerStatus, setOwnerStatus] = useState({});

  useEffect(() => {
    if (bookingApplierData?.result) {
      // Create an object to track owner status
      const statusMap = {};
      bookingApplierData.result.forEach((applier) => {
        statusMap[applier.userId] = applier.status === "Owner";
      });
      setOwnerStatus(statusMap); // Set the owner status map
    }
  }, [bookingApplierData]);

  if (isLoading || courtLoading || applierLoading) return <div>Loading...</div>;

  const handlePayClick = (bookingId) => {
    navigate(`/player/payment/${bookingId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "UnPaid":
        return "text-yellow-500";
      case "Reserved":
        return "text-green-500";
      case "Completed":
        return "text-blue-500";
      case "Cancelled":
        return "text-red-500";
      default:
        return "";
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
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {bookingApplierData.result.map((applier) => (
              <div
                key={applier?.userId}
                className={`p-4 border rounded-lg flex gap-x-3 items-center shadow-md ${
                  ownerStatus[applier.userId]
                    ? "border border-green-400"
                    : "hover:border hover:border-red-300 hover:bg-red-200 cursor-pointer"
                }`}
                onClick={() =>
                  !ownerStatus[applier.userId] && showDeleteModal(applier)
                }
              >
                {ownerStatus[applier.userId] && (
                  <div className="font-semibold text-green-500">Owner</div>
                )}
                <Modal
                  open={openDeleteModal}
                  title="Confirm Kick User"
                  onOk={() => handleOkKick(applier.userId)}
                  onCancel={handleCancelKick}
                >
                  Are you sure you want to kick this user?
                </Modal>
                <Avatar src={applier?.avatar} shape="circle" />
                <p>{applier?.userName}</p>
              </div>
            ))}
            {ownerStatus[user.userId] && data.result.status === "UnPaid" && (
              <InviteUsers enrolledUser={bookingApplierData.result} />
            )}
          </div>

          {/* Conditional rendering for buttons */}
          {ownerStatus[user.userId] && data.result.status === "UnPaid" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "20px",
              }}
            >
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
              >
                Are you sure you want to delete this booking?
              </Modal>
            </div>
          ) : (
            !ownerStatus[user.userId] &&
            data.result.status === "UnPaid" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "20px",
                }}
              >
                <Button type="primary">Enroll this match</Button>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default BookingDetail;
