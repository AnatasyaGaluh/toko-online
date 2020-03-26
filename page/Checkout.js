import React, {Component,Fragment} from "react"

export default class Checkout extends Component{
    render(){return(<Fragment>
        <div>
  <meta charSet="utf-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no"
  />
  <meta name="description" content />
  <meta name="author" content />
  <link rel="icon" href="/docs/4.0/assets/img/favicons/favicon.ico" />
  <title>Checkout example for Bootstrap</title>
  <link
    rel="canonical"
    href="https://getbootstrap.com/docs/4.0/examples/checkout/"
  />
  {/* Bootstrap core CSS */}
  <link href="../../dist/css/bootstrap.min.css" rel="stylesheet" />
  {/* Custom styles for this template */}
  <link href="form-validation.css" rel="stylesheet" />
  <div className="container">
    <div className="py-5 text-center">
    <h2>Checkout</h2>
    </div>
    <div className="row">
      <div className="col-md-4 order-md-2 mb-4">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted">Keranjang</span>
          <span className="badge badge-secondary badge-pill">3</span>
        </h4>
        <ul className="list-group mb-3">
          <li className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 className="my-0">Dress</h6>
              <small className="text-muted">Quantity : 2</small>
            </div>
            <span className="text-muted">Rp. 120000</span>
          </li>
          <li className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 className="my-0">Casual</h6>
              <small className="text-muted">Quantity : 2</small>
            </div>
            <span className="text-muted">Rp. 210000</span>
          </li>
          
          <li className="list-group-item d-flex justify-content-between">
            <span>Total</span>
            <strong>Rp. 330000</strong>
          </li>
        </ul>
        <form className="card p-2">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Promo code"
            />
            <div className="input-group-append">
              <button type="submit" className="btn btn-secondary">
                Redeem
              </button>
            </div>
          </div>
        </form>
        <form className="card p-2">
        <button className="btn btn-primary btn-lg btn-block" type="submit">
            Continue to checkout
          </button>
        </form>
      </div>
      <div className="col-md-8 order-md-1">
        <h4 className="mb-3">Alamat Yang Akan Dituju</h4>
        <form className="needs-validation" noValidate>
          <div className="row">
            <div className="invalid-feedback">
              Tolong Masukkan alamat lengkap
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="nama">Nama Penerima</label>
            <input
              type="text"
              className="form-control"
              id="nama"
              placeholder="Masukkan Nama Anda"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address">Alamat</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Masukkan alamat lengkap"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="KodePos">Kode Pos</label>
            <input
              type="text"
              className="form-control"
              id="KodePos"
              placeholder="masukkan kode pos"
              required
            />
          </div>
        </form>
      </div>
    </div>
    <footer className="my-5 pt-5 text-muted text-center text-small"></footer>
  </div>
 
</div>

</Fragment>)}
}