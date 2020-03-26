<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Orders;
use App\Detail_orders;
use App\Alamat;
use App\Product;
use App\User;
use Auth;

class OrdersController extends Controller
{

  function __construct()
  {

  }  

  public function get()
  {
    $orders = [] ;
    foreach (Orders::all() as $o) {
      $detail = [];
      foreach ($o->detail_orders as $d) {
        $itemDetail = [
          "id_orders" => $d->id_orders,
          "id_products" => $d->id_products,
          "nama_product" =>$d->nama_product,
          "qty" => $d->qty
        ];
        array_push ($detail, $itemDetail);
      }
      $item = [
        "id_orders" => $o->id,
        "id_user" =>$o->id_user,
        "id_pengiriman" => $o->id_pengiriman,
        "jalan" => $o->alamat->jalan,
        "total" => $o->total,
        "bukti_bayar" => $o->bukti_bayar,
        "status" => $o->status,
        "detail" => $detail
      ];
      array_push($orders, $item);
    }

    return response(["orders" => $orders]);
  }

  public function getById($id_user)
  {
    $orders = [] ;
    foreach (Orders::where("id_user", $id_user)->get() as $o) {
      $detail = [];
      foreach ($o->detail_orders as $d) {
        $itemDetail = [
          "id_orders" => $d->id_orders,
          "id_products" => $d->id_products,
          "qty" => $d->qty
        ];
        array_push ($detail, $itemDetail);
      }
      $item = [
        "id_orders" => $o->id,
        "id_user" =>$o->id_user,
        "id_pengiriman" => $o->id_pengiriman,
        "total" => $o->total,
        "bukti_bayar" => $o->bukti_bayar,
        "status" => $o->status,
        "detail" => $detail
      ];
      array_push($orders, $item);
    }

    return response(["orders" => $orders]);
  }

  public function find(Request $request)
  {
    $find = $request->find;
    $product = Product::where("id","like","%$find%")->orWhere("name","like","%$find%")
    ->orWhere("price","like","%$find%")->orWhere("description","like","%$find%")->get();
    return response([
      "product" => $product
    ]);
  }

  public function save(Request $request)
  {
      try {

        $orders = new Orders();
        $orders->id_user = $request->id_user;
        $orders->id_pengiriman = $request->id_pengiriman;
        $orders->total= $request->total;
        $orders->status = "dipesan";
        $orders->save();

        $o = Orders::where("id_user", $request->id_user)->latest()->first();
        $detail_orders = new Detail_orders();    
        $detail_orders->id_orders = $o->id;
        $detail_orders->id_product = $request->id_product;
        $detail_orders->qty = $request->qty;

        $detail_orders->save();

        return response(["message" => "Data order berhasil ditambahkan"]);
      } catch (Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  

  public function drop($id)
  {
    try {
      Product::where("id", $id)->delete();
      return response(["message" => "Data produk berhasil dihapus"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }

  public function accept($id)
  {
    $o = Orders::where("id", $id)->first();
    $o->status = "dikirim";
    $o->save();
  }

  public function decline($id)
  {
    $o = Orders::where("id", $id)->first();
    $o->status = "ditolak";
    $o->save();
  }
}
 ?>
