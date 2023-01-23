import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteThreat } from "../api";
import Map from "../components/Map";
import ThreatsPanel from "../components/ThreatsPanel";
import { useThreats } from "../hooks/useThreats";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const HomeView = () => {
  const [user, setUser] = useState(null);
  const [threats, setThreats] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [current, setCurrent] = useState("");

  const res = useThreats();
  const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState({
    lat: 50.32,
    lng: 19.19,
  });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    setThreats(res.data);
  }, [current, res.data]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      console.log(localStorage.getItem("profile"));
    }
  }, []);

  const handleNavigateToThreat = (threat) => {
    setMapPosition({
      lat: threat.lat,
      lng: threat.lon,
    });
  };

  const handleSearch = (city) => {
    const query = city.target.value.toLowerCase();

    const filtered = threats.filter((v) =>
      v.city.toLowerCase().includes(query)
    );
    setFiltered(filtered);
  };

  const handleDelete = (id) => {
    setCurrent(id);
    handleOpen();
  };

  const handleConfirmDelete = () => {
    try {
      deleteThreat(current);
      const fil = threats.filter((v) => v._id !== current);
      setThreats(fil);
      console.log(fil);
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  const handleEdit = (id) => {
    navigate(`/threat/${id}`);
  };

  if (!user) return "Loading";

  return (
    <Grid container columnSpacing={1}>
      <Grid item xs={12} md={6}>
        <Map mapPosition={mapPosition} markers={res.data} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ThreatsPanel
          style={{ position: "fixed" }}
          onDelete={handleDelete}
          onChange={handleSearch}
          onEdit={handleEdit}
          user={user}
          onClick={handleNavigateToThreat}
          threats={filtered.length !== 0 ? filtered : threats}
        />
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography mb={1} id="modal-modal-description">
            Czy na pewno chcesz usunąć to zagrożenie?
          </Typography>
          <Button
            onClick={handleConfirmDelete}
            style={{ border: "1px solid", marginRight: 10 }}
          >
            Tak
          </Button>
          <Button
            onClick={handleClose}
            style={{ color: "red", border: "1px solid red" }}
          >
            Anuluj
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
};

export default HomeView;
//AIzaSyCRy-d5qrHLHUyIxfjNZFrPbWzz0wIaAUs
