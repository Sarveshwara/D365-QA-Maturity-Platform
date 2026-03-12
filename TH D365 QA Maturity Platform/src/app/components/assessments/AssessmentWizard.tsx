import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import { Assessment, ArrowForward, ArrowBack } from "@mui/icons-material";

const steps = ["Assessment Details", "Scope Selection", "Team Assignment", "Schedule"];

export default function AssessmentWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [assessmentName, setAssessmentName] = useState("");
  const [assessmentType, setAssessmentType] = useState("");
  const [projectScope, setProjectScope] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Start assessment
      navigate("/assessment/domain-selection");
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Assessment Name"
                value={assessmentName}
                onChange={(e) => setAssessmentName(e.target.value)}
                placeholder="e.g., Q1 2026 QA Maturity Assessment"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Assessment Type</InputLabel>
                <Select
                  value={assessmentType}
                  onChange={(e) => setAssessmentType(e.target.value)}
                  label="Assessment Type"
                >
                  <MenuItem value="maturity">QA Maturity Assessment</MenuItem>
                  <MenuItem value="devops">DevOps Assessment</MenuItem>
                  <MenuItem value="security">Security Assessment</MenuItem>
                  <MenuItem value="process">Process Assessment</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Project Scope</InputLabel>
                <Select
                  value={projectScope}
                  onChange={(e) => setProjectScope(e.target.value)}
                  label="Project Scope"
                >
                  <MenuItem value="single">Single Project</MenuItem>
                  <MenuItem value="multiple">Multiple Projects</MenuItem>
                  <MenuItem value="portfolio">Entire Portfolio</MenuItem>
                  <MenuItem value="organization">Organization-wide</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                placeholder="Provide a brief description of this assessment..."
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select Assessment Domains
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {[
                "Test Strategy & Planning",
                "Test Design & Execution",
                "Test Automation",
                "Continuous Integration",
                "Defect Management",
                "Test Data Management",
                "Test Environment",
                "Metrics & Reporting",
              ].map((domain) => (
                <Grid item xs={12} sm={6} key={domain}>
                  <Card
                    variant="outlined"
                    sx={{
                      cursor: "pointer",
                      "&:hover": { borderColor: "primary.main", bgcolor: "action.hover" },
                    }}
                  >
                    <CardContent>
                      <Typography>{domain}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Assign Team Members
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Assessment Lead</InputLabel>
                <Select label="Assessment Lead">
                  <MenuItem value="user1">John Smith</MenuItem>
                  <MenuItem value="user2">Sarah Johnson</MenuItem>
                  <MenuItem value="user3">Mike Chen</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>QA Manager</InputLabel>
                <Select label="QA Manager">
                  <MenuItem value="user1">Emily Davis</MenuItem>
                  <MenuItem value="user2">Robert Wilson</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Participants"
                placeholder="Enter email addresses separated by commas"
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Schedule Assessment
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Start Date" type="date" InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Target Completion" type="date" InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                placeholder="Any additional notes or requirements..."
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Assessment fontSize="large" color="primary" />
        <Typography variant="h4">Create New Assessment</Typography>
      </Box>

      <Card>
        <CardContent sx={{ p: 4 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ minHeight: 300 }}>
            {renderStepContent(activeStep)}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBack />}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={<ArrowForward />}
            >
              {activeStep === steps.length - 1 ? "Start Assessment" : "Next"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}