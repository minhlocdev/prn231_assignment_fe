import axiosClient from "../../configuration/axiosClient";
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "../../constants/endpoints";

export const loginUser = async (credentials) => {
    const response = await axiosClient.post(LOGIN_ENDPOINT, credentials);
    return response.data; 
  };
  
  export const signUpUser = async (user) => {
    const response = await axiosClient.post(REGISTER_ENDPOINT, user);
    return response.data; 
  };
  