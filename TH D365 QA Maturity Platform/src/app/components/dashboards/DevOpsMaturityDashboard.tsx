import { Card, CardContent, Typography, Grid, Box, LinearProgress, Chip } from "@mui/material";
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
} from "recharts";
import { Speed, Code, Cloud, Security } from "@mui/icons-material";

const devopsKPIs = [
  { title: "Deployment Frequency", value: "3.2/day", change: "+15%", icon: <Speed /> },
  { title: "Lead Time", value: "4.2 hrs", change: "-22%", icon: <Code /> },
  { title: "MTTR", value: "1.8 hrs", change: "-18%", icon: <Cloud /> },
  { title: "Change Fail Rate", value: "4.2%", change: "-2.1%", icon: <Security /> },
];

const pipelineData = [
  { week: "Week 1", builds: 245, tests: 1850, deployments: 95, failures: 12 },
  { week: "Week 2", builds: 268, tests: 2020, deployments: 102, failures: 9 },
  { week: "Week 3", builds: 282, tests: 2150, deployments: 108, failures: 8 },
  { week: "Week 4", builds: 295, tests: 2280, deployments: 115, failures: 6 },
];

const cicdMetrics = [
  { name: "Build Success Rate", value: 96, target: 98 },
  { name: "Test Pass Rate", value: 94, target: 95 },
  { name: "Deployment Success", value: 97, target: 99 },
  { name: "Code Coverage", value: 87, target: 90 },
  { name: "Security Scan Pass", value: 92, target: 95 },
];

const pipelineStages = [
  { stage: "Code Commit", avgTime: "2 min", status: "Excellent" },
  { stage: "Build", avgTime: "8 min", status: "Good" },
  { stage: "Unit Tests", avgTime: "12 min", status: "Good" },
  { stage: "Integration Tests", avgTime: "18 min", status: "Fair" },
  { stage: "Security Scan", avgTime: "6 min", status: "Excellent" },
  { stage: "Deploy to Staging", avgTime: "5 min", status: "Good" },
  { stage: "E2E Tests", avgTime: "25 min", status: "Fair" },
  { stage: "Deploy to Prod", avgTime: "8 min", status: "Excellent" },
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

export default function DevOpsMaturityDashboard() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        DevOps Maturity Dashboard
      </Typography>

      {/* KPIs */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {devopsKPIs.map((kpi, index) => (
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
                  {kpi.change} improvement
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
                CI/CD Pipeline Activity
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={pipelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="builds" stroke="#2196f3" strokeWidth={2} />
                  <Line type="monotone" dataKey="tests" stroke="#4caf50" strokeWidth={2} />
                  <Line type="monotone" dataKey="deployments" stroke="#9c27b0" strokeWidth={2} />
                  <Line type="monotone" dataKey="failures" stroke="#f44336" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                CI/CD Metrics
              </Typography>
              <Box>
                {cicdMetrics.map((metric, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography variant="body2">{metric.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {metric.value}% / {metric.target}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={metric.value}
                      sx={{ height: 8, borderRadius: 4 }}
                      color={metric.value >= metric.target ? "success" : "primary"}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pipeline Stages */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Pipeline Stage Performance
          </Typography>
          <Grid container spacing={2}>
            {pipelineStages.map((stage, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    p: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    height: "100%",
                  }}
                >
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {stage.stage}
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {stage.avgTime}
                  </Typography>
                  <Chip
                    label={stage.status}
                    color={getStatusColor(stage.status) as any}
                    size="small"
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}