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
import { userRegister } from "../api";

const initialState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  confirmPassword: "",
};

function LoginView() {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName
    ) {
      setError("Uzupełnij wszystkie pola minimum 4 znakami");
    } else {
      register(formData);
    }

    console.log(formData);
  };

  const register = async (obj) => {
    if (obj.password !== obj.confirmPassword) {
      setError("Hasła nie są identyczne");
      return;
    }

    try {
      const data = await userRegister(obj);
      setError("");
      localStorage.setItem("profile", JSON.stringify({ ...data.data.result }));
      localStorage.setItem("token", JSON.stringify(data.data.token));
      navigate("/");
    } catch (error) {
      setError("Niepoprawne dane logowania");
    }
  };

  // const login = async (obj) => {
  //   try {
  //     const data = await userLogin(obj);
  //     setError("");
  //     localStorage.setItem("profile", JSON.stringify({ ...data.data.result }));
  //     localStorage.setItem("token", JSON.stringify(data.data.token));
  //     navigate("/");
  //   } catch (error) {
  //     setError("Niepoprawne dane logowania")
  //   }
  // };

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
          Zarejestruj się
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="Imię"
            name="firstName"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Nazwisko"
            type="lastName"
            onChange={handleChange}
            id="lastName"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adres Email"
            name="email"
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Potwierdź hasło"
            type="password"
            onChange={handleChange}
            id="confirmPassword"
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
            Załóż konto
          </Button>
          <Grid container>
            <Grid item>
              <NavLink to="/login" variant="body2">
                Masz już konto? Zaloguj się
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginView;
