import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../assets/logo.png";

function AboutUs() {
  return (
    <div className="py-5" style={{ backgroundColor: "#f5f5f5" }}>
      <Row>
        <Col className="text-center">
          <h2>About Us</h2>
          <p style={{ color: "#233dff", fontStyle: "italic" }}>
            Introduce our company.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <div style={{ position: "relative", top: 0, left: 0 }}>
            <img
              src={require("../assets/pic03.jpg")}
              style={{
                borderRadius: "20px",
                filter: "blur(1px)",
                maxWidth: "80%",

                position: "relative",
                top: 0,
                left: 0,
                marginLeft: "-5%",
              }}
              alt="about us"
            />
            <img
              src={require("../assets/pic01.jpg")}
              style={{
                borderRadius: "20px",

                position: "absolute",
                top: "5%",
                left: "30%",
                maxHeight: "90%",
                maxWidth: "80%",
                boxShadow: "5px 10px 18px #888888",
              }}
              alt="about us"
            />
          </div>
        </Col>
        <Col
          md={8}
          style={{
            paddingTop: "5%",
            paddingRight: "10%",
            paddingLeft: "10%",
            textAlign: "center",
          }}
        >
          <Container>
            <img
              src={logo}
              width="70"
              height="70"
              alt="Our logo"
              style={{ marginRight: "15px" }}
            />
            <span
              style={{
                fontWeight: "700",
                fontStyle: "italic",
                fontSize: "400%",
              }}
            >
              CYBERNET.
            </span>

            <p style={{ color: "#233dff" }}>
              <i>
                <b>#CYBERNET Lebih Cepat</b>
              </i>
            </p>
            <p className="mt-5" style={{ textAlign: "justify" }}>
              <b>VISI</b>  <br></br>
              Menjadi Penyedia Layanan Internet Kebanggaan Indonesia
                           <br></br>
                           <br></br>
              <b>MISI</b>  <br></br>
              1. Menjadi penyedia layanan internet yang cepat, andal, dan tv berbayar untuk keluarga dan bisnis <br></br>
              2. Menjalankan bisnis dengan prinsip Green Company dan Good Governance <br></br>
              3. Memberikan pelayanan dan keamanan data terbaik kepada pelanggan<br></br><br></br>
              <b>CAKUPAN AREA</b><br></br>
              CYBERNET - Berikut Adalah Kota Yang Sudah Tercover CYBERNET: BEKASI, BOGOR, BSD, CIBUBUR, DEPOK, JAKARTA, MALANG, MEDAN, PALEMBANG, SEMARANG, SURABAYA, TANGERANG.
              <br></br><br></br>
              Jika Alamat Anda berada di luar Kota-kota/Area, berarti Alamat Anda belum tercover Jaringan Internet CYBERNET, artinya saat ini Anda belum bisa berlangganan Internet CYBERNET.
              <br></br><br></br>
              <b>TEKNOLOGI PARTNER</b><br></br>
              CISCO <br></br>
              Bitdefender <br></br> 
              Cloudflare <br></br>  
              Fortinet <br></br> 
              Belden <br></br>             
              Ubiquiti <br></br> <br></br>
              <b>UPSTREAM KAMI</b><br></br>
              APJII (IIX Gedung Cyber1)<br></br>
              IDC3D Duren Tiga (OIXP) <br></br>
              Neucentrix (Telkom IX) <br></br>
              Biznet (BIX)<br></br>
              Transhybird Comunication (THC-IX) <br></br>
              Hurricane Electric (HE-IX) <br></br> 
              CircleID (Firewall Anti DDoS) <br></br> 

            </p>
          </Container>
        </Col>
      </Row>
      <br />
      <br />
      <br />
    </div>
  );
}

export default AboutUs;
