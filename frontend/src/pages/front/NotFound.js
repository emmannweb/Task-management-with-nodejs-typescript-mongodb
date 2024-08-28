import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Box } from "@mui/material";

const NotFound = () => {
  return (
    <>
      <Header />

      <Box
        sx={{
          bgcolor: "oklch(0.27642 0.055827 233.809)",
          minHeight: "calc(100vh - 140px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#c1c1c1",
        }}
      >
        <h1>Page not found!</h1>
      </Box>

      <Footer />
    </>
  );
};

export default NotFound;
