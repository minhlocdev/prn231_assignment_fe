import { useMutation } from "@tanstack/react-query";
import { createPayment } from "./queries/paymentQuery";
import { notification } from "antd";

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: createPayment,
    onError: (data) => {
      notification.error({
        message: "Create payment link failed!!",
        description: data?.response?.data?.message,
      });
    },
  });
};
