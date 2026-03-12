import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Badge,
  Button,
} from "@mui/material";
import {
  Notifications,
  CheckCircle,
  Error as ErrorIcon,
  Warning,
  Info,
  Delete,
  MarkEmailRead,
} from "@mui/icons-material";

const notifications = [
  {
    id: 1,
    type: "error",
    title: "Test Execution Failed",
    message: "Login flow test suite failed with 3 critical errors",
    time: "5 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "warning",
    title: "Coverage Threshold Alert",
    message: "Code coverage dropped below 80% threshold (currently 78%)",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "success",
    title: "Assessment Completed",
    message: "Q1 2026 QA Maturity Assessment has been completed successfully",
    time: "2 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "info",
    title: "New Report Available",
    message: "Sprint 42 Test Execution Report is ready for download",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "warning",
    title: "Integration Sync Warning",
    message: "Jira integration sync failed. Retrying in 5 minutes",
    time: "4 hours ago",
    read: false,
  },
  {
    id: 6,
    type: "success",
    title: "AI Tests Generated",
    message: "12 new test cases generated for Payment module",
    time: "6 hours ago",
    read: true,
  },
  {
    id: 7,
    type: "error",
    title: "Critical Defect Detected",
    message: "Security vulnerability found in authentication module",
    time: "1 day ago",
    read: true,
  },
  {
    id: 8,
    type: "info",
    title: "System Maintenance Scheduled",
    message: "Platform maintenance scheduled for Sunday 2:00 AM - 4:00 AM",
    time: "2 days ago",
    read: true,
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircle color="success" />;
    case "error":
      return <ErrorIcon color="error" />;
    case "warning":
      return <Warning color="warning" />;
    default:
      return <Info color="info" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "success":
      return "success";
    case "error":
      return "error";
    case "warning":
      return "warning";
    default:
      return "info";
  }
};

export default function NotificationCenter() {
  const [activeTab, setActiveTab] = useState(0);

  const filteredNotifications =
    activeTab === 0
      ? notifications
      : activeTab === 1
      ? notifications.filter((n) => !n.read)
      : notifications.filter((n) => n.read);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Notifications fontSize="large" color="primary" />
          <Box>
            <Typography variant="h4">Notification Center</Typography>
            <Typography variant="body2" color="text.secondary">
              {unreadCount} unread notifications
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" startIcon={<MarkEmailRead />}>
            Mark All as Read
          </Button>
          <Button variant="outlined" startIcon={<Delete />}>
            Clear All
          </Button>
        </Box>
      </Box>

      <Card>
        <CardContent>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 2 }}>
            <Tab
              label={
                <Badge badgeContent={unreadCount} color="error">
                  <Box sx={{ pr: 2 }}>All</Box>
                </Badge>
              }
            />
            <Tab label={`Unread (${unreadCount})`} />
            <Tab label="Read" />
          </Tabs>

          <Box>
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                variant="outlined"
                sx={{
                  mb: 1,
                  bgcolor: notification.read ? "background.paper" : "action.hover",
                  border: notification.read ? 1 : 2,
                  borderColor: notification.read ? "divider" : `${getTypeColor(notification.type)}.main`,
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                    <Box sx={{ mt: 0.5 }}>{getTypeIcon(notification.type)}</Box>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                        <Typography variant="body1">{notification.title}</Typography>
                        {!notification.read && (
                          <Chip label="New" color="primary" size="small" />
                        )}
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {notification.time}
                      </Typography>
                    </Box>
                    <IconButton size="small">
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}

            {filteredNotifications.length === 0 && (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Notifications sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No notifications
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  You're all caught up!
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
