import { Card, CardContent, Typography, Box, Button, Chip, Grid } from "@mui/material";
import { ZoomIn, ZoomOut, Refresh, Download } from "@mui/icons-material";

const traceabilityStats = [
  { label: "Requirements", count: 342, linked: 328 },
  { label: "Test Cases", count: 1245, linked: 1198 },
  { label: "Defects", count: 127, linked: 124 },
  { label: "Code Files", count: 892, linked: 845 },
];

export default function TraceabilityGraph() {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Traceability Graph</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" size="small" startIcon={<ZoomIn />}>
            Zoom In
          </Button>
          <Button variant="outlined" size="small" startIcon={<ZoomOut />}>
            Zoom Out
          </Button>
          <Button variant="outlined" size="small" startIcon={<Refresh />}>
            Refresh
          </Button>
          <Button variant="contained" size="small" startIcon={<Download />}>
            Export
          </Button>
        </Box>
      </Box>

      {/* Statistics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {traceabilityStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
                <Typography variant="h4">{stat.count}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                  <Chip
                    label={`${stat.linked} linked`}
                    size="small"
                    color="success"
                  />
                  <Typography variant="caption" color="text.secondary">
                    ({((stat.linked / stat.count) * 100).toFixed(1)}%)
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Graph Visualization */}
      <Card>
        <CardContent>
          <Box
            sx={{
              height: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "grey.50",
              borderRadius: 1,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Interactive Traceability Graph
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Visualization shows relationships between Requirements, Test Cases, Code, and Defects
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block" }}>
                Click and drag to explore • Double-click to expand nodes
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Legend
          </Typography>
          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ width: 16, height: 16, bgcolor: "#2196f3", borderRadius: "50%" }} />
              <Typography variant="body2">Requirements</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ width: 16, height: 16, bgcolor: "#4caf50", borderRadius: "50%" }} />
              <Typography variant="body2">Test Cases</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ width: 16, height: 16, bgcolor: "#ff9800", borderRadius: "50%" }} />
              <Typography variant="body2">Code Files</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ width: 16, height: 16, bgcolor: "#f44336", borderRadius: "50%" }} />
              <Typography variant="body2">Defects</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
