import { React, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function TableHistoriTransaksiAdm() {
  const [data, setData] = useState([]);
  const history = useNavigate();
  useEffect(() => {
    fetchHTransaksi();
  }, []);
  const fetchHTransaksi = async (e) => {
    let token = sessionStorage.getItem("access_token");

    //Admin
    let get_session = JSON.parse(sessionStorage.getItem("data"));
    let id_user = get_session.data.id;

    fetch("http://127.0.0.1:8000/api/get_tran_by_admin/" + id_user, {
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
          // console.log("hasil");
          // console.log(json);

          setData(json.data);
        },
        (error) => {
          alert(error);
        }
      );
  };
  // const edit = (id) => {
  //   history("/useredit", { state: { id } });
  // };
  // const deletef = (id) => {
  //   Swal.fire({
  //     title: "Apakah anda yakin ?",
  //     text: "Akan menghapus data ini",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Ya",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       let token = sessionStorage.getItem("access_token");
  //       fetch("http://127.0.0.1:8000/api/delete/" + id, {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //       })
  //         .then((res) => res.json())
  //         .then(
  //           (json) => {
  //             Swal.fire("Deleted!", "Deleted Successfully.", "success");
  //             fetchHTransaksi();
  //           },
  //           (error) => {
  //             alert(error);
  //           }
  //         );
  //     }
  //   });
  // };

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>ID Transaksi</th>
            <th>Tanggal Transaksi</th>
            <th>Nama Pelanggan</th>
            <th>Alamat Pelanggan</th>
            <th>No Telepon Pelanggan</th>
            <th>Nama Paket</th>
            <th>Lama Berlangganan</th>
            <th>Kecepatan</th>
            <th>Harga Satuan</th>
            <th>Diskon</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => (
            <tr key={data.id}>
              <td>{data.id_transaksi}</td>
              <td>{data.tgl_transaksi}</td>
              <td>{data.nama_user}</td>
              <td>{data.alamat}</td>
              <td>{data.no_tlp}</td>
              <td>{data.nama_paket}</td>
              <td>{data.lama}</td>
              <td>{data.kecepatan} Mbps</td>
              <td>Rp. {data.harga}</td>
              <td>{data.disc}%</td>
              <td>Rp. {data.total}</td>
              {/* <td>
                #
                <Button onClick={(e) => edit(data.id)}>Edit</Button>
                <Button onClick={(e) => deletef(data.id)} className="bg-danger">
                  Delete
                </Button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
