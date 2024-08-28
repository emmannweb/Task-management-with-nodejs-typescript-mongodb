import { Box } from "@mui/material";
import HeaderTop from "./HeaderTop";
import SidebarAdm from "./SidebarAdm";

const Layout =
  (Component) =>
  ({ ...props }) => {
    return (
      <>
        <Box style={{ display: "flex", minHeight: "100vh" }}>
          <SidebarAdm />
          <Box sx={{ width: "100%", bgcolor: "#031d2a" }}>
            <HeaderTop />
            <Box sx={{ pt: 0, pr: 3, pl: 3, pb: 23 }}>
              <Component {...props} />
            </Box>
          </Box>
        </Box>
      </>
    );
  };

export default Layout;
