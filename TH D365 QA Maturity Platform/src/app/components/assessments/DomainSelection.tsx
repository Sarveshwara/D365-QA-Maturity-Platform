import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Checkbox,
  Button,
  Chip,
  LinearProgress,
} from "@mui/material";
import {
  CheckCircle,
  RadioButtonUnchecked,
  ArrowForward,
} from "@mui/icons-material";

const domains = [
  {
    id: 1,
    name: "Test Strategy & Planning",
    description: "Strategic approach to testing, planning methodologies",
    questions: 15,
    duration: "20 min",
    category: "Strategy",
  },
  {
    id: 2,
    name: "Test Design & Execution",
    description: "Test case design, execution processes, and best practices",
    questions: 18,
    duration: "25 min",
    category: "Execution",
  },
  {
    id: 3,
    name: "Test Automation",
    description: "Automation frameworks, tools, and coverage",
    questions: 22,
    duration: "30 min",
    category: "Automation",
  },
  {
    id: 4,
    name: "Continuous Integration",
    description: "CI/CD integration, automated testing pipelines",
    questions: 16,
    duration: "20 min",
    category: "DevOps",
  },
  {
    id: 5,
    name: "Defect Management",
    description: "Defect tracking, analysis, and resolution processes",
    questions: 14,
    duration: "18 min",
    category: "Quality",
  },
  {
    id: 6,
    name: "Test Data Management",
    description: "Test data creation, masking, and management",
    questions: 12,
    duration: "15 min",
    category: "Infrastructure",
  },
  {
    id: 7,
    name: "Test Environment",
    description: "Environment setup, configuration, and availability",
    questions: 13,
    duration: "18 min",
    category: "Infrastructure",
  },
  {
    id: 8,
    name: "Metrics & Reporting",
    description: "KPIs, dashboards, and analytics",
    questions: 16,
    duration: "22 min",
    category: "Analytics",
  },
];

export default function DomainSelection() {
  const [selectedDomains, setSelectedDomains] = useState<number[]>([1, 2, 3]);
  const navigate = useNavigate();

  const toggleDomain = (id: number) => {
    setSelectedDomains((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const totalQuestions = domains
    .filter((d) => selectedDomains.includes(d.id))
    .reduce((sum, d) => sum + d.questions, 0);

  const totalDuration = domains
    .filter((d) => selectedDomains.includes(d.id))
    .reduce((sum, d) => sum + parseInt(d.duration), 0);

  const handleContinue = () => {
    navigate("/assessment/questionnaire");
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Select Assessment Domains
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Choose the domains you want to assess. You can select multiple domains.
      </Typography>

      {/* Summary Card */}
      <Card sx={{ mb: 3, bgcolor: "primary.main", color: "white" }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Selected Domains
              </Typography>
              <Typography variant="h4">{selectedDomains.length}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Total Questions
              </Typography>
              <Typography variant="h4">{totalQuestions}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Estimated Time
              </Typography>
              <Typography variant="h4">~{totalDuration} min</Typography>
            </Grid>
          </Grid>
          <LinearProgress
            variant="determinate"
            value={(selectedDomains.length / domains.length) * 100}
            sx={{ mt: 2, bgcolor: "rgba(255,255,255,0.3)", "& .MuiLinearProgress-bar": { bgcolor: "white" } }}
          />
        </CardContent>
      </Card>

      {/* Domain Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {domains.map((domain) => {
          const isSelected = selectedDomains.includes(domain.id);
          return (
            <Grid item xs={12} md={6} key={domain.id}>
              <Card
                onClick={() => toggleDomain(domain.id)}
                sx={{
                  cursor: "pointer",
                  border: 2,
                  borderColor: isSelected ? "primary.main" : "transparent",
                  bgcolor: isSelected ? "primary.lighter" : "background.paper",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "primary.main",
                    transform: "translateY(-2px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                    <Checkbox
                      checked={isSelected}
                      icon={<RadioButtonUnchecked />}
                      checkedIcon={<CheckCircle />}
                      sx={{ mt: -0.5 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {domain.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {domain.description}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Chip label={domain.category} size="small" color="primary" variant="outlined" />
                        <Chip label={`${domain.questions} questions`} size="small" />
                        <Chip label={domain.duration} size="small" />
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Cancel
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForward />}
          onClick={handleContinue}
          disabled={selectedDomains.length === 0}
        >
          Continue to Questionnaire
        </Button>
      </Box>
    </Box>
  );
}