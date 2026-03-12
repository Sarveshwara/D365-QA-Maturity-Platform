import { Card, CardContent, Typography, Grid, Box, LinearProgress, Chip } from "@mui/material";
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

const maturityLevels = [
  { domain: "Test Strategy & Planning", current: 4, target: 5, level: "Optimizing" },
  { domain: "Test Automation", current: 3, target: 4, level: "Defined" },
  { domain: "Test Data Management", current: 3, target: 5, level: "Defined" },
  { domain: "CI/CD Integration", current: 4, target: 5, level: "Managed" },
  { domain: "Defect Management", current: 4, target: 5, level: "Managed" },
  { domain: "Test Metrics & Analytics", current: 5, target: 5, level: "Optimizing" },
];

const radarData = [
  { capability: "Strategy", current: 85, target: 100 },
  { capability: "Automation", current: 72, target: 95 },
  { capability: "Data Mgmt", current: 68, target: 90 },
  { capability: "CI/CD", current: 80, target: 95 },
  { capability: "Defects", current: 88, target: 100 },
  { capability: "Metrics", current: 92, target: 100 },
  { capability: "Tools", current: 75, target: 90 },
  { capability: "Skills", current: 70, target: 85 },
];

const progressData = [
  { period: "6mo ago", score: 62 },
  { period: "5mo ago", score: 68 },
  { period: "4mo ago", score: 72 },
  { period: "3mo ago", score: 76 },
  { period: "2mo ago", score: 78 },
  { period: "1mo ago", score: 82 },
  { period: "Current", score: 85 },
];

const recommendations = [
  {
    priority: "High",
    area: "Test Automation",
    recommendation: "Increase API test automation coverage to 90%",
    impact: "High",
  },
  {
    priority: "High",
    area: "Test Data Management",
    recommendation: "Implement synthetic test data generation",
    impact: "Medium",
  },
  {
    priority: "Medium",
    area: "Skills Development",
    recommendation: "Conduct advanced automation training for team",
    impact: "High",
  },
  {
    priority: "Medium",
    area: "CI/CD Integration",
    recommendation: "Add performance testing to pipeline",
    impact: "Medium",
  },
  {
    priority: "Low",
    area: "Documentation",
    recommendation: "Standardize test case documentation format",
    impact: "Low",
  },
];

const getLevelColor = (level: number) => {
  if (level >= 4) return "success";
  if (level === 3) return "primary";
  if (level === 2) return "warning";
  return "error";
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "error";
    case "Medium":
      return "warning";
    default:
      return "info";
  }
};

export default function QAMaturityDashboard() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        QA Maturity Dashboard
      </Typography>

      {/* Overall Score */}
      <Card sx={{ mb: 3, bgcolor: "primary.main", color: "white" }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Overall QA Maturity Score
          </Typography>
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 2 }}>
            <Typography variant="h2">85</Typography>
            <Typography variant="h5">/100</Typography>
            <Chip label="+3 from last month" sx={{ bgcolor: "white", color: "primary.main" }} />
          </Box>
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
            Level 4: Managed - On track to reach Optimizing level
          </Typography>
        </CardContent>
      </Card>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Maturity by Capability
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="capability" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Current"
                    dataKey="current"
                    stroke="#2196f3"
                    fill="#2196f3"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Target"
                    dataKey="target"
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
                Maturity Progress
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#2196f3" name="Maturity Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Domain Maturity Levels */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Maturity by Domain
          </Typography>
          <Grid container spacing={2}>
            {maturityLevels.map((domain, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box sx={{ p: 2, border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body1">{domain.domain}</Typography>
                    <Chip
                      label={domain.level}
                      color={getLevelColor(domain.current) as any}
                      size="small"
                    />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
                      Level {domain.current}/5
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(domain.current / 5) * 100}
                      sx={{ flex: 1, height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Target: {domain.target}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Improvement Recommendations
          </Typography>
          <Box sx={{ overflow: "auto" }}>
            {recommendations.map((rec, index) => (
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
                  <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                    <Chip
                      label={rec.priority}
                      color={getPriorityColor(rec.priority) as any}
                      size="small"
                    />
                    <Chip label={rec.area} variant="outlined" size="small" />
                  </Box>
                  <Typography variant="body1">{rec.recommendation}</Typography>
                </Box>
                <Chip label={`${rec.impact} Impact`} variant="outlined" size="small" />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}