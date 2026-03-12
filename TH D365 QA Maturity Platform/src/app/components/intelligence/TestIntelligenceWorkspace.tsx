import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  Button,
  LinearProgress,
} from "@mui/material";
import { Psychology, AutoAwesome, TrendingUp, BugReport } from "@mui/icons-material";

const aiInsights = [
  {
    title: "High-Risk Areas Detected",
    description: "Payment module shows 35% higher defect density",
    severity: "high",
    recommendation: "Increase test coverage for payment flows",
  },
  {
    title: "Test Optimization Opportunity",
    description: "12 redundant test cases identified in login suite",
    severity: "medium",
    recommendation: "Consolidate duplicate test scenarios",
  },
  {
    title: "Coverage Gap",
    description: "Authentication edge cases have 0% coverage",
    severity: "high",
    recommendation: "Generate tests for OAuth error scenarios",
  },
  {
    title: "Performance Trend",
    description: "API response times degrading over last 5 builds",
    severity: "medium",
    recommendation: "Add performance regression tests",
  },
];

const testRecommendations = [
  { area: "Payment Integration", priority: "High", tests: 12, confidence: 95 },
  { area: "User Authentication", priority: "High", tests: 8, confidence: 92 },
  { area: "Data Validation", priority: "Medium", tests: 15, confidence: 88 },
  { area: "Error Handling", priority: "Medium", tests: 10, confidence: 85 },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "error";
    case "medium":
      return "warning";
    default:
      return "info";
  }
};

export default function TestIntelligenceWorkspace() {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Psychology fontSize="large" color="primary" />
        <Box>
          <Typography variant="h4">Test Intelligence Workspace</Typography>
          <Typography variant="body2" color="text.secondary">
            AI-powered insights and test recommendations
          </Typography>
        </Box>
      </Box>

      {/* AI Metrics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography color="text.secondary" variant="body2">
                  AI Insights
                </Typography>
                <AutoAwesome color="primary" />
              </Box>
              <Typography variant="h4">24</Typography>
              <Typography variant="body2" color="success.main">
                +6 this week
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography color="text.secondary" variant="body2">
                  Tests Generated
                </Typography>
                <TrendingUp color="success" />
              </Box>
              <Typography variant="h4">156</Typography>
              <Typography variant="body2" color="success.main">
                92% accuracy
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography color="text.secondary" variant="body2">
                  Risks Identified
                </Typography>
                <BugReport color="error" />
              </Box>
              <Typography variant="h4">8</Typography>
              <Typography variant="body2" color="error.main">
                Requires attention
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography color="text.secondary" variant="body2">
                  Confidence Score
                </Typography>
                <Psychology color="primary" />
              </Box>
              <Typography variant="h4">89%</Typography>
              <Typography variant="body2" color="success.main">
                High accuracy
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* AI Insights */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            AI-Generated Insights
          </Typography>
          <Grid container spacing={2}>
            {aiInsights.map((insight, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                      <Chip
                        label={insight.severity}
                        color={getSeverityColor(insight.severity) as any}
                        size="small"
                      />
                      <AutoAwesome fontSize="small" color="primary" />
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {insight.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {insight.description}
                    </Typography>
                    <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                      💡 {insight.recommendation}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Test Recommendations */}
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">AI Test Recommendations</Typography>
            <Button variant="contained" size="small">
              Generate All Tests
            </Button>
          </Box>
          <Box>
            {testRecommendations.map((rec, index) => (
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
                      color={rec.priority === "High" ? "error" : "warning"}
                      size="small"
                    />
                    <Typography variant="body1">{rec.area}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {rec.tests} tests recommended
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Confidence: {rec.confidence}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={rec.confidence}
                      sx={{ height: 4, borderRadius: 2, mt: 0.5 }}
                    />
                  </Box>
                </Box>
                <Button variant="outlined" size="small">
                  Generate Tests
                </Button>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
