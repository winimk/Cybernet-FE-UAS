import { React, useState } from "react";
import { Col, Container, Row, Form, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useLocation} from 'react-router-dom';


function currencyFormat(num) {
  // return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

  num = parseInt(num);  
  if (!isNaN(+num)) {// true if its a number, false if not
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }
  return ""
}

function Order() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [discount, setDiscount] = useState("");
  const [total, setTotal] = useState("");
  const [paid, setPaid] = useState("");
  const [change, setChange] = useState("");

  const location = useLocation();
  // console.log(location.state);

  const [inputs, setInputs] = useState({
    "name":location.state.nameitem,
    "price":location.state.priceitem,
    "discount":location.state.distitem
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));

    if (name == "qty") {
      let qtynya = event.target.value;
      let jumlah = parseInt(inputs.price) * parseInt(qtynya);

      // let gettotal = jumlah - (jumlah * (parseInt(inputs.discount) / 100));
      let gettotal = jumlah - (isNaN(parseInt(inputs.discount)) ? 0 : (jumlah * (parseInt(inputs.discount) / 100)) ); //hitung diskon

      setInputs((values) => ({ ...values, ["total"]: gettotal }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    setName(inputs.name);
    setPrice(inputs.price);
    setQty(inputs.qty);
    setDiscount(inputs.discount);
    setPaid(inputs.paid);
    setTotal(inputs.total)

    let kembalian = parseInt(inputs.paid) - parseInt(inputs.total);
    setChange(kembalian);
  };

  return (
    <div className="my-3" style={{ paddingBottom: "80px" }}>
      <Row>
        <Col className="text-center">
          <h2>Order</h2>
          <p style={{ color: "#233dff", fontStyle: "italic" }}>
            Add your order here.
          </p>
        </Col>
      </Row>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={8} className="px-5">
              <h5 className="mb-3" style={{ color: "#233dff", fontStyle: "italic" }}>Detail Order</h5>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="nmbrng">
                  <Form.Label>Nama Barang</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Nama Barang"
                    // onChange={handleChange}
                    value={location.state.nameitem}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="harga">
                  <Form.Label>Harga (Rp)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    placeholder="Rp."
                    // onChange={handleChange}
                    value={location.state.priceitem}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="qty">
                  <Form.Label>Qty</Form.Label>
                  <Form.Control
                    type="number"
                    name="qty"
                    placeholder="Quantity"
                    onChange={handleChange}
                    min="1"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="discount">
                  <Form.Label>Discount (%)</Form.Label>
                  <Form.Control
                    type="number"
                    name="discount"
                    placeholder="Discount"
                    onChange={handleChange}
                    value={location.state.distitem}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="total">
                  <Form.Label>Total (Rp)</Form.Label>
                  <Form.Control
                    type="number"
                    name="total"
                    placeholder="Rp."
                    readOnly
                    value={inputs.total}
                    // onChange={handleChange}
                  />
                </Form.Group>

                <hr />

                <Form.Group className="mb-3" controlId="paid">
                  <Form.Label>Bayar (Rp)</Form.Label>
                  <Form.Control
                    type="number"
                    name="paid"
                    placeholder="Rp."
                    onChange={handleChange}
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="change">
                  <Form.Label>Sisa/Kembalian (Rp)</Form.Label>
                  <Form.Control
                    type="number"
                    name="change"
                    placeholder="Rp."
                    readOnly
                    onChange={handleChange}
                    value={change}
                  />
                </Form.Group> */}

                <Button variant="success" type="submit">
                  Pesan
                </Button>
              </Form>
           
          </Col>
          <Col md={4} lg={4}>
            <h5 className="mb-3" style={{ color: "#233dff", fontStyle: "italic" }}>Nota</h5>

            <Card
              bg="success"
              key="success"
              text="white"
              className="mb-2"
            >
              <Card.Header>Purchase Orders</Card.Header>
             
              <Card.Body>
                <Row>
                  <Col md={6} lg={6}>
                    <Card.Text>Nama Barang :</Card.Text>
                  </Col>
                  <Col md={6} lg={6} style={{textAlign: "right"}}>
                    <Card.Text>{name}</Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} lg={6}>
                    <Card.Text>Harga Satuan (Rp.): </Card.Text>
                  </Col>
                  <Col md={6} lg={6} style={{textAlign: "right"}}>
                    <Card.Text>{currencyFormat(price)}</Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} lg={6}>
                    <Card.Text>Kuantitas : </Card.Text>
                  </Col>
                  <Col md={6} lg={6} style={{textAlign: "right"}}>
                    <Card.Text>{currencyFormat(qty)}</Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} lg={6}>
                    <Card.Text>Diskon (%) : </Card.Text>
                  </Col>
                  <Col md={6} lg={6} style={{textAlign: "right"}}>
                    <Card.Text>{discount | "-"}</Card.Text>
                  </Col>
                </Row>
                <hr/>
                <Row>
                  <Col md={6} lg={6}>
                    <Card.Text>Total (Rp.) : </Card.Text>
                  </Col>
                  <Col md={6} lg={6} style={{textAlign: "right"}}>
                    <Card.Text>{currencyFormat(total) }</Card.Text>
                  </Col>
                </Row>
                <hr/>
                <Row>
                  <Col md={6} lg={6}>
                    <Card.Text>Bayar (Rp.) : </Card.Text>
                  </Col>
                  <Col md={6} lg={6} style={{textAlign: "right"}}>
                    <Card.Text>{currencyFormat(paid)}</Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} lg={6}>
                    <Card.Text>Kembalian (Rp.) : </Card.Text>
                  </Col>
                  <Col md={6} lg={6} style={{textAlign: "right"}}>
                    <Card.Text>{currencyFormat(change)}</Card.Text>
                  </Col>
                </Row>

                {/* {currencyFormat(parseInt())} */}
               
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Order;
