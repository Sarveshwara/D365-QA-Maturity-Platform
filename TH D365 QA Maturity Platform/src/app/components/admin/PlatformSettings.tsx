import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Save, Refresh } from "@mui/icons-material";

export default function PlatformSettings() {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Platform Settings</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" startIcon={<Refresh />}>
            Reset to Defaults
          </Button>
          <Button variant="contained" startIcon={<Save />}>
            Save Changes
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* General Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                General Settings
              </Typography>
              <TextField
                fullWidth
                label="Organization Name"
                defaultValue="Acme Corporation"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Platform URL"
                defaultValue="https://qa-platform.acme.com"
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Default Time Zone</InputLabel>
                <Select defaultValue="UTC" label="Default Time Zone">
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="America/New_York">Eastern Time</MenuItem>
                  <MenuItem value="America/Los_Angeles">Pacific Time</MenuItem>
                  <MenuItem value="Europe/London">London</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Date Format</InputLabel>
                <Select defaultValue="MM/DD/YYYY" label="Date Format">
                  <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                  <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                  <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Notification Settings
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Email notifications"
                sx={{ display: "block", mb: 1 }}
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Slack notifications"
                sx={{ display: "block", mb: 1 }}
              />
              <FormControlLabel
                control={<Switch />}
                label="SMS notifications"
                sx={{ display: "block", mb: 1 }}
              />
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Notify on:
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Test execution failures"
                sx={{ display: "block", mb: 1 }}
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Critical defects"
                sx={{ display: "block", mb: 1 }}
              />
              <FormControlLabel
                control={<Switch />}
                label="Daily summary reports"
                sx={{ display: "block", mb: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Test Automation Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Test Automation Settings
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Auto-retry failed tests"
                sx={{ display: "block", mb: 1 }}
              />
              <TextField
                fullWidth
                label="Max Retry Attempts"
                type="number"
                defaultValue={3}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Test Timeout (minutes)"
                type="number"
                defaultValue={30}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Parallel test execution"
                sx={{ display: "block", mb: 1 }}
              />
              <TextField
                fullWidth
                label="Max Parallel Threads"
                type="number"
                defaultValue={5}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Integration Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Integration Settings
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Auto-sync with Jira"
                sx={{ display: "block", mb: 1 }}
              />
              <TextField
                fullWidth
                label="Sync Interval (minutes)"
                type="number"
                defaultValue={60}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Enable CI/CD webhooks"
                sx={{ display: "block", mb: 1 }}
              />
              <FormControlLabel
                control={<Switch />}
                label="Bi-directional sync"
                sx={{ display: "block", mb: 1 }}
              />
              <TextField
                fullWidth
                label="Webhook URL"
                placeholder="https://..."
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Security Settings
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Require MFA for admin users"
                sx={{ display: "block", mb: 1 }}
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Enable SSO"
                sx={{ display: "block", mb: 1 }}
              />
              <TextField
                fullWidth
                label="Session Timeout (minutes)"
                type="number"
                defaultValue={120}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password Expiry (days)"
                type="number"
                defaultValue={90}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Audit logging"
                sx={{ display: "block", mb: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* AI & Analytics Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                AI & Analytics Settings
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Enable AI-powered insights"
                sx={{ display: "block", mb: 1 }}
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Auto-generate test recommendations"
                sx={{ display: "block", mb: 1 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>AI Confidence Threshold</InputLabel>
                <Select defaultValue="85" label="AI Confidence Threshold">
                  <MenuItem value="70">70%</MenuItem>
                  <MenuItem value="80">80%</MenuItem>
                  <MenuItem value="85">85%</MenuItem>
                  <MenuItem value="90">90%</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Predictive analytics"
                sx={{ display: "block", mb: 1 }}
              />
              <FormControlLabel
                control={<Switch />}
                label="Advanced ML models"
                sx={{ display: "block", mb: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
