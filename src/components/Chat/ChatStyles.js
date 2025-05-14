import { styled } from "@mui/material/styles";

export const ChatContainer = styled("div")({
  height: "100vh",
  display: "flex",
  backgroundColor: "#f5f5f5",
});

export const Sidebar = styled("div")({
  width: 350,
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid #e0e0e0",
  overflow: "hidden",
  backgroundColor: "white",
});

export const ChatArea = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  margin: theme.spacing(2),
  overflow: "hidden",
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
}));

export const MessageBubble = styled("div")(({ iscurrentuser, theme }) => ({
  maxWidth: "70%",
  padding: theme.spacing(1.5, 2),
  marginBottom: theme.spacing(1),
  borderRadius: iscurrentuser ? "18px 18px 0 18px" : "18px 18px 18px 0",
  backgroundColor: iscurrentuser ? theme.palette.primary.light : "#e0e0e0",
  color: iscurrentuser ? "#fff" : "#000",
  alignSelf: iscurrentuser ? "flex-end" : "flex-start",
  wordBreak: "break-word",
}));

export const EmptyStateContainer = styled("div")({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f5f5f5",
});

export const EmptyStateContent = styled("div")({
  textAlign: "center",
  maxWidth: 400,
});
