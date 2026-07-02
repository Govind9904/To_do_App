import API from "./axios";

export const loginUser = async (data: any) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};
<<<<<<< HEAD
=======

export const registerUser = async (data: any) => {
  const response = await API.post("auth/register", data);
  return response.data;
};
>>>>>>> 1715a49 (Add taskContext , integrate API for Get or Add Task)
