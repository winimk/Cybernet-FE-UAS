import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Contact() {
  return (
    <div className="pt-5" style={{ paddingBottom: "10%" }}>
      <Row>
        <Col className="text-center">
          <h2>Kontak</h2>
          <p style={{ color: "#233dff", fontStyle: "italic" }}>
            Anda dapat menghubungi kami untuk informasi lebih lanjut.          
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container>
            <Card className="text-center">
              {/* <Card.Header>Featured</Card.Header> */}
              <Card.Body>
                {/* <Card.Title>Special title treatment</Card.Title> */}
                <Card.Text>Alamat : Jakarta selatan, DKI Jakarta, Indonesia </Card.Text>
                <Card.Text>Nomor Telephone : 089763940582</Card.Text>
                <Card.Text>Email : info@cybernet.net</Card.Text>

                
              </Card.Body>
              <Card.Footer className="text-muted">
    
              </Card.Footer>
            </Card>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default Contact;
