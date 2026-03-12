import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import {
  CheckCircle,
  HourglassEmpty,
  Error as ErrorIcon,
  CloudDone,
  Code,
  Description,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const processingJobs = [
  {
    id: 1,
    name: "TestSuite_Regression_v2.3.xml",
    type: "Test Cases",
    status: "completed",
    progress: 100,
    startTime: "10:15 AM",
    duration: "2m 34s",
    itemsProcessed: 1245,
  },
  {
    id: 2,
    name: "AutomationScripts_Login.zip",
    type: "Test Scripts",
    status: "processing",
    progress: 67,
    startTime: "10:42 AM",
    duration: "1m 12s",
    itemsProcessed: 342,
  },
  {
    id: 3,
    name: "CoverageReport_Sprint42.json",
    type: "Code Coverage",
    status: "processing",
    progress: 42,
    startTime: "10:48 AM",
    duration: "45s",
    itemsProcessed: 156,
  },
  {
    id: 4,
    name: "DefectExport_March2026.csv",
    type: "Defects",
    status: "queued",
    progress: 0,
    startTime: "Pending",
    duration: "-",
    itemsProcessed: 0,
  },
  {
    id: 5,
    name: "RequirementsMatrix.xlsx",
    type: "Requirements",
    status: "error",
    progress: 0,
    startTime: "09:52 AM",
    duration: "Failed",
    itemsProcessed: 0,
  },
];

const processingTrends = [
  { hour: "8 AM", completed: 12, failed: 1 },
  { hour: "9 AM", completed: 18, failed: 2 },
  { hour: "10 AM", completed: 24, failed: 1 },
  { hour: "11 AM", completed: 15, failed: 0 },
  { hour: "12 PM", completed: 10, failed: 1 },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle color="success" />;
    case "processing":
      return <HourglassEmpty color="primary" />;
    case "error":
      return <ErrorIcon color="error" />;
    default:
      return <CloudDone color="disabled" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "success";
    case "processing":
      return "primary";
    case "error":
      return "error";
    default:
      return "default";
  }
};

export default function ArtifactProcessingStatus() {
  const [activeTab, setActiveTab] = useState(0);

  const filteredJobs =
    activeTab === 0
      ? processingJobs
      : activeTab === 1
      ? processingJobs.filter((j) => j.status === "processing" || j.status === "queued")
      : activeTab === 2
      ? processingJobs.filter((j) => j.status === "completed")
      : processingJobs.filter((j) => j.status === "error");

  const stats = {
    total: processingJobs.length,
    processing: processingJobs.filter((j) => j.status === "processing").length,
    completed: processingJobs.filter((j) => j.status === "completed").length,
    failed: processingJobs.filter((j) => j.status === "error").length,
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Artifact Processing Status
      </Typography>

      {/* Statistics */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" variant="body2">
              Total Jobs
            </Typography>
            <Typography variant="h4">{stats.total}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" variant="body2">
              Processing
            </Typography>
            <Typography variant="h4" color="primary">
              {stats.processing}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" variant="body2">
              Completed
            </Typography>
            <Typography variant="h4" color="success.main">
              {stats.completed}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" variant="body2">
              Failed
            </Typography>
            <Typography variant="h4" color="error.main">
              {stats.failed}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Processing Trends */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Processing Trends (Today)
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={processingTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#4caf50"
                strokeWidth={2}
                name="Completed"
              />
              <Line
                type="monotone"
                dataKey="failed"
                stroke="#f44336"
                strokeWidth={2}
                name="Failed"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Processing Jobs */}
      <Card>
        <CardContent>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 2 }}>
            <Tab label={`All (${stats.total})`} />
            <Tab label={`Active (${stats.processing})`} />
            <Tab label={`Completed (${stats.completed})`} />
            <Tab label={`Failed (${stats.failed})`} />
          </Tabs>

          <List>
            {filteredJobs.map((job) => (
              <ListItem
                key={job.id}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  mb: 1,
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", width: "100%", mb: 1 }}>
                  <ListItemIcon>{getStatusIcon(job.status)}</ListItemIcon>
                  <ListItemText
                    primary={job.name}
                    secondary={`${job.type} • Started: ${job.startTime} • Duration: ${job.duration}`}
                    sx={{ flex: 1 }}
                  />
                  <Chip
                    label={job.status}
                    color={getStatusColor(job.status) as any}
                    size="small"
                  />
                </Box>
                {job.status === "processing" && (
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        Progress: {job.itemsProcessed} items processed
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {job.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={job.progress}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                )}
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
