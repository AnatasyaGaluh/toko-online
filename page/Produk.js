import React, {Component} from "react";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import axios from "axios";

class Produk extends Component{
    constructor() {
        super();
        this.state = {
            products: [],
            id: "",
            name: "",
            stock: "",
            price: "",
            description: "",
            image:null,
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
        $("#modal_product").modal("show");
        this.setState({
            action: "insert",
            id: "",
            name: "",
            stock: "",
            price: "",
            description: "",
            image:null,

        });

    }

    Edit = (item) => {
        $("#modal_product").modal("show");
        this.setState({
            action: "update",
            id: item.id,
            name: item.name,
            stock: item.stock,
            price: item.price,
            description: item.description,
            image: item.image
        });

    }

    get_product = () => {
        $("#loading").toast("show");
        let url = "http://localhost/toko_online/public/product"
        axios.get(url)
        .then(response => {
            this.setState({products: response.data.product});
            $("#loading").toast("hide");
        })
        .catch(error => {
            console.log(error);
        })

    }

    Drop =(id) => {
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
            $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/product/drop/"+id;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_product();
            })
            .catch(error => {
                console.log(error);
            });
        }

    }

    componentDidMount = () => {
        this.get_product();

    }

    Save = (event) => {
        event.preventDefault();
        $("#loading").toast("show");
        $("#modal_product").modal("hide");
        let url = "http://localhost/toko_online/public/product/save";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id", this.state.id);
        form.append("name", this.state.name);
        form.append("stock", this.state.stock);
        form.append("price", this.state.price);
        form.append("description", this.state.description);
        form.append("image", this.state.image);
        axios.post(url, form)
        .then(response => {
            $("#loading").toast("hide");
            this.setState({message: response.data.message});
            $("#message").toast("show");
            this.get_product();
        })
        .catch(error => {
            console.log(error);
        });

    }

    search = (event) => {
        if(event.keyCode === 13){
            $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/product"
            let form = new FormData();
            form.append("find", this.state.find);
            axios.post(url,form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({product: response.data.product});
            })
            .catch(error =>{
                console.log(error);
            });
        }
        
    }

    render () {
        console.log(this.state.products)
        return(
            <div className="container">
                <div className="card mt-2">
                    {/*header card */}
                    <div className="card-header bg-success">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Data produk</h4>
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
                                    <th>Nama Produk</th>
                                    <th>Stok</th>
                                    <th>Harga</th>
                                    <th>Deskripsi</th>
                                    <th>Image</th>
                                    <th>Option</th>
                                </tr>
                            </thead>                            
                            <tbody>
                                {this.state.products.map((item) => {
                                    return(
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.stock}</td>
                                            <td>{item.price}</td>
                                            <td>{item.description}</td>
                                            <td><img src={'http://localhost/toko_online/public/image/' + item.image}
                                            alt={item.image} width="200px" height="200px" /></td>
                                            <td>
                                                <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                                                <span className="fa fa-edit"></span>
                                                </button>
                                                <button className="m-1 btn btn-sm btn-danger" onClick={() => this.Drop(item.id_product)}>
                                                    <span className="fa fa-trash"></span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <button className="btn btn-success my-2" onClick={this.Add}>
                            <span className="fa fa-plus"></span>Tambah Data
                        </button>
                        <Modal id="modal_product" title="Form Barang" bg_header="success"
                        text_header="white">
                            <form onSubmit={this.Save}>
                                ID
                                <input type="number" className="form-control" name="id"
                                value={this.state.id} onChange={this.bind} required />

                                Nama Produk
                                <input type="text" className="form-control" name="name"
                                value={this.state.name} onChange={this.bind} required />

                                Stok
                                <input type="number" className="form-control" name="stock"
                                value={this.state.stock} onChange={this.bind} required />

                                Harga
                                <input type="number" className="form-control" name="price"
                                value={this.state.price} onChange={this.bind} required />

                                Deskripsi
                                <input type="text" className="form-control" name="description"
                                value={this.state.description} onChange={this.bind} required />

                                Image
                                <input type="file" className="form-control" name="image"
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

export default Produk;