import { Card, CardContent, Typography, Box, Grid, Chip, Button } from "@mui/material";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Download, Share, CheckCircle } from "@mui/icons-material";

const radarData = [
  { domain: "Strategy", current: 4.0, target: 5.0 },
  { domain: "Automation", current: 3.0, target: 4.5 },
  { domain: "CI/CD", current: 4.0, target: 5.0 },
  { domain: "Defects", current: 3.5, target: 4.5 },
  { domain: "Data Mgmt", current: 2.5, target: 4.0 },
  { domain: "Metrics", current: 4.5, target: 5.0 },
];

const domainScores = [
  { domain: "Test Strategy", score: 4.0, level: "Managed", gap: 1.0 },
  { domain: "Test Automation", score: 3.0, level: "Defined", gap: 1.5 },
  { domain: "CI/CD Integration", score: 4.0, level: "Managed", gap: 1.0 },
  { domain: "Defect Management", score: 3.5, level: "Defined", gap: 1.0 },
  { domain: "Test Data Management", score: 2.5, level: "Repeatable", gap: 1.5 },
  { domain: "Metrics & Reporting", score: 4.5, level: "Managed", gap: 0.5 },
];

const recommendations = [
  {
    priority: "High",
    area: "Test Automation",
    recommendation: "Increase automation coverage from 60% to 85%",
    impact: "Reduce regression testing time by 40%",
  },
  {
    priority: "High",
    area: "Test Data Management",
    recommendation: "Implement synthetic test data generation",
    impact: "Improve data availability and reduce risks",
  },
  {
    priority: "Medium",
    area: "CI/CD Integration",
    recommendation: "Add performance testing to pipeline",
    impact: "Earlier detection of performance issues",
  },
  {
    priority: "Medium",
    area: "Metrics & Reporting",
    recommendation: "Implement real-time quality dashboards",
    impact: "Better visibility into quality status",
  },
];

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

export default function AssessmentResults() {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
          <Typography variant="h4">Assessment Results</Typography>
          <Typography variant="body2" color="text.secondary">
            Completed on March 12, 2026
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" startIcon={<Share />}>
            Share
          </Button>
          <Button variant="contained" startIcon={<Download />}>
            Export Report
          </Button>
        </Box>
      </Box>

      {/* Overall Score */}
      <Card sx={{ mb: 3, bgcolor: "success.main", color: "white" }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CheckCircle sx={{ fontSize: 48 }} />
            <Box>
              <Typography variant="h3">3.6 / 5.0</Typography>
              <Typography variant="h6">Overall Maturity Score</Typography>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                Level 3-4: Defined to Managed - Good progress toward optimization
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Maturity by Domain
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="domain" />
                  <PolarRadiusAxis angle={90} domain={[0, 5]} />
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
                Gap Analysis
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={domainScores} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 5]} />
                  <YAxis dataKey="domain" type="category" width={120} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#2196f3" name="Current Score" />
                  <Bar dataKey="gap" fill="#f44336" name="Gap to Target" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Domain Scores */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Detailed Scores by Domain
          </Typography>
          <Box>
            {domainScores.map((domain, index) => (
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
                  <Typography variant="body1">{domain.domain}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Maturity Level: {domain.level}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Chip label={`Score: ${domain.score.toFixed(1)}`} color="primary" />
                  <Chip
                    label={`Gap: ${domain.gap.toFixed(1)}`}
                    color={domain.gap > 1 ? "error" : "warning"}
                    variant="outlined"
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Key Recommendations
          </Typography>
          <Box>
            {recommendations.map((rec, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  "&:last-child": { borderBottom: "none" },
                }}
              >
                <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                  <Chip
                    label={rec.priority}
                    color={getPriorityColor(rec.priority) as any}
                    size="small"
                  />
                  <Chip label={rec.area} variant="outlined" size="small" />
                </Box>
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                  {rec.recommendation}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Expected Impact: {rec.impact}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
