import React from "react";
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alamat, setAlamat] = useState("");
  const [notlp, setNoTelp] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useNavigate();
  // useEffect(() => {
  //   if (sessionStorage.getItem("access_token") !== null) {
  //     if (sessionStorage.getItem("access_token") !== "undefined") {
  //       history("/");
  //     }
  //   }
  // }, []);
  const Regist = async (e) => {
    e.preventDefault();

    let result = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        no_tlp: notlp,
        alamat: alamat,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log("ini respon");
        // console.log(json);

        //set Session Storage
        sessionStorage.setItem("access_token", json.access_token);
        sessionStorage.setItem("data", JSON.stringify(json));

        if (json.hasOwnProperty("error")) {
          if (!json.error) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Register Success",
              showConfirmButton: false,
              timer: 1500,
            });
            history("/login");
          } else {
            Swal.fire({
              position: "top-center",
              icon: "error",
              title: "Register Failed",
              showConfirmButton: false,
              html: json.message,
              timer: 1500,
            });
          }
        } else {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Register Failed",
            showConfirmButton: false,
            html: JSON.stringify(json),
            timer: 1500,
          });
        }
      });
  };
  return (
    <div className="container mt-4 shadow-sm p-3 mb-5 bg-white rounded">
      <h3>Register</h3>
      <br />
      <Form onSubmit={Regist}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAlamat">
          <Form.Label>Alamat</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
          />

          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicNoTelp">
          <Form.Label>No Telepon</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your telephone number..."
            value={notlp}
            onChange={(e) => setNoTelp(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="info" type="submit">
          Register
        </Button>
        <br />
        <br />
        <p>
          Pernah punya akun?{" "}
          <Link to={"/login"}>
            <b style={{ color: "darkblue" }}>Login saja</b>
          </Link>
        </p>
      </Form>
    </div>
  );
}
