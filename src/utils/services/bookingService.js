import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { getBookings, postBookings } from "./queries/bookingQuery";
import { notification } from "antd";

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
  return useMutation({
    mutationFn: postBookings,
    onSuccess: (data) => {
      if (data.isSuccess) {
        notification.success({
          message: "Booking Successful",
          description: "Now you can invite others players!",
        });
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
