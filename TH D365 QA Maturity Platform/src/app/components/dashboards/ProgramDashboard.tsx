import { Card, CardContent, Typography, Grid, Box, LinearProgress, Chip } from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const kpiData = [
  {
    title: "Test Coverage",
    value: "87%",
    change: "+5%",
    trend: "up",
    color: "success.main",
  },
  {
    title: "Defect Density",
    value: "0.45",
    change: "-12%",
    trend: "up",
    color: "success.main",
  },
  {
    title: "Automation Rate",
    value: "72%",
    change: "+8%",
    trend: "up",
    color: "primary.main",
  },
  {
    title: "Critical Defects",
    value: "23",
    change: "+3",
    trend: "down",
    color: "error.main",
  },
];

const trendData = [
  { month: "Jan", coverage: 75, automation: 60, defects: 45 },
  { month: "Feb", coverage: 78, automation: 64, defects: 42 },
  { month: "Mar", coverage: 82, automation: 68, defects: 38 },
  { month: "Apr", coverage: 85, automation: 70, defects: 35 },
  { month: "May", coverage: 87, automation: 72, defects: 32 },
];

const statusData = [
  { name: "Passed", value: 450, color: "#4caf50" },
  { name: "Failed", value: 45, color: "#f44336" },
  { name: "Blocked", value: 12, color: "#ff9800" },
  { name: "In Progress", value: 78, color: "#2196f3" },
];

const recentTests = [
  { id: 1, name: "Login Flow Test", status: "Passed", coverage: 95, time: "2h ago" },
  { id: 2, name: "Payment Integration", status: "Failed", coverage: 78, time: "4h ago" },
  { id: 3, name: "User Registration", status: "Passed", coverage: 92, time: "5h ago" },
  { id: 4, name: "API Validation", status: "Blocked", coverage: 65, time: "6h ago" },
  { id: 5, name: "Data Migration", status: "In Progress", coverage: 82, time: "8h ago" },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Passed":
      return <CheckCircle color="success" />;
    case "Failed":
      return <ErrorIcon color="error" />;
    case "Blocked":
      return <Warning color="warning" />;
    default:
      return <TrendingUp color="primary" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Passed":
      return "success";
    case "Failed":
      return "error";
    case "Blocked":
      return "warning";
    default:
      return "primary";
  }
};

export default function ProgramDashboard() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Program Dashboard
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {kpiData.map((kpi, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom variant="body2">
                  {kpi.title}
                </Typography>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {kpi.value}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {kpi.trend === "up" ? (
                    <TrendingUp sx={{ color: kpi.color }} />
                  ) : (
                    <TrendingDown sx={{ color: kpi.color }} />
                  )}
                  <Typography variant="body2" sx={{ color: kpi.color }}>
                    {kpi.change} from last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Quality Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="coverage"
                    stroke="#2196f3"
                    name="Test Coverage %"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="automation"
                    stroke="#4caf50"
                    name="Automation %"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="defects"
                    stroke="#f44336"
                    name="Defects"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Test Status Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Tests Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Recent Test Executions
          </Typography>
          <Box sx={{ overflow: "auto" }}>
            {recentTests.map((test) => (
              <Box
                key={test.id}
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
                  {getStatusIcon(test.status)}
                  <Box>
                    <Typography variant="body1">{test.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {test.time}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ width: 120 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Coverage: {test.coverage}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={test.coverage}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  <Chip
                    label={test.status}
                    color={getStatusColor(test.status) as any}
                    size="small"
                    sx={{ minWidth: 100 }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}