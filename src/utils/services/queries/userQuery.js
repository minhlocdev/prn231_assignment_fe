import axiosClient from "../../configuration/axiosClient";
import {
  GET_USER_ID_ENDPOINT,
  UPDATE_USER_ENDPOINT,
} from "../../constants/endpoints";

export const getUser = async (userId) => {
  const response = await axiosClient.get(`${GET_USER_ID_ENDPOINT}${userId}`);
  return {
    result: response.data.result,
    isSuccess: response.data.isSuccess,
    message: response.data.message,
  };
};

export const putUser = async ({email, updateParam}) => {
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
