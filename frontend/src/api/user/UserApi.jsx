import axiosClient from "../axiosClient";

export const UserApi = {
  // Login user
  loginUser: (params) => {
    const url = "/v1/user/login";
    return axiosClient.post(url, params);
  },
};
