import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class User extends Component{
    constructor() {
        super();
        this.state = {
            user: [],
            id_user: "",
            nama_user: "",
            email: "",
            password: "",
            image: null,
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
        $("#modal_user").modal("show");
        this.setState({
            action: "insert",
            id_user: "",
            nama_user: "",
            email: "",
            password: "",
            image: null
        });

    }

    Edit = (item) => {
        $("#modal_user").modal("show");
        this.setState({
            action: "update",
            id_user: item.id_user,
            nama_user: item.nama_user,
            email: item.email,
            password: item.password,
            image: item.image
        });

    }

    get_user = () => {
        $("#loading").toast("show");
        let url = "http://localhost/toko_online/public/user";
        axios.get(url)
        .then(response => {
            this.setState({user: response.data.user});
            $("#loading").toast("hide");
        })
        .catch(error => {
            console.log(error);
        })

    }

    Drop =(id) => {
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
            $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/user/drop/"+id;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_user();
            })
            .catch(error => {
                console.log(error);
            });
        }

    }

    componentDidMount = () => {
        this.get_user();

    }

    Save = (event) => {
        event.preventDefault();
        $("#loading").toast("show");
        $("#modal_user").modal("hide");
        let url = "http://localhost/toko_online/public/user/save";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id_user", this.state.id_user);
        form.append("nama_user", this.state.nama_user);
        form.append("email", this.state.email);
        form.append("password", this.state.password);
        form.append("image", this.state.image, this.state.image.name);
        axios.post(url, form)
        .then(response => {
            $("#loading").toast("hide");
            this.setState({message: response.data.message});
            $("#message").toast("show");
            this.get_user();
        })
        .catch(error => {
            console.log(error);
        });

    }

    search = (event) => {
        if(event.keyCode === 13){
            $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/user";
            let form = new FormData();
            form.append("find", this.state.find);
            axios.post(url,form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({user: response.data.user});
            })
            .catch(error =>{
                console.log(error);
            });
        }
        
    }

    render () {
        return(
            <div className="container">
                <div className="card mt-2">
                    {/*header card */}
                    <div className="card-header bg-success">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Data user</h4>
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
                                    <th>Nama</th>
                                    <th>Email</th>
                                    <th>Image</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.user.map((item) => {
                                    return(
                                        <tr key={item.id_user}>
                                            <td>{item.nama_user}</td>
                                            <td>{item.email}</td>
                                            <td><img src={'http://localhost/toko_online/public/images/' + item.image}
                                            alt={item.image} width="200px" height="200px" /></td>
                                            
                                            <td>
                                                <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                                                <span className="fa fa-edit"></span>
                                                </button>
                                                <button className="m-1 btn btn-sm btn-danger" onClick={() => this.Drop(item.id_user)}>
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
                        <Modal id="modal_user" title="Form user" bg_header="success"
                        text_header="white">
                            <form onSubmit={this.Save}>
                            ID
                                <input type="text" className="form-control" name="id_user"
                                value={this.state.id_user} onChange={this.bind} required />

                                Nama
                                <input type="text" className="form-control" name="nama_user"
                                value={this.state.nama_user} onChange={this.bind} required />

                                Email
                                <input type="text" className="form-control" name="email"
                                value={this.state.email} onChange={this.bind} required />

                                Image
                                <input type="text" className="form-control" name="image"
                                value={this.state.image} onChange={this.bind} required />


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

export default User;