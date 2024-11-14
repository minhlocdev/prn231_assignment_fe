import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteBooking,
  getBooking,
  getBookingAppliers,
  getBookings,
  postApplier,
  postBookings,
  putApplier,
  updateBookings,
} from "./queries/bookingQuery";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

export const useFetchBookings = (
  subject,
  subjectId,
  bookingFilterDto,
  sortField,
  sortValue,
  pageNumber = 1,
  pageSize = 5
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
export const useUpdateBooking = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: updateBookings,
    onSuccess: (data) => {
      if (data.isSuccess) {
        notification.success({
          message: "Update Booking Successful",
          description: "Go to payment page...!",
        });
        navigate(`/payment/${data.result.bookingId}`);
      } else {
        notification.error({
          message: "Update Booking Failed",
          description: data.message,
        });
      }
    },
    onError: (error) => {
      console.error("Update Booking failed:", error);

      notification.error({
        message: "Update Booking Failed",
        description:
          error.response?.data?.message ||
          "An error occurred during Update Booking.",
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

export const useDeleteBooking = () => {
  return useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      notification.success({
        message: "Delete Booking Successful",
      });
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

export const useFetchBookingApplier = (bookingId) => {
  return useQuery({
    queryKey: ["booking-applier", bookingId],
    queryFn: () => getBookingAppliers(bookingId),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    enabled: !!bookingId,
  });
};

export const usePostApplier = () => {
  return useMutation({
    mutationKey:["enroll"],
    mutationFn: postApplier,
    onSuccess: (data) => {
      if (data.isSuccess) {
        notification.success({
          message: "Invite Successful",
        });
      } else {
        notification.error({
          message: "Invite Failed",
          description: data.message,
        });
      }
    },
    onError: (error) => {
      console.error("Invite failed:", error);

      notification.error({
        message: "Invite Failed",
        description:
          error.response?.data?.message || "An error occurred during Booking.",
      });
    },
  });
};

export const usePutApplier = () => {
  return useMutation({
    mutationKey:["unenroll"],
    mutationFn: putApplier,
    onSuccess: (data) => {
      if (data.isSuccess) {
        notification.success({
          message: "Kick Successful",
        });
      } else {
        notification.error({
          message: "Kick Failed",
          description: data.message,
        });
      }
    },
    onError: (error) => {
      console.error("Kick failed:", error);

      notification.error({
        message: "Kick Failed",
        description:
          error.response?.data?.message || "An error occurred during Booking.",
      });
    },
  });
};
