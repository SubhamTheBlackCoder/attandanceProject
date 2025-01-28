import React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
import { styled } from "@mui/system";

// Custom styled AppBar with navy blue background, shadow, and blur effect
const CustomAppBar = styled(AppBar)(() => ({
  backgroundColor: "#003366",
  color: "#fff",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(8px)",
  height: "70px",
  zIndex: 1300,
  position: "fixed",
  width: "100%",
}));

// Navigation links array with icons
const navLinks = [
  { title: "Home", path: "/", icon: <HomeIcon /> },
  { title: "About", path: "/about", icon: <InfoIcon /> },
  { title: "Registration", path: "/reg", icon: <PersonAddIcon /> },
  { title: "Teacher", path: "/teacher", icon: <SchoolIcon /> },
  { title: "Course", path: "/course", icon: <BookIcon /> },
];

const Navbar = () => {
  return (
    <>
      <CustomAppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <NavLink to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <img
              src="https://admission.cutm.ac.in/assets/images/cutmlogo.png"
              alt="Logo"
              style={{
                width: "40px",
                height: "auto",
                padding: "5px",
              }}
            />
          </NavLink>

          {/* Desktop Links with Icons */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  margin: "0 20px",
                  fontWeight: "500",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {link.icon}
                  <Typography
                    variant="subtitle1"
                    sx={{
                      display: "inline-block",
                      marginLeft: "5px",
                      transition: "color 0.3s ease, transform 0.3s ease",
                      "&:hover": {
                        color: "#1976d2",
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    {link.title}
                  </Typography>
                </Box>
              </NavLink>
            ))}
          </Box>
        </Toolbar>
      </CustomAppBar>

      {/* Body content with offset for navbar height */}
      <div style={{ paddingTop: "70px" }}>
        {/* Add your page content here */}
      </div>
    </>
  );
};

export default Navbar;
