import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  Switch,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { CloudSync, CheckCircle, Error as ErrorIcon, Settings } from "@mui/icons-material";

const integrations = [
  {
    name: "Jira",
    type: "Defect Tracking",
    status: "connected",
    lastSync: "2 hours ago",
    itemsSynced: 1245,
  },
  {
    name: "Jenkins",
    type: "CI/CD",
    status: "connected",
    lastSync: "15 minutes ago",
    itemsSynced: 342,
  },
  {
    name: "GitHub",
    type: "Source Control",
    status: "connected",
    lastSync: "1 hour ago",
    itemsSynced: 892,
  },
  {
    name: "TestRail",
    type: "Test Management",
    status: "error",
    lastSync: "Failed",
    itemsSynced: 0,
  },
  {
    name: "SonarQube",
    type: "Code Quality",
    status: "connected",
    lastSync: "30 minutes ago",
    itemsSynced: 156,
  },
  {
    name: "Selenium Grid",
    type: "Test Execution",
    status: "connected",
    lastSync: "5 minutes ago",
    itemsSynced: 78,
  },
];

const availableIntegrations = [
  { name: "Azure DevOps", type: "ALM" },
  { name: "GitLab", type: "Source Control" },
  { name: "CircleCI", type: "CI/CD" },
  { name: "Confluence", type: "Documentation" },
  { name: "Slack", type: "Notifications" },
  { name: "ServiceNow", type: "ITSM" },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "connected":
      return <CheckCircle color="success" />;
    case "error":
      return <ErrorIcon color="error" />;
    default:
      return <CloudSync color="disabled" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "connected":
      return "success";
    case "error":
      return "error";
    default:
      return "default";
  }
};

export default function ArtifactIntegration() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Artifact Integration
      </Typography>

      {/* Active Integrations */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Active Integrations
          </Typography>
          <Grid container spacing={2}>
            {integrations.map((integration, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        {getStatusIcon(integration.status)}
                        <Box>
                          <Typography variant="h6">{integration.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {integration.type}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label={integration.status}
                        color={getStatusColor(integration.status) as any}
                        size="small"
                      />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Last Sync:
                      </Typography>
                      <Typography variant="body2">{integration.lastSync}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Items Synced:
                      </Typography>
                      <Typography variant="body2">{integration.itemsSynced}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button variant="outlined" size="small" startIcon={<CloudSync />} fullWidth>
                        Sync Now
                      </Button>
                      <Button variant="outlined" size="small" startIcon={<Settings />} fullWidth>
                        Configure
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Sync Settings */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Synchronization Settings
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Auto-sync enabled"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                Automatically sync artifacts every hour
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Real-time updates"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                Push updates to integrated tools in real-time
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={<Switch />}
                label="Bi-directional sync"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                Allow changes from external tools to update Testhouse D365 Quality Assurance Maturity Platform
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Conflict resolution"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                Automatically resolve sync conflicts
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Available Integrations */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Available Integrations
          </Typography>
          <Grid container spacing={2}>
            {availableIntegrations.map((integration, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      {integration.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
                      {integration.type}
                    </Typography>
                    <Button variant="outlined" size="small" fullWidth>
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}