import React from "react";
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function FormPaket() {
  const [dtjnsform, setJnsform] = useState("tambah");
  const [dtsession, setDtsession] = useState(null);
  const [dtiduser, setIdUser] = useState("");
  const [dtnama, setNama] = useState("");
  const [dtrole, setRole] = useState("");
  const history = useNavigate();
  const location = useLocation();

  const [dtgambar, setGambar] = useState(null);

  const [inputs, setInputs] = useState({
    id_user: 0,
    nama_paket: "",
    kecepatan: 0,
    harga: 0,
    disc: 0,
    status: 0,
  });

  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
    // this.setState({ selectedFile: event.target.files[0] });
    setGambar(event.target.files[0]);
  };

  // On file upload (click the upload button)
  // const onFileUpload = () => {
  //   // Create an object of formData
  //   const formData = new FormData();

  //   // Update the formData object
  //   // formData.append("myFile", this.state.dtgambar, this.state.dtgambar.name);
  //   formData.append("myFile", dtgambar, dtgambar.name);

  //   // Details of the uploaded file
  //   // console.log(this.state.dtgambar);
  //   console.log(dtgambar);

  //   // Request made to the backend api
  //   // Send formData object
  //   // axios.post("api/uploadfile", formData);

  //   console.log(
  //     "------------------------------Hasil Submit----------------------------------"
  //   );
  //   console.log(formData);
  // };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const SaveForm = async (e) => {
    e.preventDefault();

    //upload form yg ada gambarnya TIDAK bisa pake JSON STRINGIFY
    let token = sessionStorage.getItem("access_token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    // myHeaders.append("Content-Type", "multipart/form-data");
    // myHeaders.append("Accept", "*/*");
    //     "Content-Type": "application/json",
    //     Accept: "application/json",

    var formdata = new FormData();
    formdata.append("id_user", inputs.id_user);
    formdata.append("nama_paket", inputs.nama_paket);
    formdata.append("kecepatan", inputs.kecepatan);
    formdata.append("harga", inputs.harga);
    formdata.append("disc", inputs.disc);
    formdata.append("status", inputs.status);
    formdata.append("gambar_produk", dtgambar);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/api/create_paket", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // console.log("ini respon");
        // console.log(result);

        result = JSON.parse(result);
        if (result.hasOwnProperty("error")) {
          if (!result.error) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Success",
              html: result.msg,
              showConfirmButton: false,
              timer: 1500,
            });
            history("/dashboard");
          } else {
            Swal.fire({
              position: "top-center",
              icon: "error",
              title: "Failed",
              showConfirmButton: false,
              html: result.msg,
              timer: 1500,
            });
          }
        } else {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Failed",
            showConfirmButton: false,
            html: result.message,
            timer: 1500,
          });
        }
      })
      .catch((error) => alert("error", error));
  };

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
      setIdUser(get_dtsession.data.id);
      setNama(get_dtsession.data.name);
      setRole(get_dtsession.data.role);

      if (get_dtsession.data.role != "admin") {
        Swal.fire({
          position: "top-center",
          icon: "info",
          title: "Just Info",
          html: "Anda tidak bisa mengubah CRUD Paket, Anda bukan admin",
          showConfirmButton: false,
          timer: 2000,
        });
        history("/");
      }

      setJnsform(location.state.jnsForm);
      setInputs((prevState) => ({
        ...prevState,
        id_user: get_dtsession.data.id,
      }));
    }
  }, []);

  return (
    <div className="container mt-4 shadow-sm p-3 mb-5 bg-white rounded">
      <h3>Form {dtjnsform} produk paket</h3>
      <br />
      <Form onSubmit={SaveForm}>
        <Form.Group className="mb-3" controlId="formBasicDisc">
          <Form.Label>Gambar Produk Paket</Form.Label>
          <Form.Control
            required
            type="file"
            name="disc"
            placeholder="Apakah ada diskon?"
            // value={email}
            onChange={onFileChange}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNamaPaket">
          <Form.Label>Nama Paket</Form.Label>
          <Form.Control
            required
            type="text"
            name="nama_paket"
            placeholder="Tuliskan nama paket"
            // value={email}
            onChange={handleChange}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicKecepatan">
          <Form.Label>Kecepatan Internet (dalam Mbps)</Form.Label>
          <Form.Control
            required
            type="number"
            name="kecepatan"
            placeholder="Kecepatan internet"
            // value={email}
            onChange={handleChange}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicHarga">
          <Form.Label>Harga Paket</Form.Label>
          <Form.Control
            required
            type="number"
            name="harga"
            placeholder="Harga Paket"
            // value={email}
            onChange={handleChange}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDisc">
          <Form.Label>Diskon</Form.Label>
          <Form.Control
            type="number"
            name="disc"
            placeholder="Apakah ada diskon?"
            // value={email}
            onChange={handleChange}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicStatus">
          <Form.Label>Status Paket</Form.Label>
          <Form.Select
            aria-label="Default select example"
            required
            type="number"
            name="status"
            // value={email}
            onChange={handleChange}
          >
            <option value="">-- Pilih Status --</option>
            <option value="1">Publish</option>
            <option value="2">Draft</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Simpan
        </Button>
      </Form>
    </div>
  );
}

export default FormPaket;
