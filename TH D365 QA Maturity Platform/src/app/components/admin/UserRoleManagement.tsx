import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Add, Search, MoreVert, Edit, Delete, PersonAdd } from "@mui/icons-material";

const users = [
  { id: 1, name: "John Smith", email: "john.smith@example.com", role: "Admin", status: "Active", lastLogin: "2 hours ago" },
  { id: 2, name: "Sarah Johnson", email: "sarah.j@example.com", role: "QA Manager", status: "Active", lastLogin: "1 day ago" },
  { id: 3, name: "Mike Chen", email: "mike.chen@example.com", role: "Test Engineer", status: "Active", lastLogin: "3 hours ago" },
  { id: 4, name: "Emily Davis", email: "emily.d@example.com", role: "Test Engineer", status: "Active", lastLogin: "5 hours ago" },
  { id: 5, name: "Robert Wilson", email: "robert.w@example.com", role: "Viewer", status: "Inactive", lastLogin: "2 weeks ago" },
];

const roles = [
  {
    name: "Admin",
    description: "Full system access and configuration",
    permissions: ["All Permissions"],
    userCount: 2,
  },
  {
    name: "QA Manager",
    description: "Manage tests, view reports, configure settings",
    permissions: ["Manage Tests", "View Reports", "Configure Settings", "Manage Users"],
    userCount: 3,
  },
  {
    name: "Test Engineer",
    description: "Create and execute tests, view reports",
    permissions: ["Create Tests", "Execute Tests", "View Reports"],
    userCount: 8,
  },
  {
    name: "Viewer",
    description: "Read-only access to dashboards and reports",
    permissions: ["View Dashboards", "View Reports"],
    userCount: 5,
  },
];

const getRoleColor = (role: string) => {
  switch (role) {
    case "Admin":
      return "error";
    case "QA Manager":
      return "primary";
    case "Test Engineer":
      return "success";
    default:
      return "default";
  }
};

export default function UserRoleManagement() {
  const [activeTab, setActiveTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">User & Role Management</Typography>
        <Button variant="contained" startIcon={<PersonAdd />}>
          Add User
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 3 }}>
            <Tab label="Users" />
            <Tab label="Roles & Permissions" />
          </Tabs>

          {activeTab === 0 && (
            <Box>
              {/* Search */}
              <TextField
                fullWidth
                placeholder="Search users..."
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Users Table */}
              <Box>
                {users.map((user) => (
                  <Box
                    key={user.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 2,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      "&:last-child": { borderBottom: "none" },
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1">{user.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Chip label={user.role} color={getRoleColor(user.role) as any} size="small" />
                      <Chip
                        label={user.status}
                        color={user.status === "Active" ? "success" : "default"}
                        size="small"
                        variant="outlined"
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ minWidth: 100 }}>
                        {user.lastLogin}
                      </Typography>
                      <IconButton onClick={handleMenuClick}>
                        <MoreVert />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>
                  <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Delete fontSize="small" sx={{ mr: 1 }} /> Deactivate
                </MenuItem>
              </Menu>
            </Box>
          )}

          {activeTab === 1 && (
            <Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
                <Button variant="outlined" startIcon={<Add />}>
                  Create Custom Role
                </Button>
              </Box>

              {/* Roles */}
              <Box sx={{ display: "grid", gap: 2 }}>
                {roles.map((role, index) => (
                  <Card key={index} variant="outlined">
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                            <Typography variant="h6">{role.name}</Typography>
                            <Chip label={`${role.userCount} users`} size="small" />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {role.description}
                          </Typography>
                        </Box>
                        <IconButton>
                          <Edit />
                        </IconButton>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {role.permissions.map((perm, idx) => (
                          <Chip key={idx} label={perm} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
