import { Card, CardContent, Typography, Grid, Box, Chip, LinearProgress } from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { BugReport, TrendingDown, Warning, CheckCircle } from "@mui/icons-material";

const defectKPIs = [
  { title: "Open Defects", value: "127", change: "-12", trend: "down", icon: <BugReport /> },
  { title: "Critical Issues", value: "8", change: "-3", trend: "down", icon: <Warning /> },
  { title: "Avg Resolution Time", value: "2.3 days", change: "-0.5", trend: "down", icon: <CheckCircle /> },
  { title: "Defect Escape Rate", value: "3.2%", change: "-0.8%", trend: "down", icon: <TrendingDown /> },
];

const defectTrends = [
  { week: "Week 1", opened: 45, closed: 38, critical: 5 },
  { week: "Week 2", opened: 52, closed: 42, critical: 6 },
  { week: "Week 3", opened: 38, closed: 48, critical: 4 },
  { week: "Week 4", week: 42, closed: 55, critical: 3 },
  { week: "Week 5", opened: 35, closed: 52, critical: 2 },
];

const defectsByCategory = [
  { name: "Functional", value: 45, color: "#2196f3" },
  { name: "UI/UX", value: 28, color: "#4caf50" },
  { name: "Performance", value: 18, color: "#ff9800" },
  { name: "Security", value: 15, color: "#f44336" },
  { name: "Integration", value: 21, color: "#9c27b0" },
];

const defectsByPriority = [
  { priority: "Critical", count: 8, avgAge: "1.2 days", sla: "24 hrs" },
  { priority: "High", count: 23, avgAge: "2.8 days", sla: "3 days" },
  { priority: "Medium", count: 56, avgAge: "5.2 days", sla: "7 days" },
  { priority: "Low", count: 40, avgAge: "12.5 days", sla: "14 days" },
];

const rootCauses = [
  { cause: "Requirements Gap", count: 32, percentage: 25 },
  { cause: "Code Defect", count: 45, percentage: 35 },
  { cause: "Integration Issue", count: 18, percentage: 14 },
  { cause: "Configuration", count: 15, percentage: 12 },
  { cause: "Data Issue", count: 12, percentage: 9 },
  { cause: "Environment", count: 6, percentage: 5 },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Critical":
      return "error";
    case "High":
      return "warning";
    case "Medium":
      return "primary";
    default:
      return "default";
  }
};

export default function DefectIntelligenceDashboard() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Defect Intelligence Dashboard
      </Typography>

      {/* KPIs */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {defectKPIs.map((kpi, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography color="text.secondary" variant="body2">
                    {kpi.title}
                  </Typography>
                  <Box sx={{ color: "primary.main" }}>{kpi.icon}</Box>
                </Box>
                <Typography variant="h4" sx={{ mb: 0.5 }}>
                  {kpi.value}
                </Typography>
                <Typography variant="body2" color="success.main">
                  {kpi.change} from last week
                </Typography>
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
                Defect Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={defectTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="opened"
                    stroke="#f44336"
                    strokeWidth={2}
                    name="Opened"
                  />
                  <Line
                    type="monotone"
                    dataKey="closed"
                    stroke="#4caf50"
                    strokeWidth={2}
                    name="Closed"
                  />
                  <Line
                    type="monotone"
                    dataKey="critical"
                    stroke="#ff9800"
                    strokeWidth={2}
                    name="Critical"
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
                Defects by Category
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={defectsByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {defectsByCategory.map((entry, index) => (
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

      {/* Defects by Priority */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Defects by Priority
              </Typography>
              <Box>
                {defectsByPriority.map((item, index) => (
                  <Box
                    key={index}
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
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 0.5 }}>
                        <Chip
                          label={item.priority}
                          color={getPriorityColor(item.priority) as any}
                          size="small"
                        />
                        <Typography variant="h6">{item.count}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Avg Age: {item.avgAge} (SLA: {item.sla})
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Root Cause Analysis
              </Typography>
              <Box>
                {rootCauses.map((cause, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography variant="body2">{cause.cause}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {cause.count} ({cause.percentage}%)
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={cause.percentage}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
