import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <>
      <footer
        className="text-center text-lg-start py-3 text-white"
        style={{
          backgroundColor: "#81e2f8",
          position: "fixed",
          bottom: "0px",
          width: "100%",
        }}
      >
        <Container className="text-center">
          {" "}
          Copyright {new Date().getFullYear()} &copy;
          <span>&emsp;</span>
          CYBERNET
        </Container>
      </footer>
    </>
  );
}

export default Footer;
