import React from "react";
import { Grid, Typography, Button, Link } from "@mui/material";
import ArrPlan from "../assets/images/Arriere_plan.jpg";

const HomePage = () => {
  return (
    <Grid container sx={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
      <Grid
        item
        xs={12}
        sx={{
          backgroundImage: `url(${ArrPlan})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
        }}
      >
        <Typography
          variant="h2"
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#fff",
            textAlign: "center",
            marginTop: "10rem",
          }}
        >
          Ma Banque
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <Typography variant="body1" color="textSecondary">
          La banque en ligne qui vous facilite la vie.
        </Typography>
        <Link to="/inscription" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{ marginTop: "1rem", backgroundColor: "#009688" }}
          >
            Je m'inscris
          </Button>
        </Link>

        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: "2rem" }}
        >
          **Témoignages:**
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ marginTop: "1rem" }}
        >
          "J'adore la simplicité et la rapidité d'utilisation de Ma Banque." -
          Client satisfait
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HomePage;
