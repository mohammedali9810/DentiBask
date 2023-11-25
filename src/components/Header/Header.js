import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import usericon from "./usericon.svg";
import { resetItem } from "../../store/slices/cartslice";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const resetlist = () => {
    dispatch(resetItem());
  };

  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  const headerStyles = {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e1e1e1",
    padding: "10px 0",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const logoStyles = {
    display: "flex",
    alignItems: "center",
    marginRight: "20px",
    textDecoration: "none",
  };

  const cartStyles = {
    display: "flex",
    alignItems: "center",
    marginRight: "20px",
    textDecoration: "none",
  };

  const generateActiveLinkStyles = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "",
    color: isActive ? "royalblue" : "black",
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.3s",
    ":hover": { color: "blue" },
  });

  return (
    <Navbar expand="lg" style={headerStyles}>
      <Container>
        <NavLink to="/" style={logoStyles}>
          <img
            style={{
              width: "50px",
              marginRight: "10px",
            }}
            src="https://i.pinimg.com/originals/9c/87/99/9c879909741ebaa6b7a614071079e542.jpg"
            alt="Logo"
          />
          <span style={{ fontSize: "1.9rem" ,fontFamily: 'Brush Script MT ',
 }}>DentiBask</span>
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse className="justify-content-end">
            <NavLink style={cartStyles} className="nav-link" to="/Cart">
                <FaShoppingCart
                  style={{ fontSize: "1.2rem", marginRight: "5px" }}
                />
                <span id="numberOfOrders">{getTotalQuantity()}</span>
              </NavLink>
          {localStorage.getItem("dentibask-access-token") ? (
            <>
              <NavLink
                style={(generateActiveLinkStyles, { textAlign: "center" })}
                className="nav-link"
                to={localStorage.getItem('dentibask-role') === 'admin' ? "/admindashboard" : "/dashboard"}
              >
                <img src={usericon} alt="Dashboard" />
              </NavLink>
              
              <NavLink
                onClick={() => {
                  localStorage.removeItem("dentibask-access-token");
                  localStorage.removeItem("dentibask-refresh-token");
                  resetlist();
                  navigate("/");
                }}
                style={generateActiveLinkStyles}
                className="nav-link"
              >
                Logout
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

          <NavDropdown
            title={<FiSettings style={{ fontSize: "1.2rem" }} />}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="#action/3.1">Theme</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
