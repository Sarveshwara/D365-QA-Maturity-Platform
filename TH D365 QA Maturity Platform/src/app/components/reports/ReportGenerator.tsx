import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";
import { Description, Download, Schedule, CheckCircle } from "@mui/icons-material";

const reportTemplates = [
  { name: "Executive Summary", description: "High-level overview for stakeholders" },
  { name: "QA Maturity Assessment", description: "Detailed maturity analysis report" },
  { name: "Test Execution Report", description: "Test run results and metrics" },
  { name: "Defect Analysis Report", description: "Defect trends and root cause analysis" },
  { name: "Test Coverage Report", description: "Code and requirement coverage metrics" },
  { name: "Custom Report", description: "Build your own custom report" },
];

const recentReports = [
  {
    name: "Q1 2026 Executive Summary",
    type: "Executive Summary",
    generatedDate: "2026-03-10",
    format: "PDF",
    status: "completed",
  },
  {
    name: "Sprint 42 Test Execution",
    type: "Test Execution Report",
    generatedDate: "2026-03-11",
    format: "XLSX",
    status: "completed",
  },
  {
    name: "March Defect Analysis",
    type: "Defect Analysis Report",
    generatedDate: "2026-03-12",
    format: "PDF",
    status: "processing",
  },
];

export default function ReportGenerator() {
  const [reportType, setReportType] = useState("");
  const [dateRange, setDateRange] = useState("last_30_days");
  const [format, setFormat] = useState("pdf");
  const [selectedSections, setSelectedSections] = useState({
    summary: true,
    metrics: true,
    charts: true,
    recommendations: true,
    details: false,
    appendix: false,
  });

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Description fontSize="large" color="primary" />
        <Box>
          <Typography variant="h4">Report Generator</Typography>
          <Typography variant="body2" color="text.secondary">
            Create custom reports for stakeholders
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Report Configuration */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Report Configuration
              </Typography>

              {/* Template Selection */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Select Report Template
                </Typography>
                <Grid container spacing={2}>
                  {reportTemplates.map((template, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card
                        variant="outlined"
                        onClick={() => setReportType(template.name)}
                        sx={{
                          cursor: "pointer",
                          border: 2,
                          borderColor: reportType === template.name ? "primary.main" : "transparent",
                          "&:hover": { borderColor: "primary.main" },
                        }}
                      >
                        <CardContent>
                          <Typography variant="body1" gutterBottom>
                            {template.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {template.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Date Range & Format */}
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Date Range</InputLabel>
                    <Select
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      label="Date Range"
                    >
                      <MenuItem value="last_7_days">Last 7 Days</MenuItem>
                      <MenuItem value="last_30_days">Last 30 Days</MenuItem>
                      <MenuItem value="last_90_days">Last 90 Days</MenuItem>
                      <MenuItem value="current_quarter">Current Quarter</MenuItem>
                      <MenuItem value="custom">Custom Range</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Output Format</InputLabel>
                    <Select value={format} onChange={(e) => setFormat(e.target.value)} label="Output Format">
                      <MenuItem value="pdf">PDF</MenuItem>
                      <MenuItem value="xlsx">Excel (XLSX)</MenuItem>
                      <MenuItem value="docx">Word (DOCX)</MenuItem>
                      <MenuItem value="html">HTML</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Report Sections */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Include Sections
                </Typography>
                <FormGroup>
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedSections.summary}
                            onChange={(e) =>
                              setSelectedSections({ ...selectedSections, summary: e.target.checked })
                            }
                          />
                        }
                        label="Executive Summary"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedSections.metrics}
                            onChange={(e) =>
                              setSelectedSections({ ...selectedSections, metrics: e.target.checked })
                            }
                          />
                        }
                        label="Key Metrics"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedSections.charts}
                            onChange={(e) =>
                              setSelectedSections({ ...selectedSections, charts: e.target.checked })
                            }
                          />
                        }
                        label="Charts & Graphs"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedSections.recommendations}
                            onChange={(e) =>
                              setSelectedSections({
                                ...selectedSections,
                                recommendations: e.target.checked,
                              })
                            }
                          />
                        }
                        label="Recommendations"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedSections.details}
                            onChange={(e) =>
                              setSelectedSections({ ...selectedSections, details: e.target.checked })
                            }
                          />
                        }
                        label="Detailed Analysis"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedSections.appendix}
                            onChange={(e) =>
                              setSelectedSections({ ...selectedSections, appendix: e.target.checked })
                            }
                          />
                        }
                        label="Appendix"
                      />
                    </Grid>
                  </Grid>
                </FormGroup>
              </Box>

              {/* Additional Options */}
              <TextField
                fullWidth
                label="Report Title (Optional)"
                placeholder="e.g., Q1 2026 Quality Assessment"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Additional Notes (Optional)"
                placeholder="Add any specific notes or context for this report..."
              />
            </CardContent>
          </Card>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="outlined" fullWidth>
              Save as Template
            </Button>
            <Button variant="outlined" fullWidth>
              Schedule Report
            </Button>
            <Button variant="contained" fullWidth startIcon={<Download />}>
              Generate Report
            </Button>
          </Box>
        </Grid>

        {/* Recent Reports */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Recent Reports
              </Typography>
              <List>
                {recentReports.map((report, index) => (
                  <ListItem
                    key={index}
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
                      <ListItemIcon>
                        {report.status === "completed" ? (
                          <CheckCircle color="success" />
                        ) : (
                          <Schedule color="primary" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={report.name}
                        secondary={`${report.type} • ${report.generatedDate}`}
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                      <Chip label={report.format} size="small" />
                      {report.status === "completed" && (
                        <Button size="small" startIcon={<Download />}>
                          Download
                        </Button>
                      )}
                    </Box>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
