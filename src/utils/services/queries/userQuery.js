import queryString from "query-string";
import axiosClient from "../../configuration/axiosClient";
import {
  GET_USER_ID_ENDPOINT,
  GET_USERS,
  UPDATE_USER_ENDPOINT,
} from "../../constants/endpoints";

export const getUsers = async (
  filterField,
  filterValue,
  sortField,
  sortValue = "asc",
  pageNumber = 1,
  pageSize = 10
) => {
  const params = {
    filterField,
    filterValue,
    sortField,
    sortValue,
    pageNumber,
    pageSize,
  };

  const queryParams = queryString.stringify(params, { skipNull: true });
  const response = await axiosClient.get(`${GET_USERS}?${queryParams}`);
  return {
    isSuccess: response.data.isSuccess,
    message: response.data.message,
    result: response.data.result || [],
  };
};

export const getUser = async (userId) => {
  const response = await axiosClient.get(`${GET_USER_ID_ENDPOINT}${userId}`);
  return {
    result: response.data.result,
    isSuccess: response.data.isSuccess,
    message: response.data.message,
  };
};

export const putUser = async ({ email, updateParam }) => {
  const response = await axiosClient.put(
    `${UPDATE_USER_ENDPOINT}?email=${email}`,
    updateParam
  );
  return {
    result: response.data.result,
    isSuccess: response.data.isSuccess,
    message: response.data.message,
  };
};
