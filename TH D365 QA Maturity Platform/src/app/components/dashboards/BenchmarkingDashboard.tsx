import { Card, CardContent, Typography, Grid, Box, Chip } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { TrendingUp, TrendingDown } from "@mui/icons-material";

const benchmarkComparison = [
  { metric: "Test Coverage", yourOrg: 87, industry: 75, leaders: 92, unit: "%" },
  { metric: "Automation Rate", yourOrg: 72, industry: 58, leaders: 85, unit: "%" },
  { metric: "Defect Density", yourOrg: 0.45, industry: 0.68, leaders: 0.32, unit: "per KLOC" },
  { metric: "Test Efficiency", yourOrg: 85, industry: 72, leaders: 90, unit: "%" },
];

const radarComparison = [
  { category: "Strategy", yourOrg: 85, industry: 70, leaders: 95 },
  { category: "Automation", yourOrg: 72, industry: 58, leaders: 88 },
  { category: "Tools", yourOrg: 78, industry: 65, leaders: 90 },
  { category: "Process", yourOrg: 82, industry: 68, leaders: 92 },
  { category: "Skills", yourOrg: 68, industry: 62, leaders: 85 },
  { category: "Metrics", yourOrg: 90, industry: 75, leaders: 95 },
];

const performanceMetrics = [
  { metric: "Time to Market", yourOrg: 42, industry: 58, leaders: 35, unit: "days" },
  { metric: "Release Frequency", yourOrg: 3.2, industry: 2.1, leaders: 5.5, unit: "per week" },
  { metric: "Test Execution Time", yourOrg: 45, industry: 72, leaders: 28, unit: "minutes" },
  { metric: "Mean Time to Repair", yourOrg: 1.8, industry: 3.2, leaders: 1.2, unit: "hours" },
];

const industryTrends = [
  {
    trend: "AI-Powered Test Generation",
    adoption: "Growing",
    yourStatus: "Piloting",
    impact: "High",
  },
  {
    trend: "Shift-Left Testing",
    adoption: "Mainstream",
    yourStatus: "Implemented",
    impact: "High",
  },
  {
    trend: "Continuous Testing",
    adoption: "Mainstream",
    yourStatus: "Implemented",
    impact: "High",
  },
  {
    trend: "Test Data Management",
    adoption: "Growing",
    yourStatus: "Planning",
    impact: "Medium",
  },
  {
    trend: "Performance Engineering",
    adoption: "Growing",
    yourStatus: "Piloting",
    impact: "Medium",
  },
];

const getPerformanceIcon = (yourValue: number, industryValue: number) => {
  // For some metrics, lower is better (e.g., time)
  const isBetter = yourValue < industryValue || yourValue > industryValue;
  return isBetter ? (
    <TrendingUp color="success" />
  ) : (
    <TrendingDown color="error" />
  );
};

const getAdoptionColor = (status: string) => {
  switch (status) {
    case "Implemented":
      return "success";
    case "Piloting":
      return "primary";
    case "Planning":
      return "warning";
    default:
      return "default";
  }
};

export default function BenchmarkingDashboard() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Benchmarking Dashboard
      </Typography>

      {/* Benchmark Comparison */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Industry Benchmark Comparison
          </Typography>
          <Box sx={{ overflow: "auto" }}>
            {benchmarkComparison.map((item, index) => (
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
                <Typography variant="body1" sx={{ minWidth: 180 }}>
                  {item.metric}
                </Typography>
                <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Your Org
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {item.yourOrg} {item.unit}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Industry Avg
                    </Typography>
                    <Typography variant="h6">
                      {item.industry} {item.unit}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Industry Leaders
                    </Typography>
                    <Typography variant="h6" color="success.main">
                      {item.leaders} {item.unit}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Capability Comparison
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarComparison}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Your Organization"
                    dataKey="yourOrg"
                    stroke="#2196f3"
                    fill="#2196f3"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Industry Average"
                    dataKey="industry"
                    stroke="#ff9800"
                    fill="#ff9800"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Industry Leaders"
                    dataKey="leaders"
                    stroke="#4caf50"
                    fill="#4caf50"
                    fillOpacity={0.3}
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Performance Metrics
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceMetrics} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="metric" type="category" width={150} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="yourOrg" fill="#2196f3" name="Your Org" />
                  <Bar dataKey="industry" fill="#ff9800" name="Industry Avg" />
                  <Bar dataKey="leaders" fill="#4caf50" name="Leaders" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Industry Trends */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Industry Trends & Your Adoption Status
          </Typography>
          <Grid container spacing={2}>
            {industryTrends.map((trend, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  sx={{
                    p: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    height: "100%",
                  }}
                >
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {trend.trend}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip
                      label={`Industry: ${trend.adoption}`}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={`You: ${trend.yourStatus}`}
                      color={getAdoptionColor(trend.yourStatus) as any}
                      size="small"
                    />
                    <Chip
                      label={`${trend.impact} Impact`}
                      color={trend.impact === "High" ? "error" : "warning"}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}