import { React, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function TableHistoriTransaksiCust() {
  const [data, setData] = useState([]);
  const history = useNavigate();
  useEffect(() => {
    fetchHTransaksi();
  }, []);
  const fetchHTransaksi = async (e) => {
    let token = sessionStorage.getItem("access_token");

    //Customer
    let get_session = JSON.parse(sessionStorage.getItem("data"));
    let id_user = get_session.data.id;

    fetch("http://127.0.0.1:8000/api/get_tran_by_customer/" + id_user, {
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
          setData(json.data);
        },
        (error) => {
          alert(error);
        }
      );
  };

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>ID Transaksi</th>
            <th>Tanggal Transaksi</th>
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
