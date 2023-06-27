"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useRouter, usePathname } from "next/navigation";
import { Fade } from "@mui/material";

const settings = ["Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [show, setShow] = React.useState<boolean>(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const router = useRouter();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const hiddenRoutes = ["/auth", "/auth/signup", "/auth/forgot"];
  const hiddenNavigationBar = hiddenRoutes.includes(usePathname());
  React.useEffect(() => {
    if (!hiddenNavigationBar) {
      setShow(true);
    }
    setIsVisible(true);
  }, [usePathname()]);

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "transparent",
        color: "#637381",
        boxShadow: "none",
        height: "88px",
        minHeight: "64px",
      }}
    >
      <Container maxWidth="xl">
        <Fade in={isVisible} timeout={2000}>
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px auto",
              borderBottom: "2px solid #f2f2f2",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={() => router.push("/")}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Barlow",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Solo Uploads
            </Typography>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "Barlow",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
                fontSize: "17px",
              }}
            >
              SOLO UPLOADS
            </Typography>

            {show && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Dawit Abraham"
                      src="/man.avif"
                      sx={{
                        bgcolor: "teal",
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={handleCloseUserMenu}
                      className="menuItem"
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Fade>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
