import {
  Card,
  CardContent,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

const StatComponent = ({ value, icon, description, money }) => {
  const { palette } = useTheme();
  return (
    <>
      <Card
        sx={{
          bgcolor: palette.secondary.main,
          width: "100%",
          pb: 0,
          transition: "all ease .5s",
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            width: "150px",
            height: "150px",
            background: palette.yellow1,
            borderRadius: "50%",
            top: "-80px",
            right: "-90px",
            opacity: "0.4",
          },
        }}
      >
        <CardContent>
          <IconButton sx={{ bgcolor: palette.primary.main, mb: 1 }}>
            {icon}
          </IconButton>
          <Typography
            variant="h4"
            sx={{
              color: palette.yellow2,
              mb: "1px",
              pl: 1,
              fontWeight: 700,
              fontSize: { xs: "1.5rem", sm: "2.125rem" },
            }}
          >
            {money !== "" ? money + value : value}
          </Typography>
          <Typography variant="body2" sx={{ color: "#c1c1c1", mb: 0, pl: 1 }}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default StatComponent;
