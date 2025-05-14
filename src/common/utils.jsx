import { API_BASE } from "./endpoints";
import axios from "axios";

export const getUrlFor = ({ path }) => {
  if (!path) {
    throw new Error(`URL pattern not found for path: ${path}`);
  }

  return API_BASE + path;
};

export const apiRequest = async ({
  url,
  data = {},
  method = "GET",
  addHeader = {},
  auth = true,
}) => {
  let authToken = {};
  if (auth) {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No authentication token found");
    authToken = { Authorization: `Bearer ${token}` };
  }

  const config = {
    headers: {
      ...authToken,
      "Content-Type": "application/json",
      ...addHeader,
    },
  };

  try {
    let response;
    switch (method) {
      case "GET":
        response = await axios.get(url, config);
        break;
      case "POST":
        response = await axios.post(url, data, config);
        break;
      case "PUT":
        response = await axios.put(url, data, config);
        break;
      case "DELETE":
        response = await axios.delete(url, config);
        break;
      default:
        break;
    }

    if (response.statusText != "OK") {
      throw new Error("API request failed!");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem("authToken");
      !path === "LOGIN" && window.location.reload();
    }
    throw error;
  }
};
