// loginService.js
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { loginUser, signUpUser } from "./queries/authQuery";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.isSuccess) {
        notification.success({
          message: "Login Successful",
          description: "You have logged in successfully!",
        });
        login(data.result.user);
        localStorage.setItem("token", data.result.accessToken);
        localStorage.setItem("refreshToken", data.result.refreshToken);
        const roleName = data.result.user.roleName;
        if (roleName === "User") {
          navigate("/player");
        } else {
          navigate("/owner");
        }
      } else {
        notification.error({
          message: "Login Failed",
          description: data.message,
        });
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);

      notification.error({
        message: "Login Failed",
        description:
          error.response?.data?.message || "An error occurred during login.",
      });
    },
  });
};

export const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      if (data.isSuccess) {
        notification.success({
          message: "Register Successful",
          description: "Please log in with your account!",
        });

        navigate("/login");
      } else {
        notification.error({
          message: "Register Failed",
          description: data.message,
        });
      }
    },
    onError: (error) => {
      console.error("Register failed:", error);

      notification.error({
        message: "Register Failed",
        description:
          error.response?.data?.message || "An error occurred during Register.",
      });
    },
  });
};
