import React from "react";
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("access_token") !== null) {
      if (sessionStorage.getItem("access_token") !== "undefined") {
        history("/");
      }
    }
  }, []);
  const Auth = async (e) => {
    e.preventDefault();
    let result = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log("ini respon");
        // console.log(email);
        // console.log(password);

        //set Session Storage
        sessionStorage.setItem("access_token", json.access_token);
        sessionStorage.setItem("data", JSON.stringify(json));

        if (json.hasOwnProperty("error")) {
          if (!json.error) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Login Success",
              showConfirmButton: false,
              timer: 1500,
            });
            history("/dashboard");
          } else {
            Swal.fire({
              position: "top-center",
              icon: "error",
              title: "Login Failed",
              showConfirmButton: false,
              html: json.message,
              timer: 1500,
            });
          }
        } else {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Login Failed",
            showConfirmButton: false,
            html: json.message,
            timer: 1500,
          });
        }

        //----------------------------------------------------------------
        // if (json.message !== "Unauthorized") {
        //   if (!json.error) {
        //     Swal.fire({
        //       position: "top-center",
        //       icon: "success",
        //       title: "Login Success",
        //       showConfirmButton: false,
        //       timer: 1500,
        //     });
        //     history("/dashboard");
        //   } else {
        //     Swal.fire({
        //       position: "top-center",
        //       icon: "error",
        //       title: "Login Failed",
        //       showConfirmButton: false,
        //       html: json.message,
        //       timer: 1500,
        //     });
        //   }
        // } else {
        //   Swal.fire({
        //     position: "top-center",
        //     icon: "error",
        //     title: "Login Failed",
        //     showConfirmButton: false,
        //     html: json.message,
        //     timer: 1500,
        //   });
        // }
      });
  };
  return (
    <div className="container mt-4 shadow-sm p-3 mb-5 bg-white rounded">
      <h3>Login</h3>
      <br />
      <Form onSubmit={Auth}>
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
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <br />
        <br />
        <p>
          Belum punya akun?{" "}
          <Link to={"/register"}>
            <b style={{ color: "darkblue" }}>Register disini</b>
          </Link>
        </p>
      </Form>
    </div>
  );
}
