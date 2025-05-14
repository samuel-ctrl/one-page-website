import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  Badge,
  Divider,
  IconButton,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import {
  Send as SendIcon,
  PersonAdd as PersonAddIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  AttachFile as AttachFileIcon,
  Mood as MoodIcon,
  GroupAdd as GroupAddIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { formatDistanceToNow } from "date-fns";
import {
  ChatContainer,
  Sidebar,
  ChatArea,
  MessageBubble,
  EmptyStateContainer,
  EmptyStateContent,
} from "./ChatStyles";
import { apiRequest, getUrlFor } from "../../common/utils";
import { urlPatterns } from "../../common/endpoints";
import UserSearchModal from "../peoplePicker/script";

const WS_URL = "ws://127.0.0.1:8000/ws/chat" || process.env.REACT_APP_WS_URL;

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [activeChat, setActiveChat] = useState(null);
  const [typingUsers, setTypingUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState({
    conversations: false,
    messages: false,
    newChat: false,
  });
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const ws = useRef(null);
  const typingTimeout = useRef(null);

  // Dummy user data - in a real app, this would come from authentication
  const currentUser = localStorage.getItem("user");

  const handleConversationsList = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, conversations: true }));
      setError(null);

      const response = await apiRequest({
        url: getUrlFor({ path: urlPatterns.LIST_CONVERSATIONS }),
      });

      setConversations(response);

      // if (presenceResponse.ok) {
      //   const presenceData = await presenceResponse.json();
      //   setOnlineUsers(presenceData.onlineUsers);
      // }
    } catch (err) {
      setError(err.message || "Failed to load conversations");
    } finally {
      setLoading((prev) => ({ ...prev, conversations: false }));
    }
  }, []);

  // const fetchMessages = useCallback(async (conversationId) => {
  //   try {
  //     setLoading(prev => ({ ...prev, messages: true }));
  //     setError(null);

  //     const response = await fetch(`${API_BASE}/conversations/${conversationId}/messages/`, {
  //       headers: {
  //         'Authorization': BEARER_TOKEN
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch messages');
  //     }

  //     const data = await response.json();
  //     setMessages(data.results.map(msg => ({
  //       ...msg,
  //       isCurrentUser: msg.sender === currentUser.uuid
  //     })));
  //   } catch (err) {
  //     setError(err.message || 'Failed to load messages');
  //   } finally {
  //     setLoading(prev => ({ ...prev, messages: false }));
  //   }
  // }, [currentUser.uuid]);

  useEffect(() => {
    console.log(localStorage.getItem("authToken"), "Token");

    const connectWebSocket = () => {
      const socket = new WebSocket(
        `${WS_URL}?token=${localStorage.getItem("authToken")}`,
      );

      socket.onopen = () => {
        if (activeChat) {
          socket.send(
            JSON.stringify({
              type: "join_conversation",
              conversation_uuid: activeChat,
            }),
          );
        }
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case "join_conversation":
            const newMessages = data.message_history.map((msg) => ({
              ...msg,
              isCurrentUser: msg.sender_id === currentUser.uuid,
            }));
            setMessages(newMessages);

            break;

          case "chat_message":
            setMessages((prev) => {
              const newMessage = {
                ...data,
                isCurrentUser: data.sender_id === currentUser.uuid,
              };

              return prev.some(
                (msg) =>
                  new Date(msg.timestamp) > new Date(newMessage.timestamp),
              )
                ? [...prev, newMessage].sort(
                    (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
                  )
                : [...prev, newMessage];
            });

            break;

          case "typing":
            setTypingUsers((prev) =>
              data.isTyping
                ? [...prev, data.userId]
                : prev.filter((u) => u !== data.userId),
            );
            break;

          // case 'presence_update':
          //   setOnlineUsers(prev => ({
          //     ...prev,
          //     [data.user_id]: data.is_online
          //   }));
          //   break;

          default:
            console.log("Unknown message type:", data.type);
        }
      };

      ws.current = socket;

      return () => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.close();
        }
      };
    };

    connectWebSocket();
  }, [activeChat, currentUser.uuid]);

  const joinConversation = (conversationId) => {
    console.log(`Joining conversation ${conversationId}`);
    if (ws.current) {
      if (ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(
          JSON.stringify({
            type: "join_conversation",
            conversation_uuid: conversationId,
          }),
        );
      }
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !activeChat) return;

    if (ws.current) {
      if (ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(
          JSON.stringify({
            type: "chat_message",
            content: input,
            conversation_uuid: activeChat,
          }),
        );

        setInput("");
        handleTyping(false);
      }
    }
  };

  const handleTyping = (isTyping) => {
    if (!activeChat) return;

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    if (isTyping) {
      setTypingUsers((prev) => [...prev, "user2"]); // Simulate other user typing
      typingTimeout.current = setTimeout(() => {
        handleTyping(false);
      }, 3000);
    } else {
      setTypingUsers((prev) => prev.filter((u) => u !== "user2"));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    handleConversationsList();
  }, [handleConversationsList]);

  // useEffect(() => {
  //   if (activeChat) {
  //     fetchMessages(activeChat);
  //     joinConversation(activeChat);
  //   }
  // }, [activeChat, fetchMessages]);

  const filteredConversations = (conversations || []).filter((conv) => {
    if (!conv || !conv.name) return false;

    return (
      searchQuery === "" ||
      conv.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleMenuOpen = (event, conversation) => {
    setAnchorEl(event.currentTarget);
    setSelectedConversation(conversation);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedConversation(null);
  };

  const handleLeaveConversation = async () => {
    if (!selectedConversation) return;

    try {
      console.log(`Leaving conversation ${selectedConversation.uuid}`);

      if (selectedConversation.uuid === activeChat) {
        setActiveChat(null);
      }

      setConversations((prev) =>
        prev.filter((c) => c.uuid !== selectedConversation.uuid),
      );
      handleMenuClose();
    } catch (err) {
      setError(err.message || "Failed to leave conversation");
    }
  };

  const handleGetOrCreateChat = async (selectedUsers) => {
    try {
      console.log("selectedUsers", selectedUsers);
      const res = await apiRequest({
        url: getUrlFor({ path: urlPatterns.CREATE_CONVERSATION }),
        method: "POST",
        data: selectedUsers
      });

      setConversations((prev) => [res, ...prev]);
      setActiveChat(res.uuid);
      setLoading((prev) => ({ ...prev, newChat: true }));
    } catch (err) {
      setError(err.message || "Failed to create new chat");
    } finally {
      setLoading((prev) => ({ ...prev, newChat: false }));
    }
  };

  const getConversationName = (conversation) => {
    return conversation ? conversation.name : "";
  };

  const getOnlineStatus = (conversation) => {
    if (conversation.conversation_type === "group") return null;

    const otherParticipant = conversation.participants.find(
      (p) => p !== currentUser.uuid,
    );
    return otherParticipant ? onlineUsers[otherParticipant] : false;
  };

  return (
    <ChatContainer>
      <Sidebar component={Paper} elevation={3}>
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid #e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Chats
          </Typography>
          <IconButton
            onClick={() => setModalOpen(true)}
            disabled={loading.newChat}
          >
            {loading.newChat ? (
              <CircularProgress size={24} />
            ) : (
              <PersonAddIcon />
            )}
          </IconButton>
        </Box>

        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search contacts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ flex: 1, overflow: "auto" }}>
          {loading.conversations ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <List disablePadding>
              {filteredConversations.map((conv) => (
                <ListItem
                  button
                  key={conv.uuid}
                  selected={activeChat === conv.uuid}
                  onClick={() => setActiveChat(conv.uuid)}
                  sx={{
                    "&:hover": { backgroundColor: "action.hover" },
                    "&.Mui-selected": { backgroundColor: "action.selected" },
                  }}
                >
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    // color={conv.conversation_type === 'group' ? 'default' : (getOnlineStatus(conv) ? 'success' : 'error')}
                  >
                    <Avatar
                      sx={{
                        mr: 2,
                        bgcolor:
                          conv.conversation_type === "group"
                            ? "secondary.main"
                            : "primary.main",
                      }}
                    >
                      {getConversationName(conv).charAt(0)}
                    </Avatar>
                  </Badge>
                  <ListItemText
                    primary={
                      <Typography
                        fontWeight={conv.unreadCount > 0 ? "bold" : "normal"}
                      >
                        {getConversationName(conv)}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        noWrap
                        color={
                          conv.unreadCount > 0
                            ? "text.primary"
                            : "text.secondary"
                        }
                      >
                        {conv.lastMessage?.content || "No messages yet"}
                      </Typography>
                    }
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      ml: 2,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {conv.lastMessage
                        ? formatDistanceToNow(
                            new Date(conv.lastMessage.timestamp),
                            { addSuffix: true },
                          )
                        : ""}
                    </Typography>
                    {conv.unreadCount > 0 && (
                      <Badge
                        badgeContent={conv.unreadCount}
                        color="primary"
                        sx={{ mt: 0.5 }}
                      />
                    )}
                  </Box>
                  <IconButton onClick={(e) => handleMenuOpen(e, conv)}>
                    <MoreVertIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Sidebar>

      {activeChat ? (
        <ChatArea component={Paper} elevation={3}>
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid #e0e0e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ mr: 2 }}>
                {conversations
                  .find((c) => c.uuid === activeChat)
                  ?.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography fontWeight="bold">
                  {getConversationName(
                    conversations.find((c) => c.uuid === activeChat),
                  )}
                </Typography>
                {/* <Typography variant="caption" color="text.secondary">
                  {typingUsers.length > 0 
                    ? 'Typing...' 
                    : conversations.find(c => c.uuid === activeChat)?.conversation_type === 'group' 
                      ? `${conversations.find(c => c.uuid === activeChat)?.participants.length} members`
                      : getOnlineStatus(conversations.find(c => c.uuid === activeChat)) 
                        ? 'Online' 
                        : 'Offline'}
                </Typography> */}
              </Box>
            </Box>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flex: 1,
              p: 2,
              overflow: "auto",
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8))",
              backgroundSize: "cover",
            }}
          >
            {loading.messages ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <>
                {messages.length === 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      textAlign: "center",
                    }}
                  >
                    <Typography color="text.secondary">
                      No messages yet. Start the conversation!
                    </Typography>
                  </Box>
                ) : (
                  messages.map((msg) => (
                    <Box key={msg.uuid} sx={{ mb: 2 }}>
                      {!msg.isCurrentUser && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ ml: 6 }}
                        >
                          {msg.sender_username} •{" "}
                          {formatDistanceToNow(new Date(msg.timestamp), {
                            addSuffix: true,
                          })}
                        </Typography>
                      )}
                      <MessageBubble iscurrentuser={msg.isCurrentUser}>
                        {msg.content}
                      </MessageBubble>
                      {msg.isCurrentUser && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: "block",
                            textAlign: "right",
                            mr: 1,
                          }}
                        >
                          {formatDistanceToNow(new Date(msg.timestamp), {
                            addSuffix: true,
                          })}
                        </Typography>
                      )}
                    </Box>
                  ))
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </Box>

          <Box
            sx={{
              p: 2,
              borderTop: "1px solid #e0e0e0",
              backgroundColor: "background.paper",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton sx={{ mr: 1 }}>
                <AttachFileIcon />
              </IconButton>
              <IconButton sx={{ mr: 1 }}>
                <MoodIcon />
              </IconButton>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  handleTyping(true);
                }}
                onBlur={() => handleTyping(false)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "24px",
                    backgroundColor: "background.paper",
                  },
                }}
              />
              <IconButton
                onClick={sendMessage}
                disabled={!input.trim()}
                color="primary"
                sx={{ ml: 1 }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </ChatArea>
      ) : (
        <EmptyStateContainer>
          <EmptyStateContent>
            <Typography variant="h6" gutterBottom>
              Select a conversation
            </Typography>
            <Typography color="text.secondary" paragraph>
              Choose an existing chat from the sidebar or start a new
              conversation
            </Typography>
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={() => setModalOpen(true)}
              disabled={loading.newChat}
              sx={{ mt: 2 }}
            >
              {loading.newChat ? "Creating..." : "New Chat"}
            </Button>
          </EmptyStateContent>
        </EmptyStateContainer>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>View Profile</MenuItem>
        {selectedConversation?.conversation_type === "group" && (
          <MenuItem onClick={handleMenuClose}>
            <GroupAddIcon sx={{ mr: 1 }} /> Add Members
          </MenuItem>
        )}
        <MenuItem onClick={handleLeaveConversation}>
          <ExitToAppIcon sx={{ mr: 1 }} /> Leave Conversation
        </MenuItem>
      </Menu>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      <UserSearchModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreateChat={handleGetOrCreateChat}
      />
    </ChatContainer>
  );
};

export default Chat;
