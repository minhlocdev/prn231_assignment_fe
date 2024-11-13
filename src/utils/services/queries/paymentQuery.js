import axiosClient from "../../configuration/axiosClient";
import { POST_PAYMENT_ENDPOINT } from "../../constants/endpoints";

export const createPayment = async (paymentParam) => {
  var response = await axiosClient.post(
    `${POST_PAYMENT_ENDPOINT}`,
    paymentParam
  );

  return {
    result: response.data.result,
    isSuccess: response.data.isSuccess,
    message: response.data.message,
  };
};
