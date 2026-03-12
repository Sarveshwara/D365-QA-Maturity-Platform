import { Card, CardContent, Typography, Grid, Box, Chip } from "@mui/material";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
import { TrendingUp, Speed, AttachMoney, CheckCircle } from "@mui/icons-material";

const executiveKPIs = [
  { title: "Quality Score", value: "8.7/10", change: "+0.3", icon: <Speed color="primary" /> },
  { title: "ROI on Testing", value: "$2.4M", change: "+18%", icon: <AttachMoney color="success" /> },
  { title: "Time to Market", value: "42 days", change: "-8 days", icon: <TrendingUp color="info" /> },
  { title: "Release Success", value: "96%", change: "+4%", icon: <CheckCircle color="success" /> },
];

const maturityData = [
  { subject: "Test Strategy", A: 85, fullMark: 100 },
  { subject: "Automation", A: 72, fullMark: 100 },
  { subject: "Metrics", A: 90, fullMark: 100 },
  { subject: "Tools", A: 78, fullMark: 100 },
  { subject: "Skills", A: 68, fullMark: 100 },
  { subject: "Process", A: 82, fullMark: 100 },
];

const costData = [
  { quarter: "Q1 2025", manual: 120, automated: 45, prevented: 85 },
  { quarter: "Q2 2025", manual: 110, automated: 52, prevented: 95 },
  { quarter: "Q3 2025", manual: 95, automated: 58, prevented: 110 },
  { quarter: "Q4 2025", manual: 85, automated: 65, prevented: 125 },
  { quarter: "Q1 2026", manual: 78, automated: 72, prevented: 140 },
];

const projects = [
  { name: "E-Commerce Platform", health: "Excellent", coverage: 92, velocity: "High", defects: 5 },
  { name: "Mobile App v3", health: "Good", coverage: 85, velocity: "Medium", defects: 12 },
  { name: "Payment Gateway", health: "Excellent", coverage: 95, velocity: "High", defects: 3 },
  { name: "CRM Integration", health: "Fair", coverage: 68, velocity: "Low", defects: 23 },
  { name: "Analytics Dashboard", health: "Good", coverage: 88, velocity: "High", defects: 8 },
];

const getHealthColor = (health: string) => {
  switch (health) {
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

export default function ExecutiveDashboard() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Executive Dashboard
      </Typography>

      {/* Executive KPIs */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {executiveKPIs.map((kpi, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography color="text.secondary" variant="body2">
                    {kpi.title}
                  </Typography>
                  {kpi.icon}
                </Box>
                <Typography variant="h4" sx={{ mb: 0.5 }}>
                  {kpi.value}
                </Typography>
                <Typography variant="body2" color="success.main">
                  {kpi.change} vs. last period
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Cost Analysis & ROI
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={costData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="manual" fill="#f44336" name="Manual Testing Cost ($K)" />
                  <Bar dataKey="automated" fill="#2196f3" name="Automated Testing Cost ($K)" />
                  <Bar dataKey="prevented" fill="#4caf50" name="Defect Cost Prevented ($K)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                QA Maturity Index
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={maturityData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Current Maturity"
                    dataKey="A"
                    stroke="#2196f3"
                    fill="#2196f3"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Project Health Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Project Portfolio Health
          </Typography>
          <Box sx={{ overflow: "auto" }}>
            {projects.map((project, index) => (
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
                  <Typography variant="body1">{project.name}</Typography>
                  <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Coverage: {project.coverage}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Velocity: {project.velocity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Open Defects: {project.defects}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={project.health}
                  color={getHealthColor(project.health) as any}
                  sx={{ minWidth: 100 }}
                />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}