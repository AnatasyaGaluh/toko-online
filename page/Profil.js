import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";

class Profil extends Component{
    constructor(){
        super();
        this.state = {
            user: [],
            id_user: "",
            email: "",
            password: "",
            nama_user: "",
            role: "",
            no_ktp: "",
            nama_lengkap: "",
            jenis_kelamin: "",
            tanggal_lahir: "",
            image: null,
            nohp: "",
            action: "",
            find: "",
            message: "",

            alamat: [],
            id_pengiriman:"",
            nama_penerima:"",
            kode_pos:"",
            kecamatan:"",
            kota:"",
            jalan:"",
            rt:"",
            rw:"",
        }
        if(!localStorage.getItem("Token")){
            //direct ke halaman login
            window.location = "/login";
        }
    }

    bind = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    bindImage = (e) => {
        this.setState({image: e.target.files[0]})
    }

    Add_alamat = () => {
        $("#modal_alamat").modal("show");
        this.setState({
            action: "insert",
            id_pengiriman:"",
            id_user:"",
            nama_penerima:"",
            kode_pos:"",
            kecamatan:"",
            kota:"",
            jalan:"",
            rt:"",
            rw:"",
        });
    }

    Edit = (item) => {
        //membuka modal
        $("#modal_user").modal("show");
        //mengisikan data pada form
        this.setState({
            action: "update",
            id_user: item.id_user,
            nama_user: item.nama_user,
            nama_lengkap: item.nama_lengkap,
            no_ktp: item.no_ktp,
            jenis_kelamin: item.jenis_kelamin,
            tanggal_lahir: item.tanggal_lahir,
            image: item.image,
            nohp: item.nohp,
        });
    }

    Edit_alamat = (item) =>{
        // membuka modal
        $("#modal_alamat").modal("show");
        // mengisikan data pada form 
        this.setState({
            actiom: "update",
            id_pengiriman: item.id_pengiriman,
            id_user: item.id_user,
            nama_penerima: item.nama_penerima,
            kode_pos: item.kode_pos,
            kecamatan:item.kecamatan,
            kota: item.kota,
            jalan: item.jalan,
            rt: item.rt,
            rw: item.rw,
        });
    }

    get_user = () => {
        //$("#loading").toast("show");
        let id = JSON.parse(localStorage.getItem('id_user'))
        //console.log(items)
        let url = "http://localhost/toko_online/public/user/"+id;
        axios.get(url)
        .then(response => {
            //$("#loading").toast("hide");
            this.setState({
                user: response.data.user,
            });
            //$("#message").toast("show");
        })
        .catch(error => {
            console.log(error);
        });
        // this.setState({
        //     user:items,
        //     id_user: items.id_user
        // });
    }

