import { Card, CardContent, Typography, Box, Grid, Chip, Button, LinearProgress } from "@mui/material";
import { Timeline, TrendingUp, Code, Science } from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const impactedTests = [
  { component: "Authentication", total: 45, impacted: 12, risk: "High" },
  { component: "Payment", total: 38, impacted: 8, risk: "Medium" },
  { component: "User Profile", total: 52, impacted: 5, risk: "Low" },
  { component: "Shopping Cart", total: 34, impacted: 15, risk: "High" },
  { component: "Search", total: 28, impacted: 3, risk: "Low" },
];

const recentChanges = [
  {
    file: "PaymentService.java",
    author: "John Smith",
    time: "2 hours ago",
    testsImpacted: 8,
    risk: "Medium",
  },
  {
    file: "AuthController.java",
    author: "Sarah Johnson",
    time: "4 hours ago",
    testsImpacted: 12,
    risk: "High",
  },
  {
    file: "UserRepository.java",
    author: "Mike Chen",
    time: "6 hours ago",
    testsImpacted: 5,
    risk: "Low",
  },
  {
    file: "CartService.java",
    author: "Emily Davis",
    time: "8 hours ago",
    testsImpacted: 15,
    risk: "High",
  },
];

const impactData = [
  { component: "Auth", critical: 12, high: 8, medium: 5, low: 2 },
  { component: "Payment", critical: 8, high: 12, medium: 6, low: 3 },
  { component: "Profile", critical: 5, high: 8, medium: 15, low: 8 },
  { component: "Cart", critical: 15, high: 10, medium: 4, low: 2 },
  { component: "Search", critical: 3, high: 5, medium: 10, low: 5 },
];

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "High":
      return "error";
    case "Medium":
      return "warning";
    default:
      return "success";
  }
};

export default function TestImpactAnalysis() {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Timeline fontSize="large" color="primary" />
        <Box>
          <Typography variant="h4">Test Impact Analysis</Typography>
          <Typography variant="body2" color="text.secondary">
            Identify which tests to run based on code changes
          </Typography>
        </Box>
      </Box>

      {/* Metrics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography color="text.secondary" variant="body2">
                  Code Changes
                </Typography>
                <Code color="primary" />
              </Box>
              <Typography variant="h4">24</Typography>
              <Typography variant="body2" color="text.secondary">
                Last 24 hours
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography color="text.secondary" variant="body2">
                  Impacted Tests
                </Typography>
                <Science color="warning" />
              </Box>
              <Typography variant="h4">43</Typography>
              <Typography variant="body2" color="warning.main">
                Need execution
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography color="text.secondary" variant="body2">
                  Test Reduction
                </Typography>
                <TrendingUp color="success" />
              </Box>
              <Typography variant="h4">73%</Typography>
              <Typography variant="body2" color="success.main">
                Time saved
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography color="text.secondary" variant="body2">
                  High Risk Areas
                </Typography>
                <Code color="error" />
              </Box>
              <Typography variant="h4">2</Typography>
              <Typography variant="body2" color="error.main">
                Requires attention
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Impact Chart */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Test Impact by Component
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={impactData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="component" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="critical" fill="#f44336" stackId="a" name="Critical" />
              <Bar dataKey="high" fill="#ff9800" stackId="a" name="High" />
              <Bar dataKey="medium" fill="#2196f3" stackId="a" name="Medium" />
              <Bar dataKey="low" fill="#4caf50" stackId="a" name="Low" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Impacted Components */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Impacted Components
              </Typography>
              {impactedTests.map((component, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    "&:last-child": { borderBottom: "none" },
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body1">{component.component}</Typography>
                    <Chip label={component.risk} color={getRiskColor(component.risk) as any} size="small" />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      {component.impacted} / {component.total} tests impacted
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(component.impacted / component.total) * 100}
                      sx={{ flex: 1, height: 6, borderRadius: 3 }}
                      color={getRiskColor(component.risk) as any}
                    />
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Recent Code Changes
              </Typography>
              {recentChanges.map((change, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    "&:last-child": { borderBottom: "none" },
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography variant="body1" sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
                      {change.file}
                    </Typography>
                    <Chip label={change.risk} color={getRiskColor(change.risk) as any} size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {change.author} • {change.time}
                  </Typography>
                  <Typography variant="body2" color="warning.main" sx={{ mt: 0.5 }}>
                    {change.testsImpacted} tests impacted
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Actions */}
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Recommended Action</Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="outlined">View All Changes</Button>
              <Button variant="contained">Run Impacted Tests (43)</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
