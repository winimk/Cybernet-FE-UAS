import React from "react";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import CardProduct from "../components/CardProduct";

function Product() {
  return (
    <>
      <Container className="py-5">
        <Row>
          <Col className="text-center my-2">
            <h2>PILIH LAYANAN</h2>
            <p style={{ color: "#233dff", fontStyle: "italic" }}>
            <b>CYBERNET adalah sebuah internet provider terbaik di Indonesia. CYBERNET Bangkit Bersatu Untuk Indonesia, dengan menjunjung tinggi nilai-nilai Nasionalisme, CYBERNET berniat memberikan yang terbaik untuk masyarakat Indonesia
            </b>
            </p>
          </Col>
        </Row>
        <Row xs={1} md={3} className="g-2">
          {/* {Array.from({ length: 4 }).map((_, idx) => ( */}
          <CardProduct
            image="p01.png"
            title="INTERNET BRONZE"
            desc="UP TO 50Mbps"
            price="500000"
            disc="10"
          />
          <CardProduct
            image="p02.png"
            title="INTERNET SILVER"
            desc="UP TO 150Mbps"
            price="1500000"
            disc="15"
          />
          <CardProduct
            image="p03.png"
            title="INTERNET GOLD"
            desc="UP TO 250Mbps"
            price="2300000"
          />
          {/* ))} */}
        </Row>
      </Container>
    </>
  );
}

export default Product;
