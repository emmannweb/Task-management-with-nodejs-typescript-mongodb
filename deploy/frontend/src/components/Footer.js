import { Box } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          height: "70px",
          bgcolor: "oklch(0.218022 0.040901 233.565)",
          borderTop: "1px solid oklch(0.382774 0.071686 233.169)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box component="span" sx={{ color: "#fafafa" }}>
          All right reserved! 2024.
        </Box>
      </Box>
    </>
  );
};

export default Footer;
