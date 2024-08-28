import { Card, CardContent, useTheme } from "@mui/material";
import React from "react";

const PieStat = ({ children }) => {
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
        <CardContent>{children}</CardContent>
      </Card>
    </>
  );
};

export default PieStat;
