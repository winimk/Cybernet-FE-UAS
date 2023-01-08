import { React, useState } from "react";
import { Col, Collapse, Container, Row, Button } from "react-bootstrap";

import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";


function currencyFormat(num) {
  // return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

  num = parseInt(num);  
  if (!isNaN(+num)) {// true if its a number, false if not
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }
  return ""
}


function Discount(props) {
  const disc = props.amount;
  if (disc > 0) {
    return (
      <p
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          backgroundColor: "orange",
          padding: "5px 20px",
          borderRadius: "3px 0 15px 0",
          color: "white",
        }}
      >
        Disc {disc}%
      </p>
    );
  }
  return "";
}

function CardProduct(props) {

  let navigate = useNavigate();

  async function handleClickOrder(props) {
    // event.preventDefault();
    navigate("/Order", {state:{nameitem:props.title,priceitem:props.price, distitem:props.disc}});
  }

  return (
    <Col>
      <Card>
        <Card.Img
          variant="top"
          src={require("../assets/product_item/" +
            `${props.image || "p_default.png"}`)}
        />
        <Card.Body>
          <Card.Title>{props.title || "Product Title"}</Card.Title>
          <Card.Text style={{ color: "#233dff" }}>
            <b>Rp. {currencyFormat(props.price) || "NA"}</b>
          </Card.Text>
          <Card.Text>{props.desc || "Product Description"}</Card.Text>
          <Button className="btn-success" onClick={() => handleClickOrder(props)}>Order</Button>
        </Card.Body>

        <Discount amount={props.disc || 0} />
      </Card>
    </Col>
  );
}
export default CardProduct;
