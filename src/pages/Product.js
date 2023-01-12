import React, { useEffect, useState } from "react";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import CardProduct from "../components/CardProduct";

function Product(props) {
  const [title, setTitle] = useState("PILIH LAYANAN");
  const [listProduk, setListProduk] = useState([]);
  const [dtpathPhoto, setPathPhoto] = useState("");

  useEffect(() => {
    if (props.prop_title !== undefined) {
      setTitle(props.prop_title);
    }

    fetchProduk();
  }, []);

  const fetchProduk = async (e) => {
    //find produk publish
    fetch("http://127.0.0.1:8000/api/get_by_status_paket/" + 1, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (json) => {
          console.log("hasilnya disini");
          console.log(json);

          setListProduk(json.data);
          setPathPhoto(json.path_photo);
        },
        (error) => {
          alert(error);
        }
      );
  };
  return (
    <>
      <Container className="py-5">
        <Row>
          <Col className="text-center my-2">
            <h2>{title}</h2>
            <p style={{ color: "#233dff", fontStyle: "italic" }}>
              <b>
                CYBERNET adalah sebuah internet provider terbaik di Indonesia.
                CYBERNET Bangkit Bersatu Untuk Indonesia, dengan menjunjung
                tinggi nilai-nilai Nasionalisme, CYBERNET berniat memberikan
                yang terbaik untuk masyarakat Indonesia
              </b>
            </p>
          </Col>
        </Row>
        <Row xs={1} md={3} className="g-2">
          {listProduk.map((data) => {
            let desc = `UP TO ${data.kecepatan}Mbps`;
            return (
              <CardProduct
                // image="p01.png"
                image={data.gambar_produk}
                id_paket={data.id_paket}
                title={data.nama_paket}
                desc={desc}
                price={data.harga}
                disc={data.disc}
                path_photo={dtpathPhoto}
              />
            );
          })}

          {/* {Array.from({ length: 4 }).map((_, idx) => ( */}
          {/* <CardProduct
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
          /> */}
          {/* ))} */}
        </Row>
      </Container>
    </>
  );
}

export default Product;