    get_alamat = () => {
        // $("#loading").toast("show");
        let id = JSON.parse(localStorage.getItem('id_user'))

        let url = "http://localhost/toko_online/public/alamat/"+id;
        axios.get(url)
        .then(response => {
            this.setState({
                alamat: response.data.alamat,
            });
            $("#loading").toast("hide");
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount = () => {
        this.get_user();
    }

    Drop_alamat = (id_pengiriman) => {
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
            // $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/drop/"+id_pengiriman;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_alamat();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    

    Save = (event) => {
        console.log(this.state.id_user)
        event.preventDefault();
        // menampilkan proses loading
        // $("#loading").toast("show");
        // menutup form modal
        $("#modal_user").modal("hide")
        let url = "http://localhost/toko_online/public/user/save_profil";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id_user", this.state.id_user);
        form.append("email", this.state.email);
        form.append("password", this.state.password);
        form.append("role", this.state.role);
        form.append("nama_user", this.state.nama_user);
        form.append("nama_lengkap", this.state.nama_lengkap);
        form.append("no_ktp", this.state.no_ktp);
        form.append("jenis_kelamin", this.state.jenis_kelamin);
        form.append("tanggal_lahir", this.state.tanggal_lahir);
        form.append("image", this.state.image, this.state.image.name);
        form.append("nohp", this.state.nohp);
        axios.post(url,form)
        .then(response => {
            // $("#loading").toast("hide");
            this.setState({
                message: response.data.message
            });
            $("message").toast("show");
            this.get_user();
        })
        .catch(error => {
            console.log(error);
        });
    }

    Save_alamat = (event) => {
        let id = JSON.parse(localStorage.getItem('id_user'))
        event.preventDefault();
        // menampilkan proses loading
        // $("#loading").toast("show");
        // menutup form modal
        $("#modal_alamat").modal("hide");
        let url = "http://localhost/toko_online/public/alamat/save";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id_pengiriman", this.state.id_pengiriman);
        form.append("id_user", id);
        form.append("nama_pengiriman", this.state.nama_penerima);
        form.append("kode_pos", this.state.kode_pos);
        form.append("kecamatan", this.state.kecamatan);
        form.append("kota", this.state.kota);
        form.append("jalan", this.state.jalan);
        form.append("rt", this.state.rt);
        form.append("rw", this.state.rw);
        // form.append("img_user", this.state.img_user, this.state.img_user.name);
        axios.post(url, form)

        .then(response => {
            // $("#loading").toast("hide");
            this.setState({message: response.data.message});
            $("#message").toast("show");
            this.get_alamat();
        })
        .catch(error => {
            console.log(error)
        });
    }

    render(){
        const{user, alamat} = this.state;
            {this.state.alamat.map((item) => {
                return(
                    <div class="col-sm-6">
                        <div class="card" style={{marginBottom: "20px"}}>
                            <div class="card-header text-white bg-info" style={{textAlign: "center"}}>
                                {item.id_pengiriman}
                            </div>
                            <div class="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Nama Penerima : {item.nama_penerima}</li>
                                    <li className="list-group-item">Kode Pos : {item.kode_pos}</li>
                                    <li className="list-group-item">Kecamatan  :{item.kecamatan}</li>
                                    <li className="list-group-item">Kota : {item.kota}</li>
                                    <li className="list-group-item">Jalan : {item.jalan}</li>
                                    <li className="list-group-item">RT : {item.rt}</li>
                                    <li className="list-group-item">RW : {item.rw}</li>
                                    <li className="list-group-item">
                                        <button className="m-1 btn tbn-sm btn-outline-success" onClick={() => this.Edit_alamat(item)}>
                                            <span className="fa fa-edit">Edit</span>
                                        </button>
                                        <button className="m-1 btn btn-sm btn-outline-danger" onClick={() => this.Drop_alamat(item.id_pengiriman)}>
                                            <span className="fa fa-trash"></span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        </div>
                );
            })}
        
        return(
            <div className="container">
                <div className="card mt-2">
                    <div style={{paddingTop: "5%", paddingLeft: "7%"}}>
                        <div className="#" style={{maxwidth:"200px"}}>
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img className="rounded float-left" src={Image} style={{height: "240px", width: "200px"}} />
                                    <input aria-hidden="true" type="file" className="fa fa-upload" name="image"
                                    onChange={this.bindImage} required />
                                </div>
                                <div style={{paddingTop: "25%", paddingLeft: "0%"}}>
                                    <div className="card-body">
                                        <h4 className="card-title" style={{fontWeight: "700"}}>Profil</h4>
                                        <table className= "table table-borderless">
                                            {this.state.user.map((item,index) => {
                                                return(
                                                    <ul class="list-group" key={index}>
                                                        <li class="list-group-item">Username : {item.nama_user}</li>
                                                        <li class="list-group-item">Email : {item.email}</li>
                                                        <li class="list-group-item">Nama Lengkap : {item.nama_lengkap}</li>
                                                        <li class="list-group-item">No KTP : {item.no_ktp}</li>
                                                        <li class="list-group-item">Jenis Kelamin : {item.jenis_kelamin}</li>
                                                        <li class="list-group-item">Tanggal Lahir : {item.tanggal_lahir}</li>
                                                        <li class="list-group-item">No HP : +62{item.nohp}</li>
                                                    <button className="m-1 btn btn-sm btn-outline-dark" onClick={() => this.Edit(item)}>
                                                        <span className="fa fa-edit"></span>Edit
                                                    </button>
                                                    </ul>
                                                );
                                            })}

                                        </table>
                                    </div>
                                </div>

                                <Modal id="modal_user" title="form-user" bg_header="success"
                                text_header="white">
                                    <form onSubmit={this.Save}>
                                        Username
                                        <input type="text" className="form-control" name="name_user"
                                        value={this.state.nama_user} onChange={this.bind} required />

                                        Nama Lengkap
                                        <input type="text" className="form-control" name="name_lengkap"
                                        value={this.state.nama_lengkap} onChange={this.bind} required />
                                        
                                        No KTP
                                        <input type="text" className="form-control" name="no_ktp"
                                        value={this.state.no_ktp} onChange={this.bind} required />

                                        Jenis Kelamin
                                        <input type="text" className="form-control" name="jenis_kelamin"
                                        value={this.state.jenis_kelamin} onChange={this.bind} required />

                                        Tanggal Lahir
                                        <input type="text" className="form-control" name="tanggal_lahir"
                                        value={this.state.tanggal_lahir} onChange={this.bind} required />

                                        Image
                                        <tr>
                                            <input type="file" className="file-control" name="image"
                                            onChange={this.bindImage} required />
                                        </tr>

                                        No HP
                                        <input type="text" className="form-control" name="nohp"
                                        value={this.state.nohp} onChange={this.bind} required />

                                        <button type="submit" className="btn btn-info pull-right m-2">
                                            <span className="fa fa-check"></span>Simpan
                                        </button>
                                    </form>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>

            <Modal id="modal_alamat" title="Form Alamat" bg_header="success" text_header="white">
                <form onSubmit={this.Save_alamat}>
                Nama Penerima 
                    <input type="text" className="form-control" name="nama_penerima"
                    value={this.state.nama_penerima} onChange={this.bind} required />
                    Kode Pos
                    <input type="text" className="form-control" name="kode_pos"
                    value={this.state.kode_pos} onChange={this.bind} required />
                    Kecamatan
                    <input type="text" className="form-control" name="kecamatan"
                    value={this.state.kecamatan} onChange={this.bind} required />
                    Kota 
                    <input type="text" className="form-control" name="kota"
                    value={this.state.kota} onChange={this.bind} required />
                    Jalan
                    <input type="text" className="form-control" name="jalan"
                    value={this.state.jalan} onChange={this.bind} required />
                    RT
                    <input type="text" className="form-control" name="rt"
                    value={this.state.rt} onChange={this.bind} required />
                    RW
                    <input type="text" className="form-control" name="rw"
                    value={this.state.rw} onChange={this.bind} required />

                    <button type="submit" className="btn btn-info pull-right m-2">
                        <span className="fa fa-check"></span>Simpan
                    </button>
                    </form>
                </Modal>                   

            </div>
        );
    }
}

export default Profil;