import queryString from "query-string";
import axiosClient from "../../configuration/axiosClient";
import {
  DELETE_BOOKING,
  GET_BOOKING,
  GET_BOOKING_APPLIER,
  GET_BOOKINGS,
  POST_BOOKING,
  POST_BOOKING_APPLIER,
  PUT_BOOKING,
} from "../../constants/endpoints";

export const getBookings = async (
  subject,
  subjectId,
  bookingFilterDto,
  sortField,
  sortValue = "asc",
  pageNumber = 1,
  pageSize = 10
) => {
  const params = {
    subject,
    subjectId,
    UserId: bookingFilterDto.UserId,
    Date: bookingFilterDto.Date,
    DateFrom: bookingFilterDto.DateFrom,
    DateTo: bookingFilterDto.DateTo,
    TimeStart: bookingFilterDto.TimeStart,
    TimeEnd: bookingFilterDto.TimeEnd,
    Mode: bookingFilterDto.Mode,
    Status: bookingFilterDto.Status,
    sortField,
    sortValue,
    pageNumber,
    pageSize,
  };

  const queryParams = queryString.stringify(params, { skipNull: true });

  const response = await axiosClient.get(`${GET_BOOKINGS}?${queryParams}`);

  return {
    isSuccess: response.data.isSuccess,
    message: response.data.message,
    result: {
      data: response.data.result.bookings || [],
      totalCount: response.data.result.totalCount || 0,
    },
  };
};

export const getBooking = async (bookingId) => {
  const response = await axiosClient.get(`${GET_BOOKING}/${bookingId}`);

  return {
    isSuccess: response.data.isSuccess,
    message: response.data.message,
    result: response.data.result || {},
  };
};

export const postBookings = async (booking) => {
  const response = await axiosClient.post(`${POST_BOOKING}`, booking);

  return {
    result: response.data.result,
    isSuccess: response.data.isSuccess,
    message: response.data.message,
  };
};
export const updateBookings = async ({ bookingId, updateParam }) => {
  console.log(updateParam);
  const response = await axiosClient.put(
    `${PUT_BOOKING}${bookingId}`,
    updateParam
  );

  return {
    result: response.data.result,
    isSuccess: response.data.isSuccess,
    message: response.data.message,
  };
};
export const deleteBooking = async (bookingId) => {
  const response = await axiosClient.delete(`${DELETE_BOOKING}${bookingId}`);

  return response;
};
export const getBookingAppliers = async (bookingId) => {
  const response = await axiosClient.get(`${GET_BOOKING_APPLIER}${bookingId}`);

  return {
    isSuccess: response.data.isSuccess,
    message: response.data.message,
    result: response.data.result || [],
  };
};

export const postApplier = async ({ bookingId, userId }) => {
  const response = await axiosClient.post(
    `${POST_BOOKING_APPLIER}${bookingId}/user/${userId}`
  );

  return {
    result: response.data.result,
    isSuccess: response.data.isSuccess,
    message: response.data.message,
  };
};
export const putApplier = async ({ bookingId, userId }) => {
  const response = await axiosClient.put(
    `${POST_BOOKING_APPLIER}${bookingId}/user/${userId}`
  );

  return {
    result: response.data.result,
    isSuccess: response.data.isSuccess,
    message: response.data.message,
  };
};
