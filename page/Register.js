import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

class Register extends React.Component{
    constructor(){
        super()
        this.state={
            user: [],
            id: "",
            nama: "",
            email: "",
            password: "",
            repassword: "",
            role: "user",
            action: "",
            find: "",
            message: ""
        }
    }

    bind = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    Save = (event) => {
        event.preventDefault();
        if(this.state.password === this.state.repassword)
        {
            let url = "http://localhost/toko_online/public/register";
            let form = new FormData();
            form.append("nama", this.state.nama)
            form.append("email", this.state.email)
            form.append("password", this.state.password)
            axios.post(url, form)
            .then(response => {
                this.setState({message: response.data.message})
               alert("berhasil")
               window.location ="/login"
            })
            .catch(error => {
                console.log(error);
            });
       
        }else{
            alert("Password Tidak Sama")
        }
    }

    render(){
        return(
            <div className="container width"
            style={{width: 24 + "rem", paddingTop:6 + "rem"}}>
                <h3 className="mt-4 text-center">Register</h3>
                <form onSubmit={this.Save}>

                   <input type="text" className="form-control mt-4" name="nama"
                    placeholder="Username" value={this.state.nama} onChange={this.bind} required />

                    <input type="email" className="form-control mt-4" name="email"
                    placeholder="Email" value={this.state.email} onChange={this.bind} required />

                    <input type="password" className="form-control mt-4" name="password"
                    placeholder="Password" value={this.state.password} onChange={this.bind} required />

                    <input type="password" className="form-control mt-4" name="repassword"
                    placeholder="Repassword" value={this.state.repassword} onChange={this.bind} required />

                    <button type="submit" className="btn btn-block btn-primary mt-4">Register</button>
                </form>
                <p className="text-center mt-2">Already have an account? <Link to="/login">Login</Link></p>
            </div>
        )
    }
}

export default Register;