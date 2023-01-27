import axiosClient from "../axios.Client";

export const authApi = {
  login(data) {
    const url = "/auth/loginAdmin";
    return axiosClient.post(url, data);
  },
};
