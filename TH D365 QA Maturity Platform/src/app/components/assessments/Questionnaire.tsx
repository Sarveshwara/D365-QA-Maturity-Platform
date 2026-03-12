import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  Typography,
  Box,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  LinearProgress,
  Chip,
  TextField,
} from "@mui/material";
import { ArrowForward, ArrowBack, Save } from "@mui/icons-material";

const questions = [
  {
    id: 1,
    domain: "Test Strategy & Planning",
    question: "How would you rate your organization's test strategy documentation?",
    options: [
      { value: 1, label: "No formal documentation exists" },
      { value: 2, label: "Basic documentation, not regularly updated" },
      { value: 3, label: "Good documentation, updated periodically" },
      { value: 4, label: "Comprehensive documentation, regularly updated" },
      { value: 5, label: "Excellent documentation, integrated with development" },
    ],
  },
  {
    id: 2,
    domain: "Test Strategy & Planning",
    question: "How are test objectives defined and tracked?",
    options: [
      { value: 1, label: "No defined objectives" },
      { value: 2, label: "Informal objectives, not tracked" },
      { value: 3, label: "Defined objectives, basic tracking" },
      { value: 4, label: "Well-defined objectives with metrics" },
      { value: 5, label: "Data-driven objectives with continuous monitoring" },
    ],
  },
  {
    id: 3,
    domain: "Test Automation",
    question: "What percentage of your test cases are automated?",
    options: [
      { value: 1, label: "Less than 20%" },
      { value: 2, label: "20% - 40%" },
      { value: 3, label: "40% - 60%" },
      { value: 4, label: "60% - 80%" },
      { value: 5, label: "More than 80%" },
    ],
  },
  {
    id: 4,
    domain: "Test Automation",
    question: "How would you describe your automation framework?",
    options: [
      { value: 1, label: "No automation framework" },
      { value: 2, label: "Basic scripts with minimal framework" },
      { value: 3, label: "Framework established, some reusability" },
      { value: 4, label: "Robust framework with good reusability" },
      { value: 5, label: "Advanced framework with AI/ML capabilities" },
    ],
  },
  {
    id: 5,
    domain: "Continuous Integration",
    question: "How integrated is testing in your CI/CD pipeline?",
    options: [
      { value: 1, label: "No CI/CD integration" },
      { value: 2, label: "Basic integration, manual triggers" },
      { value: 3, label: "Automated unit tests in pipeline" },
      { value: 4, label: "Comprehensive test suite in pipeline" },
      { value: 5, label: "Fully automated with quality gates" },
    ],
  },
];

export default function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [notes, setNotes] = useState<Record<number, string>>({});
  const navigate = useNavigate();

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNoteChange = (questionId: number, note: string) => {
    setNotes((prev) => ({ ...prev, [questionId]: note }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/assessment/review");
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;
  const question = questions[currentQuestion];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Assessment Questionnaire
      </Typography>

      {/* Progress */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Question {currentQuestion + 1} of {questions.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {answeredCount} questions answered
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ mb: 3 }}>
            <Chip label={question.domain} color="primary" sx={{ mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 2 }}>
              {question.question}
            </Typography>
          </Box>

          <RadioGroup
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
          >
            {question.options.map((option) => (
              <Card
                key={option.value}
                variant="outlined"
                sx={{
                  mb: 1.5,
                  border: 2,
                  borderColor: answers[question.id] === option.value ? "primary.main" : "transparent",
                  bgcolor: answers[question.id] === option.value ? "primary.lighter" : "transparent",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "primary.main",
                    bgcolor: "action.hover",
                  },
                }}
                onClick={() => handleAnswer(question.id, option.value)}
              >
                <CardContent sx={{ py: 1.5 }}>
                  <FormControlLabel
                    value={option.value}
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="body1">{option.label}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Maturity Level {option.value}
                        </Typography>
                      </Box>
                    }
                    sx={{ m: 0, width: "100%" }}
                  />
                </CardContent>
              </Card>
            ))}
          </RadioGroup>

          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Additional Notes (Optional)"
              placeholder="Add any context, evidence, or additional information..."
              value={notes[question.id] || ""}
              onChange={(e) => handleNoteChange(question.id, e.target.value)}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={handleBack}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" startIcon={<Save />}>
            Save & Exit
          </Button>
          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            onClick={handleNext}
          >
            {currentQuestion === questions.length - 1 ? "Review Answers" : "Next Question"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}