import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink, useNavigate } from "react-router-dom";
import { userLogin } from "../api";

const initialState = {
  email: "",
  password: "",
};

function LoginView() {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Uzupełnij wszystkie pola minimum 4 znakami");
    } else {
      login(formData);
    }
  };

  const login = async (obj) => {
    try {
      const data = await userLogin(obj);
      setError("");
      localStorage.setItem("profile", JSON.stringify({ ...data.data.result }));
      localStorage.setItem("token", JSON.stringify(data.data.token));
      navigate("/");
    } catch (error) {
      setError("Niepoprawne dane logowania")
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Zaloguj się
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adres Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Hasło"
            type="password"
            onChange={handleChange}
            id="password"
            autoComplete="current-password"
          />
          {error && (
            <Typography style={{ color: "red" }} variant="p">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Zaloguj
          </Button>
          <Grid container>
            <Grid item>
              <NavLink to="/register" variant="body2">
                Nie masz konta? Zarejestruj się
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginView;
