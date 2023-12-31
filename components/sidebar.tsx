"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { Fade } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/app/Context/store";
import supabase from "@/config/supabse";
const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function Sidebar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [show, setShow] = useState<boolean>(false);
  const { currentUser,setUser } = useAuthContext();
  const router = useRouter();
  const logout = async () => {
    await supabase.auth.signOut();
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    {
      name: "Upload",
      icon: (
        <CloudUploadOutlinedIcon
          sx={{
            color: "#817245",
          }}
        />
      ),
      path: "/dashboard/upload",
    },
    {
      name: "Data",
      icon: (
        <StorageRoundedIcon
          sx={{
            color: "#817245",
          }}
        />
      ),
      path: "/dashboard/data",
    },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="a"
          onClick={() => router.push("/")}
          sx={{
            mr: 2,
            display: { md: "flex" },
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
      </Toolbar>

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton onClick={() => router.push(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.name}
                sx={{
                  color: "#817245",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        {currentUser ? (
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                logout();
                setUser(null)
                router.push("/");
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Logout"}
                sx={{
                  color: "#817245",
                }}
              />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={() => router.push("/auth")}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Login"}
                sx={{
                  color: "#817245",
                }}
              />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <Fade in={show} timeout={2000}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            bgcolor: "transparent",
            color: "#817245",
            boxShadow: "none",
            border: "1px solid #f2f2f2",
            display: { md: "none" },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </Fade>
  );
}
