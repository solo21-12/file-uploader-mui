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

import { signIn, signOut, useSession } from "next-auth/react";

const settings = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Logout", path: "/signout" },
];

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
  const handleCloseUserMenu = (path: string) => {
    setAnchorElUser(null);
    router.push(path);
  };

  const hiddenRoutes = ["/auth", "/auth/signup", "/auth/forgot"];
  const hiddenNavigationBar = hiddenRoutes.includes(usePathname());

  const { data: session } = useSession();

  React.useEffect(() => {
    if (!hiddenNavigationBar) {
      setShow(true);
    }
    setIsVisible(true);
  }, [usePathname()]);

  return (
    <div>
      {![
        "/dashboard",
        "/dashboard/upload",
        "/dashboard/profile",
        "/dashboard/data",
      ].includes(usePathname()) && (
        <AppBar
          position="sticky"
          sx={{
            bgcolor: "transparent",
            color: "#637381",
            boxShadow: "none",
            height: "88px",
            minHeight: "64px",
            zIndex: (theme) => theme.zIndex.drawer + 2,
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
                    color: "#817245",

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
                          alt={session?.user?.name || "solo"}
                          src={session?.user?.image}
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
                      {settings.map((setting) => {
                        if (setting.name == "Logout") {
                          return session ? (
                            <MenuItem
                              key={"signout"}
                              onClick={() => signOut()}
                              className="menuItem"
                            >
                              <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                          ) : (
                            <MenuItem
                              key={"signin"}
                              onClick={() => signIn()}
                              className="menuItem"
                            >
                              <Typography textAlign="center">Log in</Typography>
                            </MenuItem>
                          );
                        } else {
                          return (
                            <MenuItem
                              key={setting.name}
                              onClick={() => handleCloseUserMenu(setting.path)}
                              className="menuItem"
                            >
                              <Typography textAlign="center">
                                {setting.name}
                              </Typography>
                            </MenuItem>
                          );
                        }
                      })}
                    </Menu>
                  </Box>
                )}
              </Toolbar>
            </Fade>
          </Container>
        </AppBar>
      )}
    </div>
  );
}
export default ResponsiveAppBar;
