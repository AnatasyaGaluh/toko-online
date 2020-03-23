import React, {Component} from "react";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import axios from "axios";

class Orders extends Component{
    constructor() {
        super();
        this.state = {
            orders: [],
            id: "",
            id_user: "",
            id_pengiriman: "",
            total: "",
            bukti_bayar: null,
            status: "dipesan",
            detail_orders : "",
            action: "",
            find: "",
            message: ""
        }

        if(!localStorage.getItem("Token")){
            window.location = "/login";
        }

    }

    bind = (event) => {
        this.setState({[event.target.name] : event.target.value});

    }

    bindImage = (e) => {
        this.setState({image: e.target.files[0]})
    }

    Add = () => {
        $("#modal_orders").modal("show");
        this.setState({
            action: "insert",
            id: "",
            id_user: "",
            id_pengiriman: "",
            total: "",
            bukti_bayar: null,
            status: "dipesan",

        });

    }


    get_orders = () => {
        $("#loading").toast("show");
        let url = "http://localhost/toko_online/public/orders"
        axios.get(url)
        .then(response => {
            this.setState({orders: response.data.orders});
            $("#loading").toast("hide");
        })
        .catch(error => {
            console.log(error);
        })

    }


    componentDidMount = () => {
        this.get_orders();

    }

    Accept = (id_order) => {
        if (window.confirm("Apakah anda yakin dengan pilihan ini?")) {
          let url = "http://localhost/toko_online/public/accept/"+id_order;
          axios.post(url)
          .then(response => {
            this.get_order();
          })
          .catch(error => {
            console.log(error);
          });
        }
      }
    
      Decline = (id_order) => {
        if (window.confirm("Apakah anda yakin dengan pilihan ini?")) {
          let url = "http://localhost/toko_online/public/decline/"+id_order;
          axios.post(url)
          .then(response => {
            this.get_order();
          })
          .catch(error => {
            console.log(error);
          });
        }
      }

    Save = (event) => {
        event.preventDefault();
        $("#loading").toast("show");
        $("#modal_orders").modal("hide");
        let url = "http://localhost/toko_online/public/orders/save";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id", this.state.id);
        form.append("id_user", this.state.id_user);
        form.append("id_pengiriman", this.state.id_pengiriman);
        form.append("total", this.state.total);
        form.append("bukti_bayar", this.state.bukti_bayar, this.state.bukti_bayar.name);
        form.append("status", this.state.status);
        axios.post(url, form)
        .then(response => {
            $("#loading").toast("hide");
            this.setState({message: response.data.message});
            $("#message").toast("show");
            this.get_orders();
        })
        .catch(error => {
            console.log(error);
        });

    }

    search = (event) => {
        if(event.keyCode === 13){
            $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/orders"
            let form = new FormData();
            form.append("find", this.state.find);
            axios.post(url,form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({orders: response.data.orders});
            })
            .catch(error =>{
                console.log(error);
            });
        }
        
    }

    render () {
        console.log(this.state.orderss)
        return(
            <div className="container">
                <div className="card mt-2">
                    {/*header card */}
                    <div className="card-header bg-secondary">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Data Order</h4>
                            </div>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="find"
                                onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                                placeholder="Pencarian..."/>
                            </div>
                        </div>
                    </div>
                    {/*content card*/}
                    <div className="card-body">
                        <Toast id="message" autohide="true" title="Informasi">
                            {this.state.message}
                        </Toast>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID User</th>
                                    <th>ID Pengiriman</th>
                                    <th>Total</th>
                                    <th>Bukti Bayar</th>
                                    <th>Status</th>
                                    <th>Detail Order</th>
                                    <th>Option</th>
                                </tr>
                            </thead>                            
                            <tbody>
                                {this.state.orders.map((item) => {
                                    return(
                                        <tr key={item.id}>
                                            <td>{item.id_user}</td>
                                            <td>{item.id_pengiriman}</td>
                                            <td>{item.total}</td>
                                            <td><img src={'http://localhost/toko_online/image/' + item.bukti_bayar}
                                            alt={item.bukti_bayar} width="200px" height="200px" /></td>
                                            <td>{item.status}</td>
                                            <td>{item.detail_orders}</td>
                                            <td>
                                                <button className="m-1 btn btn-sm btn-success" onClick={() => this.Accept(item)}>
                                                <span className="fa fa-check"></span>
                                                </button>
                                                <button className="m-1 btn btn-sm btn-danger" onClick={() => this.Decline(item.id)}>
                                                    <span className="fa fa-remove"></span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <button className="btn btn-primary my-2" onClick={this.Add}>
                            <span className="fa fa-plus"></span>Tambah Data
                        </button>
                        <Modal id="modal_orders" title="Form Barang" bg_header="success"
                        text_header="white">
                            <form onSubmit={this.Save}>

                                ID User
                                <input type="number" className="form-control" name="id_user"
                                value={this.state.id_user} onChange={this.bind} required />

                                ID Pengiriman
                                <input type="number" className="form-control" name="id_pengiriman"
                                value={this.state.id_pengiriman} onChange={this.bind} required />

                                Total
                                <input type="number" className="form-control" name="total"
                                value={this.state.total} onChange={this.bind} required />

                                Status 
                                <input type="text" className="form-control" name="total"
                                value={this.state.total} onChange={this.bind} required />

                                Bukti Bayar
                                <input type="file" className="form-control" name="bukti_bayar"
                                 onChange={this.bindImage} required />


                                <button type="submit" className=" btn btn-info pull-right m-2">
                                    <span className="fa fa-check"></span> Simpan
                                </button>
                            </form>
                        </Modal>
                    </div>
                </div>
            </div>

        );

    }
}

export default Orders;