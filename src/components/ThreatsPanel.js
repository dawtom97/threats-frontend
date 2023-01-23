import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ThreatsPanel = ({ threats, onClick, user, onChange, onDelete,onEdit }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    navigate("/login");
  };

  const threatLevelText = (level) => {
    switch (level) {
      case "low":
        return "Niski";

      case "middle":
        return "Średni";

      case "high":
        return "Wysoki";

      default:
        return "Niski";
    }
  };

  if (!threats) return;

  return (
    <Box m={5}>
      <Box>
        <Button style={{color:'red'}} onClick={handleLogout}>Wyloguj się</Button>
        <Button onClick={()=>navigate('/add-threat')}>Dodaj zagrożenie</Button>
      </Box>
      <Typography mb={1} variant="h4">
        Cześć, {user.name}
      </Typography>
      <Typography variant="p">
        Wybiarasz się w podróż? Sprawdź czy nie natkniesz się na żadne
        niebezpieczeństwa
      </Typography>

      <TextField
        margin="normal"
        fullWidth
        id="email"
        label="Podaj nazwę miasta"
        name="city"
        onChange={(e) => onChange(e)}
      />

      <Grid mt={4} container columnSpacing={2} rowSpacing={2}>
        {threats.map((threat) => (
          <Grid item xs={6} key={threat._id}>
            {" "}
            <Card
              style={{ backgroundColor: "rgb(18, 18, 18)", cursor: "pointer" }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="#ffffff59"
                  gutterBottom
                >
                  {threat.city}
                </Typography>
                <Typography color="#fff" variant="h5" component="div">
                  {threat.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="#ffffff59">
                  {threatLevelText(threat.threatLevel)} poziom zagrożenia
                </Typography>
                <Typography color="#fff" variant="body2">
                  {threat.shortDesc}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => onClick(threat)} size="small">
                  Nawiguj
                </Button>
                <Button onClick={() => onEdit(threat._id)} size="small">Edytuj</Button>
                <Button onClick={() => onDelete(threat._id)} color="error" size="small">
                  Usuń
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ThreatsPanel;
