import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
// import Settings from "../dashboard/settings/settings";

function Header() {
  const cart = useSelector((state) => state.cart);

 


  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  const generateActiveLinkStyles = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "",
    color: "royalblue",
    textDecoration: "none",
  });

  return (
    <Navbar expand="lg" >
      <Container >
        <NavLink to="/" style={generateActiveLinkStyles}>
          <span><img style={{
            width:'5vw'
          }} src='https://i.pinimg.com/originals/9c/87/99/9c879909741ebaa6b7a614071079e542.jpg'/>
          <span>DentiBask</span></span>
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <NavLink style={generateActiveLinkStyles} className="nav-link px-4 " s={12} to="/Register">
            Register
          </NavLink>
          <NavLink style={generateActiveLinkStyles} className="nav-link px-4"  s={12} to="/Login">
            Login
          </NavLink>
          <NavLink style={generateActiveLinkStyles} className="nav-link px-4"  s={12} to="/Cart">
            <span>
              <FaShoppingCart />
              <span id="numberOfOrders">{getTotalQuantity()}</span>
            </span>
          </NavLink>

          <NavDropdown  title={<FiSettings />} id="basic-nav-dropdown" >
            <NavDropdown.Item href="#action/3.1">
              Theme
              <button
                className="btn border border-2 me-2 fw-bold"
                onClick={()=>console.log(0)}
              >
                {/* <Settings/> */}
              </button>
              
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
