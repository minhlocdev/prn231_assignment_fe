import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { getBooking, getBookings, postBookings } from "./queries/bookingQuery";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

export const useFetchBookings = (
  subject,
  subjectId,
  bookingFilterDto,
  sortField,
  sortValue,
  pageNumber,
  pageSize
) => {
  return useQuery({
    queryKey: [
      "bookings",
      subject,
      subjectId,
      bookingFilterDto,
      sortField,
      sortValue,
      pageNumber,
      pageSize,
    ],
    queryFn: () =>
      getBookings(
        subject,
        subjectId,
        bookingFilterDto,
        sortField,
        sortValue,
        pageNumber,
        pageSize
      ),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};

export const useCreateBooking = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postBookings,
    onSuccess: (data) => {
      if (data.isSuccess) {
        notification.success({
          message: "Booking Successful",
          description: "Go to payment page...!",
        });
        navigate(`/payment/${data.result.bookingId}`);
      } else {
        notification.error({
          message: "Booking Failed",
          description: data.message,
        });
      }
    },
    onError: (error) => {
      console.error("Booking failed:", error);

      notification.error({
        message: "Booking Failed",
        description:
          error.response?.data?.message || "An error occurred during Booking.",
      });
    },
  });
};

export const useFetchBooking = (bookingId) => {
  return useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    enabled: !!bookingId,
  });
};
