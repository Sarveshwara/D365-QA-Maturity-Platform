import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore, Send, Edit } from "@mui/icons-material";

const mockAnswers = [
  {
    domain: "Test Strategy & Planning",
    questions: [
      { question: "Test strategy documentation", answer: 4, score: "Managed" },
      { question: "Test objectives definition and tracking", answer: 4, score: "Managed" },
    ],
    avgScore: 4,
  },
  {
    domain: "Test Automation",
    questions: [
      { question: "Test automation coverage", answer: 3, score: "Defined" },
      { question: "Automation framework maturity", answer: 3, score: "Defined" },
    ],
    avgScore: 3,
  },
  {
    domain: "Continuous Integration",
    questions: [
      { question: "CI/CD integration level", answer: 4, score: "Managed" },
    ],
    avgScore: 4,
  },
];

const getScoreColor = (score: number) => {
  if (score >= 4) return "success";
  if (score === 3) return "primary";
  if (score === 2) return "warning";
  return "error";
};

export default function AssessmentReview() {
  const navigate = useNavigate();

  const overallAvg = mockAnswers.reduce((sum, d) => sum + d.avgScore, 0) / mockAnswers.length;
  const totalQuestions = mockAnswers.reduce((sum, d) => sum + d.questions.length, 0);

  const handleSubmit = () => {
    navigate("/assessment/results");
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Review Your Assessment
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Review your answers before submitting. You can edit any response.
      </Typography>

      {/* Summary Card */}
      <Card sx={{ mb: 3, bgcolor: "primary.main", color: "white" }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Overall Score
              </Typography>
              <Typography variant="h3">{overallAvg.toFixed(1)}/5</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Domains Assessed
              </Typography>
              <Typography variant="h3">{mockAnswers.length}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Questions Answered
              </Typography>
              <Typography variant="h3">{totalQuestions}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Answers by Domain */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Answers by Domain
          </Typography>
          {mockAnswers.map((domain, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
                  <Typography variant="body1" sx={{ flex: 1 }}>
                    {domain.domain}
                  </Typography>
                  <Chip
                    label={`Avg: ${domain.avgScore.toFixed(1)}/5`}
                    color={getScoreColor(domain.avgScore) as any}
                    size="small"
                  />
                  <Chip
                    label={`${domain.questions.length} questions`}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  {domain.questions.map((q, qIndex) => (
                    <Box
                      key={qIndex}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 2,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        "&:last-child": { borderBottom: "none" },
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1">{q.question}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          Maturity Level: {q.score}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Chip
                          label={`${q.answer}/5`}
                          color={getScoreColor(q.answer) as any}
                        />
                        <Button size="small" startIcon={<Edit />}>
                          Edit
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={() => navigate("/assessment/questionnaire")}>
          Back to Questions
        </Button>
        <Button
          variant="contained"
          size="large"
          endIcon={<Send />}
          onClick={handleSubmit}
        >
          Submit Assessment
        </Button>
      </Box>
    </Box>
  );
}