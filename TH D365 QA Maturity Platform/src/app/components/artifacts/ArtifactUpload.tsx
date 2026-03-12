import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Grid,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  CloudUpload,
  Description,
  Code,
  InsertDriveFile,
  Delete,
  CheckCircle,
} from "@mui/icons-material";

const artifactTypes = [
  { name: "Test Cases", icon: <Description />, formats: ".xlsx, .csv, .xml" },
  { name: "Test Scripts", icon: <Code />, formats: ".java, .py, .js, .ts" },
  { name: "Test Results", icon: <InsertDriveFile />, formats: ".xml, .json, .html" },
  { name: "Requirements", icon: <Description />, formats: ".docx, .pdf, .xlsx" },
  { name: "Code Coverage", icon: <Code />, formats: ".xml, .json" },
  { name: "Defect Reports", icon: <InsertDriveFile />, formats: ".csv, .json, .xml" },
];

const uploadedFiles = [
  { name: "TestSuite_LoginFlow.xml", size: "245 KB", type: "Test Cases", status: "completed" },
  { name: "AutomationScripts.zip", size: "1.2 MB", type: "Test Scripts", status: "processing" },
  { name: "JUnitResults.xml", size: "68 KB", type: "Test Results", status: "completed" },
];

export default function ArtifactUpload() {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Artifact Upload
      </Typography>

      {/* Upload Zone */}
      <Card
        sx={{
          mb: 3,
          border: 2,
          borderStyle: "dashed",
          borderColor: dragActive ? "primary.main" : "divider",
          bgcolor: dragActive ? "primary.lighter" : "background.paper",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent sx={{ p: 6, textAlign: "center" }}>
          <CloudUpload sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Drag and drop files here
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            or
          </Typography>
          <Button variant="contained" component="label">
            Browse Files
            <input type="file" hidden multiple />
          </Button>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Maximum file size: 50MB per file
          </Typography>
        </CardContent>
      </Card>

      {/* Artifact Types */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Supported Artifact Types
          </Typography>
          <Grid container spacing={2}>
            {artifactTypes.map((type, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined">
                  <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ color: "primary.main" }}>{type.icon}</Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1">{type.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {type.formats}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Recently Uploaded Files
          </Typography>
          <List>
            {uploadedFiles.map((file, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end">
                    <Delete />
                  </IconButton>
                }
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <ListItemIcon>
                  {file.status === "completed" ? (
                    <CheckCircle color="success" />
                  ) : (
                    <Description color="primary" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={file.name}
                  secondary={
                    <Box>
                      <Typography variant="caption" component="span">
                        {file.size} • {file.type}
                      </Typography>
                      {file.status === "processing" && (
                        <LinearProgress sx={{ mt: 1, height: 4, borderRadius: 2 }} />
                      )}
                    </Box>
                  }
                />
                <Chip
                  label={file.status === "completed" ? "Completed" : "Processing"}
                  color={file.status === "completed" ? "success" : "primary"}
                  size="small"
                  sx={{ ml: 2 }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
