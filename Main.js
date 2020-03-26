import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

import Navbar from "./component/Navbar";
import Produk from "./page/Produk";
import Cart from "./page/Cart";
import Product from "./page/Product";
import User from "./page/User";
import Login from "./page/Login";
import Register from "./page/Register";
import Profil from "./page/Profil";
import Orders from "./page/Orders";
import Checkout from "./page/Checkout";


class Main extends Component{
    render =()=>{
        return(
            <Switch>
                {/*load component tiap halaman*/}
                <Route path="/login" component={Login}/>
                <Route path="/Produk">
                    <Navbar />
                    <Produk />
                </Route>
                <Route path="/Cart">
                    <Navbar />
                    <Cart />
                </Route>
                <Route path="/Product">
                    <Navbar />
                    <Product />
                </Route>
                <Route path="/User">
                    <Navbar />
                    <User />
                </Route>
                <Route path="/Register">
                    <Navbar />
                    <Register />
                </Route>
                <Route path="/Profil">
                <Navbar />
                <Profil />
                </Route>
                <Route path="/Orders">
                    <Navbar />
                    <Orders />
                </Route>
                <Route path="/Checkout">
                    <Navbar />
                    <Checkout />
                </Route>

            </Switch>
        );
    }
}
export default Main;