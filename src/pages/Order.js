import { React, useEffect, useState } from "react";
import { Col, Container, Row, Form, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

function currencyFormat(num) {
  // return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

  num = parseInt(num);
  if (!isNaN(+num)) {
    // true if its a number, false if not
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }
  return "";
}

function Order() {
  const history = useNavigate();
  useEffect(() => {
    let valid_access = true;
    let keterangan_access = "";
    if (
      sessionStorage.getItem("access_token") == null ||
      sessionStorage.getItem("access_token") == "undefined"
    ) {
      valid_access = false;
      keterangan_access = "Anda belum login";
    }

    if (valid_access) {
      let get_session = JSON.parse(sessionStorage.getItem("data"));
      if (get_session.data.role == "admin") {
        valid_access = false;
        keterangan_access =
          "Hanya user level dengan role Customer yang bisa order produk";
      }
    }
    if (!valid_access) {
      Swal.fire({
        position: "top-center",
        icon: "info",
        title: "Just Info",
        html: keterangan_access,
        showConfirmButton: false,
        timer: 2000,
      });
      history("/");
    }
  }, []);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState([]);
  const [discount, setDiscount] = useState("");
  const [total, setTotal] = useState("");

  const location = useLocation();
  // console.log(location.state);

  let get_session = JSON.parse(sessionStorage.getItem("data"));
  const [idPaket, setIdPaket] = useState(location.state.idpaketitem);
  const [idUserCust, setidUserCust] = useState(
    get_session == null ? "" : get_session.data.id
  );

  const [inputs, setInputs] = useState({
    name: location.state.nameitem,
    price: location.state.priceitem,
    discount: location.state.distitem,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));

    if (name == "qty") {
      let qtynya = event.target.value;
      let jumlah = parseInt(inputs.price) * parseInt(qtynya);

      // let gettotal = jumlah - (jumlah * (parseInt(inputs.discount) / 100));
      let gettotal =
        jumlah -
        (isNaN(parseInt(inputs.discount))
          ? 0
          : jumlah * (parseInt(inputs.discount) / 100)); //hitung diskon

      setInputs((values) => ({ ...values, ["total"]: gettotal }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setName(inputs.name);
    setPrice(inputs.price);
    setQty(inputs.qty);
    setDiscount(inputs.discount);
    setTotal(inputs.total);

    let token = sessionStorage.getItem("access_token");

    let result = await fetch("http://127.0.0.1:8000/api/create_tran", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id_paket: parseInt(idPaket),
        id_user: parseInt(idUserCust),
        lama: parseInt(inputs.qty),
        total: parseInt(inputs.total),
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("ini respon");
        console.log(json);

        //set Session Storage
        if (json.hasOwnProperty("error")) {
          if (!json.error) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Order Success",
              showConfirmButton: false,
              timer: 1500,
            });
            // history("/dashboard");
          } else {
            Swal.fire({
              position: "top-center",
              icon: "error",
              title: "Order Failed",
              showConfirmButton: false,
              html: JSON.stringify(json.message),
              timer: 1500,
            });
          }
        } else {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Order Failed",
            showConfirmButton: false,
            html: JSON.stringify(json.message),
            timer: 1500,
          });
        }
      });
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
            <h5
              className="mb-3"
              style={{ color: "#233dff", fontStyle: "italic" }}
            >
              Detail Order
            </h5>
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
                  placeholder="Lama berlangganan anda"
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
              <hr />

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

              <Button variant="success" type="submit">
                Pesan
              </Button>
            </Form>
          </Col>
          <Col md={4} lg={4}>
            <h5
              className="mb-3"
              style={{ color: "#233dff", fontStyle: "italic" }}
            >
              Nota
            </h5>

            <Card bg="success" key="success" text="white" className="mb-2">
              <Card.Header>
                Purchase Orders <br />
                <Link to={"/dashboard"}>
                  <i>
                    <b style={{ color: "yellow" }}>Lihat histori</b>
                  </i>
                </Link>
              </Card.Header>

              <Card.Body>
                <Row>
                  <Col md={6} lg={6}>
                    <Card.Text>Nama Barang :</Card.Text>
                  </Col>
                  <Col md={6} lg={6} style={{ textAlign: "right" }}>
                    <Card.Text>{name}</Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} lg={6}>
                    <Card.Text>Harga Satuan (Rp.): </Card.Text>
                  </Col>
                  <Col md={6} lg={6} style={{ textAlign: "right" }}>
                    <Card.Text>{currencyFormat(price)}</Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} lg={6}>
                    <Card.Text>Kuantitas : </Card.Text>
                  </Col>
                  <Col md={6} lg={6} style={{ textAlign: "right" }}>
                    <Card.Text>{currencyFormat(qty)}</Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} lg={6}>
                    <Card.Text>Diskon (%) : </Card.Text>
                  </Col>
                  <Col md={6} lg={6} style={{ textAlign: "right" }}>
                    <Card.Text>{discount | "-"}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col md={6} lg={6}>
                    <Card.Text>Total (Rp.) : </Card.Text>
                  </Col>
                  <Col md={6} lg={6} style={{ textAlign: "right" }}>
                    <Card.Text>{currencyFormat(total)}</Card.Text>
                  </Col>
                </Row>
                <hr />

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
