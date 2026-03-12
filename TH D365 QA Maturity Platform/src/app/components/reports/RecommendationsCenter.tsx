import { Card, CardContent, Typography, Box, Grid, Chip, Button, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { Lightbulb, TrendingUp, CheckCircle, Schedule } from "@mui/icons-material";

const recommendations = [
  {
    id: 1,
    priority: "High",
    category: "Test Automation",
    title: "Increase API Test Coverage",
    description: "Current API test coverage is at 65%. Recommend increasing to 90% to reduce regression risk.",
    impact: "Reduce regression testing time by 35%",
    effort: "2 weeks",
    roi: "High",
    status: "new",
  },
  {
    id: 2,
    priority: "High",
    category: "Infrastructure",
    title: "Implement Test Data Management",
    description: "Lack of synthetic test data is causing delays. Implement automated test data generation.",
    impact: "Reduce environment setup time by 60%",
    effort: "3 weeks",
    roi: "High",
    status: "in_progress",
  },
  {
    id: 3,
    priority: "Medium",
    category: "Process",
    title: "Adopt Shift-Left Testing",
    description: "Move testing activities earlier in the SDLC to catch defects sooner.",
    impact: "Reduce defect resolution cost by 40%",
    effort: "4 weeks",
    roi: "Medium",
    status: "new",
  },
  {
    id: 4,
    priority: "Medium",
    category: "Tools",
    title: "Upgrade CI/CD Pipeline",
    description: "Add performance and security testing to the pipeline for comprehensive quality checks.",
    impact: "Earlier detection of performance issues",
    effort: "2 weeks",
    roi: "Medium",
    status: "completed",
  },
  {
    id: 5,
    priority: "Low",
    category: "Skills",
    title: "Advanced Automation Training",
    description: "Provide advanced automation training to improve team capabilities.",
    impact: "Increase automation velocity by 25%",
    effort: "1 week",
    roi: "Low",
    status: "new",
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

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "success";
    case "in_progress":
      return "primary";
    default:
      return "default";
  }
};

export default function RecommendationsCenter() {
  const [activeTab, setActiveTab] = useState(0);

  const filteredRecs =
    activeTab === 0
      ? recommendations
      : activeTab === 1
      ? recommendations.filter((r) => r.status === "new")
      : activeTab === 2
      ? recommendations.filter((r) => r.status === "in_progress")
      : recommendations.filter((r) => r.status === "completed");

  const stats = {
    total: recommendations.length,
    new: recommendations.filter((r) => r.status === "new").length,
    inProgress: recommendations.filter((r) => r.status === "in_progress").length,
    completed: recommendations.filter((r) => r.status === "completed").length,
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Lightbulb fontSize="large" color="primary" />
        <Box>
          <Typography variant="h4">Recommendations Center</Typography>
          <Typography variant="body2" color="text.secondary">
            AI-powered improvement recommendations
          </Typography>
        </Box>
      </Box>

      {/* Statistics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography color="text.secondary" variant="body2">
                  Total
                </Typography>
                <Lightbulb color="primary" />
              </Box>
              <Typography variant="h4">{stats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography color="text.secondary" variant="body2">
                  New
                </Typography>
                <TrendingUp color="warning" />
              </Box>
              <Typography variant="h4">{stats.new}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography color="text.secondary" variant="body2">
                  In Progress
                </Typography>
                <Schedule color="primary" />
              </Box>
              <Typography variant="h4">{stats.inProgress}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography color="text.secondary" variant="body2">
                  Completed
                </Typography>
                <CheckCircle color="success" />
              </Box>
              <Typography variant="h4">{stats.completed}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recommendations */}
      <Card>
        <CardContent>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 2 }}>
            <Tab label={`All (${stats.total})`} />
            <Tab label={`New (${stats.new})`} />
            <Tab label={`In Progress (${stats.inProgress})`} />
            <Tab label={`Completed (${stats.completed})`} />
          </Tabs>

          <Box>
            {filteredRecs.map((rec) => (
              <Card key={rec.id} variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                    <Chip label={rec.priority} color={getPriorityColor(rec.priority) as any} size="small" />
                    <Chip label={rec.category} variant="outlined" size="small" />
                    <Chip label={rec.status.replace("_", " ")} color={getStatusColor(rec.status) as any} size="small" />
                    <Chip label={`ROI: ${rec.roi}`} size="small" variant="outlined" />
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {rec.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {rec.description}
                  </Typography>
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="caption" color="text.secondary">
                        Expected Impact
                      </Typography>
                      <Typography variant="body2">{rec.impact}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="caption" color="text.secondary">
                        Estimated Effort
                      </Typography>
                      <Typography variant="body2">{rec.effort}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="caption" color="text.secondary">
                        ROI Potential
                      </Typography>
                      <Typography variant="body2">{rec.roi}</Typography>
                    </Grid>
                  </Grid>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {rec.status === "new" && (
                      <>
                        <Button variant="contained" size="small">
                          Start Implementation
                        </Button>
                        <Button variant="outlined" size="small">
                          View Details
                        </Button>
                      </>
                    )}
                    {rec.status === "in_progress" && (
                      <>
                        <Button variant="contained" size="small">
                          Mark Complete
                        </Button>
                        <Button variant="outlined" size="small">
                          View Progress
                        </Button>
                      </>
                    )}
                    {rec.status === "completed" && (
                      <Button variant="outlined" size="small">
                        View Report
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
