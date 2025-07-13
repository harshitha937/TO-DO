import { getUserDetails } from "./GetUSer";

export const authHeaders = () => {
  const userToken = getUserDetails()?.token;
  return { headers: { Authorization: userToken } };
};