import queryString from "query-string";
import axiosClient from "../../configuration/axiosClient";
import {
  GET_BOOKING,
  GET_BOOKINGS,
  POST_BOOKING,
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
