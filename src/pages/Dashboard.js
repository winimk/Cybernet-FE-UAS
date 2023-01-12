import React, { useEffect, useState } from "react";
import { Col, Collapse, Container, Row, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TableHistoriTransaksiAdm from "../components/TableHistoriTransaksiAdm";
import TableHistoriTransaksiCust from "../components/TableHistoriTransaksiCust";
import Product from "./Product";

function Dashboard() {
  const fetchViewProductAdmin = (e) => {
    let token = sessionStorage.getItem("access_token");

    fetch("http://127.0.0.1:8000/api/get_all_paket/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (json) => {
          console.log("hasil");
          console.log(json);

          setListPaket(json.data);
          setPathPhoto(json.path_photo);
        },
        (error) => {
          alert(error);
        }
      );
  };

  const [dtsession, setDtsession] = useState(null);
  const [dtnama, setNama] = useState("");
  const [dtrole, setRole] = useState("");

  const [dtlistPaket, setListPaket] = useState([]);
  const [dtpathPhoto, setPathPhoto] = useState("");
  const history = useNavigate();

  useEffect(() => {
    if (
      sessionStorage.getItem("access_token") == null ||
      sessionStorage.getItem("access_token") == "undefined"
    ) {
      Swal.fire({
        position: "top-center",
        icon: "info",
        title: "Just Info",
        html: "Anda belum login",
        showConfirmButton: false,
        timer: 2000,
      });
      history("/");
    } else {
      let get_dtsession = JSON.parse(sessionStorage.getItem("data"));
      setDtsession(get_dtsession);
      setNama(get_dtsession.data.name);
      setRole(get_dtsession.data.role);

      if (get_dtsession.data.role == "admin") {
        fetchViewProductAdmin();
      }
    }
  }, []);
  return (
    <>
      <Container className="py-5">
        <Row>
          <Col className="text-center">
            <h2>Dashboard</h2>
            <p style={{ color: "#233dff", fontStyle: "italic" }}>
              <i>
                Hallo <b>{dtnama}</b>, anda login sebagai {""}
                <b>{dtrole}</b>
              </i>
            </p>
          </Col>
        </Row>
        <br />
        <h5>
          <b>Histori Transaksi</b>
        </h5>
        {(() => {
          if (dtrole == "admin") {
            return <TableHistoriTransaksiAdm />;
          } else {
            return <TableHistoriTransaksiCust />;
          }
        })()}
        <br />
        <br />
        <hr />

        {(() => {
          if (dtrole == "admin") {
            return (
              <>
                <h5>
                  <b>Master Data Paket</b>
                </h5>

                <Link
                  to={"/paket/add"}
                  state={{ jnsForm: "tambah" }}
                  className="btn btn-primary"
                >
                  Tambah Paket
                </Link>
                <br />
                <br />
                <Table striped>
                  <thead>
                    <tr>
                      <th>ID Paket</th>
                      <th>Gambar Banner</th>
                      <th>Nama Paket</th>
                      <th>Kecepatan</th>
                      <th>Harga Satuan</th>
                      <th>Diskon</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dtlistPaket.map((data) => {
                      let pathimg = dtpathPhoto + data.gambar_produk;
                      if (data.gambar_produk == "") {
                        pathimg = require("../assets/product_item/p_default.png");
                      }
                      return (
                        <tr key={data.id_paket}>
                          <td>{data.id_paket}</td>
                          <td>
                            <img
                              style={{ textAlign: "center" }}
                              height={80}
                              src={pathimg}
                            ></img>
                          </td>
                          <td>{data.nama_paket}</td>
                          <td>{data.kecepatan} Mbps</td>
                          <td>Rp. {data.harga}</td>
                          <td>{data.disc}%</td>
                          <td>{data.status == 1 ? "Publish" : "Draft"}</td>
                          <td>
                            #
                            {/* <Button onClick={(e) => edit(data.id)}>Edit</Button>
                          <Button
                            onClick={(e) => deletef(data.id)}
                            className="bg-danger"
                          >
                            Delete
                          </Button> */}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <br />
                <br />
                <hr />
              </>
            );
          }
        })()}

        <Product prop_title="Ayo Mulai Berlangganan" />
      </Container>
    </>
  );
}

export default Dashboard;
