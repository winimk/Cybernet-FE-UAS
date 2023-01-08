import { React, useEffect } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import Home from "../pages/Home";
import logo from "../assets/logo.png";
import Product from "../pages/Product";
import Contact from "../pages/Contact";
import AboutUs from "../pages/AboutUs";
import Order from "../pages/Order";

const nav1style = {
  zIndex: 9999,
  background:
    "linear-gradient(to bottom, rgba(0,0,4,0.65172006302521) 0%, rgba(0,0,0,0.19233630952380953) 46%, rgba(0,0,0,0) 100%)",
  color: "white",
};

const nav2style = {
  zIndex: 9999,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
};

const whiteText = {
  color: "white",
};

function Navigation() {
  let location = useLocation();

  useEffect(() => {
    console.log("Current URL Location");
    console.log(location);
  }, [location]);

  let navStyle;
  if (location.pathname == "/") {
    navStyle = nav1style;
  } else {
    navStyle = nav2style;
  }
  return (
    <>
      <div>
        {/* Path : {location.pathname} */}

        <Navbar
          collapseOnSelect
          expand="lg"
          className="pt-3 pb-3"
          style={navStyle}
        >
          <Container>
            <Navbar.Brand
              as={Link}
              to={"/"}
              style={{
                color: "white",
                fontWeight: "700",
                fontStyle: "italic",
                fontSize: "150%",
              }}
            >
              <img
                src={logo}
                width="30"
                height="30"
                alt="Our logo"
                style={{ marginRight: "15px" }}
              />
              CYBERNET.
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to={"/"} style={whiteText}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to={"/Product"} style={whiteText}>
                  Product
                </Nav.Link>
                <Nav.Link as={Link} to={"/Contact"} style={whiteText}>
                  Contact
                </Nav.Link>
                <Nav.Link as={Link} to={"/AboutUs"} style={whiteText}>
                  About Us
                </Nav.Link>

                {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
              {/* <Nav>
                <Nav.Link as={Link} to={"/Order"}>
                  <Button variant="warning">Order Now</Button>
                </Nav.Link>
              </Nav> */}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Order" element={<Order />} />
      </Routes>
    </>
  );
}

export default Navigation;
