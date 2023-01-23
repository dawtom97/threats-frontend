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
  import React, { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import { fetchThreat, updateThreat } from "../api";
  
  const initialState = {
    title: "",
    shortDesc: "",
    city: "",
    lat: "",
    lon: "",
    threatLevel: "",
  };
  
  const EditThreat = () => {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();
    const {id} = useParams();
    const [threat,setThreat] = useState();

    useEffect(()=>{
      fetchThreat(id).then(res => setThreat(res.data))
    },[id])
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (
        !threat.title ||
        !threat.shortDesc ||
        !threat.city ||
        !threat.lat ||
        !threat.lon ||
        !threat.threatLevel
      ) {
        setError("Uzupełnij wszystkie pola");
      } else {
        editThreat(threat);
      }
    };
  
    const handleChange = (e) => {
      setThreat({ ...threat, [e.target.name]: e.target.value });
    };
  
    const editThreat = (obj) => {
      try {
        updateThreat(obj._id,threat);
        navigate("/");
      } catch (error) {
        setError("Wystąpił błąd podczas edytowania zagrożenia");
      }
    };

    if(!threat) return "Loading"
  
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
            Edytuj zagrożenie
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={threat.title}
              id="title"
              name="title"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="shortDesc"
              value={threat.shortDesc}
              onChange={handleChange}
              id="shortDesc"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="city"
              value={threat.city}
              onChange={handleChange}
              id="city"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              name="lat"
              value={threat.lat}
              onChange={handleChange}
              id="lat"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="lon"
              type="number"
              value={threat.lon}
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
                value={threat.threatLevel}
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
              Edytuj
            </Button>
            <Button  onClick={()=>navigate('/')}>Wróć na stronę główną</Button>
          </Box>
        </Box>
      </Container>
    );
  };
  
  export default EditThreat;