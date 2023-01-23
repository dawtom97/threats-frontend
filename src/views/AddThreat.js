import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createThreat } from "../api";

const initialState = {
  title: "",
  shortDesc: "",
  city: "",
  lat: "",
  lon: "",
  threatLevel: "",
};

const AddThreat = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.shortDesc ||
      !formData.city ||
      !formData.lat ||
      !formData.lon ||
      !formData.threatLevel
    ) {
      setError("Uzupełnij wszystkie pola");
    } else {
      addThreat(formData);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addThreat = (obj) => {
    try {
      createThreat(obj);
      navigate("/");
    } catch (error) {
      setError("Wystąpił błąd podczas dodawania zagrożenia");
    }
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
        <Typography component="h1" variant="h5">
          Dodaj zagrożenie
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Nazwa"
            name="title"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="shortDesc"
            label="Krótki opis"
            onChange={handleChange}
            id="shortDesc"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="city"
            label="Miasto"
            onChange={handleChange}
            id="city"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="number"
            name="lat"
            label="Szerokość geograficzna"
            onChange={handleChange}
            id="lat"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="lon"
            type="number"
            label="Długość geograficzna"
            onChange={handleChange}
            id="lon"
          />
          <InputLabel
            style={{ textAlign: "left", margin: "20px 0 10px" }}
            id="demo-simple-select-label"
          >
            Poziom zagrożenia
          </InputLabel>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              name="threatLevel"
              value={formData.threatLevel}
              onChange={handleChange}
            >
              <MenuItem value="low">Niskie</MenuItem>
              <MenuItem value="middle">Średnie</MenuItem>
              <MenuItem value="high">Wysokie</MenuItem>
            </Select>
          </FormControl>

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
            Dodaj
          </Button>
          <Button  onClick={()=>navigate('/')}>Wróć na stronę główną</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddThreat;
