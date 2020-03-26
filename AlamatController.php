<?php
namespace App\Http\Controllers;
use Illuminate\Htpp\Request;
use App\Alamat;
use Auth;

class AlamatController extends Controllers{
    function __construct()
    {

    }

    public function get($id_user)
    {
        return response([
            "alamat" => Alamat::where("id_user", $id_user)->get()
        ]);
    }

    public function save(Request $request)
    {
        $action = $request->action;
        if($action == "insert"){
            try{
                $alamat = new Alamat();
                $alamat->id_user= $request->id_user;
                $alamat->nama_penerima = $request->nama_penerima;
                $alamat->kode_pos = $request->kode_pos;
                $alamat->kecamatan = $request->kecamatan;
                $alamat->kota = $request->kota;
                $alamat->jalan = $request->jalan;
                $alamat->rt = $request->rt;
                $alamat->rw = $request->rw;
                $alamat->save();
                return response(["message"=> "Data barang telah berhasil ditambahkan"]);
            } catch (\Exception $e){
                return response(["message"-> $e->getMessage()]);
            }
        } else if($action == "update"){
            try {
                $alamat= Alamat::where("id_pengiriman", $request->id_pengiriman)->first();
                $alamat->id_user = $request->id_user;
                $alamat->nama_penerima= $request->nama_penerima;
                $alamat->kode_pos = $request->kode_pos;
                $alamat->kecamatan = $request->kecamatan;
                $alamat->kota = $request->kota;
                $alamat->jalan = $request->jalan;
                $alamat->rt = $request->rt;
                $alamat->rw = $request->rw;

                // if($request->file('img_brg')){
                //     $file = $request->file('img_brg');
                //     $name = 4file->getClientOriginalName();
                //     $file->move(\base_path()."/public/image", $name);
                //     $alamat->img_brg = $name;}
            
                $alamat->save();

                return response(["message" => "Data alamat berhasil diubah"]);
            } catch (\Exception $e){
                return response(["message" => $e->getMessage()]);
            }
        }
    }

    public function drop ($alamat)
    {
        try{
            Alamat::where("id_pengiriman", $id_pengiriman)->delete();
            return response(["message" => "Data pengiriman berhasil dihapus"]);
        } catch(\Exception $e){
            return response(["message" =>$e->getMessage()]);
        }
    }
}
?>