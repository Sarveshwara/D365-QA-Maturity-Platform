import { Card, CardContent, Typography, Grid, Box, Chip, LinearProgress } from "@mui/material";
import {
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
import { CheckCircle, Warning, Error as ErrorIcon, Schedule } from "@mui/icons-material";

const designScores = [
  { title: "Requirements Quality", value: 92, icon: <CheckCircle />, status: "Excellent" },
  { title: "Testability Index", value: 85, icon: <CheckCircle />, status: "Good" },
  { title: "Risk Coverage", value: 78, icon: <Warning />, status: "Fair" },
  { title: "Automation Readiness", value: 88, icon: <CheckCircle />, status: "Good" },
];

const shiftLeftMetrics = [
  { phase: "Requirements", defectsFound: 45, cost: 10 },
  { phase: "Design", defectsFound: 38, cost: 25 },
  { phase: "Development", defectsFound: 62, cost: 50 },
  { phase: "Integration", defectsFound: 28, cost: 100 },
  { phase: "System Test", defectsFound: 15, cost: 200 },
  { phase: "UAT", defectsFound: 8, cost: 500 },
  { phase: "Production", defectsFound: 2, cost: 2000 },
];

const preventionData = [
  { name: "Prevented", value: 145, color: "#4caf50" },
  { name: "Detected Early", value: 83, color: "#2196f3" },
  { name: "Detected Late", value: 25, color: "#ff9800" },
  { name: "Escaped", value: 2, color: "#f44336" },
];

const initiatives = [
  {
    name: "Test-Driven Development",
    adoption: 75,
    impact: "High",
    defectsPrevented: 45,
  },
  {
    name: "Code Reviews",
    adoption: 95,
    impact: "High",
    defectsPrevented: 62,
  },
  {
    name: "Static Code Analysis",
    adoption: 88,
    impact: "Medium",
    defectsPrevented: 38,
  },
  {
    name: "Unit Test Coverage",
    adoption: 82,
    impact: "High",
    defectsPrevented: 55,
  },
  {
    name: "Security Scanning",
    adoption: 70,
    impact: "Medium",
    defectsPrevented: 18,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Excellent":
      return "success";
    case "Good":
      return "primary";
    case "Fair":
      return "warning";
    default:
      return "error";
  }
};

export default function SuccessByDesignDashboard() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Success by Design Dashboard
      </Typography>

      {/* Design Quality Scores */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {designScores.map((score, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography color="text.secondary" variant="body2">
                    {score.title}
                  </Typography>
                  <Box sx={{ color: getStatusColor(score.status) + ".main" }}>{score.icon}</Box>
                </Box>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {score.value}%
                </Typography>
                <Chip label={score.status} color={getStatusColor(score.status) as any} size="small" />
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
                Shift-Left Analysis: Defects by Phase
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={shiftLeftMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="phase" />
                  <YAxis yAxisId="left" orientation="left" stroke="#2196f3" />
                  <YAxis yAxisId="right" orientation="right" stroke="#f44336" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="defectsFound"
                    fill="#2196f3"
                    name="Defects Found"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="cost"
                    fill="#f44336"
                    name="Cost to Fix ($)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Defect Prevention
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={preventionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {preventionData.map((entry, index) => (
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

      {/* Prevention Initiatives */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Prevention Initiatives
          </Typography>
          <Grid container spacing={2}>
            {initiatives.map((initiative, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box sx={{ p: 2, border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body1">{initiative.name}</Typography>
                    <Chip
                      label={`${initiative.impact} Impact`}
                      color={initiative.impact === "High" ? "success" : "primary"}
                      size="small"
                    />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 100 }}>
                      Adoption: {initiative.adoption}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={initiative.adoption}
                      sx={{ flex: 1, height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Defects Prevented: {initiative.defectsPrevented}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}