import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Divider,
  Container,
} from "@mui/material";
import { Google, Microsoft } from "@mui/icons-material";
import testhouseLogo from "figma:asset/0586510c8391c25311f2496a3dde183ca9bcb462.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - navigate to dashboard
    navigate("/");
  };

  const handleSSOLogin = (provider: string) => {
    // Mock SSO login - navigate to dashboard
    console.log(`SSO login with ${provider}`);
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "primary.main",
      }}
    >
      <Container maxWidth="sm">
        <Card elevation={8} sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <img
                src={testhouseLogo}
                alt="Testhouse Logo"
                style={{ height: "60px", objectFit: "contain" }}
              />
            </Box>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              D365 Quality Assurance Maturity Platform
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Sign in to your account
            </Typography>

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </form>

            <Divider sx={{ my: 3 }}>OR</Divider>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              onClick={() => handleSSOLogin("Google")}
              sx={{ mb: 2 }}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Microsoft />}
              onClick={() => handleSSOLogin("Microsoft")}
            >
              Sign in with Microsoft
            </Button>

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 3 }}
              color="text.secondary"
            >
              Don't have an account? Contact your administrator
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}