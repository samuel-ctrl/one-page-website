import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  CircularProgress,
  Chip,
  Avatar,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { apiRequest, getUrlFor } from "../../common/utils";
import { urlPatterns } from "../../common/endpoints";

const UserSearchModal = ({ open, onClose, onCreateChat }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const searchUsers = async () => {
      try {
        setLoading(true);
        const res = await apiRequest({
          url: getUrlFor({
            path: urlPatterns.USER_SEARCH({
              userName: searchQuery,
            }),
          }),
        });
        setUsers(res);
      } catch (err) {
        setError("Failed to search users");
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        searchUsers();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleUserSelect = (user) => {
    setSelectedUsers((prev) =>
      prev.some((u) => u.uuid === user.uuid)
        ? prev.filter((u) => u.uuid !== user.uuid)
        : [...prev, user],
    );
  };

  const handleSubmit = () => {
    onCreateChat(selectedUsers);
    onClose();
    setSelectedUsers([]);
    setSearchQuery("");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Start New Chat
        <div style={{ marginTop: 8 }}>
          {selectedUsers.map((user) => (
            <Chip
              key={user.uuid}
              label={user.username}
              onDelete={() => handleUserSelect(user)}
              avatar={<Avatar>{user.avatar}</Avatar>}
              sx={{ m: 0.5 }}
            />
          ))}
        </div>
      </DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          variant="outlined"
          placeholder="Search people..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
          }}
          sx={{ my: 2 }}
        />

        {loading ? (
          <CircularProgress sx={{ display: "block", mx: "auto" }} />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <List sx={{ maxHeight: 400, overflow: "auto" }}>
            {users.map((user) => (
              <ListItem key={user.uuid} disablePadding>
                <ListItemButton onClick={() => handleUserSelect(user)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedUsers.some((u) => u.uuid === user.uuid)}
                    />
                  </ListItemIcon>
                  <Avatar sx={{ mr: 2 }}>{user.avatar}</Avatar>
                  <ListItemText
                    primary={user.username}
                    secondary={user.email}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={selectedUsers.length === 0}
          sx={{ mt: 2, float: "right" }}
        >
          Start Chat
        </Button>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ mt: 2, mr: 2, float: "right" }}
        >
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UserSearchModal;
