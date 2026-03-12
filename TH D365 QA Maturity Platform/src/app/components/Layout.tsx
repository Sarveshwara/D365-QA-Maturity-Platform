import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  Badge,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard,
  Assessment,
  UploadFile,
  Psychology,
  BarChart,
  Settings,
  Notifications,
  Person,
  Speed,
  TrendingUp,
  CheckCircle,
  BugReport,
  Timeline,
  Science,
  ViewList,
  Analytics,
  Lightbulb,
  Description,
  People,
  AdminPanelSettings,
  ChevronRight,
} from "@mui/icons-material";
import testhouseLogo from "figma:asset/0586510c8391c25311f2496a3dde183ca9bcb462.png";

const drawerWidth = 280;

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    label: "Dashboards",
    path: "/",
    icon: <Dashboard />,
    children: [
      { label: "Program Dashboard", path: "/", icon: <Dashboard /> },
      { label: "Executive Dashboard", path: "/executive", icon: <Speed /> },
      { label: "QA Maturity", path: "/qa-maturity", icon: <CheckCircle /> },
      { label: "DevOps Maturity", path: "/devops-maturity", icon: <TrendingUp /> },
      { label: "Success by Design", path: "/success-by-design", icon: <Lightbulb /> },
      { label: "Benchmarking", path: "/benchmarking", icon: <BarChart /> },
      { label: "Defect Intelligence", path: "/defect-intelligence", icon: <BugReport /> },
    ],
  },
  {
    label: "Assessments",
    path: "/assessment/wizard",
    icon: <Assessment />,
    children: [
      { label: "Assessment Wizard", path: "/assessment/wizard", icon: <Assessment /> },
      { label: "Domain Selection", path: "/assessment/domain-selection", icon: <ViewList /> },
      { label: "Questionnaire", path: "/assessment/questionnaire", icon: <Description /> },
      { label: "Review", path: "/assessment/review", icon: <CheckCircle /> },
      { label: "Results", path: "/assessment/results", icon: <Analytics /> },
    ],
  },
  {
    label: "Artifacts",
    path: "/artifacts/upload",
    icon: <UploadFile />,
    children: [
      { label: "Upload", path: "/artifacts/upload", icon: <UploadFile /> },
      { label: "Integration", path: "/artifacts/integration", icon: <Timeline /> },
      { label: "Processing Status", path: "/artifacts/status", icon: <TrendingUp /> },
    ],
  },
  {
    label: "Intelligence",
    path: "/intelligence/traceability",
    icon: <Psychology />,
    children: [
      { label: "Traceability Graph", path: "/intelligence/traceability", icon: <Timeline /> },
      { label: "Test Intelligence", path: "/intelligence/test-workspace", icon: <Science /> },
      { label: "Generated Tests", path: "/intelligence/generated-tests", icon: <ViewList /> },
      { label: "Test Impact Analysis", path: "/intelligence/test-impact", icon: <Analytics /> },
    ],
  },
  {
    label: "Reports",
    path: "/reports/recommendations",
    icon: <BarChart />,
    children: [
      { label: "Recommendations", path: "/reports/recommendations", icon: <Lightbulb /> },
      { label: "Report Generator", path: "/reports/generator", icon: <Description /> },
    ],
  },
  {
    label: "Administration",
    path: "/admin/users",
    icon: <Settings />,
    children: [
      { label: "Users & Roles", path: "/admin/users", icon: <People /> },
      { label: "Platform Settings", path: "/admin/settings", icon: <AdminPanelSettings /> },
      { label: "Notifications", path: "/admin/notifications", icon: <Notifications /> },
    ],
  },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(["Dashboards"]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    navigate("/login");
  };

  const drawer = (
    <Box>
      <Toolbar sx={{ bgcolor: "primary.main", color: "white", display: "flex", alignItems: "center", gap: 2 }}>
        <img 
          src={testhouseLogo} 
          alt="Testhouse Logo" 
          style={{ height: "40px", objectFit: "contain" }}
        />
      </Toolbar>
      <Divider />
      <List>
        {navigationItems.map((item) => (
          <Box key={item.label}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  if (item.children) {
                    toggleExpand(item.label);
                  } else {
                    handleNavigation(item.path);
                  }
                }}
                selected={location.pathname === item.path && !item.children}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
                {item.children && (
                  <ChevronRight
                    sx={{
                      transform: expandedItems.includes(item.label)
                        ? "rotate(90deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
            {item.children && expandedItems.includes(item.label) && (
              <List sx={{ pl: 2 }}>
                {item.children.map((child) => (
                  <ListItem key={child.label} disablePadding>
                    <ListItemButton
                      onClick={() => handleNavigation(child.path)}
                      selected={location.pathname === child.path}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>{child.icon}</ListItemIcon>
                      <ListItemText primary={child.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Quality Assurance Platform
          </Typography>
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton onClick={handleProfileMenuOpen} color="inherit">
            <Avatar sx={{ width: 32, height: 32 }}>
              <Person />
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>My Account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          bgcolor: "grey.100",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}