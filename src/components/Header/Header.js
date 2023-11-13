import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
import usericon from "./usericon.svg";

function Header() {
  const navigate = useNavigate();
  // Get cart items from Redux store
  const cart = useSelector((state) => state.cart);

  // Calculate total quantity of items in the cart
  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  // Styles for the header component
  const headerStyles = {
    backgroundColor: "#ffffff", // Set the background color to white
    borderBottom: "1px solid #e1e1e1", // Add a bottom border for separation
    padding: "10px 0", // Add padding to the header content
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Add a subtle shadow for depth
  };

  // Styles for the logo section
  const logoStyles = {
    display: "flex", // Use flexbox for layout
    alignItems: "center", // Center align items vertically
    marginRight: "20px", // Add right margin for spacing
    textDecoration: "none", // Remove default text decoration for NavLink
  };

  // Styles for the cart section
  const cartStyles = {
    display: "flex", // Use flexbox for layout
    alignItems: "center", // Center align items vertically
    marginRight: "20px", // Add right margin for spacing
    textDecoration: "none", // Remove default text decoration for NavLink
  };

  // Function to generate styles for active links in the navigation bar
  const generateActiveLinkStyles = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "", // Set bold font weight for active link
    color: isActive ? "royalblue" : "black", // Set color to royalblue for active link, black for others
    textDecoration: "none", // Remove default text decoration for NavLink
    // Additional styles for Register and Login links
    cursor: "pointer", // Change cursor to pointer on hover
    transition: "color 0.3s", // Add transition effect for color change
    ":hover": { color: "blue" }, // Change color to blue on hover
  });

  return (
    <Navbar expand="lg" style={headerStyles}>
      <Container>
        {/* Logo and Home Link */}
        <NavLink to="/" style={logoStyles}>
          <img
            style={{
              width: "50px", // Set logo width
              marginRight: "10px", // Add right margin for spacing
            }}
            src="https://i.pinimg.com/originals/9c/87/99/9c879909741ebaa6b7a614071079e542.jpg"
            alt="Logo"
          />
          <span style={{ fontSize: "1.5rem" }}>DentiBask</span>
        </NavLink>

        {/* Navbar Toggle Button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Items */}
        <Navbar.Collapse className="justify-content-end">
          {localStorage.getItem("dentibask-access-token") ? (
            <>
              <NavLink
                style={generateActiveLinkStyles}
                className="nav-link"
                to="/dashboard"
              >
                <img src={usericon} alt="Dashboard" />
              </NavLink>
              <NavLink
                onClick={() => {
                  localStorage.removeItem("dentibask-access-token");
                  localStorage.removeItem("dentibask-refresh-token");
                  navigate("/");
                }}
                style={generateActiveLinkStyles}
                className="nav-link"
              >
                Logout
              </NavLink>
              {/* Cart Link */}
              <NavLink style={cartStyles} className="nav-link" to="/Cart">
                <FaShoppingCart
                  style={{ fontSize: "1.2rem", marginRight: "5px" }}
                />
                <span id="numberOfOrders">{getTotalQuantity()}</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                style={generateActiveLinkStyles}
                className="nav-link"
                to="/Register"
              >
                Register
              </NavLink>
              <NavLink
                style={generateActiveLinkStyles}
                className="nav-link"
                to="/Login"
              >
                Login
              </NavLink>
            </>
          )}

          {/* Settings Dropdown */}
          <NavDropdown
            title={<FiSettings style={{ fontSize: "1.2rem" }} />}
            id="basic-nav-dropdown"
          >
            {/* Dropdown Items */}
            <NavDropdown.Item href="#action/3.1">Theme</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
