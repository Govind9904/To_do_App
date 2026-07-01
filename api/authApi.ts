import API from "./axios";

export const loginUser = async (data: any) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};
