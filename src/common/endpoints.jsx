export const API_BASE =
  process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/EDUCARD_API/";

export const urlPatterns = {
  // Auth
  LOGIN: "auth/login/",
  USER_SEARCH: ({ userName }) => `auth/user/search/${userName}/`,
  // communigate
  LIST_CONVERSATIONS: "communigate/conversations/",
  CREATE_CONVERSATION: "communigate/conversations/",
};
