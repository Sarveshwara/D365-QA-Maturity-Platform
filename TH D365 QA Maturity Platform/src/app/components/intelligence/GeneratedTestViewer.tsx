import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Tabs,
  Tab,
  Chip,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search, Download, PlayArrow, Code } from "@mui/icons-material";

const generatedTests = [
  {
    id: 1,
    name: "test_payment_successful_transaction",
    framework: "Selenium",
    language: "Python",
    confidence: 95,
    status: "approved",
    generatedDate: "2026-03-10",
  },
  {
    id: 2,
    name: "test_payment_invalid_card",
    framework: "Selenium",
    language: "Python",
    confidence: 92,
    status: "pending",
    generatedDate: "2026-03-10",
  },
  {
    id: 3,
    name: "test_auth_oauth_error_handling",
    framework: "Cypress",
    language: "JavaScript",
    confidence: 88,
    status: "pending",
    generatedDate: "2026-03-11",
  },
  {
    id: 4,
    name: "test_api_rate_limiting",
    framework: "REST Assured",
    language: "Java",
    confidence: 90,
    status: "approved",
    generatedDate: "2026-03-11",
  },
  {
    id: 5,
    name: "test_user_registration_validation",
    framework: "Selenium",
    language: "Python",
    confidence: 87,
    status: "rejected",
    generatedDate: "2026-03-12",
  },
];

const testCode = `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_payment_successful_transaction():
    # Setup
    driver = webdriver.Chrome()
    driver.get("https://example.com/checkout")
    
    # Enter card details
    card_number = driver.find_element(By.ID, "card-number")
    card_number.send_keys("4111111111111111")
    
    cvv = driver.find_element(By.ID, "cvv")
    cvv.send_keys("123")
    
    expiry = driver.find_element(By.ID, "expiry")
    expiry.send_keys("12/25")
    
    # Submit payment
    submit_btn = driver.find_element(By.ID, "submit-payment")
    submit_btn.click()
    
    # Verify success
    success_msg = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "success"))
    )
    
    assert "Payment successful" in success_msg.text
    
    driver.quit()`;

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "success";
    case "pending":
      return "warning";
    case "rejected":
      return "error";
    default:
      return "default";
  }
};

export default function GeneratedTestViewer() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTest, setSelectedTest] = useState(generatedTests[0]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Generated Test Viewer</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" startIcon={<PlayArrow />}>
            Run Selected
          </Button>
          <Button variant="contained" startIcon={<Download />}>
            Export Tests
          </Button>
        </Box>
      </Box>

      {/* Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search generated tests..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
      </Card>

      {/* Test List and Code View */}
      <Card>
        <CardContent>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 2 }}>
            <Tab label="All Tests" />
            <Tab label="Approved" />
            <Tab label="Pending Review" />
            <Tab label="Rejected" />
          </Tabs>

          <Box sx={{ display: "flex", gap: 2 }}>
            {/* Test List */}
            <Box sx={{ width: "40%", borderRight: "1px solid", borderColor: "divider", pr: 2 }}>
              {generatedTests.map((test) => (
                <Card
                  key={test.id}
                  variant="outlined"
                  onClick={() => setSelectedTest(test)}
                  sx={{
                    mb: 1,
                    cursor: "pointer",
                    border: 2,
                    borderColor: selectedTest.id === test.id ? "primary.main" : "transparent",
                    "&:hover": {
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                      <Chip
                        label={test.status}
                        color={getStatusColor(test.status) as any}
                        size="small"
                      />
                      <Chip label={`${test.confidence}%`} size="small" variant="outlined" />
                    </Box>
                    <Typography variant="body2" sx={{ mb: 0.5, fontFamily: "monospace" }}>
                      {test.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {test.framework} • {test.language} • {test.generatedDate}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Code View */}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Box>
                  <Typography variant="h6">{selectedTest.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Confidence: {selectedTest.confidence}% • {selectedTest.framework} • {selectedTest.language}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button size="small" variant="outlined">
                    Edit
                  </Button>
                  <Button size="small" variant="outlined" color="success">
                    Approve
                  </Button>
                  <Button size="small" variant="outlined" color="error">
                    Reject
                  </Button>
                </Box>
              </Box>
              <Card variant="outlined" sx={{ bgcolor: "grey.900" }}>
                <CardContent>
                  <pre
                    style={{
                      color: "#fff",
                      fontFamily: "monospace",
                      fontSize: "0.875rem",
                      margin: 0,
                      overflow: "auto",
                    }}
                  >
                    {testCode}
                  </pre>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
